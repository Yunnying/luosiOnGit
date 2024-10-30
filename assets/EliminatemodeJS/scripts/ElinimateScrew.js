var o;
var r = cc._decorator;
var a = r.ccclass;
var c = (r.property, require("./ElinimateCreatelevel"));
var $eliminateManager = require("./EliminateManager");
var $commonData = require("../../scripts/commonData");
var $eliminateGamelevel = require("./EliminateGamelevel");
var $enum = require("../../scripts/Enum");
var u = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t._checkRadius = 20.5;
        t.pos = cc.v2(0);
        return t;
    }
    __extends(t, e);
    t.prototype.start = function () {};
    t.prototype.clickScrew = function () {
        if (
            $commonData.default.isgameing &&
            $eliminateManager.default.instance.propState == $enum.ENUM_PROP_STATES.NONE &&
            this.checkClickable()
        ) {
            this.screwAni();
        }
    };
    t.prototype.checkClickable = function () {
        var e = !0;
        if (255 != this.node.parent.opacity) {
            return !1;
        }
        for (var t = 0; t < c.default.instance.steelArr.length; t++) {
            if ("publicScrewNode" != this.node.parent.name) {
                var y = c.default.instance.steelArr[t];
                if (null == y ? void 0 : y.active) {
                    var x = y.getComponent(cc.PhysicsPolygonCollider).points;
                    var o = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                    var i = y.convertToNodeSpaceAR(o);
                    if (
                        cc.Intersection.polygonCircle(x, {
                            position: i,
                            radius: this._checkRadius
                        }) &&
                        parseInt(y.parent.parent.name.slice(5)) > parseInt(this.node.parent.parent.name.slice(5))
                    ) {
                        e = !1;
                        break;
                    }
                }
            }
        }
        return e;
    };
    t.prototype.screwAni = function () {
        console.error("可以点击");
        this.node.stopAllActions();
        this.node.angle = 0;
        var e = this.node.name.slice(-1);
        $eliminateGamelevel.default.instance.clickScrew(e, this.node);
    };
    t.prototype.screwShakeAni = function () {};
    return __decorate([a], t);
})(cc.Component);
exports.default = u;
