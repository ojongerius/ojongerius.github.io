(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO: create a list (arrary) of file names, have attribs, timestamps and
// contents stored elsewhere. Move into a file.
var contents = {
    "linkedin.txt": "Linkedin profile at <a href=\"https://www.linkedin.com/in/ottojongerius\">https://www.linkedin.com/in/ottojongerius</a>",
    "github.txt": "Github profile at <a href=\"https://github.com/ojongerius\">https://github.com/ojongerius</a>",
};

// Surely there must be a better way to do this
window.Cookies = require('js-cookie');

function cmd(input) {
    if (input == "ls") {
        $( "div.stdout" ).html(String(Object.keys(contents)).replace(",","<br>"));
    }
    else if (input.match("cat")) {
        // TODO see if our match is in the keys, if so: represent it
        if (input.match("cat (.*)")) {
            var match = input.match("cat (.*)")[1]
            if (contents[match]) {
                $( "div.stdout" ).html(contents[match])
            } else {
                $( "div.stdout" ).html("cat: " + match + ": No such file or directory")
            }
        } else {
            $( "div.stdout" ).html("usage: cat [file]")
        }
    }
    else if (input == "help") {
        $( "div.stdout" ).html("available commands:<br>cat<br>ls<br>write")
    }
    else if (input == "write") {
        //$( "div.stdout" ).html("Usage: write [text]")
        $( "div.stdout" ).html("not implemented yet, stay tuned.")
    }
    else if (input == "") {
        $( "div.stdout" ).html("")
    }
    else {
        $( "div.stdout" ).html(input + ": command not found")
    }
}

// TODO: Always keep focus on stdin, not just on document load
//(document).ready(function() {
$(function() {
    if ( Cookies.get('last_visit') ) {
        $('#last').text(Cookies.get('last_visit').replace(/(?:\r\n|\r|\n)/g, ''));
    }
    Cookies.set('last_visit', Date());
    $('#stdin').focus();
    $('#stdin').on("keypress", function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            e.stopPropagation();
            cmd($('#stdin').val());
            this.value = '';
        }
    });
});

},{"js-cookie":2}],2:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.1.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
					attributes.path    && '; path=' + attributes.path,
					attributes.domain  && '; domain=' + attributes.domain,
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}]},{},[1]);
