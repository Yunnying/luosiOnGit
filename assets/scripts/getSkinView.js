var a;
exports.ENUM_SKIN_TYPE = void 0;
var r;
var l = cc._decorator;
var s = l.ccclass;
var u = l.property;
var $platform = require("./platform");
var $commonData = require("./commonData");
var $gameManager = require("./GameManager");
var $newSkinView = require("./newSkinView");
var $gameOverView = require("./gameOverView");
var $battleManager = require("./BattleManager");
var $postUserData = require("./PostUserData");
!(function (e) {
    e.SCREW = "screw";
    e.BOARD = "board";
    e.PUZZLE = "puzzle";
    e.BG = "bg";
    e.NAIL = "nail";
    e.SKIPVIDEOCOUPON = "skipVideoCoupon";
})((r = exports.ENUM_SKIN_TYPE || (exports.ENUM_SKIN_TYPE = {})));
var w = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.shengli = null;
        t.getSkinImg = null;
        t.SkinArr = [];
        t.skinPuzzleNode = null;
        t.skinPuzzleArr = [];
        t.skipVideoCouponNode = null;
        t.bgSkinNode = null;
        t.nailSkinNode = null;
        t.getSkinAni = null;
        t.equipBtn = null;
        t.get_skin_type = r.SCREW;
        t.getSkinIndex = -1;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.initItemNode = function () {
        this.getSkinImg.node.parent.active = !1;
        this.getSkinAni.node.active = !1;
        this.skinPuzzleNode.active = !1;
        this.bgSkinNode.active = !1;
        this.nailSkinNode.active = !1;
        this.skipVideoCouponNode.active = !1;
        this.equipBtn.active = !0;
    };
    t.prototype.onEnable = function () {
        this.node.getChildByName("bg").getComponent(cc.Animation).play("appear");
        this.shengli.setAnimation(0, "huode", !1);
        this.shengli.addAnimation(0, "huode_loop", !0);
    };
    t.prototype.onDisable = function () {
        this.node.children[1].getChildByName("tips").active = !1;
    };
    t.prototype.initBoardSkinImg = function (e) {
        $platform.reportPage("GetskinPage" + this.get_skin_type, $commonData.default.currLevel);
        this.get_skin_type = r.BOARD;
        this.getSkinImg.spriteFrame = this.SkinArr[e];
        this.initItemNode();
        this.getSkinImg.node.parent.active = !0;
        this.getSkinIndex = e;
    };
    t.prototype.initScrewSkinAni = function (e, t) {
        if (void 0 === t) {
            t = !0;
        }
        $platform.reportPage("GetskinPage" + this.get_skin_type, $commonData.default.currLevel);
        console.log("---------初始化螺丝皮肤获得页面", e);
        this.get_skin_type = r.SCREW;
        this.getSkinAni.animation = $commonData.default.screwSkinName[e];
        this.initItemNode();
        this.getSkinAni.node.active = !0;
        this.getSkinIndex = e;
        this.node.children[1].getChildByName("tips").active = !(e >= 7 || !t);
        var n = Math.floor(e / 12);
        console.log("=====>", n);
        if (16 != e && 17 != e) {
            n = 0;
        }
        $commonData.default.screwSkinData.skinData[e] = 1;
        $battleManager.default.instance.setArrData("screwSkinData");
        console.log("=====>", e + "," + n);
        console.log($newSkinView.default.instance.screwItemContent);
        $newSkinView.default.instance.screwItemContent.children[n]
            .getChildByName("" + e)
            .getChildByName("mask").active = !1;
    };
    t.prototype.initGetPuzzle = function (e, t) {
        this.get_skin_type = r.PUZZLE;
        this.initItemNode();
        this.equipBtn.active = !1;
        this.skinPuzzleNode.active = !0;
        this.skinPuzzleNode.children[0].getComponent(cc.Sprite).spriteFrame = this.skinPuzzleArr[e - 7];
        console.log("-----index", e);
        if (t) {
            this.skinPuzzleNode.children[1].getComponent(cc.Sprite).spriteFrame = this.skinPuzzleArr[t - 7];
            this.skinPuzzleNode.children[1].active = !0;
            $commonData.default.boardSkinData.piece[t]++;
        } else {
            this.skinPuzzleNode.children[1].active = !1;
        }
        $commonData.default.boardSkinData.piece[e]++;
        this.node.children[1].getChildByName("tips").active = !1;
        $battleManager.default.instance.setArrData("piece");
    };
    t.prototype.initGetBgSkin = function (e) {
        this.initItemNode();
        this.get_skin_type = r.BG;
        this.bgSkinNode.active = !0;
        $commonData.default.bgSkinData[e].isGot = !0;
        $battleManager.default.instance.setArrData("bgSkinData");
        this.equipBtn.active = !0;
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
        this.node.children[1].getChildByName("tips").active = !1;
        this.getSkinIndex = e;
    };
    t.prototype.initGetNailSkin = function (e) {
        this.initItemNode();
        this.nailSkinNode.active = !0;
        this.get_skin_type = r.NAIL;
        $commonData.default.nailSkinData[e].isGot = !0;
        $battleManager.default.instance.setArrData("nailSkinData");
        this.nailSkinNode.children[0].getComponent(cc.Sprite).spriteFrame =
            $newSkinView.default.instance.nailSkinImg[e];
        this.nailSkinNode.children[0].width = 77;
        this.nailSkinNode.children[0].height = 77;
        this.node.children[1].getChildByName("tips").active = !1;
        this.getSkinIndex = e;
    };
    t.prototype.initSkipVideoCoupon = function (e) {
        if (void 0 === e) {
            e = 1;
        }
        this.initItemNode();
        this.node.children[1].getChildByName("tips").active = !1;
        this.skipVideoCouponNode.children[0].getComponent(cc.Label).string = "广告跳过券x" + e;
        this.skipVideoCouponNode.active = !0;
        this.equipBtn.active = !1;
        this.get_skin_type = r.SKIPVIDEOCOUPON;
    };
    t.prototype.clickEquip = function () {
        var e = this;
        $platform.reportButton("GetskinPage", "clickEquip_" + this.get_skin_type);
        switch (this.get_skin_type) {
            case r.SCREW:
                $newSkinView.default.instance.equipScrewSkin(this.getSkinIndex);
                $gameOverView.default.instance.changeScrewAni();
                this.clickAccept();
                break;
            case r.BOARD:
                $gameManager.default.instance.loadSkin(this.getSkinIndex);
                $commonData.default.boardSkinData.currentSkin = this.getSkinIndex;
                cc.sys.localStorage.setItem("currentSkin", $commonData.default.boardSkinData.currentSkin);
                this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
                this.scheduleOnce(function () {
                    e.node.active = !1;
                }, 0.2);
                break;
            case r.PUZZLE:
                break;
            case r.BG:
                $newSkinView.default.instance.equipBgSkin(this.getSkinIndex);
                this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
                this.scheduleOnce(function () {
                    e.node.active = !1;
                }, 0.2);
                break;
            case r.NAIL:
                $newSkinView.default.instance.equipNailSkin(this.getSkinIndex);
                this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
                this.scheduleOnce(function () {
                    e.node.active = !1;
                }, 0.2);
                break;
            default:
                this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
                this.scheduleOnce(function () {
                    e.node.active = !1;
                }, 0.2);
        }
    };
    t.prototype.clickAccept = function () {
        var e = this;
        $platform.reportButton("GetskinPage", "clickAccept" + this.get_skin_type);
        console.log("this.get_skin_type", this.get_skin_type);
        if (this.get_skin_type == r.BOARD) {
            this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
            this.scheduleOnce(function () {
                e.node.active = !1;
            }, 0.2);
        } else {
            this.get_skin_type == r.SCREW
                ? (this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      e.node.active = !1;
                      console.log("commonData.skinProgress", $commonData.default.boardSkinData.skinProgress);
                      if (
                          -1 !=
                          $commonData.default.boardSkinData.skinProgressTarget.indexOf(
                              $commonData.default.boardSkinData.skinProgress
                          )
                      ) {
                          var t = $commonData.default.boardSkinData.skinProgressTarget.indexOf(
                              $commonData.default.boardSkinData.skinProgress
                          );
                          console.log("应该解锁的皮肤", t);
                          if (1 == $commonData.default.boardSkinData.skinData[t]) {
                              return;
                          }
                          e.initBoardSkinImg(t);
                          $commonData.default.boardSkinData.skinData[t] = 1;
                          var n = $commonData.default.boardSkinData.skinData.indexOf(0);
                          console.log("---------下一个皮肤", n, $commonData.default.boardSkinData.skinData);
                          if (-1 != n) {
                              var o =
                                  $commonData.default.boardSkinData.skinProgressTarget[n] -
                                  $commonData.default.boardSkinData.skinProgress;
                              var a = e.node.children[1].getChildByName("tips");
                              if (o > 0) {
                                  a.getComponent(cc.Label).string = "再通关" + o + "关可获得新皮肤";
                                  a.active = !0;
                              } else {
                                  a.active = !1;
                              }
                          } else {
                              e.node.children[1].getChildByName("tips").active = !1;
                          }
                          e.showGetSkinView();
                          $battleManager.default.instance.setArrData("skinData");
                          if ("" != $commonData.default.openId) {
                              $postUserData.seletPostUserData(["board_skin"]);
                          }
                      }
                  }, 0.2))
                : (this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      e.node.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showGetSkinView = function () {
        var e = this;
        this.getSkinImg.scheduleOnce(function () {
            e.node.active = !0;
        }, 0.2);
    };
    t.instance = null;
    __decorate([u(sp.Skeleton)], t.prototype, "shengli", void 0);
    __decorate([u(cc.Sprite)], t.prototype, "getSkinImg", void 0);
    __decorate([u(cc.SpriteFrame)], t.prototype, "SkinArr", void 0);
    __decorate([u(cc.Node)], t.prototype, "skinPuzzleNode", void 0);
    __decorate([u(cc.SpriteFrame)], t.prototype, "skinPuzzleArr", void 0);
    __decorate(
        [
            u({
                type: cc.Node,
                tooltip: "广告跳过券节点"
            })
        ],
        t.prototype,
        "skipVideoCouponNode",
        void 0
    );
    __decorate([u(cc.Node)], t.prototype, "bgSkinNode", void 0);
    __decorate([u(cc.Node)], t.prototype, "nailSkinNode", void 0);
    __decorate([u(sp.Skeleton)], t.prototype, "getSkinAni", void 0);
    __decorate([u(cc.Node)], t.prototype, "equipBtn", void 0);
    return (n = __decorate([s], t));
})(cc.Component);
exports.default = w;
