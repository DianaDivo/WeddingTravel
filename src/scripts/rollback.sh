#!/bin/bash

# WeddingTravel Rollback Script
# This script helps rollback to a previous deployment

set -e

echo "🔄 Starting rollback process..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Get deployment list
list_deployments() {
    echo "📋 Fetching recent deployments..."
    
    if command -v vercel &> /dev/null; then
        vercel ls
    else
        echo -e "${RED}❌ Vercel CLI not found${NC}"
        exit 1
    fi
}

# Rollback to specific deployment
rollback_deployment() {
    local deployment_url=$1
    
    echo "🔄 Rolling back to: $deployment_url"
    
    # Promote deployment to production
    vercel promote "$deployment_url"
    
    echo -e "${GREEN}✅ Rollback completed${NC}"
}

# Rollback Supabase functions
rollback_supabase() {
    echo "☁️  Rolling back Supabase functions..."
    echo -e "${YELLOW}⚠️  Note: Supabase doesn't support automatic rollbacks.${NC}"
    echo "   You need to redeploy the previous version manually."
    echo "   Use: supabase functions deploy server --no-verify-jwt"
}

# Main rollback flow
main() {
    echo ""
    echo "╔═══════════════════════════════════════╗"
    echo "║   WeddingTravel Rollback Script      ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""
    
    list_deployments
    
    echo ""
    echo "Enter the deployment URL to rollback to:"
    read deployment_url
    
    if [ -z "$deployment_url" ]; then
        echo -e "${RED}❌ No deployment URL provided${NC}"
        exit 1
    fi
    
    echo ""
    echo -e "${YELLOW}⚠️  Warning: This will rollback the production deployment!${NC}"
    echo "Are you sure you want to continue? (yes/no)"
    read confirmation
    
    if [ "$confirmation" = "yes" ]; then
        rollback_deployment "$deployment_url"
        rollback_supabase
        
        echo ""
        echo -e "${GREEN}✅ Rollback process completed${NC}"
        echo "   Please verify that the site is working correctly."
    else
        echo "❌ Rollback cancelled"
    fi
}

main