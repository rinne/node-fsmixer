In a Nutshell
=============

This is an implementation of finite set encryption algorithm.
Basically it creates a cryptographic bijective mapping between two
identical finite sets. In practise this can be used for example
mapping a range of integers (e.g. 0..10000000) to the same range but
in pseudorandom order. The mapping is keyed and cryptographically
strong, so with a different key, the mapping is also different.


Reference
=========

Fsmixer(key, setSize)
---------------------

```
const Fsmixer = require('fsmixer');
const BitBuf = require('bitbuf');
const assert = require('assert');

var m = 13;
var x = new Fsmixer('verysecret', m);
for (var i = 0; i < m; i++) {
    var j = x.encrypt(i);
    var k = x.decrypt(j);
    console.log(i, j, k);
    assert.equal(i, k);
}

var m = 13;
var x = new Fsmixer('verysecret2', m);
for (var i = 0; i < m; i++) {
    var j = x.encrypt(i);
    var k = x.decrypt(j);
    console.log(i, j, k);
    assert.equal(i, k);
}

```

Just figure it out.


About Data Types
================

The data set size is passed to the constructor as number, which must
pass the check with Number.isSafeInteger() and be greater or equal to
two, or as a string representing a decimal integer greater or equal to
two, or BigBum object again greater or equal to two.

If the data set size is greater than what can pass the check with
Number.isSafeInteger() (i.e. 2^53-1), it must always be passed as a
string or BigNum.

Encrypt and decrypt methods return an integer. If the sata set size is
smaller or equal than 2^53-1, it is returned as a number. If however
the data set size is greater than 2^53-1, both methods, encrypt and
decrypt, always return a BigNum instead of a number. This solely
depends on the actual size of the data set, not the type of the
variable with which it was passed to the constructor.


References
==========

This is original work, but the finishing touches are somewhat inspired by
a publication from Terence Spies <terence@voltage.com>.

https://csrc.nist.gov/csrc/media/projects/block-cipher-techniques/documents/bcm/proposed-modes/ffsem/ffsem-spec.pdf


Author
======

Timo J. Rinne <tri@iki.fi>


License
=======

GPL-2.0
