exports.encode64 = encoder('+/');
exports.decode64 = decoder('+/');
exports.urlsafeEncode64 = encoder('-_');
exports.urlsafeDecode64 = decoder('-_');

// base64.js - Base64 encoding and decoding functions
//
// Copyright (c) 2007, David Lindquist <david.lindquist@gmail.com>
// Released under the MIT license
//
// Modified by TJ Holowaychuk for CommonJS module support.
// Modified by Ben Weaver to use any alphabet.
// Modified by Stijn Debrouwere for ExtendScript support.

function encoder(extra) {
  var chars = alphabet(extra);

  return function(str) {
    str = str.toString();
    var encoded = [];
    var c = 0;
    while (c < str.length) {
      var b0 = str.charCodeAt(c++);
      var b1 = str.charCodeAt(c++);
      var b2 = str.charCodeAt(c++);
      var buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
      var i0 = (buf & (63 << 18)) >> 18;
      var i1 = (buf & (63 << 12)) >> 12;
      var i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
      var i3 = isNaN(b2) ? 64 : (buf & 63);
      encoded[encoded.length] = chars.charAt(i0);
      encoded[encoded.length] = chars.charAt(i1);
      encoded[encoded.length] = chars.charAt(i2);
      encoded[encoded.length] = chars.charAt(i3);
    }
    return encoded.join('');
  };
}

function decoder(extra) {
  var chars = alphabet(extra),
      invalid_char = new RegExp('[^' + regexp_escape(chars) + ']');

  return function(str) {
    var invalid = {
      strlen: (str.length % 4 != 0),
      chars:  invalid_char.test(str),
      equals: (new RegExp("/=/").test(str) && (new RegExp("/=[^=]/").test(str) || new RegExp("/={3}/").test(str)))
    };
    if (invalid.strlen || invalid.chars || invalid.equals)
      throw new Error('Invalid base64 data');
    var decoded = [];
    var c = 0;
    while (c < str.length) {
      var i0 = chars.indexOf(str.charAt(c++));
      var i1 = chars.indexOf(str.charAt(c++));
      var i2 = chars.indexOf(str.charAt(c++));
      var i3 = chars.indexOf(str.charAt(c++));
      var buf = (i0 << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
      var b0 = (buf & (255 << 16)) >> 16;
      var b1 = (i2 == 64) ? -1 : (buf & (255 << 8)) >> 8;
      var b2 = (i3 == 64) ? -1 : (buf & 255);
      decoded[decoded.length] = String.fromCharCode(b0);
      if (b1 >= 0) decoded[decoded.length] = String.fromCharCode(b1);
      if (b2 >= 0) decoded[decoded.length] = String.fromCharCode(b2);
    }
    return decoded.join('');
  };
}

/// --- Aux

function alphabet(extra) {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    + extra
    + '=';
}

function regexp_escape(expr) {
  return expr.replace(/([\^\$\/\.\*\-\+\?\|\(\)\[\]\{\}\\])/, '\\$1');
}