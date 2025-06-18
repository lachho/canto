#!/bin/bash

# Build script for static portfolio version
echo "🏗️  Building Canto Dictionary - Static Portfolio Version"

# Navigate to frontend directory
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the static site
echo "🔨 Building static site..."
npm run build

echo "✅ Build complete! Static site is ready in frontend/build/"
echo ""
echo "📝 To deploy to GitHub Pages:"
echo "   cd frontend && npm run deploy"
echo ""
echo "🌐 To test locally:"
echo "   cd frontend && npx serve -s build" 