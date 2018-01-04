'use strict';

const Fsmixer = require('../fsmixer.js');
const BitBuf = require('bitbuf');
const assert = require('assert');

(function() {
	var m, x, i, j, k;

	m = 7;
	x = new Fsmixer('verysecret', m);
	for (i = 0; i < Math.min(m, 10); i++) {
		j = x.encrypt(i);
		assert.ok((j >= 0) && (j < m));
		k = x.decrypt(j);
		console.log(i, j, k);
		assert.equal(i, k);
	}

	m = 9999999999999;
	x = new Fsmixer('verysecret', m);
	for (i = 0; i < Math.min(m, 10); i++) {
		j = x.encrypt(i);
		assert.ok((j >= 0) && (j < m));
		k = x.decrypt(j);
		console.log(i, j, k);
		assert.equal(i, k);
	}
	console.log('ok');
	process.exit(0);
})();
