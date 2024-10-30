var a;
var $game = require("./Game");
var $startView = require("./startView");
var $commonData = require("./commonData");
var $newSkinView = require("./newSkinView");
var $shopView = require("./shopView");
var $showScrewView = require("./showScrewView");
var $config = require("./config");
var h = cc._decorator;
var m = h.ccclass;
var g = h.property;
var v = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.exitPnl = null;
        t.setPnl = null;
        t.pausePnl = null;
        t.revivePnl = null;
        t.careerPnl = null;
        t.newSkinPnl = null;
        t.achievementPnl = null;
        t.gameOverPnl = null;
        t.getSkinPnl = null;
        t.giftPnl = null;
        t.areaPnl = null;
        t.passAllLevelPnl = null;
        t.showScrewPnl = null;
        t.signPnl = null;
        t.shopPnl = null;
        t.loadUI = !1;
        t.PnlNode = null;
        t.UIname = [
            "shopPnl",
            "exitPnl",
            "setPnl",
            "pausePnl",
            "revivePnl",
            "careerPnl",
            "newSkinPnl",
            "achievementPnl",
            "getSkinPnl",
            "passAllLevelPnl",
            "signPnl"
        ];
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.start = function () {
        this.setView();
    };
    t.prototype.setView = function () {
        this.loadGiftPnl();
        if ($commonData.default.UIPrefab.length != this.UIname.length) {
            console.error("第一次加载ui");
            $commonData.default.UIPrefab = [];
            this.loadView();
        } else {
            console.error("已经加载过了");
            this.loadView3();
        }
    };
    t.prototype.loadView3 = function () {
        var e = this;
        $commonData.default.UIPrefab.forEach(function (t) {
            var n = cc.instantiate(t);
            n.setParent(e.PnlNode);
            n.active = !1;
        });
        this.findView();
        this.loadUI = !0;
    };
    t.prototype.loadView = function () {
        var e = this;
        var t = this.UIname.slice();
        var n = [];
        var o = function (o) {
            n.push(
                $game.default.resManager
                    .loadBundleRes("view", t[o], cc.Prefab)
                    .catch(function () {
                        console.error("加载" + t[o] + "失败");
                    })
                    .then(function (t) {
                        $commonData.default.UIPrefab.push(t);
                        var n = cc.instantiate(t);
                        n.setParent(e.PnlNode);
                        n.active = !1;
                    })
            );
        };
        for (var a = 0; a < t.length; a++) {
            o(a);
        }
        Promise.all(n).then(function () {
            if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NONE) {
                e.findView();
                e.loadUI = !0;
            }
        });
    };
    t.prototype.loadGiftPnl = function () {
        var e = this;
        if ($config.currentPlatform == $config.platformEnum.toutiao) {
            $game.default.resManager
                .loadBundleRes("view", "giftPnl", cc.Prefab)
                .catch(function () {
                    console.error("加载giftPnl失败");
                })
                .then(function (t) {
                    e.giftPnl = cc.instantiate(t);
                    e.giftPnl.setParent(e.PnlNode.parent);
                    e.giftPnl.name = "giftPnl";
                    $startView.default.instance.changeGift();
                });
        }
    };
    t.prototype.findView = function () {
        $startView.default.instance.preloadlevel();
        this.exitPnl = this.PnlNode.getChildByName("exitPnl");
        this.setPnl = this.PnlNode.getChildByName("setPnl");
        this.pausePnl = this.PnlNode.getChildByName("pausePnl");
        this.revivePnl = this.PnlNode.getChildByName("revivePnl");
        this.careerPnl = this.PnlNode.getChildByName("careerPnl");
        this.newSkinPnl = this.PnlNode.getChildByName("newSkinPnl");
        this.achievementPnl = this.PnlNode.getChildByName("achievementPnl");
        this.giftPnl = this.PnlNode.parent.getChildByName("giftPnl");
        this.signPnl = this.PnlNode.getChildByName("signPnl");
        this.shopPnl = this.PnlNode.getChildByName("shopPnl");
        if (-1 == $commonData.default.myProvinceIndex) {
            this.areaPnl = this.PnlNode.getChildByName("areaPnl");
        }
        this.gameOverPnl = this.PnlNode.getChildByName("gameOverPnl");
        this.passAllLevelPnl = this.PnlNode.getChildByName("passAllLevelPnl");
        this.getSkinPnl = this.PnlNode.getChildByName("getSkinPnl");
        this.getSkinPnl.setSiblingIndex(this.PnlNode.childrenCount - 1);
        if (!$commonData.default.isCheck) {
            $startView.default.instance.checkSignState();
        }
        $shopView.default.instance.initScrewSkin();
        $newSkinView.default.instance.init();
    };
    t.prototype.loadShowScrewPnl = function () {
        // var e = this;
        // if (null == this.showScrewPnl) {
        //     var t = this;
        //     $game.default.resManager
        //         .loadBundleRes("view", "showScrewPnl", cc.Prefab)
        //         .catch(function () {
        //             console.error("加载showScrewPnl失败");
        //         })
        //         .then(function (n) {
        //             var o = cc.instantiate(n);
        //             o.setParent(e.PnlNode);
        //             o.active = !1;
        //             console.warn("加载showScrewPnl成功");
        //             t.showScrewPnl = o;
        //             $showScrewView.default.instance.initSkipVideoNode();
        //         });
        // }
    };
    t.prototype.showExitPnl = function (e) {
        var t = this;
        if (this.exitPnl) {
            e
                ? ((this.exitPnl.active = !0),
                  this.exitPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.exitPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.exitPnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showSetPnl = function (e) {
        var t = this;
        if (this.setPnl) {
            e
                ? ((this.setPnl.active = !0),
                  this.setPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.setPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.setPnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showPausePnl = function (e) {
        var t = this;
        if (this.pausePnl) {
            e
                ? ((this.pausePnl.active = !0),
                  this.pausePnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.pausePnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.pausePnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showRevivePnl = function (e) {
        var t = this;
        if (this.revivePnl) {
            e
                ? ((this.revivePnl.active = !0),
                  this.revivePnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.revivePnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.revivePnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showGameOverPnl = function (e) {
        var t = this;
        if (this.gameOverPnl) {
            e
                ? ((this.gameOverPnl.active = !0),
                  this.gameOverPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.gameOverPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.gameOverPnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showCareerPnl = function (e) {
        var t = this;
        if (this.careerPnl) {
            e
                ? ((this.careerPnl.active = !0),
                  this.careerPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.careerPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.careerPnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showSkinPnl = function (e) {
        var t = this;
        if (this.newSkinPnl) {
            e
                ? ((this.newSkinPnl.active = !0),
                  this.newSkinPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.newSkinPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.newSkinPnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showGetSkinPnl = function (e) {
        var t = this;
        if (this.getSkinPnl) {
            e
                ? ((this.getSkinPnl.active = !0),
                  this.getSkinPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.getSkinPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.getSkinPnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showAchievementPnl = function (e) {
        var t = this;
        if (this.achievementPnl) {
            e
                ? ((this.achievementPnl.active = !0),
                  this.achievementPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.achievementPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.achievementPnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showShowScrewPnl = function (e) {
        var t = this;
        if (this.showScrewPnl) {
            e
                ? ((this.showScrewPnl.active = !0),
                  this.showScrewPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.showScrewPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.showScrewPnl.active = !1;
                  }, 0.2));
        }
    };
    t.prototype.showPassAllLevelPnl = function (e) {
        var t = this;
        console.log("========>>showPass all level pnl");
        if (this.passAllLevelPnl) {
            e
                ? ((this.passAllLevelPnl.active = !0),
                  this.passAllLevelPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.passAllLevelPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.passAllLevelPnl.active = !1;
                  }, 0.2));
        } else {
            console.error("不存在");
        }
    };
    t.prototype.showShopPnl = function (e) {
        var t = this;
        if (this.shopPnl) {
            e
                ? ((this.shopPnl.active = !0),
                  this.shopPnl.getChildByName("bg").getComponent(cc.Animation).play("appear"))
                : (this.shopPnl.getChildByName("bg").getComponent(cc.Animation).play("disappear"),
                  this.scheduleOnce(function () {
                      t.shopPnl.active = !1;
                  }, 0.2));
        }
    };
    t.instance = null;
    __decorate([g(cc.Node)], t.prototype, "PnlNode", void 0);
    return (n = __decorate([m], t));
})(cc.Component);
exports.default = v;
