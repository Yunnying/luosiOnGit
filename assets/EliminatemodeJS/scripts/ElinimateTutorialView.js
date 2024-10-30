var o;
var $commonData = require("../../scripts/commonData");
var a = cc._decorator;
var c = a.ccclass;
var l = a.property;
var s = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.blackCat = null;
        t.hand = null;
        t.dialog = null;
        t.maskNode = null;
        t.mask = null;
        t.tipLabel = null;
        t.tutorialTips = ["点击螺丝，放入盒子！", "将所有盒子消除即可过关！"];
        t.newtoutorialTips = [
            "先观察螺丝盒的颜色",
            "点击对应颜色的螺丝\n来收起螺丝",
            "点击与盒子颜色都不同的\n螺丝时,会放置在此处",
            "板子全部掉落则游戏胜利"
        ];
        t.newMaskSize = [
            [180, 200],
            [100, 100],
            [320, 100],
            [300, 300]
        ];
        t.progress = 1;
        t.maskProgress = 0;
        t.canClick = !1;
        t.screw_1 = null;
        t.screw_2 = null;
        t.screw_3 = null;
        t.screw1 = null;
        t.steel1 = null;
        y.instance = t;
        return t;
    }
    var y;
    __extends(t, e);
    y = t;
    t.prototype.onDisable = function () {
        cc.find("Canvas/gamePnl/gameNode").getComponent("EliminateGamelevel").ifOnGuiding = !1;
    };
    t.prototype.start = function () {
        this.init();
    };
    t.prototype.init = function () {
       
        this.node.getChildByName("old").active = !0;
        this.node.getChildByName("new").active = !1;
        
        this.progress = 0;
        this.dialog.string = this.tutorialTips[this.progress];
        this.hand.active = !0;
        cc.find("Canvas").getComponent(cc.Canvas);
        if (cc.view.getVisibleSize().height / cc.view.getVisibleSize().width < 1.8) {
            this.blackCat.active = !1;
            this.dialog.node.parent.getComponent(cc.Sprite).enabled = !1;
            this.dialog.node.parent.getComponent(cc.Widget).top = 350;
            this.dialog.node.setPosition(40, 28);
            console.log("ipad");
        } else {
            this.blackCat.active = !0;
            this.dialog.node.parent.getComponent(cc.Sprite).enabled = !0;
            this.dialog.node.parent.getComponent(cc.Widget).top = 450;
            this.dialog.node.setPosition(0, 28);
        }
        var e = cc.find("Canvas/gamePnl/gameNode/LvPrefab").children[0].getChildByName("gameNode");
        var t =
         e.getChildByName($commonData.default.eliminateScrewFirstLevel[0]).getChildByName("screwNode").children[
            $commonData.default.eliminateScrewFirstData[0]
        ];
        this.screw_1.setPosition(this.screw_1.parent.convertToNodeSpaceAR(t.convertToWorldSpaceAR(cc.Vec2.ZERO)));
        var y = 
        e.getChildByName($commonData.default.eliminateScrewFirstLevel[1]).getChildByName("screwNode").children[
            $commonData.default.eliminateScrewFirstData[1]
        ];
        this.screw_2.setPosition(this.screw_2.parent.convertToNodeSpaceAR(y.convertToWorldSpaceAR(cc.Vec2.ZERO)));
        var x =
         e.getChildByName($commonData.default.eliminateScrewFirstLevel[2]).getChildByName("screwNode").children[
            $commonData.default.eliminateScrewFirstData[2]
        ];
        this.screw_3.setPosition(this.screw_3.parent.convertToNodeSpaceAR(x.convertToWorldSpaceAR(cc.Vec2.ZERO)));
        this.pos1 = this.hand.parent.convertToNodeSpaceAR(t.convertToWorldSpaceAR(cc.Vec2.ZERO));
        this.pos2 = this.hand.parent.convertToNodeSpaceAR(y.convertToWorldSpaceAR(cc.Vec2.ZERO));
        this.pos3 = this.hand.parent.convertToNodeSpaceAR(x.convertToWorldSpaceAR(cc.Vec2.ZERO));
        console.log("----->", this.pos1.x, this.pos1.y);
        console.log("----->", this.pos2.x, this.pos2.y);
        console.log("----->", this.pos3.x, this.pos3.y);
        console.log("----->", t.x, t.y);
        console.log("----->", y.x, y.y);
        console.log("----->", x.x, x.y);
        this.hand.setPosition(this.pos1);
    };
    t.prototype.nextStep = function (e) {
        var t = this;
        if (void 0 === e) {
            e = null;
        }
        this.hand.active = !0;
        if (0 == this.progress) {
            this.progress++;
            this.hand.setPosition(this.pos2);
        } else {
            1 == this.progress
                ? (this.progress++, this.hand.setPosition(this.pos3))
                : 2 == this.progress &&
                  (this.progress++,
                  (this.hand.active = !1),
                  (this.dialog.string = this.tutorialTips[1]),
                  this.scheduleOnce(function () {
                      cc.tween(t.dialog.node.parent)
                          .to(0.5, {
                              opacity: 0
                          })
                          .start();
                      cc.tween(t.blackCat)
                          .to(0.5, {
                              opacity: 0
                          })
                          .start();
                  }, 2));
        }
    };
    t.prototype.holeNodeAni = function (e, t) {
        var y = this;
        cc.tween(e)
            .to(0.15, {
                scale: 1.1
            })
            .to(0.15, {
                scale: 1
            })
            .to(0.15, {
                scale: 0.95
            })
            .to(0.15, {
                scale: 1
            })
            .call(function () {
                if (++t <= 3) {
                    y.holeNodeAni(e, t);
                }
            })
            .start();
    };
    t.prototype.nextMaskStep = function () {};
    t.instance = null;
    __decorate([l(cc.Node)], t.prototype, "blackCat", void 0);
    __decorate([l(cc.Node)], t.prototype, "hand", void 0);
    __decorate([l(cc.Label)], t.prototype, "dialog", void 0);
    __decorate([l(cc.Node)], t.prototype, "maskNode", void 0);
    __decorate([l(cc.Node)], t.prototype, "mask", void 0);
    __decorate([l(cc.Label)], t.prototype, "tipLabel", void 0);
    __decorate([l(cc.Node)], t.prototype, "screw_1", void 0);
    __decorate([l(cc.Node)], t.prototype, "screw_2", void 0);
    __decorate([l(cc.Node)], t.prototype, "screw_3", void 0);
    return (y = __decorate([c], t));
})(cc.Component);
exports.default = s;
