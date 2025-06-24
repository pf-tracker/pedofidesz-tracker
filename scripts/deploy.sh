#!/bin/bash

echo "🚀 Pedofidesz Tracker deployment script"
echo "======================================"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found!"
    exit 1
fi

# Check if data file was copied
if [ ! -f "dist/data/cases.json" ]; then
    echo "❌ data/cases.json not found in dist folder!"
    exit 1
fi

echo "📊 Current statistics:"
node cli/list-cases.js

echo ""
echo "🌐 Deployment options:"
echo "1. GitHub Pages (with submodule)"
echo "2. Netlify"
echo "3. Vercel"
echo "4. Manual upload"
echo ""

# Check if dist is a git submodule
if [ -f ".gitmodules" ] && grep -q "dist" .gitmodules; then
    echo "📁 Detected git submodule configuration for dist folder"
    echo ""
    echo "🔄 Deploying to GitHub Pages..."
    
    # Navigate to dist folder
    cd dist
    
    # Check if this is a git repository
    if [ ! -d ".git" ]; then
        echo "❌ dist folder is not a git repository!"
        echo "Please run: git submodule update --init --recursive"
        exit 1
    fi
    
    # Add all changes
    git add .
    
    # Check if there are changes to commit
    if git diff --cached --quiet; then
        echo "ℹ️  No changes to deploy"
    else
        # Commit changes
        git commit -m "Update website: $(date)"
        
        # Push to GitHub Pages repository
        echo "🚀 Pushing to GitHub Pages..."
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully deployed to GitHub Pages!"
            echo "🌐 Your website should be available at:"
            echo "   https://YOUR_USERNAME.github.io/pedofidesz-tracker-pages/"
        else
            echo "❌ Failed to push to GitHub Pages!"
            exit 1
        fi
    fi
    
    # Go back to project root
    cd ..
    
else
    echo "📁 No git submodule detected for dist folder"
    echo ""
    echo "💡 To setup GitHub Pages with submodule:"
    echo "1. Create a new repository for GitHub Pages (e.g., pedofidesz-tracker-pages)"
    echo "2. Update .gitmodules file with your repository URL"
    echo "3. Run: git submodule add https://github.com/YOUR_USERNAME/pedofidesz-tracker-pages.git dist"
    echo "4. Run: git submodule update --init --recursive"
    echo ""
    echo "📁 Your static files are ready in the 'dist' folder"
    echo "   You can upload this folder to any static hosting service."
fi

echo ""
echo "🎉 Deployment script completed!" 