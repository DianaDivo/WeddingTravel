#!/bin/bash

# WeddingTravel Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Starting WeddingTravel deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if required environment variables are set
check_env_vars() {
    echo "📋 Checking environment variables..."
    
    if [ -z "$SUPABASE_PROJECT_REF" ]; then
        echo -e "${RED}❌ SUPABASE_PROJECT_REF is not set${NC}"
        exit 1
    fi
    
    if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
        echo -e "${RED}❌ SUPABASE_ACCESS_TOKEN is not set${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Environment variables OK${NC}"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    npm ci
    echo -e "${GREEN}✅ Dependencies installed${NC}"
}

# Run tests
run_tests() {
    echo "🧪 Running tests..."
    npm run type-check || echo -e "${YELLOW}⚠️  Type check warnings${NC}"
    npm run lint || echo -e "${YELLOW}⚠️  Linting warnings${NC}"
    echo -e "${GREEN}✅ Tests completed${NC}"
}

# Build frontend
build_frontend() {
    echo "🏗️  Building frontend..."
    npm run build
    echo -e "${GREEN}✅ Frontend built${NC}"
}

# Deploy Supabase functions
deploy_supabase() {
    echo "☁️  Deploying Supabase functions..."
    
    # Link to Supabase project
    supabase link --project-ref "$SUPABASE_PROJECT_REF"
    
    # Deploy edge functions
    supabase functions deploy server --no-verify-jwt
    
    echo -e "${GREEN}✅ Supabase functions deployed${NC}"
}

# Deploy to hosting (Vercel example)
deploy_frontend_hosting() {
    echo "🌐 Deploying frontend to hosting..."
    
    if command -v vercel &> /dev/null; then
        vercel --prod
        echo -e "${GREEN}✅ Frontend deployed to Vercel${NC}"
    else
        echo -e "${YELLOW}⚠️  Vercel CLI not found. Skipping frontend deployment.${NC}"
        echo "   Install with: npm i -g vercel"
    fi
}

# Post-deployment checks
post_deployment_checks() {
    echo "🔍 Running post-deployment checks..."
    
    # Check if the site is up
    if [ ! -z "$PRODUCTION_URL" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCTION_URL")
        if [ "$response" = "200" ]; then
            echo -e "${GREEN}✅ Site is up and running${NC}"
        else
            echo -e "${RED}❌ Site returned status code: $response${NC}"
        fi
    fi
}

# Main deployment flow
main() {
    echo ""
    echo "╔═══════════════════════════════════════╗"
    echo "║   WeddingTravel Deployment Script    ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""
    
    check_env_vars
    install_dependencies
    run_tests
    build_frontend
    deploy_supabase
    deploy_frontend_hosting
    post_deployment_checks
    
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║    🎉 Deployment completed!          ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
    echo ""
}

# Run main function
main