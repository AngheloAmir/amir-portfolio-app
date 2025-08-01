#!/bin/bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
# Source nvm if it exists
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install & use Node 16
nvm install 16
nvm use 16

# Clean and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build


# Deploy to GitHub Pages
# Type in the terminal
# ./rebuild.sh
# So what is this?
# The issue is that, this React project is created using an old version of
# Node.js so it does not run in the lastest version of Node
