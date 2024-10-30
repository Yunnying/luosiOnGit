var a;
exports.ENUM_ITEM_STATUS = void 0;
var r;
var $commonData = require("./commonData");
var $gameManager = require("./GameManager");
var $platform = require("./platform");
var $config = require("./config");
var $battleManager = require("./BattleManager");
var $graphicalGameLevel = require("./GraphicalGameLevel");
var $localStorage = require("./localStorage");
var m = cc._decorator;
var g = m.ccclass;
m.property;
(function (e) {
    e.DIG = "unlock";
    e.WITHDREW = "withdraw";
    e.RESET = "reset";
    e.PULLOUT = "pullout";
    e.UNSCREW = "unscrew";
    e.PASS = "pass";
    e.NONE = "none";
})((r = exports.ENUM_ITEM_STATUS || (exports.ENUM_ITEM_STATUS = {})));
var v = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.itemState = r.NONE;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.clickUnscrew = function () {
        this.itemState = r.UNSCREW;
        this.clickGet();
    };
    t.prototype.clickPass = function () {
        this.itemState = r.PASS;
        this.clickGet();
    };
    t.prototype.clickReset = function () {
        this.itemState = r.RESET;
        this.clickGet();
    };
    t.prototype.clickDigHole = function () {
        if ($commonData.default.isUnLock) {
            $platform.showTips("已经打过孔了哦");
        } else {
            this.itemState = r.DIG;
            this.clickGet();
        }
    };
    t.prototype.clickDigHole_video = function () {
        var e = this;
        $platform.reportButton("GamePage", "unlockBtn_video", $commonData.default.currLevel, 1, 1);
        if ($commonData.default.isUnLock) {
            $platform.showTips("已经打过孔了哦");
        } else {
            this.itemState = r.DIG;
            $platform.showRewardAD(function () {
                e.clickGetRecall();
                $platform.reportButton("GamePage", "unlockBtn_video_success", $commonData.default.currLevel, 1, 2);
            }, this);
        }
    };
    t.prototype.clickWithdrew = function () {
        var e = $commonData.default.gamelevel.cloneNode;
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
            e = $graphicalGameLevel.default.instance.cloneNode;
        }
        if (null == e || $commonData.default.useItemNum[1] >= 3) {
            $platform.showTips("现在无法撤回哦");
        } else {
            this.itemState = r.WITHDREW;
            this.clickGet();
        }
    };
    t.prototype.clickPullOut = function () {
        if ($commonData.default.screwNum <= 0) {
            $platform.showTips("没有螺丝了！");
        } else {
            this.itemState = r.PULLOUT;
            this.clickGet();
        }
    };
    t.prototype.clickGiveUp = function () {};
    t.prototype.showAnswer = function () {};
    t.prototype.clickGet = function () {
        var e = this;
        if ($commonData.default.isShareUseProp && $config.currentPlatform == $config.platformEnum.wechat) {
            $platform.reportButton("GamePage", this.itemState + "Btn_share", $commonData.default.currLevel, 1, 3);
            $platform.showShare2(function () {
                e.clickGetRecall();
                $commonData.default.shareUseProp++;
                $gameManager.default.instance.changeUseItemMethod(0);
                $platform.reportButton(
                    "GamePage",
                    e.itemState + "Btn_share_success",
                    $commonData.default.currLevel,
                    1,
                    4
                );
            });
        } else {
            $platform.reportButton("GamePage", this.itemState + "Btn_video", $commonData.default.currLevel, 1, 1);
            $platform.showRewardAD(function () {
                $commonData.default.watchVideoTimes++;
                if (1 == $commonData.default.watchVideoTimes) {
                    $gameManager.default.instance.changeUseItemMethod(1);
                    $commonData.default.watchVideoTimes = 0;
                }
                $platform.reportButton(
                    "GamePage",
                    e.itemState + "Btn_video_success",
                    $commonData.default.currLevel,
                    1,
                    2
                );
                e.clickGetRecall();
            }, this);
        }
    };
    t.prototype.clickGetRecall = function () {
        switch (this.itemState) {
            case r.DIG:
                $commonData.default.gamelevel.unLock();
                $battleManager.default.instance.playDigSound();
                break;
            case r.WITHDREW:
                if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
                    $graphicalGameLevel.default.instance.withDrew();
                } else {
                    $commonData.default.gamelevel.withDrew();
                }
                $gameManager.default.instance.playVibe();
                $platform.showTips("撤回成功！");
                break;
            case r.RESET:
                $commonData.default.useItemNum[2]++;
                $gameManager.default.instance.reset();
                $gameManager.default.instance.playVibe();
                $platform.showTips("重置成功！");
                break;
            case r.PULLOUT:
                $platform.showTips("选择一个螺丝点击删除");
                $commonData.default.isPullOut = !0;
                break;
            case r.UNSCREW:
                $platform.showTips("点击螺母解锁吧！");
                $commonData.default.Unscrew_isUnlock = !0;
                break;
            case r.PASS:
                $platform.showTips("已跳过本关");
                $localStorage.default.setLocalItem("normalFailNum", 0);
                $gameManager.default.instance.clickNextLevel();
        }
    };
    t.instance = null;
    return (n = __decorate([g], t));
})(cc.Component);
exports.default = v;
