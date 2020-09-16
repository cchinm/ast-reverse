const config = require("./configConstant.js")

var alert = function (t) {}
var m, v, M, w = 256;

function j() {}

j.prototype.nextBytes = function (t) {
    var e;
    for (e = 0; e < t.length; ++e)
        t[e] = I()
}

function I() {
    if (null == m) {
        for (b(),
            (m = new y).init(v),
            M = 0; M < v.length; ++M)
            v[M] = 0;
        M = 0
    }
    return m.next()
}



function b() {
    ! function (t) {
        v[M++] ^= 255 & t,
            v[M++] ^= t >> 8 & 255,
            v[M++] ^= t >> 16 & 255,
            v[M++] ^= t >> 24 & 255,
            M >= w && (M -= w)
    }((new Date).getTime())
}

function y() {
    this.i = 0,
        this.j = 0,
        this.S = new Array
}
y.prototype.init = function (t) {
    var e, n, o;
    for (e = 0; e < 256; ++e)
        this.S[e] = e;
    for (n = 0,
        e = 0; e < 256; ++e)
        n = n + this.S[e] + t[e % t.length] & 255,
        o = this.S[e],
        this.S[e] = this.S[n],
        this.S[n] = o;
    this.i = 0,
        this.j = 0
}
y.prototype.next = function () {
    var t;
    return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
}

function D() {
    this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
}
D.prototype.doPublic = function (t) {
    return t.modPowInt(this.e, this.n)
}
D.prototype.setPublic = function (t, e) {
    null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = function (t, e) {
            return new i(t, e)
        }(t, 16),
        this.e = parseInt(e, 16)) : alert("Invalid RSA public key")
}
D.prototype.encrypt = function (t) {
    var e = function (t, e) {
        console.log(t, e)
        if (e < t.length + 11)
            return alert("Message too long for RSA"),
                null;
        for (var n = new Array, o = t.length - 1; o >= 0 && e > 0;) {
            var r = t.charCodeAt(o--);
            r < 128 ? n[--e] = r : r > 127 && r < 2048 ? (n[--e] = 63 & r | 128,
                n[--e] = r >> 6 | 192) : (n[--e] = 63 & r | 128,
                n[--e] = r >> 6 & 63 | 128,
                n[--e] = r >> 12 | 224)
        }
        n[--e] = 0;
        for (var a = new j, s = new Array; e > 2;) {
            for (s[0] = 0; 0 == s[0];)
                a.nextBytes(s);
            n[--e] = s[0]
        }
        return n[--e] = 2,
            n[--e] = 0,
            new i(n)
    }(t, 128);
    if (null == e)
        return null;
    var n = this.doPublic(e);
    if (null == n)
        return null;
    var o = n.toString(16);
    return 0 == (1 & o.length) ? o : "0" + o
}


rsaPassword = function (t) {
    var e = new D;
    return e.setPublic(config.rsaModulus, config.rsaExponent),
        e.encrypt(t)
}


console.log(rsaPassword("1231232"))