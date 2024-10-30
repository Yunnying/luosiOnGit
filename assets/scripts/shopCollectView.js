var a;
var $commonData = require("./commonData");
var $game = require("./Game");
var $startView = require("./startView");
var u = cc._decorator;
var d = u.ccclass;
var f = u.property;
var p = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.bg = null;
        t.collectLayout = null;
        t.item = null;
        t.progressLabel = null;
        t.gouNode = null;
        t.level = 0;
        t.cb = null;
        t.newCollect = null;
        return t;
    }
    __extends(t, e);
    t.prototype.onEnable = function () {
        this.level = cc.sys.localStorage.getItem("currentLevel");
        if (this.level > 180) {
            this.level = 181;
        }
        console.error("this.level=========>", this.level);
        this.progressLabel.string =
            "收集进度: " + (this.level - 1) + "/" + $commonData.default.collectNameConfig.length;
        this.show();
        this.gouNode.active = !$commonData.default.isOpen;
    };
    t.prototype.onDisable = function () {
        $startView.default.instance.showGameClubBtn(!0);
        if (null != this.newCollect && null != this.cb && this.newCollect.isValid) {
            this.newCollect.stopAllActions();
            this.cb();
        }
    };
    t.prototype.setHideORShow = function () {
        $commonData.default.isOpen = !$commonData.default.isOpen;
        this.gouNode.active = !$commonData.default.isOpen;
    };
    t.prototype.init = function () {
        this.updateLockState();
    };
    t.prototype.updateLockState = function () {
        if (this.collectLayout.children.length > 0) {
            for (var e = 0; e < this.collectLayout.children.length; e++) {
                if (e < this.level - 1) {
                    this.setSprtite(e, this.collectLayout.children[e]);
                }
            }
        }
    };
    t.prototype.show = function () {
        $commonData.default.isPause = !0;
        this.init();
        this.node.active = !0;
        this.bg.scale = 0;
        this.bg.getComponent(cc.Animation).play("appear");
    };
    t.prototype.hide = function () {
        var e = this;
        this.bg.getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.node.active = !1;
            $commonData.default.isPause = !1;
        }, 0.3);
    };
    t.prototype.createItems = function () {
        this.collectLayout.removeAllChildren();
        return this.getCreateList();
    };
    t.prototype.getCreateList = function () {
        for (var e = 0; e < $commonData.default.collectNameConfig.length; e++) {
            this.createItem(e);
        }
    };
    t.prototype.createItem = function () {
        var e = cc.instantiate(this.item);
        e.parent = this.collectLayout;
        e.active = !0;
        e.getChildByName("lock").active = !0;
        e.getChildByName("bianhao_bg").active = !1;
        e.active = !0;
    };
    t.prototype.setSprtite = function (e, t) {
        return new Promise(function (n) {
            t.getChildByName("lock").active = !1;
            var o;
            var a = t.getChildByName("bianhao_bg");
            a.active = !0;
            if (e < 9) {
                o = "00" + (e + 1);
            } else {
                o = e < 99 ? "0" + (e + 1) : e + 1 + "";
            }
            a.children[0].getComponent(cc.Label).string = "No." + o;
            t.getChildByName("label").getComponent(cc.Label).string = $commonData.default.collectNameConfig[e];
            $game.default.resManager
                .loadBundleRes(
                    "EliminateShop-" + Math.floor(e / 5),
                    $commonData.default.collectNameConfig[e],
                    cc.SpriteFrame
                )
                .then(function (e) {
                    t.getChildByName("img").getComponent(cc.Sprite).spriteFrame = e;
                    n();
                });
            n();
        });
    };
    t.prototype.onClickClose = function () {
        this.hide();
    };
    t.prototype.unlockUnitByIndexWithAni = function (e, t) {
        var n;
        var o = this;
        if (e > $commonData.default.collectNameConfig.length - 4) {
            n = this.collectLayout.height - 400;
        } else {
            n = 308 * Math.floor(e / 2) + 400;
        }
        this.collectLayout.setPosition(0, n);
        this.newCollect = cc.instantiate(t);
        this.newCollect.active = !0;
        this.cb = function () {
            o.newCollect.destroy();
            o.progressLabel.string = "收集进度: " + o.level + "/" + $commonData.default.collectNameConfig.length;
            o.cb = null;
            o.newCollect = null;
        };
        var a = this.node.children[1];
        this.newCollect.setParent(a);
        this.newCollect.setPosition(a.convertToNodeSpaceAR(t.convertToWorldSpaceAR(cc.v2(0))));
        this.newCollect.scale = 0;
        this.newCollect.getChildByName("progressBg").active = !1;
        var i = a.convertToNodeSpaceAR(this.collectLayout.children[e].convertToWorldSpaceAR(cc.v2(0)));
        cc.tween(this.newCollect)
            .to(0.15, {
                scale: 1.1
            })
            .delay(0.05)
            .to(0.15, {
                scale: 1
            })
            .delay(0.05)
            .call(function () {
                cc.tween(o.newCollect)
                    .to(0.4, {
                        position: cc.v3(i)
                    })
                    .call(function () {
                        o.setSprtite(e, o.collectLayout.children[e]);
                        cc.tween(o.newCollect)
                            .to(0.15, {
                                scale: 1.1
                            })
                            .delay(0.05)
                            .to(0.15, {
                                scale: 0
                            })
                            .call(function () {
                                o.cb();
                            })
                            .start();
                    })
                    .start();
            })
            .start();
    };
    __decorate([f(cc.Node)], t.prototype, "bg", void 0);
    __decorate([f(cc.Node)], t.prototype, "collectLayout", void 0);
    __decorate(
        [
            f({
                type: cc.Node,
                displayName: "用于复制的item"
            })
        ],
        t.prototype,
        "item",
        void 0
    );
    __decorate([f(cc.Label)], t.prototype, "progressLabel", void 0);
    __decorate([f(cc.Node)], t.prototype, "gouNode", void 0);
    return __decorate([d], t);
})(cc.Component);
exports.default = p;
