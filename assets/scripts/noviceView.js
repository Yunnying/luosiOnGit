var a;
var $commonData = require("./commonData");
var $platform = require("./platform");
var s = cc._decorator;
var u = s.ccclass;
var d = s.property;
var f = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.hand = null;
        t.maskImg = null;
        t.progress = 0;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onEnable = function () {
        this.setPosition();
        $platform.reportPage("novicePage", $commonData.default.currLevel);
    };
    t.prototype.nextStep = function () {
        console.log("新手教程", this.progress);
        switch (this.progress) {
            case 1:
                this.movetoTopScrew();
                break;
            case 2:
                this.disappear();
        }
    };
    t.prototype.setPosition = function () {
        var e = this;
        this.hand.opacity = 0;
        var t = $commonData.default.levelConfig[$commonData.default.currLevel];
        var n = 80 * t.hole[0].x;
        var o = 80 * t.hole[0].y - 70;
        this.hand.setPosition(n, o);
        this.maskImg.setPosition(n, o);
        this.progress = 1;
        this.scheduleOnce(function () {
            cc.tween(e.hand)
                .to(0.5, {
                    opacity: 255
                })
                .start();
        }, 0.5);
    };
    t.prototype.movetoTopScrew = function () {
        var e = $commonData.default.levelConfig[$commonData.default.currLevel];
        var t = 80 * e.hole[2].x;
        var n = 80 * e.hole[2].y - 70;
        var o = cc.moveTo(0.5, cc.v2(t, n));
        cc.tween(this.hand).then(o).start();
        this.maskImg.setPosition(t, n);
        this.progress = 2;
    };
    t.prototype.disappear = function () {
        var e = this;
        this.node.getChildByName("image").active = !1;
        cc.tween(this.hand)
            .to(0.5, {
                opacity: 0
            })
            .call(function () {
                e.hand.active = !1;
            })
            .start();
        this.progress = 3;
    };
    t.instance = null;
    __decorate([d(cc.Node)], t.prototype, "hand", void 0);
    __decorate([d(cc.Node)], t.prototype, "maskImg", void 0);
    return (n = __decorate([u], t));
})(cc.Component);
exports.default = f;
