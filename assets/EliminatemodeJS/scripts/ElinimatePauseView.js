var o;
var $eliminateManager = require("./EliminateManager");
var $platform = require("../../scripts/platform");
var $commonData = require("../../scripts/commonData");
var l = cc._decorator;
var s = l.ccclass;
var d =
    (l.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        __extends(t, e);
        t.prototype.onEnable = function () {
            $eliminateManager.default.instance.pauseGame();
        };
        t.prototype.clickAddTime = function () {
            var e = this;
            $platform.reportButton("setPage", "addTimeBtn_video", $commonData.default.currLevel, 1, 1);
            $platform.showRewardAD(function () {
                $platform.reportButton("setPage", "addTimeBtn_video_success", $commonData.default.currLevel, 1, 2);
                $eliminateManager.default.instance.addTime(60);
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
            $eliminateManager.default.instance.showUI(this.node, !1);
            $eliminateManager.default.instance.resumeGame();
            $platform.showBannerAD(!1);
        };
        t.prototype.closeGame = function () {
            $eliminateManager.default.instance.showUI($eliminateManager.default.instance.ExitPnl);
            $eliminateManager.default.instance.showUI(this.node, !1);
            $commonData.default.isgameing = !1;
        };
        t.prototype.clickquieGame = function () {
            $platform.reportButton("ExitPage", "exitGameBtn", $commonData.default.currLevel, 1);
            cc.director.getCollisionManager().enabled = !1;
            cc.director.loadScene("Game");
        };
        t.prototype.clickback = function () {
            $platform.reportButton("ExitPage", "backToGameBtn", $commonData.default.currLevel, 1);
            $platform.showBannerAD(!1);
            $commonData.default.isgameing = !0;
            $eliminateManager.default.instance.resumeGame();
            $eliminateManager.default.instance.showUI($eliminateManager.default.instance.ExitPnl, !1);
        };
        t.prototype.clickReplay = function () {
            $platform.reportButton("ExitPage", "backToGameBtn", $commonData.default.currLevel, 1);
            $platform.showBannerAD(!1);
            $commonData.default.isgameing = !0;
            $eliminateManager.default.instance.showUI(this.node, !1);
            $eliminateManager.default.instance.GameInit();
        };
        return __decorate([s], t);
    })(cc.Component));
exports.default = d;
