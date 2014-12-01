#!/bin/bash
# basil.js installer
# as suggested by fabiantheblind

BASEDIR="$( dirname "$0" )"
cd "$BASEDIR"
echo "This is where we are :"
pwd
# if 
echo "Installing basil.js... "
mkdir -p ~/Documents/basiljs/
cp -r ./ ~/Documents/basiljs/bundle
mkdir -p ~/Documents/basiljs/user

echo "Installation is done!"