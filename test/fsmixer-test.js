'use strict';

const Fsmixer = require('../fsmixer.js');
const BitBuf = require('bitbuf');
const BigNum = require('bignum');
const KeepTime = require('keeptime');
const assert = require('assert');


(function() {
	var m, x, i, j, k, kt = new KeepTime();

	m = 7;
	kt.reset();
	kt.start()
	x = new Fsmixer('verysecret', m);
	kt.stop();
	console.log('construction time: ' + kt.get().toFixed(8) + 's');
	for (i = 0; i < Math.min(m, 10); i++) {
		kt.reset();
		kt.start()
		j = x.encrypt(i);
		kt.stop();
		console.log('encryption time: ' + kt.get().toFixed(8) + 's');
		assert.ok((j >= 0) && (j < m));
		kt.reset();
		kt.start()
		k = x.decrypt(j);
		kt.stop();
		console.log('decryption time: ' + kt.get().toFixed(8) + 's');
		console.log(i, j, k);
		assert.equal(i, k);
	}

	m = '9007199254740991';
	kt.reset();
	kt.start()
	x = new Fsmixer('verysecret', m);
	kt.stop();
	console.log('construction time: ' + kt.get().toFixed(8) + 's');
	for (i = 0; i < Math.min(m, 10); i++) {
		kt.reset();
		kt.start()
		j = x.encrypt(i);
		kt.stop();
		console.log('encryption time: ' + kt.get().toFixed(8) + 's');
		assert.ok((j >= 0) && (j < m));
		kt.reset();
		kt.start()
		k = x.decrypt(j);
		kt.stop();
		console.log('decryption time: ' + kt.get().toFixed(8) + 's');
		console.log(i, j, k);
		assert.equal(i, k);
	}

	m = '10000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
	kt.reset();
	kt.start()
	x = new Fsmixer('verysecret', m);
	kt.stop();
	console.log('construction time: ' + kt.get().toFixed(8) + 's');
	for (i = BigNum(0); i.lt(Math.min(m, 10)); i = i.add(1)) {
		kt.reset();
		kt.start()
		j = x.encrypt(i);
		kt.stop();
		console.log('encryption time: ' + kt.get().toFixed(8) + 's');
		assert.ok((j.ge(0)) && j.lt(m));
		kt.reset();
		kt.start()
		k = x.decrypt(j);
		kt.stop();
		console.log('decryption time: ' + kt.get().toFixed(8) + 's');
		console.log(i, j, k);
		assert.ok(k.eq(i));
	}
	console.log('ok');
	process.exit(0);
})();
