#!/bin/bash

# Oasis Restaurant Website - Quick Deployment Script
# This script helps prepare and deploy the website

echo "🏪 Oasis Restaurant Website Deployment"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the website root directory"
    exit 1
fi

echo "✅ Website files detected"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Start local server for testing
start_server() {
    echo "🚀 Starting local development server..."
    
    if command_exists python3; then
        echo "📡 Starting Python HTTP server on port 8000"
        echo "🌐 Visit: http://localhost:8000"
        echo "⏹️  Press Ctrl+C to stop the server"
        python3 -m http.server 8000
    elif command_exists python; then
        echo "📡 Starting Python HTTP server on port 8000"
        echo "🌐 Visit: http://localhost:8000"
        echo "⏹️  Press Ctrl+C to stop the server"
        python -m http.server 8000
    elif command_exists php; then
        echo "📡 Starting PHP built-in server on port 8000"
        echo "🌐 Visit: http://localhost:8000"
        echo "⏹️  Press Ctrl+C to stop the server"
        php -S localhost:8000
    elif command_exists npx; then
        echo "📡 Starting Node.js HTTP server on port 8000"
        echo "🌐 Visit: http://localhost:8000"
        echo "⏹️  Press Ctrl+C to stop the server"
        npx http-server . -p 8000
    else
        echo "❌ No suitable HTTP server found. Please install Python, PHP, or Node.js"
        exit 1
    fi
}

# Check website files
check_files() {
    echo "🔍 Checking website files..."
    
    local missing_files=()
    
    # Check critical files
    for file in "index.html" "menu.html" "css/style.css" "css/menu.css" "js/script.js" "js/menu.js"; do
        if [ ! -f "$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -eq 0 ]; then
        echo "✅ All core files present"
    else
        echo "❌ Missing files:"
        printf '%s\n' "${missing_files[@]}"
    fi
    
    # Check assets directory
    if [ -d "assets" ]; then
        echo "✅ Assets directory exists"
        
        # Count image files needed
        total_images=$(find assets -name "*.jpg" -o -name "*.png" -o -name "*.svg" | wc -l)
        echo "📸 Found $total_images image files"
        
        if [ "$total_images" -lt 5 ]; then
            echo "⚠️  Warning: You may need more images. Check ASSETS-REQUIRED.md"
        fi
    else
        echo "❌ Assets directory missing"
    fi
}

# Create zip package for deployment
create_package() {
    echo "📦 Creating deployment package..."
    
    local package_name="oasis-restaurant-website-$(date +%Y%m%d).zip"
    
    if command_exists zip; then
        zip -r "$package_name" . -x "*.git*" "*.DS_Store" "node_modules/*" "*.log" "deploy.sh"
        echo "✅ Package created: $package_name"
        echo "📤 Ready for upload to your web hosting provider"
    else
        echo "⚠️  Zip command not found. Manually create a zip file with all website files."
    fi
}

# Show deployment options
show_deployment_options() {
    echo ""
    echo "🚀 Deployment Options:"
    echo "====================="
    echo ""
    echo "1. 🆓 FREE HOSTING:"
    echo "   • Netlify: Drag & drop the zip file at netlify.com"
    echo "   • Vercel: Connect GitHub repo at vercel.com"
    echo "   • GitHub Pages: Enable in repository settings"
    echo ""
    echo "2. 💰 PAID HOSTING:"
    echo "   • Shared hosting: Upload via cPanel File Manager"
    echo "   • Cloud hosting: AWS S3, Google Cloud Storage"
    echo ""
    echo "3. 🔧 CUSTOM DOMAIN:"
    echo "   • Update DNS A record to point to hosting provider"
    echo "   • Enable SSL certificate (Let's Encrypt)"
    echo ""
    echo "📚 See README.md for detailed instructions"
}

# Main menu
main_menu() {
    echo ""
    echo "Choose an option:"
    echo "1. 🌐 Start local development server"
    echo "2. 🔍 Check website files"
    echo "3. 📦 Create deployment package"
    echo "4. 📖 Show deployment options"
    echo "5. ❌ Exit"
    echo ""
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1) start_server ;;
        2) check_files ;;
        3) create_package ;;
        4) show_deployment_options ;;
        5) echo "👋 Goodbye!"; exit 0 ;;
        *) echo "❌ Invalid option"; main_menu ;;
    esac
}

# Run main menu
main_menu