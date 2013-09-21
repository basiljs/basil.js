#!/bin/bash

mkdir -p "$1"
cd "$1"

if [ -z "$3" ]
  then
    # echo "-O"
    curl -L -O $2
  else
    # echo "-o"
    curl -L -o "$3" $2
fi

# API
# 
# sh download.sh path/to/folder url
# or
# sh download.sh path/to/folder url myfilename
# 
# eg:
# sh download.sh ~/Desktop/tmp/a/b http://www.gnu.org/software/gettext/manual/gettext.html
# sh download.sh ~/Desktop/tmp/a/b http://www.gnu.org/software/gettext/manual/gettext.html mygettext.html
# 
# spaces in paths have to mask
# sh download.sh ~/Desktop/my\ folder http://www.gnu.org/software/gettext/manual/gettext.html
# sh download.sh ~/Desktop/my\ folder http://www.gnu.org/software/gettext/manual/gettext.html my\ gettext.html
