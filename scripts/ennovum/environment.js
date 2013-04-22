'use strict';

window.define && define(
	[],
	function () {
/* ==================================================================================================== */

// html tag class 'no-js' to be removed
var HtmlEl = document.querySelector('html');
HtmlEl.className = HtmlEl.className.replace('no-js', '');

// function.prototype.bind (from developer.mozilla.org)
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () {},
			fBound = function () {
				return fToBind.apply(
					this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}

// console
if (!window.console) {
	window.console = {
		'console': window.console,
		'log': function console_log() {
			this.console && this.console.log.apply(this.console, arguments);
		},
		'warn': function console_warn() {
			this.console && this.console.warn.apply(this.console, arguments);
		},
		'error': function console_error() {
			this.console && this.console.error.apply(this.console, arguments);
		}
	};
}

// BlobBuilder
if (!window.BlobBuilder) {
	window.BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder;
}

// URL
if (!window.URL) {
	window.URL = window.URL || window.webkitURL;
}

// Array.isArray
if (!Array.isArray) {
	Array.isArray = function Array_isArray(arg) {
		switch (false) {
			case typeof arg === 'object':
			case typeof arg['length'] === 'number':
			case typeof arg['push'] === 'function':
			case typeof arg['pop'] === 'function':
			case typeof arg['shift'] === 'function':
			case typeof arg['unshift'] === 'function':
			case typeof arg['indexof'] === 'function':
			case typeof arg['slice'] === 'function':
			case typeof arg['splice'] === 'function':
				return false;
				break;
		}
		return true;
	}
}

// requestAnimationFrame
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || undefined;
}

/* ==================================================================================================== */
		return null;
	});
