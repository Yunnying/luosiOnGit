var a;
var $battleManager = require("./BattleManager");
var $commonData = require("./commonData");
var $uIManager = require("./UIManager");
var $newSkinView = require("./newSkinView");
var $platform = require("./platform");
var $config = require("./config");
var $getSkinView = require("./getSkinView");
var $topView = require("./topView");
var $startView = require("./startView");
var g = cc._decorator;
var v = g.ccclass;
var w = g.property;
var y = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.screwSkinNode = null;
        t.bgSkinNode = null;
        t.nailSkinNode = null;
        t.screwSkinSprite = null;
        t.tipsLabel = null;
        t.BtnNode = [];
        t.skinVideoNode = [];
        t.goldNum = 0;
        t.skinIndex = 0;
        t.buySkinType = "";
        t.getSkinType = "";
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.initBtnNode = function () {
        console.error("不该来的位置")
        return
        this.BtnNode.forEach(function (e) {
            e.active = !1;
        });
    };
    t.prototype.showScrewSkin = function (e, t) {
        console.error("不该来的位置")
        
        return
        this.initBtnNode();
        this.screwSkinNode.active = !0;
        this.bgSkinNode.active = !1;
        this.nailSkinNode.active = !1;
        if (17 == e && 0 == $commonData.default.screwSkinData.skinData[17]) {
            this.BtnNode[0].active = !0;
        } else {
            this.BtnNode[0].active = !1;
        }
        this.screwSkinNode.children[0].getComponent(cc.Label).string =
            $commonData.default.screwSkinData.describe[e].skinName;
        this.screwSkinNode.children[1].getComponent(cc.Label).string =
            $commonData.default.screwSkinData.describe[e].text;
        this.tipsLabel.node.active = !0;
        this.tipsLabel.string = t;
        this.screwSkinSprite.spriteFrame = $newSkinView.default.instance.screwSkinImg[e];
        $uIManager.default.instance.showShowScrewPnl(!0);
        this.buySkinType = "screw";
        this.skinIndex = e;
        console.log(
            "==========>>unlock type",
            $commonData.default.screwSkinData.describe[e].unlockType,
            $commonData.default.screwSkinData.describe[e].unlockValue
        );
        this.getSkinType = $commonData.default.screwSkinData.describe[e].unlockType;
        switch (this.getSkinType) {
            case "level":
                this.BtnNode[4].active = !0;
                break;
            case "achv":
                this.BtnNode[3].active = !0;
                break;
            case "coin":
                this.BtnNode[2].active = !0;
                this.BtnNode[2].children[0].getComponent(cc.Label).string =
                    "x" + $commonData.default.screwSkinData.describe[e].unlockValue;
                this.goldNum = $commonData.default.screwSkinData.describe[e].unlockValue;
                break;
            case "share":
            case "sign":
                this.BtnNode[4].active = !0;
                break;
            case "ad":
                this.BtnNode[1].active = !0;
                this.BtnNode[1].children[0].getComponent(cc.Label).string = $commonData.default.watchNailSkinTimes + "";
                this.BtnNode[1].children[1].getComponent(cc.Label).string =
                    "/" + $commonData.default.screwSkinData.describe[e].unlockValue;
                this.BtnNode[1].children[2].getComponent(cc.Label).string =
                    "累计观看" + $commonData.default.screwSkinData.describe[e].unlockValue + "次任意广告即可获取";
        }
    };
    t.prototype.showBgSkin = function (e) {
        console.error("不该来的位置")
        return
        this.initBtnNode();
        this.screwSkinNode.active = !1;
        this.bgSkinNode.active = !0;
        this.nailSkinNode.active = !1;
        switch ($commonData.default.bgSkinData[e].type) {
            case "img":
                this.bgSkinNode.children[1].children[0].getComponent(cc.Sprite).spriteFrame =
                    $newSkinView.default.instance.bgSkinImg[$commonData.default.bgSkinData[e].imgIndex];
                this.bgSkinNode.children[1].children[0].color = cc.color(255, 255, 255);
                break;
            case "color":
                this.bgSkinNode.children[1].children[0].getComponent(cc.Sprite).spriteFrame =
                    $newSkinView.default.instance.bgSkinImg[1];
                var t = $commonData.default.bgSkinData[e].color;
                this.bgSkinNode.children[1].children[0].color = cc.color(t[0], t[1], t[2]);
        }
        this.bgSkinNode.children[1].children[0].width = 140;
        this.bgSkinNode.children[1].children[0].height = 150;
        this.skinIndex = e;
        this.tipsLabel.node.active = !1;
        if ("coin" == $commonData.default.bgSkinData[e].unlockType) {
            this.BtnNode[2].active = !0;
            this.BtnNode[2].children[0].getComponent(cc.Label).string =
                "x" + $commonData.default.bgSkinData[e].unlockValue;
            this.goldNum = $commonData.default.bgSkinData[e].unlockValue;
        }
        this.buySkinType = "bg";
        $uIManager.default.instance.showShowScrewPnl(!0);
    };
    t.prototype.showNailSkin = function (e) {
        console.error("不该来的位置")
        return
        this.initBtnNode();
        this.screwSkinNode.active = !1;
        this.bgSkinNode.active = !1;
        this.nailSkinNode.active = !0;
        this.nailSkinNode.children[0].getComponent(cc.Sprite).spriteFrame =
            $newSkinView.default.instance.nailSkinImg[e];
        this.nailSkinNode.children[0].width = 77;
        this.nailSkinNode.children[0].height = 77;
        this.skinIndex = e;
        this.buySkinType = "nail";
        this.tipsLabel.node.active = !1;
        if ("coin" == $commonData.default.nailSkinData[e].unlockType) {
            this.BtnNode[2].active = !0;
            this.BtnNode[2].children[0].getComponent(cc.Label).string =
                "x" + $commonData.default.nailSkinData[e].unlockValue;
            this.goldNum = $commonData.default.nailSkinData[e].unlockValue;
        } else {
            if ("ad" == $commonData.default.nailSkinData[e].unlockType) {
                this.BtnNode[1].active = !0;
                this.BtnNode[1].children[0].getComponent(cc.Label).string = $commonData.default.watchNailSkinTimes + "";
                this.BtnNode[1].children[1].getComponent(cc.Label).string =
                    "/" + $commonData.default.nailSkinData[e].unlockValue;
                this.BtnNode[1].children[2].getComponent(cc.Label).string =
                    "累计观看" + $commonData.default.nailSkinData[e].unlockValue + "次任意广告即可获取";
            }
        }
        $uIManager.default.instance.showShowScrewPnl(!0);
    };
    t.prototype.initSkipVideoNode = function () {
        console.error("不该来的位置")
        return
        console.log("commonData.skinVideoCoupon===========>", $commonData.default.skinVideoCoupon);
        if ($commonData.default.skinVideoCoupon > 0) {
            this.skinVideoNode.forEach(function (e) {
                e.active = !0;
                console.log(e);
            });
        } else {
            this.skinVideoNode.forEach(function (e) {
                e.active = !1;
            });
        }
    };
    t.prototype.clickClose = function () {
        console.error("不该来的位置")
        return
        $platform.reportButton("showSkinPage", "closeBtn");
        $uIManager.default.instance.showShowScrewPnl(!1);
    };
    t.prototype.clickGoGzhPnl = function () {
        console.error("不该来的位置")
        return
        $platform.reportButton("showSkinPage", "gzhBtn");
        $uIManager.default.instance.showSkinPnl(!1);
        $uIManager.default.instance.showShowScrewPnl(!1);
    };
    t.prototype.clickBuy = function () {
        console.error("不该来的位置")
        return
        console.log("==============>>buy", this.skinIndex, this.goldNum, this.buySkinType);
        if ($commonData.default.goldNum < this.goldNum) {
            $platform.showTips("金币不足!");
        } else {
            $platform.reportButton("showSkinPage", this.buySkinType + "_buyBtn");
            $commonData.default.goldNum -= this.goldNum;
            $topView.default.instance.changeGoldNum();
            this.node.active = !1;
            "nail" == this.buySkinType
                ? ($getSkinView.default.instance.initGetNailSkin(this.skinIndex),
                  $newSkinView.default.instance.initNailView(),
                  $battleManager.default.instance.setArrData("nailSkinData"))
                : "bg" == this.buySkinType
                ? ($getSkinView.default.instance.initGetBgSkin(this.skinIndex),
                  $newSkinView.default.instance.initbgView(),
                  $battleManager.default.instance.setArrData("bgSkinData"))
                : "screw" == this.buySkinType &&
                  ($getSkinView.default.instance.initScrewSkinAni(this.skinIndex),
                  $newSkinView.default.instance.initScrewView(),
                  $battleManager.default.instance.setArrData("screwSkinData"));
            $uIManager.default.instance.showGetSkinPnl(!0);
        }
    };
    t.prototype.clickVideo = function () {
        console.error("不该来的位置")
        return
        var e = this;
        $platform.reportButton("showSkinPage", this.buySkinType + "_AdBtn_video", 0, 0, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("showSkinPage", e.buySkinType + "_AdBtn_video_success", 0, 0, 2);
            cc.sys.localStorage.setItem("watchNailSkinTimes", $commonData.default.watchNailSkinTimes);
            $commonData.default.goldNum += 200;
            $topView.default.instance.changeGoldNum();
            $platform.showTips("恭喜获得200金币");
            console.log("==========>>click video", e.skinIndex, e.buySkinType);
            if ("nail" == e.buySkinType) {
                $commonData.default.watchNailSkinTimes >= $commonData.default.nailSkinData[e.skinIndex].unlockValue
                    ? ($getSkinView.default.instance.initGetNailSkin(e.skinIndex),
                      $uIManager.default.instance.showGetSkinPnl(!0),
                      $newSkinView.default.instance.initNailView(),
                      (e.node.active = !1))
                    : ((e.BtnNode[1].children[0].getComponent(cc.Label).string =
                          $commonData.default.watchNailSkinTimes + ""),
                      (e.BtnNode[1].children[1].getComponent(cc.Label).string =
                          "/" + $commonData.default.nailSkinData[e.skinIndex].unlockValue),
                      e.checkIfUnlockAdNail());
            } else {
                if ("screw" == e.buySkinType) {
                    $commonData.default.watchNailSkinTimes >=
                    $commonData.default.screwSkinData.describe[e.skinIndex].unlockValue
                        ? ($getSkinView.default.instance.initScrewSkinAni(e.skinIndex),
                          $uIManager.default.instance.showGetSkinPnl(!0),
                          $newSkinView.default.instance.initScrewView(),
                          (e.node.active = !1))
                        : ((e.BtnNode[1].children[0].getComponent(cc.Label).string =
                              $commonData.default.watchNailSkinTimes + ""),
                          (e.BtnNode[1].children[1].getComponent(cc.Label).string =
                              "/" + $commonData.default.screwSkinData.describe[e.skinIndex].unlockValue),
                          e.checkIfUnlockAdNail());
                }
            }
        });
    };
    t.prototype.checkIfUnlockAdNail = function () {
        console.error("不该来的位置")
        return
        for (var e = 0; e < $commonData.default.nailSkinData.length; e++) {
            if (
                "ad" == $commonData.default.nailSkinData[e].unlockType &&
                $commonData.default.nailSkinData[e].unlockValue <= $commonData.default.watchNailSkinTimes &&
                0 == $commonData.default.nailSkinData[e].isGot
            ) {
                $commonData.default.nailSkinData[e].isGot = !0;
            }
        }
        for (e = 0; e < $commonData.default.screwSkinData.skinData.length; e++) {
            var t = $commonData.default.screwSkinData.describe;
            if (
                "ad" == t[e].unlockType &&
                t[e].unlockValue <= $commonData.default.watchNailSkinTimes &&
                0 == $commonData.default.screwSkinData.skinData[e]
            ) {
                $commonData.default.screwSkinData.skinData[e] = 1;
            }
        }
        $newSkinView.default.instance.initNailView();
        $newSkinView.default.instance.initScrewView();
        $battleManager.default.instance.setArrData("nailSkinData");
        $battleManager.default.instance.setArrData("screwSkinData");
        cc.sys.localStorage.setItem("watchNailSkinTimes", $commonData.default.watchNailSkinTimes);
    };
    t.prototype.clickGet = function () {
        console.error("不该来的位置")
        return
        $platform.reportButton("showSkinPage", "goToGetBtn");
        if ($config.currentPlatform == $config.platformEnum.wechat) {
            switch (this.getSkinType) {
                case "level":
                case "share":
                    break;
                case "sign":
                    $startView.default.instance.clickSignBtn();
            }
        }
        this.clickClose();
        $uIManager.default.instance.showSkinPnl(!1);
    };
    t.prototype.clickCheckAchieve = function () {
        console.error("不该来的位置")
        return
        $platform.reportButton("showSkinPage", "checkAchieveBtn");
        this.clickClose();
        $uIManager.default.instance.showSkinPnl(!1);
        $uIManager.default.instance.showAchievementPnl(!0);
    };
    t.instance = null;
    __decorate([w(cc.Node)], t.prototype, "screwSkinNode", void 0);
    __decorate([w(cc.Node)], t.prototype, "bgSkinNode", void 0);
    __decorate([w(cc.Node)], t.prototype, "nailSkinNode", void 0);
    __decorate([w(cc.Sprite)], t.prototype, "screwSkinSprite", void 0);
    __decorate([w(cc.Label)], t.prototype, "tipsLabel", void 0);
    __decorate(
        [
            w({
                type: cc.Node,
                tooltip: "0公众号;1视频;2金币;3成就;4去获取"
            })
        ],
        t.prototype,
        "BtnNode",
        void 0
    );
    __decorate([w(cc.Node)], t.prototype, "skinVideoNode", void 0);
    return (n = __decorate([v], t));
})(cc.Component);
exports.default = y;
