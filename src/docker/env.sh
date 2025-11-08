#!/bin/sh
# Script to inject environment variables into the built app at runtime

set -e

# Get the directory where static files are served
ROOT_DIR=/usr/share/nginx/html

# Find all JavaScript files
find ${ROOT_DIR} -type f -name '*.js' | while read file; do
  # Replace placeholder with actual environment variable
  # This allows runtime configuration without rebuilding
  
  if [ -n "$VITE_SUPABASE_URL" ]; then
    sed -i "s|VITE_SUPABASE_URL_PLACEHOLDER|$VITE_SUPABASE_URL|g" "$file"
  fi
  
  if [ -n "$VITE_SUPABASE_ANON_KEY" ]; then
    sed -i "s|VITE_SUPABASE_ANON_KEY_PLACEHOLDER|$VITE_SUPABASE_ANON_KEY|g" "$file"
  fi
done

echo "Environment variables injected successfully"