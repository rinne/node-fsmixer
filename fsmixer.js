'use strict';

const crypto = require('crypto');
const BitBuf = require('bitbuf');
const Abes = require('abes');
const BigNum = require('bignum');
const bbc = require('./bitbuf-bignum-conv.js');

var Fsmixer = function(key, setSize) {
	if (Number.isSafeInteger(setSize) && (setSize >= 2)) {
		this.setSize = setSize;
	} else if ((typeof(setSize) === 'string') && (setSize.match(/^[2-9]|([1-9][0-9]+)$/))) {
		this.setSize = BigNum(setSize);
	} else if (BigNum.isBigNum(setSize) && setSize.ge(2)) {
		this.setSize = BigNum(setSize);
	} else {
		throw new Error('Invalid set size');
	}
	if (BigNum.isBigNum(this.setSize)) {
		if (this.setSize.gt(Number.MAX_SAFE_INTEGER)) {
			this.setIsBig = true;
		} else {
			this.setIsBig = false;
			this.setSize = this.setSize.toNumber();
		}
	}
	this.setMax = this.setIsBig ? bbc.bigNumToBitBuf(this.setSize.sub(1)) : BitBuf.from(this.setSize - 1);
    this.c = new Abes(key, this.setMax.length);
};

function transform(fsmixer, data, encrypt) {
    var c, r;
	if (Number.isSafeInteger(data) && (data >= 0) && (data < fsmixer.setSize)) {
		c = BitBuf.from(data, fsmixer.setMax.length);
	} else {
		if ((typeof(data) === 'string') && (data.match(/^0|([1-9][0-9]*)$/))) {
			data = BigNum(data);
		}
		if (BigNum.isBigNum(data) && data.lt(fsmixer.setSize) && data.ge(0)) {
			c = bbc.bigNumToBitBuf(data, fsmixer.setMax.length);
		}
	}
    if (c === undefined) {
		throw new Error('Input set violation.');
    }
    do {
		c = (encrypt ? fsmixer.c.encrypt(c) : fsmixer.c.decrypt(c));
    } while (fsmixer.setMax.cmp(c) < 0);
	if (fsmixer.setIsBig) {
		r = bbc.bitBufToBigNum(c);
	} else {
		r = parseInt(c.toString(), 2);
	}
	return r;
}

Fsmixer.prototype.encrypt = function(data) {
    return transform(this, data, true);
};

Fsmixer.prototype.decrypt = function(data) {
    return transform(this, data, false);
};

module.exports = Fsmixer;
