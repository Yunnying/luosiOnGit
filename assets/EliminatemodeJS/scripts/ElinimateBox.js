var o;
var r = cc._decorator;
var a = r.ccclass;
var c =
    (r.property,
    (function (e) {
        function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            t.canPushScrew = !0;
            t.haveScrewPush = [!1, !1, !1];
            t.screwNum = 0;
            return t;
        }
        __extends(t, e);
        t.prototype.getHaveScrewPush = function () {
            for (var e = 0; e < this.haveScrewPush.length; e++) {
                if (this.haveScrewPush[e]) {
                    return !0;
                }
            }
            return !1;
        };
        t.prototype.setHaveScrewPush = function (e, t) {
            this.haveScrewPush[t] = e;
        };
        t.prototype.getScrewNum = function () {
            return this.screwNum;
        };
        t.prototype.addScrewNum = function (e) {
            this.screwNum += e;
        };
        t.prototype.getCanPushScrew = function () {
            console.log("螺丝数量---》", this.getScrewNum());
            return !(this.getScrewNum() >= 3);
        };
        return __decorate([a], t);
    })(cc.Component));
exports.default = c;
