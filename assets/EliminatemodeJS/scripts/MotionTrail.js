var o;
var r = function () {
    this.x = 0;
    this.y = 0;
    this.dis = 0;
    this.cos = 0;
    this.sin = 0;
};
var a = cc._decorator;
var c = a.ccclass;
var l = a.property;
var s = a.playOnFocus;
var d = a.menu;
var p = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.atlas = null;
        t._spriteFrame = null;
        t._isActive = !0;
        t._isWorldXY = !0;
        t.offset = cc.v2(0, 0);
        t._length = 20;
        t._headWidth = 100;
        t._tailWidth = 0;
        t._headOpacity = 255;
        t._tailOpacity = 0;
        t.renderData = null;
        t.xyOffset = 1e8;
        t.uvOffset = 1e8;
        t.colorOffset = 1e8;
        t.step = 0;
        t.joints = [];
        t.cascadeScale = cc.v2(1, 1);
        t.visibleScale = cc.v2(1, 1);
        return t;
    }
    __extends(t, e);
    Object.defineProperty(t.prototype, "spriteFrame", {
        get: function () {
            return this._spriteFrame;
        },
        set: function (e) {
            this._spriteFrame = e;
            this.updateSpriteFrame();
            this.updateUV();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (e) {
            this._isActive = this.enabled = e;
            this.updateActive();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "isWorldXY", {
        get: function () {
            return this._isWorldXY;
        },
        set: function (e) {
            this._isWorldXY = e;
            this.resetPos();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (e) {
            this._length = Math.max(e, 2);
            this.updateLength();
            this.updateIndice();
            this.updateUV();
            this.updateWidth();
            this.resetPos();
            this.node._renderFlag |= cc.RenderFlow.FLAG_OPACITY_COLOR;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "headWidth", {
        get: function () {
            return this._headWidth;
        },
        set: function (e) {
            this._headWidth = Math.max(e, 0);
            this.updateWidth();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "tailWidth", {
        get: function () {
            return this._tailWidth;
        },
        set: function (e) {
            this._tailWidth = Math.max(e, 0);
            this.updateWidth();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "headOpacity", {
        get: function () {
            return this._headOpacity;
        },
        set: function (e) {
            this._headOpacity = e;
            this.node._renderFlag |= cc.RenderFlow.FLAG_OPACITY_COLOR;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "tailOpacity", {
        get: function () {
            return this._tailOpacity;
        },
        set: function (e) {
            this._tailOpacity = e;
            this.node._renderFlag |= cc.RenderFlow.FLAG_OPACITY_COLOR;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype._resetAssembler = function () {
        var e = (this._assembler = new cc.Assembler());
        e.updateRenderData = this.updateXY.bind(this);
        e.updateColor = this.updateColor.bind(this);
        this.update = this.setVertsDirty;
        e.init(this);
        this.renderData = new cc.RenderData();
        this.renderData.init(e);
        var t = e.getVfmt();
        var y = t._elements;
        for (var x = y.length - 1; x > -1; this.step += y[x--].bytes >> 2) {}
        var o = t._attr2el;
        this.xyOffset = o.a_position.offset >> 2;
        this.uvOffset = o.a_uv0.offset >> 2;
        this.colorOffset = o.a_color.offset >> 2;
    };
    t.prototype.onLoad = function () {
        this.updateSpriteFrame();
        this.updateLength();
        this.updateIndice();
        this.updateUV();
        this.updateWidth();
        this.updateActive();
        if (cc.sys.isNative) {
            cc.director.once(cc.Director.EVENT_AFTER_DRAW, this.updateColor, this);
        }
        this.node.on(cc.Node.EventType.SCALE_CHANGED, this.updateVisibleScale, this);
    };
    t.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.SCALE_CHANGED, this.updateVisibleScale, this);
    };
    t.prototype.updateActive = function () {
        if (this._isActive) {
            this.updateCascadeScale();
            this.updateVisibleScale();
            this.resetPos();
        }
    };
    t.prototype.createBuffer = function (e, t) {
        if (void 0 === t) {
            t = e - 2;
        }
        var y = new Float32Array(this.step * e);
        var x = new Uint16Array(3 * t);
        this.renderData.updateMesh(0, y, x);
    };
    t.prototype.fillBuffers = function (e, t) {
        var y = this.renderData.vDatas[0];
        var x = this.renderData.iDatas[0];
        var o = t._meshBuffer;
        var i = o.request(y.length, x.length);
        var n = i.byteOffset >> 2;
        var r = o._vData;
        if (y.length + n > r.length) {
            r.set(y.subarray(0, r.length - n), n);
        } else {
            r.set(y, n);
        }
        var a = o._iData;
        var c = i.indiceOffset;
        var l = i.vertexOffset;
        var s = 0;
        for (var d = x.length; s < d; a[c++] = l + x[s++]) {}
    };
    t.prototype.updateSpriteFrame = function () {
        var e = this._spriteFrame;
        if (e) {
            this._assembler.fillBuffers = this.fillBuffers.bind(this);
        } else {
            this._assembler.fillBuffers = function () {};
        }
        var t = this.getMaterial(0) || cc.Material.getBuiltinMaterial("2d-sprite");
        t.define("USE_TEXTURE", !0);
        t.setProperty("texture", e ? e.getTexture() : null);
    };
    t.prototype.updateCascadeScale = function () {
        var e = this.node;
        var t = 1;
        for (var y = 1; null !== e._parent; ) {
            t *= (e = e._parent).scaleX;
            y *= e.scaleY;
        }
        this.cascadeScale.x = t;
        this.cascadeScale.y = y;
    };
    t.prototype.updateVisibleScale = function () {
        this.visibleScale.x = this.cascadeScale.x * this.node.scaleX;
        this.visibleScale.y = this.cascadeScale.y * this.node.scaleY;
    };
    t.prototype.updateXY = function () {
        var e = this.node;
        var t = this.joints;
        for (var y = this._length - 1; y > 0; --y) {
            var x = t[y];
            var o = t[y - 1];
            x.x = o.x;
            x.y = o.y;
            x.sin = o.sin;
            x.cos = o.cos;
        }
        var i = t[0];
        var n = t[1];
        var r = this.visibleScale.x;
        var a = this.visibleScale.y;
        if (this._isWorldXY) {
            var c = e._worldMatrix.m;
            i.x = this.offset.x * r + c[12];
            i.y = this.offset.y * a + c[13];
        } else {
            i.x = this.offset.x * e.scaleX + e.x;
            i.y = this.offset.y * e.scaleY + e.y;
        }
        var l = n.y - i.y;
        var s = n.x - i.x;
        var d = Math.sqrt(l * l + s * s);
        i.sin = l / d;
        i.cos = s / d;
        var p = this.renderData.vDatas[0];
        var u = 0;
        var h = 0;
        var f = 1;
        var m = 1;
        if (!this._isWorldXY) {
            u = e.x;
            h = e.y;
            f = this.cascadeScale.x;
            m = this.cascadeScale.y;
        }
        var v = 0;
        var g = this.step;
        var _ = 0;
        var w = 0;
        var S = 0;
        var P = 0;
        for (var N = ((y = 0), this._length - 1); y < N; ++y) {
            i = t[y];
            n = t[y + 1];
            _ = (i.x - u) * f;
            w = (i.y - h) * m;
            S = i.dis * r * i.sin;
            P = i.dis * a * i.cos;
            p[v] = _ + S;
            p[v + 1] = w - P;
            p[(v += g)] = _ - S;
            p[v + 1] = w + P;
            v += g;
        }
        _ = (n.x - u) * f;
        w = (n.y - h) * m;
        S = n.dis * r * i.sin;
        P = n.dis * a * i.cos;
        p[v] = _ + S;
        p[v + 1] = w - P;
        p[(v += g)] = _ - S;
        p[v + 1] = w + P;
        this.fitXY(p);
    };
    t.prototype.resetPos = function () {
        var e = this.offset.x;
        var t = this.offset.y;
        var y = this.node;
        if (this._isWorldXY) {
            var x = y._worldMatrix.m;
            y._updateWorldMatrix();
            e += x[12];
            t += x[13];
        } else {
            e += y.x;
            t += y.y;
        }
        var o = this._length - 1;
        for (var i = this.joints; o > -1; --o) {
            i[o].x = e;
            i[o].y = t;
        }
        var n = this.renderData.vDatas[0];
        var r = ((o = this.xyOffset), n.length);
        for (var a = this.step; o < r; o += a) {
            n[o] = e;
            n[o + 1] = t;
        }
        this.fitXY(n);
    };
    t.prototype.fitXY = function (e) {
        if (cc.sys.isNative) {
            this.node._updateWorldMatrix();
            var t = cc.Mat4.invert(new cc.Mat4(), this.node._worldMatrix).m;
            var y = t[0];
            var x = t[1];
            var o = t[4];
            var i = t[5];
            var n = 0;
            var r = 0;
            if (this._isWorldXY) {
                n = t[12];
                r = t[13];
            }
            var a = this.xyOffset;
            for (var c = e.length; a < c; a += this.step) {
                var l = e[a];
                var s = e[a + 1];
                e[a] = y * l + o * s + n;
                e[a + 1] = x * l + i * s + r;
            }
        } else {
            if (!this._isWorldXY) {
                var d = this.node._worldMatrix.m;
                n = d[12];
                r = d[13];
                a = this.xyOffset;
                for (c = e.length; a < c; a += this.step) {
                    e[a] = e[a] + n;
                    e[a + 1] = e[a + 1] + r;
                }
            }
        }
    };
    t.prototype.updateUV = function () {
        var e = this.renderData.vDatas[0];
        var t = this.step;
        var y = 1 / (this.joints.length - 1);
        var x = this.uvOffset;
        var o = 0;
        for (var i = e.length; x < i; x += t, ++o) {
            e[x] = 1 & o;
            e[x + 1] = 1 - y * (o >> 1);
        }
        this.fitUV(e);
    };
    t.prototype.fitUV = function (e) {
        var t = this._spriteFrame;
        if (null !== t) {
            var y = t._texture.width;
            var x = t._texture.height;
            var o = t._rect;
            if (t._rotated) {
                var i = this.uvOffset;
                var n = 0;
                var r = e.length;
                for (var a = this.step; i < r; i += a, ++n) {
                    var c = e[i];
                    e[i] = ((1 - e[i + 1]) * o.height + o.x) / y;
                    e[i + 1] = (c * o.width + o.y) / x;
                }
            } else {
                i = this.uvOffset;
                n = 0;
                r = e.length;
                for (a = this.step; i < r; i += a, ++n) {
                    e[i] = (e[i] * o.width + o.x) / y;
                    e[i + 1] = (e[i + 1] * o.height + o.y) / x;
                }
            }
        }
    };
    t.prototype.updateColor = function () {
        var e = this._length;
        var t = this._headOpacity;
        var y = (t - this._tailOpacity) / (e - 1);
        var x = this.node.color.a / 255;
        var o = 16777215 & this.node.color._val;
        var i = this.renderData.uintVDatas[0];
        var n = 0;
        var r = this.colorOffset;
        for (var a = this.step; n < e; ++n) {
            var c = (((t - y * n) * x) << 24) | o;
            i[r] = c;
            i[(r += a)] = c;
            r += a;
        }
    };
    t.prototype.updateIndice = function () {
        var e = this.renderData.iDatas[0];
        var t = 0;
        var y = 0;
        for (var x = e.length; t < x; ++y) {
            e[t++] = y;
            e[t++] = y + 1;
            e[t++] = y + 2;
        }
    };
    t.prototype.updateLength = function () {
        var e = this._length;
        var t = 0;
        for (var y = (this.joints = []); t < e; y[t++] = new r()) {}
        this.createBuffer(e << 1);
    };
    t.prototype.updateWidth = function () {
        var e = this._length;
        var t = 0.5 * this._headWidth;
        var y = (t - 0.5 * this._tailWidth) / (e - 1);
        var x = 0;
        for (var o = this.joints; x < e; o[x].dis = t - y * x++) {}
    };
    __decorate(
        [
            l({
                type: cc.SpriteAtlas,
                serializable: !1,
                readonly: !0
            })
        ],
        t.prototype,
        "atlas",
        void 0
    );
    __decorate([l], t.prototype, "_spriteFrame", void 0);
    __decorate(
        [
            l({
                type: cc.SpriteFrame
            })
        ],
        t.prototype,
        "spriteFrame",
        null
    );
    __decorate([l], t.prototype, "_isActive", void 0);
    __decorate([l({})], t.prototype, "isActive", null);
    __decorate([l], t.prototype, "_isWorldXY", void 0);
    __decorate([l({})], t.prototype, "isWorldXY", null);
    __decorate([l({})], t.prototype, "offset", void 0);
    __decorate([l], t.prototype, "_length", void 0);
    __decorate(
        [
            l({
                type: cc.Integer
            })
        ],
        t.prototype,
        "length",
        null
    );
    __decorate([l], t.prototype, "_headWidth", void 0);
    __decorate([l({})], t.prototype, "headWidth", null);
    __decorate([l], t.prototype, "_tailWidth", void 0);
    __decorate([l({})], t.prototype, "tailWidth", null);
    __decorate([l], t.prototype, "_headOpacity", void 0);
    __decorate(
        [
            l({
                type: cc.Integer,
                min: 0,
                max: 255,
                slide: !0
            })
        ],
        t.prototype,
        "headOpacity",
        null
    );
    __decorate([l], t.prototype, "_tailOpacity", void 0);
    __decorate(
        [
            l({
                type: cc.Integer,
                min: 0,
                max: 255,
                slide: !0
            })
        ],
        t.prototype,
        "tailOpacity",
        null
    );
    return __decorate([c, s, d("Comp/MotionTrail")], t);
})(cc.RenderComponent);
exports.default = p;
