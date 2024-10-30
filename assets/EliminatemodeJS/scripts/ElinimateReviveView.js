var o;
var r = cc._decorator;
var a = r.ccclass;
var c = (r.property, require("./EliminateManager"));
var $platform = require("../../scripts/platform");
var $commonData = require("../../scripts/commonData");
var d = (function (e) {
    function t() {
        return (null !== e && e.apply(this, arguments)) || this;
    }
    __extends(t, e);
    t.prototype.closeRevivePnl = function () {
        c.default.instance.showUI(this.node, !1);
        c.default.instance.endGame(!1);
    };
    t.prototype.clickAddTime = function () {
        var e = this;
        $platform.reportButton("addTimePage", "addTimeBtn_video", $commonData.default.currLevel, 1, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("addTimePage", "addTimeBtn_video_success", $commonData.default.currLevel, 1, 2);
            c.default.instance.reviveAddTime();
            c.default.instance.showUI(e.node, !1);
            c.default.instance.resumeGame();
        });
    };
    return __decorate([a], t);
})(cc.Component);
exports.default = d;
