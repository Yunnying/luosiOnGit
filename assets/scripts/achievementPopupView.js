var a;
var $commonData = require("./commonData");
var $platform = require("./platform");
var $uIManager = require("./UIManager");
var u = cc._decorator;
var d = u.ccclass;
var f = u.property;
var p = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.popUp = null;
        t.mask = null;
        t.medalSprite = [];
        t.clickNum = 0;
        t.AchieveIndex = -1;
        t.isshowNext = !1;
        t.goalName = ["初出茅庐", "拆板能手", "螺丝专家", "锤子大师"];
        return t;
    }
    __extends(t, e);
    t.prototype.start = function () {
        this.node.width = $commonData.default.windowWidth;
        this.node.height = $commonData.default.windowHeight;
        this.mask.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.mask._touchListener.setSwallowTouches(!1);
    };
    t.prototype.onEnable = function () {
        var e = this;
        this.AchieveIndex = $commonData.default.AchievementData.achievementGoal.indexOf(
            $commonData.default.currLevel - 1
        );
        if ($commonData.default.isShowAchievement) {
            this.AchieveIndex = 0;
            this.isshowNext = !0;
            $commonData.default.isShowAchievement = !1;
        }
        this.scheduleOnce(function () {
            e.showAchievement();
        });
        this.popUp.x = -$commonData.default.windowWidth;
    };
    t.prototype.showAchievement = function () {
        var e = this;
        this.init();
        var t = cc.moveTo(0.4, cc.v2(-$commonData.default.windowWidth / 2, 360));
        cc.tween(this.popUp).then(t).start();
        this.scheduleOnce(function () {
            e.closePopup();
        }, 10);
    };
    t.prototype.init = function () {
        $platform.reportPage("achieveMentPopupPage", $commonData.default.currLevel);
        var e = $commonData.default.AchievementData.achievementGoal[this.AchieveIndex];
        this.popUp.getChildByName("medal").getComponent(cc.Sprite).spriteFrame = this.medalSprite[this.AchieveIndex];
        this.popUp.getChildByName("name").getComponent(cc.Label).string = this.goalName[this.AchieveIndex];
        this.popUp.getChildByName("describe").getComponent(cc.Label).string = "通关" + e + "个关卡";
        this.popUp.getChildByName("progress").children[1].getComponent(cc.Label).string = e + "/" + e;
        this.clickNum = 0;
    };
    t.prototype.onTouchStart = function (e) {
        if (this.isClickInsidePopup(e.getLocation())) {
            this.clickAchievementPopup();
        } else {
            this.clickNum++;
            this.clickNum >= 2 && (this.closePopup(), (this.clickNum = 0));
        }
    };
    t.prototype.isClickInsidePopup = function (e) {
        var t = this.popUp.convertToNodeSpaceAR(e);
        return this.popUp.getBoundingBox().contains(t);
    };
    t.prototype.clickAchievementPopup = function () {
        var e = $commonData.default.currLevel;
        if (0 == $commonData.default.isgameing) {
            e = 0;
        }
        $platform.reportButton("achieveMentPopupPage", "achieveMentPopup", e, 0);
        this.isshowNext = !1;
        this.showAchievementPnl();
        this.closePopup();
    };
    t.prototype.closePopup = function () {
        var e = this;
        var t = cc.moveTo(0.2, cc.v2(-$commonData.default.windowWidth, 360));
        var n = !1;
        if (
            this.AchieveIndex + 1 < $commonData.default.AchievementData.achievementGoal.length &&
            $commonData.default.AchievementData.achievementGoal[this.AchieveIndex + 1] <= $commonData.default.passLevel
        ) {
            n = !0;
            this.AchieveIndex++;
        }
        cc.tween(this.popUp)
            .then(t)
            .call(function () {
                if (n && e.isshowNext) {
                    e.showAchievement();
                } else {
                    e.node.active = !1;
                }
            })
            .start();
    };
    t.prototype.showAchievementPnl = function () {
        $uIManager.default.instance.showAchievementPnl(!0);
        var e = $commonData.default.currLevel;
        if (0 == $commonData.default.isgameing) {
            e = 0;
        }
        $platform.reportPage("achievememtPage", e);
    };
    __decorate([f(cc.Node)], t.prototype, "popUp", void 0);
    __decorate([f(cc.Node)], t.prototype, "mask", void 0);
    __decorate([f(cc.SpriteFrame)], t.prototype, "medalSprite", void 0);
    return __decorate([d], t);
})(cc.Component);
exports.default = p;
