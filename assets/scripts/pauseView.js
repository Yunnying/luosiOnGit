var a;
var r = cc._decorator;
var l = r.ccclass;
var s = r.property;
var $commonData = require("./commonData");
var $gameManager = require("./GameManager");
var $platform = require("./platform");
var $uIManager = require("./UIManager");
var h = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.Btn = [];
        return t;
    }
    __extends(t, e);
    t.prototype.onEnable = function () {
        if (
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE ||
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL ||
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL
        ) {
            this.Btn[2].active = !1;
            this.Btn[3].active = !1;
            this.Btn[4].active = !0;
        } else {
            this.Btn[2].active = !0;
            this.Btn[3].active = !0;
            this.Btn[4].active = !1;
        }
    };
    t.prototype.clickAddTime = function () {
        var e = this;
        $platform.reportButton("setPage", "addTimeBtn_video", $commonData.default.currLevel, 1, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("setPage", "addTimeBtn_video_success", $commonData.default.currLevel, 1, 2);
            $commonData.default.gameTime += 60;
            e.closePausePnl();
        });
    };
    t.prototype.clickhelp = function () {
        $platform.reportButton("setPage", "shareBtn", $commonData.default.currLevel, 1, 3);
        $platform.showShare(
            function () {
                $platform.reportButton("setPage", "shareBtn_success", $commonData.default.currLevel, 1, 4);
            },
            null,
            2
        );
    };
    t.prototype.closePausePnl = function () {
        console.log("--------close pause Pnl");
        $platform.reportButton("setPage", "closeSetBtn", $commonData.default.currLevel, 1);
        $platform.showBannerAD(!1);
        $uIManager.default.instance.showPausePnl(!1);
        $commonData.default.isPause = !1;
    };
    t.prototype.closeGame = function () {
        var e = $commonData.default.currLevel;
        if (0 == $commonData.default.isgameing) {
            e = 0;
        }
        $platform.reportButton("setPage", "exitGameBtn", e, 1);
        $platform.reportPage("ExitPage", e);
        $uIManager.default.instance.showExitPnl(!0);
        this.closePausePnl();
        $commonData.default.isPause = !0;
    };
    t.prototype.rePlay = function () {
        $gameManager.default.instance.reset();
        $platform.showBannerAD(!1);
        $commonData.default.isgameing = !0;
        $gameManager.default.instance.startClock();
        this.closePausePnl();
    };
    __decorate([s(cc.Node)], t.prototype, "Btn", void 0);
    return __decorate([l], t);
})(cc.Component);
exports.default = h;
