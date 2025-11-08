#!/bin/bash

# WeddingTravel Health Check Script
# Monitors site health and API endpoints

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Default production URL
PRODUCTION_URL="${PRODUCTION_URL:-https://your-production-url.com}"

echo "🏥 Running health checks for WeddingTravel..."
echo ""

# Check main site
check_main_site() {
    echo "1️⃣  Checking main site..."
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCTION_URL")
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}   ✅ Main site: OK (HTTP $response)${NC}"
        return 0
    else
        echo -e "${RED}   ❌ Main site: FAILED (HTTP $response)${NC}"
        return 1
    fi
}

# Check API endpoints
check_api_endpoints() {
    echo "2️⃣  Checking API endpoints..."
    
    # Check portfolio endpoint
    portfolio_response=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCTION_URL/api/portfolio")
    if [ "$portfolio_response" = "200" ]; then
        echo -e "${GREEN}   ✅ Portfolio API: OK${NC}"
    else
        echo -e "${RED}   ❌ Portfolio API: FAILED (HTTP $portfolio_response)${NC}"
    fi
    
    # Check blog endpoint
    blog_response=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCTION_URL/api/blog")
    if [ "$blog_response" = "200" ]; then
        echo -e "${GREEN}   ✅ Blog API: OK${NC}"
    else
        echo -e "${RED}   ❌ Blog API: FAILED (HTTP $blog_response)${NC}"
    fi
}

# Check Supabase connection
check_supabase() {
    echo "3️⃣  Checking Supabase..."
    
    if [ -z "$SUPABASE_URL" ]; then
        echo -e "${YELLOW}   ⚠️  SUPABASE_URL not set, skipping${NC}"
        return 0
    fi
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/rest/v1/")
    
    if [ "$response" = "200" ] || [ "$response" = "401" ]; then
        echo -e "${GREEN}   ✅ Supabase: OK${NC}"
    else
        echo -e "${RED}   ❌ Supabase: FAILED (HTTP $response)${NC}"
    fi
}

# Check page load time
check_performance() {
    echo "4️⃣  Checking performance..."
    
    load_time=$(curl -o /dev/null -s -w '%{time_total}' "$PRODUCTION_URL")
    
    if (( $(echo "$load_time < 2.0" | bc -l) )); then
        echo -e "${GREEN}   ✅ Load time: ${load_time}s (Good)${NC}"
    elif (( $(echo "$load_time < 5.0" | bc -l) )); then
        echo -e "${YELLOW}   ⚠️  Load time: ${load_time}s (Acceptable)${NC}"
    else
        echo -e "${RED}   ❌ Load time: ${load_time}s (Slow)${NC}"
    fi
}

# Check SSL certificate
check_ssl() {
    echo "5️⃣  Checking SSL certificate..."
    
    domain=$(echo "$PRODUCTION_URL" | sed -e 's|^[^/]*//||' -e 's|/.*$||')
    
    expiry=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
    
    if [ -z "$expiry" ]; then
        echo -e "${YELLOW}   ⚠️  Could not check SSL certificate${NC}"
    else
        echo -e "${GREEN}   ✅ SSL certificate valid until: $expiry${NC}"
    fi
}

# Main health check
main() {
    echo "╔═══════════════════════════════════════╗"
    echo "║   WeddingTravel Health Check         ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""
    echo "Target: $PRODUCTION_URL"
    echo ""
    
    errors=0
    
    check_main_site || ((errors++))
    echo ""
    
    check_api_endpoints || ((errors++))
    echo ""
    
    check_supabase || ((errors++))
    echo ""
    
    check_performance || ((errors++))
    echo ""
    
    check_ssl || ((errors++))
    echo ""
    
    echo "═══════════════════════════════════════"
    
    if [ $errors -eq 0 ]; then
        echo -e "${GREEN}✅ All checks passed!${NC}"
        exit 0
    else
        echo -e "${RED}❌ $errors check(s) failed${NC}"
        exit 1
    fi
}

main