# encoding: utf-8

"""
TODO: 

`var z = require("blah").z;` ... to support this kind of require, we just have to 
make sure we don't replace the entire line of code, but just the `require(whatev)`
part, so we'll end up with:

    var z = require("blah").z;
    var z = exports.z;
"""

import os
import sys
import re

PACKAGEFOLDERS = ['extendables/core-packages', 'site-packages']

all_packages = {}
for folder in PACKAGEFOLDERS:
    packages = os.listdir(folder)
    for package in packages:
        if '.' not in package:
            all_packages[package] = folder + '/' + package

class CodeFragment(object):
    def __init__(self, filename_or_string, basedir='', string=False):
        if string:
            self.code = filename_or_string
            self.basedir = basedir
            self.source = None
        else:
            if len(basedir):
                basedir += '/'
            self.source = basedir + filename_or_string
            with open(self.source) as script:
                self.code = script.read()
            self.basedir = basedir + "/".join(filename_or_string.split('/')[0:-1])
    
    def inline_include(self, match):
        filename = match.group('filename')
        return CodeFragment(filename, self.basedir).inline()
    
    # todo: recursion
    # todo: support for var x = require("module").y;
    def inline_require(self, match):
        package = match.group('package')
        location = package.replace(package, all_packages.get(package, package), 1)
        location = location + '/lib'
        if not '/' in package:
            location = location + '/__core__'
        replacement = """undefined;
            var exports = {{}};
            #include "{0}.jsx"
            var {1} = exports;
            exports = undefined;
            """.format(location, package)
        return replacement
        return CodeFragment(replacement, string=True).inline()
    
    # needs work
    def inline_extract(self, match):
        package = match.group('package')
        location = package.replace(package, all_packages.get(package, package), 1)
        if not '/' in location:
            location = location + '/__core__'
        replacement = """var exports = {{}};
            #include "{0}.jsx";
            for (name in exports) {
                $.global[name] = exports[name];
            }
            exports = undefined;
            """.format(package)
        return replacement
        return CodeFragment(replacement, string=True).inline()
                    
    def inline(self):
        code = self.code
        if self.source:
            code = code.replace(
                '$.fileName', 
                'new File($.fileName).parent + "/{source}"'.format(source=self.source)
                )
        code = re.sub(r'#include "?(?P<filename>[^";]+)"?;?', self.inline_include, code)
        code = re.sub(r'(?<!function\s)require\(["\'](?P<package>.+)["\']\);?', self.inline_require, code)
        code = re.sub(r'(?<!function\s)require\(["\'](?P<package>.+)["\']\);?', self.inline_extract, code)
        return code        

def inline_code():
    """ Give the filename to the script you wish to minify. """
    script = sys.argv[1]
    print CodeFragment(script).inline()

if __name__ == '__main__':
    inline_code()