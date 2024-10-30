var a;
var r = cc._decorator;
var l = r.ccclass;
var s = r.property;
var $platform = require("./platform");
var $postUserData = require("./PostUserData");
var $commonData = require("./commonData");
var $gameManager = require("./GameManager");
var $startView = require("./startView");
var $battleManager = require("./BattleManager");
var $uIManager = require("./UIManager");
var $shopView = require("./shopView");
var w = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.screwView = null;
        t.screwSkinPre = null;
        t.screwItemContent = null;
        t.screwSkinImg = [];
        t.boardView = null;
        t.boardSkinPre = null;
        t.boardItemContent = null;
        t.boardSkinImg = [];
        t.boardTips = [];
        t.bgSkinView = null;
        t.bgSkinPre = null;
        t.bgItemContent = null;
        t.bgSkinImg = [];
        t.nailSkinView = null;
        t.nailSkinPre = null;
        t.nailItemContent = null;
        t.nailSkinImg = [];
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onEnable = function () {
        this.showBoardView();
        this.initBoardView();
        this.initScrewView();
        this.initbgView();
        this.initNailView();
        console.log("----->", $commonData.default.nailSkinData);
    };
    t.prototype.start = function () {
        this.checkifUnlockAd();
    };
    t.prototype.init = function () {
        this.initSkinData();
        this.initScrewView();
        $uIManager.default.instance.loadShowScrewPnl();
    };
    t.prototype.initSkinData = function () {
        for (var e = 0; e < $commonData.default.screwSkinData.skinProgressTarget.length; e++) {
            if (
                $commonData.default.screwSkinData.skinProgressTarget[e] <=
                $commonData.default.screwSkinData.skinProgress
            ) {
                $commonData.default.screwSkinData.skinData[e] = 1;
            }
        }
        for (e = 0; e < $commonData.default.boardSkinData.skinProgressTarget.length; e++) {
            if (
                $commonData.default.boardSkinData.skinProgressTarget[e] <=
                $commonData.default.boardSkinData.skinProgress
            ) {
                $commonData.default.boardSkinData.skinData[e] = 1;
            }
        }
        $battleManager.default.instance.setArrData("skinData");
        $battleManager.default.instance.setArrData("screwSkinData");
        if ("" != $commonData.default.openId) {
            $postUserData.seletPostUserData(["little_man_skin", "board_skin"]);
        }
    };
    t.prototype.showScrewView = function () {
        return;
        this.screwView.active = !0;
        this.boardView.active = !1;
        this.bgSkinView.active = !1;
        this.nailSkinView.active = !1;
        this.boardTips.forEach(function (e) {
            e.active = !1;
        });
    };
    t.prototype.initScrewView = function () {
        this.screwItemContent.children.forEach(function (e) {
            e.removeAllChildren();
        });
        var e = 0;
        for (var t = -1; e < this.screwSkinImg.length; e++) {
            if (17 != e && "achv" != $commonData.default.screwSkinData.describe[e].unlockType) {
                t++;
                var n = Math.floor(t / 12);
                var o = cc.instantiate(this.screwSkinPre);
                o.setParent(this.screwItemContent.children[n]);
                o.name = e + "";
                o.getChildByName("skinImg").getComponent(cc.Sprite).spriteFrame = this.screwSkinImg[e];
                if (e == $commonData.default.screwSkinData.currentSkin) {
                    o.getChildByName("using").active = !0;
                } else {
                    o.getChildByName("using").active = !1;
                }
                if (1 == $commonData.default.screwSkinData.skinData[e]) {
                    o.getChildByName("mask").active = !1;
                } else {
                    o.getChildByName("mask").active = !0;
                    -1 != $shopView.default.instance.screwSkinIndex &&
                        e == $shopView.default.instance.screwSkinIndex &&
                        (o.getChildByName("stateNode").children[0].active = !0);
                    "coin" == $commonData.default.screwSkinData.describe[e].unlockType &&
                        ((o.getChildByName("stateNode").children[1].active = !0),
                        (o.getChildByName("stateNode").children[1].children[1].getComponent(cc.Label).string =
                            "x" + $commonData.default.screwSkinData.describe[e].unlockValue));
                    "ad" == $commonData.default.screwSkinData.describe[e].unlockType &&
                        (o.getChildByName("mask").height =
                            172 *
                            (1 -
                                $commonData.default.watchNailSkinTimes /
                                    $commonData.default.screwSkinData.describe[e].unlockValue));
                }
            }
        }
    };
    t.prototype.equipScrewSkin = function (e) {
        $platform.reportButton("SkinPage_Screw", "equipBtn_" + e, $commonData.default.currLevel);
        $commonData.default.screwSkinData.currentSkin = e;
        this.initScrewView();
        $startView.default.instance.changeNewLevelNodeSkin();
        cc.sys.localStorage.setItem("currentScrewSkin", $commonData.default.screwSkinData.currentSkin);
        $startView.default.instance.initSkinSpine();
    };
    t.prototype.showBoardView = function () {
        this.screwView.active = !1;
        this.boardView.active = !0;
        this.bgSkinView.active = !1;
        this.nailSkinView.active = !1;
        this.boardTips.forEach(function (e) {
            e.active = !1;
        });
    };
    t.prototype.initBoardView = function () {
        for (var e = 0; e < this.boardItemContent.children.length; e++) {
            this.boardItemContent.children[e].removeAllChildren();
        }
        for (e = 0; e < this.boardSkinImg.length; e++) {
            var t = Math.floor(e / 6);
            var n = cc.instantiate(this.boardSkinPre);
            n.setParent(this.boardItemContent.children[t]);
            n.name = e + "";
            if (e <= 6) {
                n.children[0].getComponent(cc.Sprite).spriteFrame = this.boardSkinImg[e];
                n.getChildByName("piece").active = !1;
                if ($commonData.default.boardSkinData.currentSkin == e) {
                    n.getChildByName("equiped").active = !0;
                } else {
                    if (0 == $commonData.default.boardSkinData.skinData[e]) {
                        n.getChildByName("unlock").active = !0;
                        var o =
                            $commonData.default.boardSkinData.skinProgressTarget[e] -
                            $commonData.default.boardSkinData.skinProgress;
                        n.getChildByName("unlock").children[0].getComponent(cc.Label).string = "再过" + o + "关解锁";
                    } else {
                        n.getChildByName("useBtn").active = !0;
                    }
                }
            } else {
                if (1 == $commonData.default.boardSkinData.skinData[e]) {
                    n.children[0].getComponent(cc.Sprite).spriteFrame = this.boardSkinImg[e];
                    n.getChildByName("piece").active = !1;
                    $commonData.default.boardSkinData.currentSkin == e
                        ? (n.getChildByName("equiped").active = !0)
                        : (n.getChildByName("useBtn").active = !0);
                } else {
                    {
                        var a = n.getChildByName("piece");
                        a.active = !0;
                        if (3 == $commonData.default.boardSkinData.piece[e]) {
                            n.getChildByName("active").active = !0;
                            for (var i = 0; i < 3; i++) {
                                this.setPiece(a.children[i], !0, e);
                            }
                        } else {
                            for (i = 0; i < $commonData.default.boardSkinData.piece[e]; i++) {
                                this.setPiece(a.children[i], !0, e);
                            }
                            for (i = $commonData.default.boardSkinData.piece[e]; i < 3; i++) {
                                this.setPiece(a.children[i], !1, e);
                            }
                            n.getChildByName("unlock").active = !0;
                            n.getChildByName("unlock").children[0].getComponent(cc.Label).string =
                                $commonData.default.boardSkinData.piece[e] + "/3";
                        }
                    }
                }
            }
        }
    };
    t.prototype.setPiece = function (e, t, n) {
        if (t) {
            e.getComponent(cc.Sprite).spriteFrame = $commonData.default.skinPieceImgArr[n - 7 + 6];
        } else {
            e.getComponent(cc.Sprite).spriteFrame = $commonData.default.skinPieceImgArr[n - 7];
        }
    };
    t.prototype.changeActive = function (e) {
        var t = Math.floor(e / 6);
        $commonData.default.boardSkinData.skinData[e] = 1;
        var n = this.boardItemContent.children[t].children[e - 6 * t];
        n.children[0].getComponent(cc.Sprite).spriteFrame = this.boardSkinImg[e];
        n.getChildByName("active").active = !1;
        n.getChildByName("piece").active = !1;
        n.getChildByName("useBtn").active = !0;
        $battleManager.default.instance.setArrData("skinData");
        if ("" != $commonData.default.openId) {
            $postUserData.seletPostUserData(["board_skin"]);
        }
    };
    t.prototype.changeBoardSkin = function (e) {
        $gameManager.default.instance.loadSkin(e);
        var t = Math.floor($commonData.default.boardSkinData.currentSkin / 6);
        var n = Math.floor(e / 6);
        $platform.reportButton("SkinPage_Board", "changeSkinBtn_" + e);
        this.boardItemContent.children[t].children[
            $commonData.default.boardSkinData.currentSkin - 6 * t
        ].getChildByName("equiped").active = !1;
        this.boardItemContent.children[t].children[
            $commonData.default.boardSkinData.currentSkin - 6 * t
        ].getChildByName("useBtn").active = !0;
        this.boardItemContent.children[n].children[e - 6 * n].getChildByName("equiped").active = !0;
        this.boardItemContent.children[n].children[e - 6 * n].getChildByName("useBtn").active = !1;
        $commonData.default.boardSkinData.currentSkin = e;
        cc.sys.localStorage.setItem("currentSkin", $commonData.default.boardSkinData.currentSkin);
    };
    t.prototype.clickGuideBtn = function () {
        this.boardTips.forEach(function (e) {
            e.active = !e.active;
        });
    };
    t.prototype.showbgView = function () {
        this.screwView.active = !1;
        this.boardView.active = !1;
        this.bgSkinView.active = !0;
        this.nailSkinView.active = !1;
        this.boardTips.forEach(function (e) {
            e.active = !1;
        });
    };
    t.prototype.initbgView = function () {
        this.bgItemContent.children.forEach(function (e) {
            e.removeAllChildren();
        });
        for (var e = 0; e < $commonData.default.bgSkinData.length; e++) {
            var t = Math.floor(e / 12);
            var n = cc.instantiate(this.bgSkinPre);
            n.setParent(this.bgItemContent.children[t]);
            n.name = e + "";
            if ($commonData.default.bgSkinData[e].isGot) {
                n.getChildByName("mask").active = !1;
            } else {
                n.getChildByName("mask").active = !0;
            }
            if ($commonData.default.currentBgSkin == e) {
                n.getChildByName("using").active = !0;
            } else {
                n.getChildByName("using").active = !1;
            }
            switch ($commonData.default.bgSkinData[e].type) {
                case "img":
                    n.children[2].children[0].getComponent(cc.Sprite).spriteFrame =
                        this.bgSkinImg[$commonData.default.bgSkinData[e].imgIndex];
                    n.children[2].children[0].color = cc.color(255, 255, 255);
                    break;
                case "color":
                    n.children[2].children[0].getComponent(cc.Sprite).spriteFrame = this.bgSkinImg[1];
                    var o = $commonData.default.bgSkinData[e].color;
                    n.children[2].children[0].color = cc.color(o[0], o[1], o[2]);
            }
        }
    };
    t.prototype.equipBgSkin = function (e) {
        if ($commonData.default.bgSkinData[e].isGot) {
            $platform.reportButton("SkinPage_BG", "equipBtn_" + e, 0);
            $commonData.default.currentBgSkin = e;
            this.initbgView();
            $battleManager.default.instance.clickChangeBG();
            cc.sys.localStorage.setItem("currentBgSkin", $commonData.default.currentBgSkin);
        }
    };
    t.prototype.showNailView = function () {
        this.screwView.active = !1;
        this.boardView.active = !1;
        this.bgSkinView.active = !1;
        this.nailSkinView.active = !0;
        this.boardTips.forEach(function (e) {
            e.active = !1;
        });
    };
    t.prototype.initNailView = function () {
        this.nailItemContent.children.forEach(function (e) {
            e.removeAllChildren();
        });
        for (var e = 0; e < $commonData.default.nailSkinData.length; e++) {
            var t = Math.floor(e / 12);
            var n = cc.instantiate(this.nailSkinPre);
            n.setParent(this.nailItemContent.children[t]);
            n.name = e + "";
            n.getChildByName("mask").active = !$commonData.default.nailSkinData[e].isGot;
            if (e == $commonData.default.currentNailSkin) {
                n.getChildByName("using").active = !0;
            } else {
                n.getChildByName("using").active = !1;
            }
            if (!$commonData.default.nailSkinData[e].isGot) {
                n.getChildByName("mask").height =
                    172 *
                    (1 - $commonData.default.watchNailSkinTimes / $commonData.default.nailSkinData[e].unlockValue);
            }
            n.children[1].getComponent(cc.Sprite).spriteFrame = this.nailSkinImg[e];
        }
    };
    t.prototype.equipNailSkin = function (e) {
        $platform.reportButton("SkinPage_Nail", "equipBtn_" + e, 0);
        $commonData.default.currentNailSkin = e;
        cc.sys.localStorage.setItem("currentNailSkin", $commonData.default.currentNailSkin);
        this.initNailView();
    };
    t.prototype.clickClose = function () {
        var e = this;
        $platform.reportButton("SkinPage", "closeBtn");
        this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.node.active = !1;
            $startView.default.instance.showGameClubBtn(!0);
        }, 0.2);
    };
    t.prototype.checkifUnlockAd = function () {
        for (var e = 0; e < $commonData.default.screwSkinData.skinData.length; e++) {
            var t = $commonData.default.screwSkinData.describe;
            if (
                "ad" == t[e].unlockType &&
                t[e].unlockValue <= $commonData.default.watchNailSkinTimes &&
                0 == $commonData.default.screwSkinData.skinData[e]
            ) {
                $commonData.default.screwSkinData.skinData[e] = 1;
            }
        }
        n.instance.initScrewView();
    };
    t.instance = null;
    __decorate([s(cc.Node)], t.prototype, "screwView", void 0);
    __decorate([s(cc.Prefab)], t.prototype, "screwSkinPre", void 0);
    __decorate([s(cc.Node)], t.prototype, "screwItemContent", void 0);
    __decorate([s(cc.SpriteFrame)], t.prototype, "screwSkinImg", void 0);
    __decorate([s(cc.Node)], t.prototype, "boardView", void 0);
    __decorate([s(cc.Prefab)], t.prototype, "boardSkinPre", void 0);
    __decorate([s(cc.Node)], t.prototype, "boardItemContent", void 0);
    __decorate([s(cc.SpriteFrame)], t.prototype, "boardSkinImg", void 0);
    __decorate([s(cc.Node)], t.prototype, "boardTips", void 0);
    __decorate([s(cc.Node)], t.prototype, "bgSkinView", void 0);
    __decorate([s(cc.Prefab)], t.prototype, "bgSkinPre", void 0);
    __decorate([s(cc.Node)], t.prototype, "bgItemContent", void 0);
    __decorate([s(cc.SpriteFrame)], t.prototype, "bgSkinImg", void 0);
    __decorate([s(cc.Node)], t.prototype, "nailSkinView", void 0);
    __decorate([s(cc.Prefab)], t.prototype, "nailSkinPre", void 0);
    __decorate([s(cc.Node)], t.prototype, "nailItemContent", void 0);
    __decorate([s(cc.SpriteFrame)], t.prototype, "nailSkinImg", void 0);
    return (n = __decorate([l], t));
})(cc.Component);
exports.default = w;
