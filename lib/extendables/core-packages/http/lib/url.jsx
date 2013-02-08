// originally taken from node.js

exports.parse = urlParse;

// define these here so at least they only have to be compiled once on the first module load.
var protocolPattern = /^([a-z0-9]+:)/;
var portPattern = /:[0-9]+$/;
var nonHostChars = ["/", "?", ";", "#"];
var hostlessProtocol = {
    "file":true,
    "file:":true
  }
var slashedProtocol = {
    "http":true, "https":true, "ftp":true, "gopher":true, "file":true,
    "http:":true, "https:":true, "ftp:":true, "gopher:":true, "file:":true
};

function urlParse (url) {
    if (url && typeof(url) === "object" && url.href) {
        throw TypeError("The unparsed url should be a string.");
      }
    
    var out = { href : url },
    rest = url;
    
    var proto = protocolPattern.exec(rest);
    if (proto) {
        proto = proto[0];
        out.protocol = proto;
        rest = rest.substr(proto.length);
    }
    
    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var slashes = rest.substr(0, 2) === "//";
        if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            out.slashes = true;
        }
    }
    
    if (!hostlessProtocol[proto] && (slashes || (proto && !slashedProtocol[proto]))) {
        // there's a hostname.
        // the first instance of /, ?, ;, or # ends the host.
        // don't enforce full RFC correctness, just be unstupid about it.
        var firstNonHost = -1;
        for (var i = 0, l = nonHostChars.length; i < l; i ++) {
            var index = rest.indexOf(nonHostChars[i]);
            if (index !== -1 && (firstNonHost < 0 || index < firstNonHost)) firstNonHost = index;
        }
        
        if (firstNonHost !== -1) {
          out.host = rest.substr(0, firstNonHost);
          rest = rest.substr(firstNonHost);
        } else {
          out.host = rest;
          rest = "";
        }
        
        // pull out the auth and port.
        var p = parseHost(out.host);
        out.merge(p);
        // we've indicated that there is a hostname, so even if it's empty, it has to be present.
        out.hostname = out.hostname || "";    
    }
        
    // now rest is set to the post-host stuff.
    // chop off from the tail first.
    var hash = rest.indexOf("#");
    if (hash !== -1) {
        // got a fragment string.
        out.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf("?");
    if (qm !== -1) {
        out.search = rest.substr(qm);
        out.query = rest.substr(qm+1);
    
        rest = rest.slice(0, qm);
    }
    
    if (rest) out.pathname = rest;
    return out;
}

function parseHost (host) {
    var out = {};
    var at = host.indexOf("@");
    if (at !== -1) {
        out.auth = host.substr(0, at);
        host = host.substr(at+1); // drop the @
    }
    var port = portPattern.exec(host);
    if (port) {
        port = port[0];
        out.port = port.substr(1).to('int');
        host = host.substr(0, host.length - port.length);
    }
    if (host) out.hostname = host;
    return out;
}