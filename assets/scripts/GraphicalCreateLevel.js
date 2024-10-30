var a;
var r = cc._decorator;
var l = r.ccclass;
var s = r.property;
var $commonData = require("./commonData");
var $gameManager = require("./GameManager");
var $steel = require("./Steel");
var $game = require("./Game");
var $graphicalGameLevel = require("./GraphicalGameLevel");
var $startView = require("./startView");
var $newSkinView = require("./newSkinView");
var $screwNumberManager = require("./ScrewNumberManager");
var w = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.screwPre = null;
        t.screwOutPre = null;
        t.holePre = null;
        t.currentLevelconfig = null;
        t.bg = null;
        t.Holes = null;
        t.Steels = null;
        t.Screws = null;
        t.tempLevel = -1;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.start = function () {
        this.init();
    };
    t.prototype.init = function () {
        this.bg = this.node.getChildByName("bg");
        this.Holes = this.bg.getChildByName("holenode");
        this.Steels = this.bg.getChildByName("steelnode");
        this.Screws = this.bg.getChildByName("screwnode");
        this.readData();
    };
    t.prototype.readData = function () {
        var e;
        var t;
        var n;
        var o = this;
        var a = [];
        console.log(
            "commonData.currLevel=========>",
            $commonData.default.currLevel,
            $commonData.default.graphicalMaxLv
        );
        this.currentLevelconfig = $commonData.default.graphicalLevelConfig[$commonData.default.currLevel];
        console.log("----------关卡配置1", this.currentLevelconfig);
        console.log("----------关卡配置2", this.currentLevelconfig.children.length);
        console.log("---------加载背景");
        if ("" != this.currentLevelconfig.bgSpriteFrame) {
            var i = this.currentLevelconfig.bgSpriteFrame;
            a.push(this.loadTexture(i, this.bg));
            this.loadTexture(i, this.bg);
            for (var c = 0; c < this.currentLevelconfig.children.length; c++) {
                if ("holenode" == (r = this.currentLevelconfig.children[c]).name) {
                    e = r.children;
                } else {
                    "steelnode" == r.name ? (t = r.children) : "screwnode" == r.name && (n = r.children);
                }
            }
        } else {
            for (c = 0; c < this.currentLevelconfig.children.length; c++) {
                var r;
                if ("holenode" == (r = this.currentLevelconfig.children[c]).name) {
                    e = r.children;
                } else {
                    if ("steelnode" == r.name) {
                        t = r.children;
                    } else {
                        if ("screwnode" == r.name) {
                            n = r.children;
                        } else {
                            {
                                var l = new cc.Node(r.name);
                                l.addComponent(cc.Sprite);
                                l.setPosition(r.position.x, r.position.y);
                                l.setParent(this.bg.getChildByName("bgnode"));
                                a.push(this.loadTexture(r.name, l));
                                this.loadTexture(r.name, l);
                                this.bg.width = 700;
                                this.bg.height = 1100;
                            }
                        }
                    }
                }
            }
        }
        console.log("---------加载洞");
        for (c = 0; c < e.length; c++) {
            var s = e[c];
            var d = cc.instantiate(this.holePre);
            this.changeHoleToSmall(d);
            d.setPosition(s.position.x, s.position.y);
            d.setParent(this.Holes);
        }
        console.log("---------加载钢条");
        for (c = 0; c < t.length; c++) {
            var p = t[c];
            var h = new cc.Node("steel");
            h.group = p.group;
            h.addComponent(cc.Sprite);
            h.addComponent($steel.default);
            a.push(this.loadTexture(p.spriteFrame, h));
            this.loadTexture(p.spriteFrame, h);
            var m = h.addComponent(cc.RigidBody);
            var g = h.addComponent(cc.PhysicsPolygonCollider);
            m.gravityScale = 0;
            for (var v = 0; v < p.points.length; v++) {
                g.points[v] = cc.v2(p.points[v].x, p.points[v].y);
            }
            h.setPosition(p.position.x, p.position.y);
            h.setParent(this.Steels);
            for (v = 0; v < p.children.length; v++) {
                var w = p.children[v];
                var y = new cc.Node("holeTarget");
                y.setPosition(w.position.x, w.position.y);
                y.setParent(h);
            }
        }
        for (c = 0; c < n.length; c++) {
            var S = n[c];
            var k = new cc.Node("ignore");
            k.setPosition(S.position.x, S.position.y);
            k.setParent(this.Screws);
        }
        Promise.all(a).then(function () {
            o.createLevel();
        });
    };
    t.prototype.loadTexture = function (e, t, n) {
        if (void 0 === n) {
            n = !0;
        }
        var o = $commonData.default.graphicalLevelConfig[$commonData.default.currLevel.toString()];
        var a = Number(o.name.split("Lv")[1]);
        return new Promise(
            a
                ? function (n) {
                      $game.default.resManager
                          .loadBundleRes("graphicalMode-" + Math.floor(a / 10), "lv" + a + "/" + e, cc.SpriteFrame)
                          .catch(function () {
                              console.error("加载" + e + "失败!");
                              console.log("graphicalMode-" + Math.floor(a / 10));
                              console.log("lv" + a + "/" + e);
                              n(null);
                          })
                          .then(function (e) {
                              t.getComponent(cc.Sprite).spriteFrame = e;
                              n(null);
                          });
                  }
                : function (e) {
                      e(null);
                  }
        );
    };
    t.prototype.createLevel = function () {
        $commonData.default.TotalSteel = this.Steels.children.length;
        $commonData.default.LevelSteel = this.Steels.children.length;
        for (var e = 0; e < this.Steels.children.length; e++) {
            var t = this.Steels.children[e];
            t.getComponent(cc.RigidBody).gravityScale = 0;
            for (var n = 0; n < t.children.length; n++) {
                var o = t.children[n];
                o.width = 30;
                o.height = 30;
                var a = o.convertToWorldSpaceAR(cc.v2(0, 0));
                var i = (this.Steels.convertToNodeSpaceAR(a), t.addComponent(cc.RevoluteJoint));
                i.anchor.x = o.x;
                i.anchor.y = o.y;
                var c = this.findScrew(a);
                if (null == c) {
                    var r = this.Screws.convertToNodeSpaceAR(a);
                    var l = this.Holes.convertToNodeSpaceAR(a);
                    (p = cc.instantiate(this.screwPre)).getComponent(cc.Sprite).spriteFrame =
                        $newSkinView.default.instance.nailSkinImg[$commonData.default.currentNailSkin];
                    p.setPosition(r);
                    p.setParent(this.Screws);
                    c = p;
                    var s = cc.instantiate(this.holePre);
                    s.setPosition(l);
                    s.setParent(this.Holes);
                    this.changeHoleToSmall(s);
                    this.changeScrewToSmall(p);
                } else {
                    if ("ignore" == c.name) {
                        continue;
                    }
                }
                i.connectedBody = c.getComponent(cc.RigidBody);
            }
        }
        $commonData.default.screwNum = this.Screws.children.length;
        console.log("---------螺丝数量", $commonData.default.screwNum);
        var f = 0;
        $gameManager.default.instance.changePullOutBtn();
        for (e = 0; e < this.Screws.children.length; e++) {
            var p;
            if ("ignore" == (p = this.Screws.children[e]).name) {
                p.destroy();
            } else {
                f++;
                $screwNumberManager.screwNumberRecord(p, f.toString());
            }
        }
        $commonData.default.gamelevel = this.node.getComponent($graphicalGameLevel.default);
        this.node.getComponent($graphicalGameLevel.default).enabled = !0;
        $startView.default.instance.loadImg.active = !1;
    };
    t.prototype.findScrew = function (e) {
        var t = null;
        var n = this.Screws.convertToNodeSpaceAR(e);
        for (var o = 0; o < this.Screws.children.length; o++) {
            var a = this.Screws.children[o];
            if (a.getBoundingBox().contains(n)) {
                t = a;
            }
        }
        return t;
    };
    t.prototype.changeHoleToSmall = function (e) {
        if (
            -1 !=
            $commonData.default.graphicalLittleScrewLevel.indexOf(
                $commonData.default.graphicalRandomLevelList[$commonData.default.currLevel - 1]
            )
        ) {
            e.width = 25;
            e.height = 25;
            e.getComponent(cc.CircleCollider).radius = 10;
        }
    };
    t.prototype.changeScrewToSmall = function (e) {
        if (
            -1 !=
            $commonData.default.graphicalLittleScrewLevel.indexOf(
                $commonData.default.graphicalRandomLevelList[$commonData.default.currLevel - 1]
            )
        ) {
            e.width = 30;
            e.height = 30;
            e.getComponent(cc.PhysicsCircleCollider).radius = 12;
        }
    };
    t.instance = null;
    __decorate([s(cc.Prefab)], t.prototype, "screwPre", void 0);
    __decorate([s(cc.Prefab)], t.prototype, "screwOutPre", void 0);
    __decorate([s(cc.Prefab)], t.prototype, "holePre", void 0);
    return (n = __decorate([l], t));
})(cc.Component);
exports.default = w;
