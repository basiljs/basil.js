import os
from fabric.api import *
from fabric.context_managers import cd

PACKAGEFOLDERS = ['./core-packages']
OTHER_FOLDERS = ['./', './patches']
JSDOC = "java -jar /Applications/jsdoc-toolkit/jsrun.jar /Applications/jsdoc-toolkit/app/run.js"

class Folder(str):
    pass

def _document_this():
    folders = OTHER_FOLDERS
    for packagefolder in PACKAGEFOLDERS:
        for folder in os.listdir(packagefolder):
            if not folder.startswith("."):
                folder = Folder(packagefolder + "/" + folder)
                folder.package = "/lib"
                folders.append(folder)
    return folders

def build_jsdoc():
    for folder in _document_this():
        local("{0} {1}{2} --template=doc/_themes/jsdoc-for-sphinx -x=js,jsx --directory={1}/doc/jsdoc".format(JSDOC, folder, getattr(folder, 'package', '')), capture=False)

def build_sphinx():
    with cd("doc"):
        local("make html", capture=False)

def docbuild(part='all'):
    # jsdoc should be aliased to something like 
    # java -jar jsdoc-toolkit/jsrun.jar jsdoc-toolkit/app/run.js
    
    if part == 'js':
        build_jsdoc()
    elif part == 'project':
        build_sphinx()
    elif part == 'clean':
        with cd("doc"):
            local("make clean")
        build_jsdoc()
        build_sphinx()        
    else:
        build_jsdoc()
        build_sphinx()

def ghpages():
    local("mv doc/_build/html ../extendables-documentation")
    local("git stash")
    local("git checkout gh-pages -m")
    local("mv ../extendables-documentation ./docs")
    local("git add .")
    local('git commit -a -m "New docbuild"')
    local("git checkout master")
    local("git stash apply")

def build():
    docbuild()
    ghpages()

def push():
    local("git push origin --all")

def commit():
    if prompt("Do you want to do a docbuild first?", default='no') != 'no':
        build()
        if not prompt("Is this docbuild okay?", default='no') != 'no':
            abort("Halting commit.")
    
    # show any new files we could add
    new_files = local("git add . --dry-run")
    if len(new_files):
        print "Git found a few new files: "
        print new_files
        while prompt("Do you want to exclude some of these files first?", default='no') != 'no':
            local("nano .gitignore", capture=False)
            local("git add . --dry-run", capture=False)
        local("git add .")
    local("git commit -a", capture=False)

    if prompt("Commit to the central repository as well?", default='no') != 'no':
        push()

def scaffold(name):
    local("cp -ri tools/scaffold ../site-packages/" + name, capture=False)