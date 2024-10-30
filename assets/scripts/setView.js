var a;
var $battleManager = require("./BattleManager");
var $commonData = require("./commonData");
var s = (require("./GameManager"), require("./platform"));
var $topView = require("./topView");
var $startView = require("./startView");
var $postUserData = require("./PostUserData");
var $game = require("./Game");
var $localStorage = require("./localStorage");
var m = cc._decorator;
var g = m.ccclass;
var v = m.property;
var w = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.swithBgImg = [];
        t.Sound = null;
        t.Music = null;
        t.Vibe = null;
        t.exitPnl = null;
        t.closeBtn = null;
        t.reSetPnl = null;
        t.tip1 = null;
        t.tip2 = null;
        t.confirmBtn1 = null;
        t.confirmBtn2 = null;
        t.edibox = null;
        t.testCount = 0;
        t.count = 0;
        return t;
    }
    __extends(t, e);
    t.prototype.start = function () {
        if (this.reSetPnl) {
            this.reSetPnl.active = !1;
        }
    };
    t.prototype.onEnable = function () {
        this.count = 0;
        this.showOpenid();
        $startView.default.instance.showGameClubBtn(!1);
        s.showBannerAD();
        $commonData.default.isPause = !0;
        if (this.closeBtn) {
            this.closeBtn.active = !0;
        }
        var e = 0;
        if (1 == $commonData.default.isgameing) {
            if (this.closeBtn) {
                this.closeBtn.active = !1;
            }
            e = $commonData.default.currLevel;
        }
        this.updateSet();
        $battleManager.default.instance.playSetSound();
        this.node.getChildByName("bg").getComponent(cc.Animation).play("appear");
        s.reportPage("setPage", e);
    };
    t.prototype.onDisable = function () {
        $startView.default.instance.showGameClubBtn(!0);
        this.testCount = 0;
    };
    t.prototype.clickSoundNode = function () {};
    t.prototype.showOpenid = function () {
        if (this.edibox) {
            this.edibox.node.active = !0;
            this.edibox.string = $commonData.default.openId;
        }
    };
    t.prototype.hideEdibox = function () {
        if (this.edibox) {
            this.edibox.node.active = !1;
        }
    };
    t.prototype.updateSet = function () {
        if ($commonData.default.musicOn) {
            $battleManager.default.instance.playGroundMusic();
        } else {
            $battleManager.default.instance.stopGroundMusic();
        }
        console.log("====", $commonData.default.musicOn);
        var e = this.Sound.getChildByName("swithbg");
        e.getComponent(cc.Sprite).spriteFrame = this.swithBgImg[1 == $commonData.default.soundOn ? 1 : 0];
        if (1 == $commonData.default.soundOn) {
            e.getChildByName("switch").x = 60;
        } else {
            e.getChildByName("switch").x = -60;
        }
        (e = this.Music.getChildByName("swithbg")).getComponent(cc.Sprite).spriteFrame =
            this.swithBgImg[1 == $commonData.default.musicOn ? 1 : 0];
        if (1 == $commonData.default.musicOn) {
            e.getChildByName("switch").x = 60;
        } else {
            e.getChildByName("switch").x = -60;
        }
        (e = this.Vibe.getChildByName("swithbg")).getComponent(cc.Sprite).spriteFrame =
            this.swithBgImg[1 == $commonData.default.vibrateOn ? 1 : 0];
        if (1 == $commonData.default.vibrateOn) {
            e.getChildByName("switch").x = 60;
        } else {
            e.getChildByName("switch").x = -60;
        }
    };
    t.prototype.switchCallback = function (e, t) {
        var n = $commonData.default.currLevel;
        if (0 == $commonData.default.isgameing) {
            n = 0;
        }
        if (0 == t) {
            $commonData.default.soundOn = !$commonData.default.soundOn;
            cc.sys.localStorage.setItem("sound", $commonData.default.soundOn + "");
            s.reportButton("setPage", "changeSoundBtn_" + $commonData.default.soundOn, n);
        } else {
            1 == t
                ? (($commonData.default.musicOn = !$commonData.default.musicOn),
                  cc.sys.localStorage.setItem("music", $commonData.default.musicOn + ""),
                  s.reportButton("setPage", "changeMusicBtn_" + $commonData.default.musicOn, n))
                : (($commonData.default.vibrateOn = !$commonData.default.vibrateOn),
                  cc.sys.localStorage.setItem("vibe", $commonData.default.vibrateOn + ""),
                  s.reportButton("setPage", "changeVibrateBtn_" + $commonData.default.vibrateOn, n));
        }
        this.updateSet();
    };
    t.prototype.closeSetPnl = function () {
        var e = this;
        var t = $commonData.default.currLevel;
        if (0 == $commonData.default.isgameing) {
            t = 0;
        }
        s.reportButton("setPage", "closeSetBtn", t, 0);
        s.showBannerAD(!1);
        this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.node.active = !1;
        }, 0.2);
        $commonData.default.isPause = !1;
    };
    t.prototype.closeGame = function () {};
    t.prototype.clickquieGame = function () {};
    t.prototype.clickback = function () {};
    t.prototype.clickAddTime = function () {
        var e = this;
        s.reportButton("setPage", "addTimeBtn_video", $commonData.default.currLevel, 1);
        s.showRewardAD(function () {
            s.reportButton("setPage", "addTimeBtn_video_success", $commonData.default.currLevel, 2);
            $commonData.default.gameTime += 60;
            e.closePausePnl();
        });
    };
    t.prototype.clickhelp = function () {
        s.reportButton("setPage", "shareBtn", $commonData.default.currLevel, 1);
        s.showShare();
    };
    t.prototype.closePausePnl = function () {
        $topView.default.instance.closePausePnl();
    };
    t.prototype.showResetPnl = function () {
        this.reSetPnl.active = !0;
        this.reSetPnl.getChildByName("bg").getComponent(cc.Animation).play("appear");
        this.tip1.active = !0;
        this.tip2.active = !1;
        this.confirmBtn1.active = !0;
        this.confirmBtn2.active = !1;
    };
    t.prototype.closeRestPnl = function () {
        var e = this;
        this.reSetPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.reSetPnl.active = !1;
        }, 0.2);
    };
    t.prototype.clickRest = function () {
        this.tip1.active = !1;
        this.tip2.active = !0;
        this.confirmBtn1.active = !1;
        this.confirmBtn2.active = !0;
    };
    t.prototype.confirmRest = function () {
        cc.sys.localStorage.setItem("currentLevel", 1);
        cc.sys.localStorage.setItem("firstgame", "no");
        if ($commonData.default.shopCollect) {
            $commonData.default.shopCollect.createItems();
        }
        if ("" != $commonData.default.openId) {
            $postUserData.seletPostUserData(["level"]);
        }
        $localStorage.default.setLocalItem("secondDisPlay", !0);
        $game.default.apiPlatform.showTips("已重置主线关卡进度");
    };
    t.prototype.clickVibe = function () {
        this.testCount++;
        if (this.testCount >= 30) {
            console.log("开启作弊");
            $battleManager.default.instance.changeTestMode();
            s.changeIsAd();
            this.testCount = 0;
        }
    };
    __decorate([v(cc.SpriteFrame)], t.prototype, "swithBgImg", void 0);
    __decorate([v(cc.Node)], t.prototype, "Sound", void 0);
    __decorate([v(cc.Node)], t.prototype, "Music", void 0);
    __decorate([v(cc.Node)], t.prototype, "Vibe", void 0);
    __decorate([v(cc.Node)], t.prototype, "exitPnl", void 0);
    __decorate([v(cc.Node)], t.prototype, "closeBtn", void 0);
    __decorate([v(cc.Node)], t.prototype, "reSetPnl", void 0);
    __decorate([v(cc.Node)], t.prototype, "tip1", void 0);
    __decorate([v(cc.Node)], t.prototype, "tip2", void 0);
    __decorate([v(cc.Node)], t.prototype, "confirmBtn1", void 0);
    __decorate([v(cc.Node)], t.prototype, "confirmBtn2", void 0);
    __decorate([v(cc.EditBox)], t.prototype, "edibox", void 0);
    return __decorate([g], t);
})(cc.Component);
exports.default = w;
