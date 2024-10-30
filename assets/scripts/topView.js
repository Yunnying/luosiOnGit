var a;
var $commonData = require("./commonData");
var $uIManager = require("./UIManager");
var $platform = require("./platform");
var $postUserData = require("./PostUserData");
var $battleManager = require("./BattleManager");
var f = cc._decorator;
var p = f.ccclass;
var h = f.property;
var m = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.goldLabel = null;
        t.setBtn = null;
        t.PausePnl = null;
        t.bgNode = null;
        t.bgImg = [];
        t.pauseBtn = null;
        t.bgIndex = 0;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onLoad = function () {
        this.goldLabel.string = $commonData.default.goldNum + "";
        cc.director.on("Gold_Change",this.changeGoldNum ,this);
    };
    t.prototype.clickSetBtn = function () {
        var e = $commonData.default.currLevel;
        if (0 == $commonData.default.isgameing) {
            e = 0;
        }
        $platform.reportButton("StartPage", "setBtn", e);
        $uIManager.default.instance.showSetPnl(!0);
    };
    t.prototype.clickPauseBtn = function () {
        $platform.reportButton("StartPage", "pauseBtn", $commonData.default.currLevel, 1);
        console.error("commonData.GameMode======>", $commonData.default.GameMode);
        if (
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.COMPETITION ||
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.ELIMINATE
        ) {
            console.log("-----------hi?");
            this.PausePnl.active = !0;
            this.PausePnl.getChildByName("bg").getComponent(cc.Animation).play("appear");
        } else {
            $uIManager.default.instance.showPausePnl(!0);
        }
        $commonData.default.isPause = !0;
    };
    t.prototype.changeGoldNum = function () {
        this.goldLabel.string = $commonData.default.goldNum + "";
        if ("" != $commonData.default.openId) {
            $postUserData.seletPostUserData(["coin"]);
        }
        cc.sys.localStorage.setItem("goldNum", $commonData.default.goldNum);
    };
    t.prototype.changeSetBtn = function () {
        if ($commonData.default.isgameing) {
            this.setBtn.active = !1;
            this.pauseBtn.active = !0;
        } else {
            this.setBtn.active = !0;
            this.pauseBtn.active = !1;
        }
    };
    t.prototype.closePausePnl = function () {
        var e = this;
        console.log("--------close pause Pnl!!!!!");
        $platform.reportButton("setPage", "closeSetBtn", $commonData.default.currLevel, 1);
        $platform.showBannerAD(!1);
        this.PausePnl.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.PausePnl.active = !1;
        }, 0.2);
        $commonData.default.isPause = !1;
    };
    t.prototype.clickChangeBG = function () {
        switch (this.bgIndex) {
            case 0:
                this.bgNode.getComponent(cc.Sprite).spriteFrame = this.bgImg[1];
                this.bgIndex = 1;
                break;
            case 1:
                this.bgNode.color = cc.color(195, 184, 165);
                this.bgIndex = 2;
                break;
            case 2:
                this.bgNode.color = cc.color(178, 178, 178);
                this.bgIndex = 3;
                break;
            case 3:
                this.bgNode.color = cc.color(137, 178, 178);
                this.bgIndex = 4;
                break;
            case 4:
                this.bgNode.color = cc.color(255, 255, 255);
                this.bgIndex = 5;
                break;
            case 5:
                this.bgNode.color = cc.color(208, 203, 200);
                this.bgIndex = 6;
                break;
            case 6:
                this.bgNode.color = cc.color(190, 239, 247);
                this.bgIndex = 7;
                break;
            case 7:
                this.bgNode.color = cc.color(177, 166, 166);
                this.bgIndex = 8;
                break;
            case 8:
                this.bgNode.color = cc.color(169, 196, 249);
                this.bgIndex = 9;
                break;
            case 9:
                this.bgNode.getComponent(cc.Sprite).spriteFrame = this.bgImg[0];
                this.bgNode.color = cc.color(255, 255, 255);
                this.bgIndex = 0;
        }
    };
    t.prototype.clickgold = function () {
       
        if ($battleManager.isTestMode) {
            $commonData.default.goldNum += 1e3;
            this.changeGoldNum();
        }
    };
    t.instance = null;
    __decorate([h(cc.Label)], t.prototype, "goldLabel", void 0);
    __decorate([h(cc.Node)], t.prototype, "setBtn", void 0);
    __decorate([h(cc.Node)], t.prototype, "PausePnl", void 0);
    __decorate([h(cc.Node)], t.prototype, "bgNode", void 0);
    __decorate([h(cc.SpriteFrame)], t.prototype, "bgImg", void 0);
    __decorate([h(cc.Node)], t.prototype, "pauseBtn", void 0);
    return (n = __decorate([p], t));
})(cc.Component);
exports.default = m;
