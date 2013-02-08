// convenience shortcuts
// basic_auth (opt): any object that satisfies {'username': x, 'password': y}

// exports
exports.get = get;
exports.head = head;
exports.post = post;
exports.put = put;
exports.del = del;
exports.has_internet_access = has_internet_access;
exports.HTTPError = HTTPError;
exports.HTTPRequest = HTTPRequest;

// imports
var url = exports.url = require("http/url");
var ByteString = require("io/octals").ByteString;

// definitions
var HTTPError = Error.factory("HTTPError");

// basic_auth: authentication with an intranet is a common use-case
// timeout: we want to make it easy to do long polling
function _pull (request, basic_auth, timeout) {
	// will simply return false if basic_auth is undefined
	request.auth.basic(basic_auth);
	if (timeout != undefined) {
		request.timeout(timeout);
	}
	return request.do();	
}

function _push (request, data, basic_auth, timeout) {
	request.content(data);
	return _pull(request, basic_auth, timeout);
}

/**
 * @desc Performs a GET request on the specified resource.
 * @param {String} url The URL for the resource
 * @param {Object} [basic_auth] Basic authentication — any object with ``username`` and ``password`` properties will do.
 * @param {Number} [timeout=5] How long before the http client should give up.
 */

function get (url, basic_auth, timeout) {
	var request = new HTTPRequest("GET", url);
	return _pull(request, basic_auth, timeout);
}

/**
 * @desc Performs a HEAD request on the specified resource. Similar to a GET request, but only returns the http headers.
 * @param {String} url The URL for the resource
 * @param {Object} [basic_auth] Basic authentication — any object with ``username`` and ``password`` properties will do.
 * @param {Number} [timeout=1] How long before the http client should give up.
 */

function head (url, basic_auth, timeout) {
	var request = new HTTPRequest("HEAD", url);
	return _pull(request, basic_auth, timeout);
}

/**
 * @desc Performs a POST request on the specified resource.
 * @param {String} url The URL for the resource
 * @param {Object|String} data Either an object, to be urlencoded by this function, or a string that 
 * will be passed along unchanged.
 * @param {Object} [basic_auth] Basic authentication — any object with ``username`` and ``password`` 
 * properties will do.
 * @param {Number} [timeout=5] How long before the http client should give up.
 */

function post (url, data, basic_auth, timeout) {
	var request = new HTTPRequest("POST", url);
	return _push(request, data, basic_auth, timeout);
}

/**
 * @desc Performs a PUT request on the specified resource. PUT requests are like POST requests, but idempotent.
 * @param {String} url The URL for the resource
 * @param {Object|String} data Either an object, to be urlencoded by this function, or a string that 
 * will be passed along unchanged.
 * @param {Object} [basic_auth] Basic authentication — any object with ``username`` and ``password`` 
 * properties will do.
 * @param {Number} [timeout=1] How long before the http client should give up.
 */

function put (url, data, basic_auth, timeout) {
	var request = new HTTPRequest("PUT", url);
	return _push(request, data, basic_auth, timeout);
}

/**
 * @desc Performs a DELETE request on the specified resource.
 * @param {String} url The URL for the resource
 * @param {Object} [basic_auth] Basic authentication — any object with ``username`` and ``password`` 
 * properties will do.
 * @param {Number} [timeout=1] How long before the http client should give up.
 */

function del (url, basic_auth, timeout) {
	var request = new HTTPRequest("DELETE", url);
	return _pull(request, basic_auth, timeout);
}

/**
 * @desc Tests whether the application has access to the internet.
 * If not, this might either imply that the user is simply not connected, 
 * or otherwise that a firewall is blocking internet access for the active
 * Creative Suite app.
 */

function has_internet_access () {
	var response = head("http://www.w3.org/");
	// the socket won't even open if we don't have an internet connection, 
	// so there are probably more robust tests we could do than this one
	if (response.status = 200) {
		return true;
	} else {
		return false;
	}
}

/**
 * @class
 * 
 * @desc An incomplete but "good enough" implementation of the hypertext transfer protocol
 * for the client side. This is a lower-level interface. It feeds the :func:`get`, :func:`head`, 
 * :func:`post`, :func:`put` and :func:`del` convenience functions.
 *
 * Supports:
 *
 * * most HTTP methods: ``GET``, ``HEAD``, ``POST``, ``PUT``, ``DELETE``
 * * persistent connections
 * * chunked responses
 * * redirects
 *
 * Soon:
 *
 * * focus on reliability, more tests
 * * basic authentication
 *
 * Most likely never: 
 *
 * * digest authentication
 * * cookies
 * * proxies
 * * caching / 304 Not Modified
 *
 * HTTPRequest objects are entirely getter/setter-based, so e.g. use ``req.method()``
 * to get the current request method, and use ``req.method("POST")`` to change the 
 * request method.
 *
 * @param {String} [method]
 * @param {String} url
 * @param {Number} [timeout]
 *
 * @example
 *      var http = require("http");
 *      var example = "http://www.example.com"
 *      var response = http.HTTPRequest("GET", example);
 *      if (response.status == 200) {
 *          $.writeln(response.body);
 *      } else {
 *          $.writeln("Couldn't fetch {}".format(example));
 *      }
 */

function HTTPRequest (method, url, timeout) {
	var self = this;

	this._headers = {
		"User-Agent": "Adobe ExtendScript",
		"Accept": "*/*",
		"Connection": "close"
	}
	/**
	 * @desc The headers for this request.
	 * By default, these headers are included: 
	 * 
	 * User-Agent
	 *     InDesign ExtendScript
	 * Accept
	 *	*\/*
	 * Connection
	 *	close
	 *
	 * @param {Object} hash A key-value object. Replaces all existing headers.
	 * Use the ``header`` method instead when fetching or changing a single header.
	 */
	this.headers = function (hash) {
		if (hash) {
			// todo: check if we're passed a hash, not a string
			this._headers = hash;
		} else {
			return this._headers;
		}
	}

	/** @desc Get or set a single header. */
	this.header = function (name, value) {
		if (value) {
			this._headers[name] = value;
		} else if (value === false) {
			delete this._headers[name];
		} else {
			return this._headers[name];
		}
	}

	/** @desc The resource to request */
	this.url = function (url) {
		if (url) {
			this._url = require("http/url").parse(url);
			this.header("Host", this._url.host);
		} else {
			return this._url;
		}
	}
	this.url(url);

	this._port = this.url().port || 80;
	/** @desc The server port the request should be directed to. */
	this.port = function (number) {
		if (number) {
			this._port = number;
		} else {
			return this._port;
		}
	}
	
	this._method = method || "GET";
	/** @desc The request method. One of ``GET``, ``HEAD``, ``POST``, ``PUT`` or ``DELETE``. ``GET`` by default. */
	this.method = function (type) {
		if (type) {
			this._method = type;
		} else {
			return this._method;
		}
	}

	this._timeout = timeout || 5;
	/** @desc How long before the http client should give up the request. 5 seconds by default. */
	this.timeout = function (duration) {
		if (duration) {
			if (!duration.is(Number)) throw new TypeError("Timeout should be a number of seconds.");
			this._timeout = duration;
		} else {
			return this._timeout;
		}
	}

	this._max_redirects = 5;
	/** 
	 * @desc How much redirects the http client should follow before giving up.
	 * @default 5 redirects
	 */
	this.max_redirects = function (value) {
		if (value) {
			this._max_redirects = value;
		} else {
			return this._max_redirects;
		}		
	}

	// From the HTTP 1.1 specs: 
	// "If the 307 status code is received in response to a request other than GET or HEAD, the
	// user agent MUST NOT automatically redirect the request unless it can be confirmed by the
	// user, since this might change the conditions under which the request was issued."
	if (method == "GET" || method == "HEAD") {
		this._follow_redirects = true;
	} else {
		this._follow_redirects = false;
	}
	/** @desc Whether to follow redirects when requesting a resource. By default, true for GET and HEAD requests, false for POST and PUT requests. */
	this.follow_redirects = function (value) {
		if (value || value === false) {
			this._follow_redirects = value;
		} else {
			return this._follow_redirects;
		}
	}

	/** @desc Whether to establish a persistent connection. False by default, and best left that way. */
	this.persistent = function (value) {
		if (value) {
			// set header
		} else {
			// return value
		}
	}

	this._content = '';
	/** @desc Any content to send along with a ``PUT`` or ``POST`` request. */
	this.content = function (data) {
		if (data) {
			this._content = data;
			var m = this.method();
			// we could easily change this request to a POST request if it isn't one, 
			// but Extendables doesn't try to guess too much for the end developer.
			if (m =! "POST" && m != "PUT") {
				throw new HTTPError("Only PUT and POST requests can carry content. This is a {} request".format(m));
			}
			this.header("Content-Type", "application/x-www-form-urlencoded");
			this.header("Content-Length", data.length);
		} else if (data === false) {
			this._content = '';
			this.header("Content-Type", false);
			this.header("Content-Length", false);
		} else {
			return this._content;
		}
	}

	/** 
	 * @desc Basic authentication
	 */
	this.auth = {
		basic: function (user) {
			if (user) {
				var credentials  = "{}:{}".format(user.username, user.password).serialize('base64');
				self.header("Authorization", "Basic " + credentials);
			} else {
				return new Boolean(self.header("Authorization"));
			}
		}
	}

	this._encoding = "UTF-8";
	/** @desc The character encoding in which to send this request, which is also the preferred response encoding. */
	this.encoding = function (encoding) {
		var encodings = ['ASCII', 'BINARY', 'UTF-8'];
		if (encoding) {
			// normalize encoding name
			encoding = encoding.to('upper');
			// todo: test if encoding is one of ASCII, BINARY or UTF-8, throw an error otherwise
			if (!encodings.contains(encoding)) {
				throw new HTTPError("Encoding should be one of {}. \
					Received {} instead.".format(encodings.join(", "), encoding));
			} else {
				this._encoding = encoding;
			}
		} else {
			return this._encoding;
		}
	}

	this._build_head = function () {
		// request line
		var head = [];
		var url = this.url();
		var path = url.pathname + url.search;
		var request_line = "{} {} HTTP/1.1".format(this.method(), path || "/");
		head.push(request_line);
		// headers to string (kv) form
		var headers = this.headers().serialize('key-value', {'separator': ': ', 'eol': '\n'});
		head.push(headers);
		var end_of_head = "\r\n";
		return head.join("\r\n") + end_of_head;
	}

	this._build_request = function () {
		var request = this._build_head();
		// for POST and PUT requests, add content
		request += this.content();
		return request;
	}

	this._execute = function (connection) {
		var request = this._build_request();
		connection.write(request);
		var response = new HTTPResponse(this.method(), this.encoding(), this);
		while (connection.connected && !response.complete()) {
			response.push(connection.read(), connection.eof);
		}
		return response;
	}

	// _redirect can be safely called even when no redirects are needed;
	// it'll just return the original response.
	this._redirect = function (response) {
		var max = this.max_redirects();
		while (response.is_redirect && response.redirects.length < max) {
			response = response.follow();
		}
		if (response.is_redirect) {
			throw new HTTPError("Gave up after {} redirects.".format(max));
		}
		return response;
	}

	/** 
	 * @desc Executes the request.
	 * @returns {Object} Returns a :func:`HTTPResponse` object.
	 */
	this.do = function () {
		var start = new Date();
		var socket = new Socket();
		socket.timeout = this.timeout();
		var host = "{}:{}".format(this.url().hostname, this.port());
		if (socket.open(host, this.encoding())) {
			var response = this._execute(socket);
		} else {
			throw new HTTPError("Could not connect to {}".format(host));
		}
		// handle redirects, if any
		if (this.follow_redirects()) {
			response = this._redirect(response);
		}
		response.response_time = new Date().getTime() - start.getTime();
		return response.process();
	}
}

/**
 * @class
 * @desc The response to an HTTP request. These are returned by :func:`HTTPRequest` objects, 
 * you should never have to construct them yourself.
 *
 * @param method The request method.
 * @param encoding The expected response encoding.
 * @param request The original request; mainly handy for debugging.
 * Available as ``for_request`` on the response object.
 */

function HTTPResponse (method, encoding, request) {
	this._parts = [];
	this._eof = false;
	this._received_headers = false;

	this.push = function (partial_response, eof) {
		this._parts.push(partial_response);
		this._eof = eof;
		if (!this.headers && partial_response.indexOf("\n\n")) {
			this.process_headers();
		}
	}

	this.complete = function () {
		// a response is complete when we've received an EOF signal from the socket,
		// or when the last returned response from the socket was empty ("dried up").
		// (The last scenario applies in case we've chosen for a persistent connection.)
		//
		// (Note: once we support HEAD, there is a possible optimization: 
		// for those requests, namely: they're complete once our headers are)
		var eof = this._eof;
		var dry = (this._parts.length && this._parts.slice(-1)[0].length == 0);
		var satisfied = (method == "HEAD" && this.headers);
		//var last_chunk = not implemented (yet?)
		
		return eof || dry || satisfied;
	}

	this.process_chunks = function (chunked_string) {
		// chunk length is an amount of octals, not an amount of characters
		// UTF-8 can have multiple bytes for a single character, so we 
		// can't use the regular string length to know where a chunk ends.
		//
		// TODO: this isn't right, we can only know the encoding by checking the
		// response headers, as we can't be absolutely sure that we've received
		// a response in the requested encoding. (Unless socket takes care of that?)
		if (chunked_string.is(String) && this.encoding == "UTF-8") {
			chunked_string = new ByteString(chunked_string);
		}
	
		var terminator = 1;
		var chunk_length = parseInt(chunked_string.toString(), 16);
		var start_of_data = chunked_string.indexAfter('\n');
		var remainder = chunked_string.substr(start_of_data);
		var chunk = remainder.substr(0, chunk_length);
		if (chunk_length) {
			remainder = remainder.substr(chunk_length + terminator);
			return chunk + this.process_chunks(remainder);
		} else {
			return chunk;
		}
	}

	this.process_headers = function () {
		var raw_head = this._parts.join('').split('\n\n', 1)[0].split('\n');
		var raw_headers = raw_head.slice(1).join('\n');
		this.status = raw_head[0].split(' ')[1].to('int');
		this.headers = raw_headers.deserialize('key-value', {'separator': ': ', 'eol': '\n'});
		// flagging chunked responses
		if (this.headers["Transfer-Encoding"] && this.headers["Transfer-Encoding"] == "chunked") {
			this._chunked = true;
		}
		// flagging redirects
		// 303 requests, according to the spec, should be changed into a GET request,
		// whereas 301, 302 and 307 requests should be reissued as-is, albeit using the 
		// new URL.
		if (this.status == 303) {
			this.is_redirect = true;
			this.redirection_type = 'get';
		} else if ([301, 302, 307].contains(this.status)) {
			this.is_redirect = true;
			this.redirection_type = 'repeat';
		}
	}

	this.process = function () {
		this.raw = this._parts.join('');
		var start_of_body = this.raw.indexAfter('\n\n');
		this.body = this.raw.substring(start_of_body);
		// additional processing for chunked encoding
		if (this._chunked) this.body = this.process_chunks(this.body);
		// change state
		this.processed = true;
		return this;
	}

	this.follow = function () {
		if (!this.is_redirect) {
			throw new HTTPError("No redirect to follow.");
		} else {
			var request = {}.merge(this.for_request);
			var from = this.for_request.url().href;
			var to = this.headers["Location"];
			request.url(to);
			// no recursion
			request.follow_redirects(false);
			if (this.redirection_type == 'get') {
				request.method("GET");
				request.content(false);
			}
			var response = request.do();
			response.redirects = this.redirects;
			response.redirects.push(from);
			return response;
		}
	}

	/** @desc The original HTTPRequest object that led to this response. */
	this.for_request = request;
	/** @desc Whether the response is corrupt. Currently not implemented. */
	this.corrupt = false;
	this.processed = false;
	/**
	 * @desc Whether we've received a response with a redirect code.
	 * @type {Boolean}
	 */
	this.is_redirect = false;
	/**
	 * @desc If redirected, distinguishes between requests that should be re-issued
	 * with a GET request (303) and those that should be re-issued as-is (all the others).
	 * @type {String} Either ``get`` or ``repeat``.
	 */
	this.redirection_type = null;
	/**
	 * @desc An array of any redirects the request might have followed.
	 * @type String[]
	 */
	this.redirects = [];
	/** @desc The response headers. This is an object, not the raw HTTP headers. */
	this.headers;
	/** @desc The body content of the response. */
	this.body = undefined;
	/**
	 * @desc The status code of the response.
	 * @see `HTTP status code definitions <http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html>`_
	 */
	this.status = undefined;
	/** @desc How long it took to request the resource and get a response. In milliseconds. */
	this.response_time = undefined;
	/** @desc The encoding of the response we received. Usually UTF-8. */
	this.encoding = encoding; 
}

/*
 * implementation detail
 *
 * This library doesn't use the content-length header nor chunk length directives to determine
 * whether we've received the full message, regardless of whether our socket is closed.
 * If we would, we'd be able to close persistent (keep-alive) connections before they were explicitly 
 * terminated by the sender.
 * 
 * However, before we could consider this optimization, we'd need to optimize the ByteString class, 
 * and in particular make it possible and fast to concatenate / add in string data to an existing
 * byte class. Then we could process the data parts we receive on the fly rather than post-hoc.
 */