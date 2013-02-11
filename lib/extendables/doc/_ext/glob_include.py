"""
This is experimental
"""

from docutils.parsers.rst import directives
import glob
import copy

class Include(directives.misc.Include):
    def run(self):
        if self.arguments[0].endswith('*'):
            out = list()
            paths = glob.glob(self.arguments[0])
            for path in paths: 
                directive = copy.copy(super(Include, self))
                directive.arguments[0] = directives.path(path)
                out = out + directive.run()
            return out
        else:
            return super(Include, self).run()

def setup(sphinx):
    pass
    #sphinx.add_directive('include', Include)