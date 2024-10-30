var a;
var r = cc._decorator;
var l = r.ccclass;
var s = r.property;
var $config = require("./config");
var $commonData = require("./commonData");
var $gameManager = require("./GameManager");
var $platform = require("./platform");
var $uIManager = require("./UIManager");
var m = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.skinVideoNode = [];
        return t;
    }
    __extends(t, e);
    t.prototype.onEnable = function () {
        this.initSkipVideoNode();
    };
    t.prototype.clickRevive = function () {
        var e = this;
        $platform.reportButton("revivePage", "addTimeBtn_video", $commonData.default.currLevel, 1, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("revivePage", "addTimeBtn_video_success", $commonData.default.currLevel, 1, 2);
            $commonData.default.isAddTime = !0;
            $gameManager.default.instance.init();
            e.node.active = !1;
        });
    };
    t.prototype.initSkipVideoNode = function () {
        if ($commonData.default.skinVideoCoupon > 0) {
            this.skinVideoNode.forEach(function (e) {
                e.active = !0;
            });
        } else {
            this.skinVideoNode.forEach(function (e) {
                e.active = !1;
            });
        }
    };
    t.prototype.clickGiveup = function () {
        $platform.reportButton("revivePage", "giveUpBtn", $commonData.default.currLevel, 1);
        $gameManager.default.instance.showGameoverPnl(0);
        $uIManager.default.instance.showRevivePnl(!1);
    };
    t.prototype.onLoad = function () {
        if ($config.currentPlatform == $config.platformEnum.wechat) {
            this.node.getChildByName("bg").getChildByName("tt").active = !1;
            this.node.getChildByName("bg").getChildByName("wx").active = !0;
        } else {
            this.node.getChildByName("bg").getChildByName("tt").active = !0;
            this.node.getChildByName("bg").getChildByName("wx").active = !1;
        }
    };
    __decorate([s(cc.Node)], t.prototype, "skinVideoNode", void 0);
    return __decorate([l], t);
})(cc.Component);
exports.default = m;
