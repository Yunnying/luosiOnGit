var a;
var $battleManager = require("./BattleManager");
var $commonData = require("./commonData");
var $postUserData = require("./PostUserData");
var $platform = require("./platform");
var $getSkinView = require("./getSkinView");
var $uIManager = require("./UIManager");
//var $showScrewView = require("./showScrewView");
var h = cc._decorator;
var m = h.ccclass;
var g = h.property;
var v = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.achievementLabel = null;
        t.progressArr = [];
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.start = function () {
        $uIManager.default.instance.loadShowScrewPnl();
    };
    t.prototype.onEnable = function () {
        this.init();
    };
    t.prototype.init = function () {
        this.achievementLabel.string = "已完成成就:" + this.getNumberOfAchievements() + "/4";
        for (var e = 0; e < this.progressArr.length; e++) {
            var t;
            if ($commonData.default.passLevel < $commonData.default.AchievementData.achievementGoal[e]) {
                t = $commonData.default.passLevel;
            } else {
                t = $commonData.default.AchievementData.achievementGoal[e];
            }
            this.progressArr[e].getChildByName("tip").getComponent(cc.Label).string =
                t + "/" + $commonData.default.AchievementData.achievementGoal[e];
            this.progressArr[e].getChildByName("mask").width =
                (t / $commonData.default.AchievementData.achievementGoal[e]) * 212;
        }
    };
    t.prototype.getNumberOfAchievements = function () {
        var e = 0;
        for (var t = 0; t < $commonData.default.AchievementData.achievementGoal.length; t++) {
            if ($commonData.default.passLevel >= $commonData.default.AchievementData.achievementGoal[t]) {
                e++;
            }
        }
        return e;
    };
    t.prototype.clickclose = function () {
        var e = this;
        var t = $commonData.default.currLevel;
        if (0 == $commonData.default.isgameing) {
            t = 0;
        }
        $platform.reportButton("achievementPage", "closeBtn", t, 0);
        this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.node.active = !1;
        }, 0.2);
    };
    t.prototype.clickGetReward = function (e, t) {
        if (this.getNumberOfAchievements() + 7 < t) {
          //  $showScrewView.default.instance.showScrewSkin(t, "达成成就即可解锁该皮肤！");
        } else {
            if (1 != $commonData.default.screwSkinData.skinData[t]) {
                var n = $commonData.default.currLevel;
                if (0 == $commonData.default.isgameing) {
                    n = 0;
                }
                $platform.reportButton("achievementPage", "getRewardBtn_" + t, n, 0);
                $commonData.default.screwSkinData.skinData[t] = 1;
                $battleManager.default.instance.setArrData("screwSkinData");
                if ("" != $commonData.default.openId) {
                    $postUserData.seletPostUserData(["little_man_skin"]);
                }
                $getSkinView.default.instance.initScrewSkinAni(t);
                $getSkinView.default.instance.showGetSkinView();
            } else {
                $platform.showTips("已获得该皮肤");
            }
        }
    };
    t.instance = null;
    __decorate([g(cc.Label)], t.prototype, "achievementLabel", void 0);
    __decorate([g(cc.Node)], t.prototype, "progressArr", void 0);
    return (n = __decorate([m], t));
})(cc.Component);
exports.default = v;
