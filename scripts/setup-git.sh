#!/bin/bash

echo "🔧 Git setup script for Pedofidesz Tracker"
echo "=========================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    exit 1
fi

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files to git
echo "📝 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Initial commit: Pedofidesz Tracker project setup"
    echo "✅ Changes committed"
fi

echo ""
echo "🌐 Next steps:"
echo "1. Create a new repository on GitHub for the main project"
echo "2. Create another repository for GitHub Pages (e.g., pedofidesz-tracker-pages)"
echo "3. Update the .gitmodules file with your actual repository URLs"
echo "4. Run the following commands:"
echo ""
echo "   # Add remote for main repository"
echo "   git remote add origin https://github.com/YOUR_USERNAME/pedofidesz-tracker.git"
echo "   git push -u origin main"
echo ""
echo "   # Setup submodule for GitHub Pages"
echo "   git submodule add https://github.com/YOUR_USERNAME/pedofidesz-tracker-pages.git dist"
echo "   git submodule update --init --recursive"
echo ""
echo "🎉 Git setup completed!" 