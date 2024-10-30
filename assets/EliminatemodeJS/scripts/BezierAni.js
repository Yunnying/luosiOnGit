exports.BezierData = void 0;
exports.BezierData = function () {};
var i = cc._decorator;
var n = i.ccclass;
var r =
    (i.property,
    (function () {
        function e() {}
        e.runBezierAct = function (e, t, y, x) {
            if (void 0 === x) {
                x = null;
            }
            if (!(y.length <= 0)) {
                var o = cc.tween();
                for (var i = 0; i < y.length; ++i) {
                    o.bezierTo(t, y[i].c1, y[i].c2, y[i].endPos);
                }
                e.setPosition(y[0].startPos);
                o.clone(e)
                    .call(function () {
                        x();
                    })
                    .start();
            }
        };
        e.runUniformBezierAct = function (e, t, y, x) {
            if (void 0 === x) {
                x = null;
            }
            if (!(y.length <= 0)) {
                var o = cc.tween();
                var i = [];
                for (var n = 0; n < y.length; ++n) {
                    var r = [y[n].startPos, y[n].c1, y[n].c2, y[n].endPos];
                    i = i.concat(this._caculateBezierPoint(r));
                }
                var a = this._caculateBezierLength(i) / t;
                for (n = 1; n < i.length; ++n) {
                    var c = cc.v2(i[n].x - i[n - 1].x, i[n].y - i[n - 1].y).len();
                    if (c > 0) {
                        var l = c / a;
                        o.to(l, {
                            position: i[n]
                        });
                    }
                }
                e.setPosition(i[0]);
                o.clone(e)
                    .call(function () {
                        x();
                    })
                    .start();
            }
        };
        e._caculateBezierPoint = function (e) {
            var t = [];
            for (var y = 0; y <= 1; y += 1 / 300) {
                var x = this._caculateBezierP(e, y);
                t.push(x);
            }
            return t;
        };
        e._caculateBezierLength = function (e) {
            var t = 0;
            for (var y = 1; y < e.length; ++y) {
                t += cc.v2(e[y].x - e[y - 1].x, e[y].y - e[y - 1].y).len();
            }
            return t;
        };
        e._caculateBezierP = function (e, t) {
            var y = cc.v2();
            y.x = Math.floor(
                Math.pow(1 - t, 3) * e[0].x +
                    3 * t * Math.pow(1 - t, 2) * e[1].x +
                    3 * Math.pow(t, 2) * (1 - t) * e[2].x +
                    Math.pow(t, 3) * e[3].x
            );
            y.y = Math.floor(
                Math.pow(1 - t, 3) * e[0].y +
                    3 * t * Math.pow(1 - t, 2) * e[1].y +
                    3 * Math.pow(t, 2) * (1 - t) * e[2].y +
                    Math.pow(t, 3) * e[3].y
            );
            return y;
        };
        return __decorate([n], e);
    })());
exports.default = r;
