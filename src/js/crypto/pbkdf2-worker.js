(function() {
	'use strict';

	// import web worker dependencies
	importScripts('../../lib/forge/forge.rsa.bundle.js');
	importScripts('../app-config.js');
	importScripts('./pbkdf2.js');

	/**
	 * In the web worker thread context, 'this' and 'self' can be used as a global
	 * variable namespace similar to the 'window' object in the main thread
	 */
	self.onmessage = function(e) {

		var args = e.data,
			key = null;

		if (e.data.password && e.data.keySize) {
			// start deriving key
			var pbkdf2 = new app.crypto.PBKDF2();
			key = pbkdf2.getKey(e.data.password, e.data.keySize);

		} else {
			throw 'Not all arguments for web worker crypto are defined!';
		}

		// pass output back to main thread
		self.postMessage(key);
	};

}());