In a Nutshell
=============

This is an implementation of finite set encryption algorithm.
Basically it creates a cryptographic bijective mapping between two
identical finite sets. In practise this can be used for example
mapping a range of integers (e.g. 0..10000000) to the same range but
in pseudorandom order. The mapping is keyed and cryptographically
strong, so with a different key, the mapping is also different.

Currently it encrypts only input data that conforms with
Number.isSafeInteger(data), but this restriction will be lifted in
future.


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
