var a;
var r = cc._decorator;
var l = r.ccclass;
var s = (r.property, require("./config"));
var $commonData = require("./commonData");
var $gameManager = require("./GameManager");
var $platform = require("./platform");
var $uIManager = require("./UIManager");
var h = (function (e) {
    function t() {
        return (null !== e && e.apply(this, arguments)) || this;
    }
    __extends(t, e);
    t.prototype.clickquieGame = function () {
        var e = $commonData.default.currLevel;
        if (0 == $commonData.default.isgameing) {
            e = 0;
        }
        $platform.reportButton("ExitPage", "exitGameBtn", e, 1);
        $gameManager.default.instance.hideNovice();
        $gameManager.default.instance.showGameoverPnl(2);
        $commonData.default.isgameing = !1;
        $uIManager.default.instance.showExitPnl(!1);
        $platform.showBannerAD(!1);
    };
    t.prototype.clickback = function () {
        var e = $commonData.default.currLevel;
        var t = 0;
        if (0 == $commonData.default.isgameing) {
            e = 0;
            t = 1;
        }
        $platform.reportButton("ExitPage", "backToGameBtn", e, t);
        $platform.showBannerAD(!1);
        $commonData.default.isPause = !1;
        $uIManager.default.instance.showExitPnl(!1);
    };
    t.prototype.onLoad = function () {
        if (s.currentPlatform == s.platformEnum.wechat) {
            this.node.getChildByName("bg").getChildByName("tt").active = !1;
            this.node.getChildByName("bg").getChildByName("wx").active = !0;
        } else {
            this.node.getChildByName("bg").getChildByName("tt").active = !0;
            this.node.getChildByName("bg").getChildByName("wx").active = !1;
        }
    };
    return __decorate([l], t);
})(cc.Component);
exports.default = h;
