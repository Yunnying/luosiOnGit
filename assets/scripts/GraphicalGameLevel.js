var a;
exports.ENUM_SCREW_STATUS = void 0;
var r;
var l = cc._decorator;
var s = l.ccclass;
var u = l.property;
var $graphicalCreateLevel = require("./GraphicalCreateLevel");
var $commonData = require("./commonData");
var $gameManager = require("./GameManager");
var $noviceView = require("./noviceView");
var $topView = require("./topView");
var $screwNumberManager = require("./ScrewNumberManager");
var $newSkinView = require("./newSkinView");
!(function (e) {
    e.IDLE = "idle";
    e.ACTIVE = "active";
    e.MOVING = "moving";
    e.Ani = "ani";
})((r = exports.ENUM_SCREW_STATUS || (exports.ENUM_SCREW_STATUS = {})));
var w = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.screwPre = null;
        t.screwOutPre = null;
        t.bg = null;
        t.Holes = null;
        t.Steels = null;
        t.Screws = null;
        t.currentScrew = null;
        t.screwOut = null;
        t.screwTop = null;
        t.screwStatus = r.IDLE;
        t.cloneNode = null;
        t.cloneNode1 = null;
        t.cloneNode2 = null;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onEnable = function () {
        this.init();
    };
    t.prototype.init = function () {
        this.bg = this.node.getChildByName("bg");
        this.Holes = this.bg.getChildByName("holenode");
        this.Steels = this.bg.getChildByName("steelnode");
        this.Screws = this.bg.getChildByName("screwnode");
        $commonData.default.useItemNum = [0, 0, 0, 0, 0];
        $commonData.default.isPause = !1;
        $commonData.default.isGetAnswer = !1;
        console.log("----------------gamelevel init", $commonData.default.currLevel);
        this.initData();
        $commonData.default.gamelevel = this.node.getComponent(n);
        $topView.default.instance.changeSetBtn();
    };
    t.prototype.reload = function () {
        $commonData.default.useItemNum[0] = 0;
        $commonData.default.useItemNum[1] = 0;
        $commonData.default.useItemNum[3] = 0;
        console.log("----------------gamelevel reload");
        this.initData();
    };
    t.prototype.initData = function () {
        this.screwStatus = r.IDLE;
        $commonData.default.isgameing = !0;
        $commonData.default.isAddTime = !1;
        $commonData.default.isUnLock = !0;
        this.cloneNode = null;
        this.cloneNode1 = null;
        this.cloneNode2 = null;
        this.screwOut = null;
        this.currentScrew = null;
        this.screwTop = null;
        $gameManager.default.instance.changeWithDrew();
        $gameManager.default.instance.changeDigBtn();
        $gameManager.default.instance.changeReset();
        this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    t.prototype.onTouchStart = function (e) {
        var t = this;
        if (this.screwStatus != r.MOVING && this.screwStatus != r.Ani) {
            var n = e.getLocation();
            if ($commonData.default.isPullOut) {
                var o;
                if ((o = this.findScrew(n))) {
                    console.log("找到螺丝", o.name);
                    $gameManager.default.instance.setAniNodePosition(o.position, 1);
                    this.currentScrew != o && (this.setScrewActive(this.currentScrew, !1), this.setScrewActive(o, !0));
                } else {
                    {
                        if (null == this.screwOut) {
                            return;
                        }
                        $gameManager.default.instance.setAniNodePosition(cc.v2(this.currentScrew.position), 1);
                        if (null == this.findScrew2(n)) {
                            return;
                        }
                    }
                }
                try {
                    $graphicalCreateLevel.default.instance.node.getChildByName("bg").getChildByName("mask").active = !1;
                    $gameManager.default.instance.ButtonNode.active = !0;
                } catch (e) {}
                $commonData.default.useItemNum[3]++;
                this.currentScrew.destroy();
                $commonData.default.isPullOut = !1;
                this.screwStatus = r.Ani;
                $commonData.default.screwNum--;
                this.scheduleOnce(function () {
                    cc.tween(t.screwOut)
                        .to(0.2, {
                            scaleX: 1.4,
                            scaleY: 1.4
                        })
                        .call(function () {
                            $gameManager.default.instance.playPullOutAni();
                        })
                        .to(0.2, {
                            scaleX: 1.5,
                            scaleY: 1.5,
                            opacity: 0
                        })
                        .call(function () {
                            t.screwOut.destroy();
                            t.screwOut = null;
                            t.currentScrew = null;
                            t.screwStatus = r.IDLE;
                            t.setSpeed();
                        })
                        .start();
                }, 0.25);
                return void $gameManager.default.instance.changePullOutBtn();
            }
            if (null != this.currentScrew) {
                if ((o = this.findScrew(n))) {
                    if (o == this.currentScrew) {
                        this.setScrewActive(this.currentScrew, !1);
                    } else {
                        this.setScrewActive(this.currentScrew, !1);
                        this.setScrewActive(o, !0);
                    }
                } else {
                    {
                        var a = this.findHole(n);
                        if (a) {
                            console.log("把螺丝挪到这里");
                            var i = a.convertToWorldSpaceAR(cc.v2(0, 0));
                            var c = a.getComponent(cc.CircleCollider).radius;
                            var l = a.getBoundingBox();
                            var s = !1;
                            var u = !1;
                            var h = [];
                            for (var m = 0; m < this.Steels.children.length; m++) {
                                var g = this.Steels.children[m];
                                g.getComponent(cc.RigidBody).syncPosition(!0);
                                var v = g.convertToNodeSpaceAR(i);
                                var w = (cc.v2(g.x, g.y), g.convertToWorldSpaceAR(cc.v2(0, 0)));
                                var y = !1;
                                if ((g.name = "steel")) {
                                    var S = g.getComponent(cc.PhysicsPolygonCollider).points;
                                    y = cc.Intersection.polygonCircle(S, {
                                        position: v,
                                        radius: c
                                    });
                                } else {
                                    if ((g.name = "steel_circle")) {
                                        var k = g.getComponent(cc.PhysicsCircleCollider).radius;
                                        y = cc.Intersection.circleCircle(
                                            {
                                                position: w,
                                                radius: k
                                            },
                                            {
                                                position: i,
                                                radius: c
                                            }
                                        );
                                    }
                                }
                                if (y) {
                                    s = !0;
                                    console.log("=====洞和钢条相交");
                                    for (var b = 0; b < g.children.length; b++) {
                                        var P = g.children[b];
                                        var _ = P.convertToWorldSpaceAR(cc.v2(0, 0));
                                        var N = this.Holes.convertToNodeSpaceAR(_);
                                        var M = P.getBoundingBox();
                                        M.x = N.x;
                                        M.y = N.y;
                                        if (M.intersects(l)) {
                                            console.log("=====洞和带孔的钢条相交");
                                            var A = this.getDistance(i, _);
                                            var I = 8;
                                            if (
                                                -1 !=
                                                $commonData.default.graphicalLittleScrewLevel.indexOf(
                                                    $commonData.default.graphicalRandomLevelList[
                                                        $commonData.default.currLevel - 1
                                                    ]
                                                )
                                            ) {
                                                I = 4;
                                            }
                                            console.log("两点间的距离", A, 50);
                                            if (A > 50) {
                                                continue;
                                            }
                                            if (!(A <= I)) {
                                                u = !0;
                                                break;
                                            }
                                            h.push(P);
                                        }
                                    }
                                }
                            }
                            if (u) {
                                h = [];
                            }
                            if (0 != a.children.length) {
                                s = !0;
                                h = [];
                                console.log("这个洞被锁住了");
                            }
                            if (s && h.length <= 0) {
                                console.log("孔被遮挡了");
                                this.screwStatus = r.Ani;
                                return void this.playAni();
                            }
                            this.screwStatus = r.MOVING;
                            this.saveLevelData();
                            var D = cc.moveTo(0.5, cc.v2(a.x, a.y + 30));
                            cc.tween(this.screwOut)
                                .then(D)
                                .call(function () {
                                    if (h.length) {
                                        t.setScrew(a, h);
                                    } else {
                                        t.setScrew(a);
                                    }
                                })
                                .start();
                        } else {
                            this.setScrewActive(this.currentScrew, !1);
                        }
                    }
                }
            } else {
                if ((o = this.findScrew(n))) {
                    this.setScrewActive(o, !0);
                }
            }
        } else {
            console.log("--------------return--------------", this.screwStatus);
        }
    };
    t.prototype.onDestroy = function () {
        this.bg.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    t.prototype.onTouchEnd = function () {
        this.bg.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    t.prototype.findScrew = function (e) {
        var t = null;
        for (var n = 0; n < this.Screws.children.length; n++) {
            var o = this.Screws.children[n];
            var a = o.getBoundingBox();
            if (
                -1 !=
                $commonData.default.graphicalLittleScrewLevel.indexOf(
                    $commonData.default.graphicalRandomLevelList[$commonData.default.currLevel - 1]
                )
            ) {
                a.width += 5;
                a.height += 5;
            }
            var i = o.parent.convertToNodeSpaceAR(e);
            if (a.contains(i)) {
                if ("screwOut" != (t = o).name) {
                    break;
                }
                t = null;
            }
        }
        return t;
    };
    t.prototype.findScrew2 = function (e) {
        var t = null;
        for (var n = 0; n < this.Screws.children.length; n++) {
            var o = this.Screws.children[n];
            var a = o.getBoundingBox();
            if (
                -1 !=
                $commonData.default.graphicalLittleScrewLevel.indexOf(
                    $commonData.default.graphicalRandomLevelList[$commonData.default.currLevel - 1]
                )
            ) {
                a.width += 5;
                a.height += 5;
            }
            var i = o.parent.convertToNodeSpaceAR(e);
            if (a.contains(i)) {
                if ("screwOut" == (t = o).name) {
                    break;
                }
                t = null;
                break;
            }
        }
        return t;
    };
    t.prototype.playAni = function () {
        var e = this;
        var t = this.screwOut.getPosition();
        cc.tween(this.screwOut)
            .to(
                0.1,
                {
                    position: new cc.Vec3(t.x + 5, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.1,
                {
                    position: new cc.Vec3(t.x - 5, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.05,
                {
                    position: new cc.Vec3(t.x + 8, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.05,
                {
                    position: new cc.Vec3(t.x - 8, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.02,
                {
                    position: new cc.Vec3(t.x, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .call(function () {
                e.screwStatus = r.IDLE;
            })
            .start();
    };
    t.prototype.findHole = function (e) {
        var t = null;
        for (var n = 0; n < this.Holes.children.length; n++) {
            var o = this.Holes.children[n];
            var a = o.getBoundingBox();
            var i = o.parent.convertToNodeSpaceAR(e);
            if (a.contains(i)) {
                t = o;
                break;
            }
        }
        var c = 25;
        var r = 18;
        if (
            -1 !=
            $commonData.default.graphicalLittleScrewLevel.indexOf(
                $commonData.default.graphicalRandomLevelList[$commonData.default.currLevel - 1]
            )
        ) {
            c = 12;
            r = 10;
        }
        if (t) {
            console.log("targetHole", t.name);
            var l = t.getBoundingBox();
            for (n = 0; n < this.Screws.children.length; n++) {
                var s = this.Screws.children[n];
                if ("screw" == s.name) {
                    var u = s.getBoundingBox();
                    if (
                        cc.Intersection.circleCircle(
                            {
                                position: cc.v2(s.position),
                                radius: c
                            },
                            {
                                position: cc.v2(t.position),
                                radius: r
                            }
                        )
                    ) {
                        console.log("-----isRect", l, u);
                        t = null;
                        break;
                    }
                }
            }
        }
        return t;
    };
    t.prototype.setScrewActive = function (e, t) {
        var n = this;
        if (void 0 === t) {
            t = !0;
        }
        if (e && "screwOut" != e.name) {
            if (t) {
                $gameManager.default.instance.playPutOut();
            } else {
                $gameManager.default.instance.playPutIn();
            }
            if (1 == $commonData.default.currLevel && 0 == $commonData.default.passedNovice) {
                $noviceView.default.instance.nextStep();
            }
            var o = 20;
            if (t) {
                this.screwStatus = r.ACTIVE;
                var a = cc.v2(e.x, e.y);
                e.opacity = 0;
                this.currentScrew = e;
                this.screwOut = cc.instantiate(this.screwOutPre);
                $screwNumberManager.recordCurScrewNumber(this.currentScrew);
                this.screwOut.children[1].getComponent(cc.Sprite).spriteFrame =
                    $newSkinView.default.instance.nailSkinImg[$commonData.default.currentNailSkin];
                if (
                    -1 !=
                    $commonData.default.graphicalLittleScrewLevel.indexOf(
                        $commonData.default.graphicalRandomLevelList[$commonData.default.currLevel - 1]
                    )
                ) {
                    this.screwOut.children[1].width = 30;
                    this.screwOut.children[1].height = 30;
                    this.screwOut.children[1].y = 10;
                    this.screwOut.children[0].width = 15;
                    this.screwOut.children[0].height = 28;
                    o = 10;
                }
                this.screwOut.parent = e.parent;
                this.screwOut.name = "screwOut";
                this.screwOut.setPosition(a);
                this.screwOut.opacity = 255;
                this.screwTop = this.screwOut.getChildByName("top");
                var i = cc.moveBy(0.2, 0, 30);
                var c = cc.moveBy(0.2, 0, o);
                cc.tween(this.screwOut).then(i).start();
                cc.tween(this.screwTop).then(c).start();
            } else {
                if (
                    -1 !=
                    $commonData.default.graphicalLittleScrewLevel.indexOf(
                        $commonData.default.graphicalRandomLevelList[$commonData.default.currLevel - 1]
                    )
                ) {
                    o = 10;
                }
                i = cc.moveBy(0.2, 0, -30);
                c = cc.moveBy(0.2, 0, -o);
                var l = this.screwOut;
                var s = this.screwTop;
                var u = e;
                this.currentScrew = null;
                this.screwOut = null;
                this.screwTop = null;
                cc.tween(l).then(i).start();
                cc.tween(s)
                    .then(c)
                    .call(function () {
                        l.destroy();
                        if (!(u == n.currentScrew && null != n.screwOut)) {
                            e.opacity = 255;
                        }
                        n.screwStatus = r.IDLE;
                    })
                    .start();
            }
        }
    };
    t.prototype.setScrew = function (e, t) {
        var n = this;
        $gameManager.default.instance.playPutIn();
        if (
            1 == $commonData.default.currLevel &&
            0 == $commonData.default.passedNovice &&
            2 == $noviceView.default.instance.progress
        ) {
            $noviceView.default.instance.nextStep();
        }
        var o = cc.moveBy(0.2, 0, -30);
        var a = cc.moveBy(0.2, 0, -15);
        cc.tween(this.screwOut).then(o).start();
        cc.tween(this.screwTop)
            .then(a)
            .call(function () {
                if (n.currentScrew) {
                    n.currentScrew.destroy();
                }
                n.currentScrew = null;
                n.screwOut.destroy();
                n.screwOut = null;
                n.screwTop = null;
                var o = cc.instantiate(n.screwPre);
                o.getComponent(cc.Sprite).spriteFrame =
                    $newSkinView.default.instance.nailSkinImg[$commonData.default.currentNailSkin];
                $screwNumberManager.screwNumberRecord(o, $screwNumberManager.curScrewNumber);
                o.setPosition(e.position);
                o.setParent(n.Screws);
                $graphicalCreateLevel.default.instance.changeScrewToSmall(o);
                n.screwStatus = r.IDLE;
                if (t) {
                    o.group = "default";
                    o.getComponent(cc.PhysicsCircleCollider).apply();
                    var a = function (e) {
                        for (
                            var a = t[e],
                                i = a.convertToWorldSpaceAR(cc.v2(0, 0)),
                                c = a.parent,
                                r = c.convertToNodeSpaceAR(i),
                                l = c.getComponents(cc.RevoluteJoint),
                                s = null,
                                u = null,
                                d = 0;
                            d < l.length;
                            d++
                        ) {
                            var f = l[d];
                            if (n.getDistance(f.anchor, r) <= 20) {
                                s = f;
                                u = f.anchor;
                                console.log("找到关节", e, d);
                                break;
                            }
                        }
                        if (s) {
                            s.destroy();
                            n.scheduleOnce(function () {
                                o.group = "screw";
                                o.getComponent(cc.PhysicsCircleCollider).apply();
                                var e = c.addComponent(cc.RevoluteJoint);
                                e.anchor.x = u.x;
                                e.anchor.y = u.y;
                                e.connectedBody = o.getComponent(cc.RigidBody);
                            });
                        }
                    };
                    for (var i = 0; i < t.length; i++) {
                        a(i);
                    }
                }
                n.setSpeed();
                n.screwStatus = r.IDLE;
            })
            .start();
    };
    t.prototype.setSpeed = function () {
        var e;
        var t;
        var n = function (n) {
            for (
                var a = o.Steels.children[n],
                    i = a.getComponent(cc.RigidBody),
                    c = a.getComponents(cc.RevoluteJoint),
                    r = 0,
                    l = !1,
                    s = 0;
                s < c.length;
                s++
            )
                (
                    null === (t = null === (e = c[s].connectedBody) || void 0 === e ? void 0 : e.node) || void 0 === t
                        ? void 0
                        : t.active
                )
                    ? (r += 1)
                    : (l = !0);
            if (l) {
                i.gravityScale = 2;
                1 == r &&
                    o.scheduleOnce(function () {
                        if (i.angularVelocity < 2) {
                            i.angularVelocity = 5;
                        }
                    });
                0 == r &&
                    o.scheduleOnce(function () {
                        if (i.linearVelocity.x < 15) {
                            i.linearDamping = 0.2;
                            i.linearVelocity = cc.v2(50, 0);
                        }
                    });
            } else {
                i.gravityScale = 0.1;
            }
        };
        var o = this;
        for (var a = 0; a < this.Steels.children.length; a++) {
            n(a);
        }
    };
    t.prototype.getDistance = function (e, t) {
        var n = cc.v2(e.x - t.x, e.y - t.y);
        return Math.sqrt(n.x * n.x + n.y * n.y);
    };
    t.prototype.getRectPos = function (e, t, n, o) {
        var a = [];
        a.push(
            new cc.Vec2(
                e.x + (n * Math.cos(t)) / 2 - (o * Math.sin(t)) / 2,
                e.y + (n * Math.sin(t)) / 2 + (o * Math.cos(t)) / 2
            )
        );
        a.push(
            new cc.Vec2(
                e.x - (n * Math.cos(t)) / 2 - (o * Math.sin(t)) / 2,
                e.y - (n * Math.sin(t)) / 2 + (o * Math.cos(t)) / 2
            )
        );
        a.push(
            new cc.Vec2(
                e.x - (n * Math.cos(t)) / 2 + (o * Math.sin(t)) / 2,
                e.y - (n * Math.sin(t)) / 2 - (o * Math.cos(t)) / 2
            )
        );
        a.push(
            new cc.Vec2(
                e.x + (n * Math.cos(t)) / 2 + (o * Math.sin(t)) / 2,
                e.y + (n * Math.sin(t)) / 2 - (o * Math.cos(t)) / 2
            )
        );
        return a;
    };
    t.prototype.getRotatePos = function (e, t, n) {
        var o = [];
        for (var a = 0; a < e.length; a++) {
            var i = e[a].x - t.x;
            var c = e[a].y - t.y;
            var r = i * Math.cos(n) - c * Math.sin(n);
            var l = i * Math.sin(n) + c * Math.cos(n);
            o.push(cc.v2(r + t.x, l + t.y));
        }
        return o;
    };
    t.prototype.saveLevelData = function () {
        console.log("记录关卡配置");
        this.cloneNode2 = this.cloneNode1;
        this.cloneNode1 = this.cloneNode;
        this.cloneNode = cc.instantiate(this.bg);
        $gameManager.default.instance.changeWithDrew();
    };
    t.prototype.withDrew = function () {
        if (null != this.cloneNode) {
            this.bg.removeFromParent();
            this.bg.destroy();
            this.cloneNode.setParent(this.node);
            this.cloneNode.setPosition(0, 0);
            this.bg = this.cloneNode;
            this.cloneNode = this.cloneNode1;
            this.cloneNode1 = this.cloneNode2;
            this.cloneNode2 = null;
            this.Holes = this.bg.getChildByName("holenode");
            this.Steels = this.bg.getChildByName("steelnode");
            this.Screws = this.bg.getChildByName("screwnode");
            this.screwOut = this.Screws.getChildByName("screwOut");
            if (this.screwOut) {
                this.screwOut.destroy();
            }
            for (var e = 0; e < this.Screws.children.length; e++) {
                if (0 == this.Screws.children[e].opacity) {
                    this.Screws.children[e].opacity = 255;
                }
            }
            if ($commonData.default.isUnLock) {
                for (e = 0; e < this.Holes.children.length; e++) {
                    if (this.Holes.children[e].children.length > 0) {
                        this.Holes.children[e].children[0].destroy();
                    }
                }
            }
            this.screwOut = null;
            this.screwTop = null;
            this.currentScrew = null;
            this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            $commonData.default.screwNum = this.Screws.children.length;
            $commonData.default.TotalSteel = this.Steels.children.length;
            console.log("撤回", $commonData.default.useItemNum[1]);
            $gameManager.default.instance.changeWithDrew();
            $gameManager.default.instance.changePullOutBtn();
        } else {
            console.log("无法撤回");
        }
    };
    t.instance = null;
    __decorate([u(cc.Prefab)], t.prototype, "screwPre", void 0);
    __decorate([u(cc.Prefab)], t.prototype, "screwOutPre", void 0);
    return (n = __decorate([s], t));
})(cc.Component);
exports.default = w;
