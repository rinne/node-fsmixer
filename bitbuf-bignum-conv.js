'use strict';

const BitBuf = require('bitbuf');
const BigNum = require('bignum');

function offset(pos) {
    return [ pos >> 3, (7 - (pos & 7)) ];
}

function bitBufToBigNum(bb) {
    var i, o, r, b;
	if (bb.length == 0) {
		return BigNum(0);
	}
    o = offset(bb.length - 1);
	b = bb.buffer();
    r = BigNum(0);
    for (i = 0; i < o[0]; i++) {
		r = (r.mul(256)).add(b[i]);
    }
    for (i = 7; i >= o[1]; i--) {
		r = (r.mul(2)).add((b[o[0]] >> i) & 1);
    }
    return r;
}

function bigNumToBitBuf(n, hint) {
	var nl = n.bitLength(), b, r;
	if (! (Number.isSafeInteger(hint) && (hint >= nl) && (hint < BitBuf.MAX_SIZE))) {
		hint = nl;
	}
	b = n.toBuffer();
	if ((b.length * 8) < hint) {
		b = Buffer.concat([ Buffer.alloc(Math.ceil((hint - (b.length * 8)) / 8)), b ]);
	}
	r = BitBuf.from(b);
	if (r.length > hint) {
		r = r.slice(r.length - hint, r.length);
	}
    return r;
}

module.exports = {
	bitBufToBigNum: bitBufToBigNum,
	bigNumToBitBuf: bigNumToBitBuf
};
