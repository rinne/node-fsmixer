'use strict';

const crypto = require('crypto');
const BitBuf = require('bitbuf');
const Abes = require('abes');

var Fsmixer = function(key, setSize) {
    if (! (Number.isSafeInteger(setSize) && (setSize >= 2))) {
	throw new Error('Invalid set size');
    }
    this.setSize = setSize;
    this.setMax = BitBuf.from(this.setSize - 1);
    this.c = new Abes(key, this.setMax.length);
};

function transform(fsmixer, data, encrypt) {
    var c;
    if (! (Number.isSafeInteger(data) && (data >= 0) && (data < fsmixer.setSize))) {
	throw new Error('Input set violation.');
    }
    c = BitBuf.from(data, fsmixer.setMax.length);
    do {
	c = (encrypt ? fsmixer.c.encrypt(c) : fsmixer.c.decrypt(c));
    } while (fsmixer.setMax.cmp(c) < 0);
    return parseInt(c.toString(), 2);
}

Fsmixer.prototype.encrypt = function(data) {
    return transform(this, data, true);
};

Fsmixer.prototype.decrypt = function(data) {
    return transform(this, data, false);
};

module.exports = Fsmixer;
