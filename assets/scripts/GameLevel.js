var a;
exports.ENUM_SCREW_STATUS = void 0;
var r;
var $commonData = require("./commonData");
var $itemView = require("./itemView");
var $gameManager = require("./GameManager");
var $noviceView = require("./noviceView");
var $config = require("./config");
var $uIManager = require("./UIManager");
var $newSkinView = require("./newSkinView");
var $screwNumberManager = require("./ScrewNumberManager");
var g = cc._decorator;
var v = g.ccclass;
var w = g.property;
var y = 80;
!(function (e) {
    e.IDLE = "idle";
    e.ACTIVE = "active";
    e.MOVING = "moving";
    e.Ani = "ani";
})((r = exports.ENUM_SCREW_STATUS || (exports.ENUM_SCREW_STATUS = {})));
var S = (function (t) {
    function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.screwPre = null;
        e.screwOutPre = null;
        e.holePre = null;
        e.steelPre = null;
        e.steel_holePre = null;
        e.steel_hole2Pre = null;
        e.lockPre = null;
        e.spSteelPre = [];
        e.spSteelPre2 = [];
        e.holeMaskPre = null;
        e.skinNodePre = null;
        e.bg = null;
        e.Holes = null;
        e.Steels = null;
        e.Screws = null;
        e.currentScrew = null;
        e.screwOut = null;
        e.screwTop = null;
        e.screwStatus = r.IDLE;
        e.currentLevelconfig = null;
        e.cloneNode = null;
        e.cloneNode1 = null;
        e.cloneNode2 = null;
        e.collisionPos = [];
        e.steelx = [];
        e.steely = [];
        e.desScrew = null;
        return e;
    }
    __extends(n, t);
    n.prototype.onLoad = function () {
        $screwNumberManager.isShowNumberInit();
        window["gameLevel"]=this;
    };
    n.prototype.init = function () {
        if ($commonData.default.windowHeight / $commonData.default.windowWidth < 1.8) {
            y = 70;
        }
        this.screwStatus = r.IDLE;
        console.log("factor", y);
        $commonData.default.isgameing = !0;
        $commonData.default.isPause = !1;
        $commonData.default.useItemNum = [0, 0, 0, 0];
        $commonData.default.isAddTime = !1;
        $commonData.default.screwNum = 0;
        $commonData.default.isUnLock = !0;
        $commonData.default.isGetAnswer = !1;
        this.cloneNode = null;
        this.cloneNode1 = null;
        this.cloneNode2 = null;
        this.screwOut = null;
        this.currentScrew = null;
        this.screwTop = null;
        this.desScrew = null;
        console.log("=========init");
        this.bg = this.node.getChildByName("bg");
        this.Holes = this.bg.getChildByName("holenode");
        this.Steels = this.bg.getChildByName("steelnode");
        this.Screws = this.bg.getChildByName("screwnode");
        $gameManager.default.instance.changeWithDrew();
        $gameManager.default.instance.changeDigBtn();
        $gameManager.default.instance.changeReset();
        this.createLevelAni();
        this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    n.prototype.reload = function () {
        var e = this;
        $commonData.default.useItemNum[0] = 0;
        $commonData.default.useItemNum[1] = 0;
        $commonData.default.useItemNum[3] = 0;
        $commonData.default.isAddTime = !1;
        $commonData.default.screwNum = 0;
        $commonData.default.isgameing = !0;
        this.screwStatus = r.IDLE;
        this.Holes.removeAllChildren();
        this.Steels.removeAllChildren();
        this.Screws.removeAllChildren();
        this.cloneNode = null;
        this.cloneNode1 = null;
        this.cloneNode2 = null;
        this.screwOut = null;
        this.currentScrew = null;
        this.screwTop = null;
        this.desScrew = null;
        $commonData.default.isUnLock = !0;
        $commonData.default.isDig = !1;
        $gameManager.default.instance.changeWithDrew();
        $gameManager.default.instance.changeDigBtn();
        $gameManager.default.instance.changeReset();
        this.scheduleOnce(function () {
            e.createLevelAni();
        });
    };
    n.prototype.unLock = function () {
        if (!$commonData.default.isUnLock) {
            var e = function (e) {
                var n = t.Holes.children[e];
                if (n.children.length > 0) {
                    var o = cc.moveBy(0.8, cc.v2(0, 10));
                    cc.tween(n.children[0].children[0])
                        .then(o)
                        .call(function () {
                            $gameManager.default.instance.playUnlockAni();
                            n.children[0].destroy();
                            $gameManager.default.instance.playVibe();
                            $gameManager.default.instance.changeDigBtn();
                        })
                        .start();
                    $commonData.default.isUnLock = !0;
                    $commonData.default.useItemNum[0]++;
                    return "break";
                }
            };
            var t = this;
            for (var n = 0; n < this.Holes.children.length && "break" !== e(n); n++) {}
        }
    };
    n.prototype.onDestroy = function () {
        console.log("--------destroy");
        this.bg.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    n.prototype.onTouchStart = function (e) {
        console.error("触摸");
        var t = this;
        if (this.screwStatus != r.MOVING && this.screwStatus != r.Ani) {
            var n = e.getLocation();
            var o = this.findHole(n);
            if (o && o.children.length > 0) {
                $itemView.default.instance.clickDigHole_video();
            } else {
                {
                    if ($commonData.default.isPullOut) {
                        if ((a = this.findScrew(n))) {
                            console.log("找到螺丝", a.name);
                            $gameManager.default.instance.setAniNodePosition(a.position, 1);
                            this.currentScrew != a &&
                                (this.setScrewActive(this.currentScrew, !1), this.setScrewActive(a, !0));
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
                        this.desScrew = n;
                        if ($config.currentPlatform != $config.platformEnum.wechat) {
                            $commonData.default.useItemNum[3]++;
                        }
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
                    var a;
                    if (this.currentScrew) {
                        if ((a = this.findScrew333(n))) {
                            if (a == this.currentScrew) {
                                this.setScrewActive(this.currentScrew, !1);
                            } else {
                                this.setScrewActive(this.currentScrew, !1);
                                this.setScrewActive(a, !0);
                            }
                        } else {
                            {
                                var i = this.findHole(n);
                                if (i) {
                                    console.log("把螺丝挪到这里");
                                    var c = i.convertToWorldSpaceAR(cc.v2(0, 0));
                                    var d = i.getComponent(cc.CircleCollider).radius;
                                    var p = (i.getBoundingBox(), !1);
                                    var h = !1;
                                    var m = !1;
                                    var g = [];
                                    for (var v = 0; v < this.Steels.children.length; v++) {
                                        var w = this.Steels.children[v];
                                        w.getComponent(cc.RigidBody).syncPosition(!0);
                                        var S = w.convertToNodeSpaceAR(c);
                                        var k = (cc.v2(w.x, w.y), w.convertToWorldSpaceAR(cc.v2(0, 0)));
                                        var b = !1;
                                        if ("steel" == w.name || "spSteel_square" == w.name) {
                                            var P = w.getComponent(cc.PhysicsPolygonCollider).points;
                                            b = cc.Intersection.polygonCircle(P, {
                                                position: S,
                                                radius: d
                                            });
                                        } else {
                                            if ("spSteel_circle" == w.name) {
                                                var _ = w.getComponent(cc.PhysicsCircleCollider).radius;
                                                b = cc.Intersection.circleCircle(
                                                    {
                                                        position: k,
                                                        radius: _
                                                    },
                                                    {
                                                        position: c,
                                                        radius: d
                                                    }
                                                );
                                            }
                                        }
                                        if (b) {
                                            p = !0;
                                            console.log("=====洞和钢条相交");
                                            if ("spSteel_circle" == w.name) {
                                                m = !0;
                                            }
                                            for (var N = 0; N < w.children.length; N++) {
                                                var M;
                                                var A;
                                                var I = w.children[N];
                                                var D = I.convertToWorldSpaceAR(cc.v2(0, 0));
                                                var C = (this.Holes.convertToNodeSpaceAR(D), I.getBoundingBox());
                                                if ("steel" == w.name) {
                                                    A = this.getRectPos(
                                                        cc.v2(I.x, I.y),
                                                        I.parent.angle,
                                                        C.width,
                                                        C.height
                                                    );
                                                    M = this.getRectPos(
                                                        cc.v2(I.x, I.y),
                                                        I.parent.angle,
                                                        C.width - y,
                                                        C.height
                                                    );
                                                    if (
                                                        cc.Intersection.polygonCircle(A, {
                                                            position: S,
                                                            radius: d
                                                        }) &&
                                                        "steel_hole" == I.name
                                                    ) {
                                                        console.log("=====洞和带孔的钢条相交");
                                                        var B = this.getDistance(c, D);
                                                        var L = 85;
                                                        if (70 == y) {
                                                            L = 65;
                                                        }
                                                        console.log("两点间的距离", B, L);
                                                        if (B > L) {
                                                            continue;
                                                        }
                                                        if (!(B <= 8)) {
                                                            h = !0;
                                                            break;
                                                        }
                                                        g.push(I);
                                                    }
                                                    if (
                                                        cc.Intersection.polygonCircle(M, {
                                                            position: S,
                                                            radius: d
                                                        })
                                                    ) {
                                                        if (C.width < y) {
                                                            continue;
                                                        }
                                                        if ("steel_hole" != I.name) {
                                                            console.log("=====洞和不带孔的钢条相交");
                                                            h = !0;
                                                        }
                                                    }
                                                } else {
                                                    if ("spSteel_circle" == w.name) {
                                                        console.log("==圆条孔洞和洞相交");
                                                        if (
                                                            cc.Intersection.circleCircle(
                                                                {
                                                                    position: S,
                                                                    radius: d
                                                                },
                                                                {
                                                                    position: cc.v2(I.position),
                                                                    radius: d
                                                                }
                                                            )
                                                        ) {
                                                            B = this.getDistance(c, D);
                                                            console.log("===圆条孔洞和洞的距离", B);
                                                            L = 85;
                                                            if (70 == y) {
                                                                L = 65;
                                                            }
                                                            if (B > L) {
                                                                continue;
                                                            }
                                                            if (!(B <= 8)) {
                                                                h = !0;
                                                                break;
                                                            }
                                                            g.push(I);
                                                            m = !1;
                                                        }
                                                    } else {
                                                        if ("spSteel_square" == w.name) {
                                                            B = this.getDistance(c, D);
                                                            console.log("===方块孔洞和洞的距离", B);
                                                            if (B > 113) {
                                                                continue;
                                                            }
                                                            if (!(B <= 8)) {
                                                                h = !0;
                                                                break;
                                                            }
                                                            g.push(I);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (h || m) {
                                        g = [];
                                    }
                                    if (0 != i.children.length) {
                                        p = !0;
                                        g = [];
                                        console.log("这个洞被锁住了");
                                    }
                                    if (p && g.length <= 0) {
                                        console.log("孔被遮挡了");
                                        this.screwStatus = r.Ani;
                                        return void this.playAni();
                                    }
                                    this.screwStatus = r.MOVING;
                                    this.saveLevelData();
                                    var O = cc.moveTo(0.3, cc.v2(i.x, i.y + 40));
                                    cc.tween(this.screwOut)
                                        .then(O)
                                        .call(function () {
                                            if (g.length) {
                                                t.setScrew(i, g);
                                            } else {
                                                t.setScrew(i);
                                            }
                                        })
                                        .start();
                                } else {
                                    this.setScrewActive(this.currentScrew, !1);
                                }
                            }
                        }
                    } else {
                        if ((a = this.findScrew333(n))) {
                            this.setScrewActive(a, !0);
                        }
                    }
                }
            }
        } else {
            console.log("--------------return--------------", this.screwStatus);
        }
    };

    n.prototype.findScrew333 = function (e) {
        var t = null;
        for (var n = 0; n < this.Screws.children.length; n++) {
            var o = this.Screws.children[n];
            var a = new cc.Rect(o.x-50,o.y-50,100,100)//  o.getChildByName("click").getBoundingBox();
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
    n.prototype.findScrew = function (e) {
        var t = null;
        for (var n = 0; n < this.Screws.children.length; n++) {
            var o = this.Screws.children[n];
            var a = o.getBoundingBox();
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
    n.prototype.findScrew2 = function (e) {
        var t = null;
        for (var n = 0; n < this.Screws.children.length; n++) {
            var o = this.Screws.children[n];
            var a = o.getBoundingBox();
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
    n.prototype.playAni = function () {
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
    n.prototype.findHole = function (e) {
        var t = null;
        for (var n = 0; n < this.Holes.children.length; n++) {
            var o = this.Holes.children[n];
            var a = o.getBoundingBox();
            a.width += 30;
            a.height += 30;
            var i = o.parent.convertToNodeSpaceAR(e);
            if (a.contains(i)) {
                t = o;
                break;
            }
        }
        if (t) {
            var c = t.getBoundingBox();
            for (n = 0; n < this.Screws.children.length; n++) {
                var r = this.Screws.children[n];
                if ("screw" == r.name) {
                    var l = r.getBoundingBox();
                    if (cc.Intersection.rectRect(c, l)) {
                        t = null;
                        break;
                    }
                }
            }
        }
        return t;
    };
    n.prototype.setScrewActive = function (t, n) {
        var o = this;
        if (void 0 === n) {
            n = !0;
        }
        if (t && "screwOut" != t.name) {
            console.error(
                "设置螺丝状态-------1----",
                $commonData.default.currLevel,
                typeof $commonData.default.passedNovice
            );
            console.error("设置螺丝状态-------1----", $commonData.default.passedNovice);
            if (1 == $commonData.default.currLevel && 0 == $commonData.default.passedNovice) {
                $noviceView.default.instance.nextStep();
            }
            if (n) {
                this.screwStatus = r.ACTIVE;
                var a = cc.v2(t.x, t.y);
                t.opacity = 0;
                this.currentScrew = t;
                $screwNumberManager.recordCurScrewNumber(this.currentScrew);
                this.screwOut = cc.instantiate(this.screwOutPre);
                this.screwOut.children[1].getComponent(cc.Sprite).spriteFrame =
                    $newSkinView.default.instance.nailSkinImg[$commonData.default.currentNailSkin];
                if (70 == y) {
                    this.screwOut.getChildByName("top").width = 60;
                    this.screwOut.getChildByName("top").height = 60;
                    this.screwOut.width = 60;
                    this.screwOut.height = 60;
                }
                this.screwOut.parent = t.parent;
                this.screwOut.name = "screwOut";
                this.screwOut.setPosition(a);
                this.screwOut.opacity = 255;
                this.screwTop = this.screwOut.getChildByName("top");
                var i = 20;
                if (70 == y) {
                    i = 10;
                }
                var c = cc.moveBy(0.2, 0, 40);
                var s = cc.moveBy(0.2, 0, i);
                cc.tween(this.screwOut).then(c).start();
                cc.tween(this.screwTop).then(s).start();
            } else {
                i = 20;
                if (70 == y) {
                    i = 10;
                }
                c = cc.moveBy(0.2, 0, -40);
                s = cc.moveBy(0.2, 0, -i);
                var u = this.screwOut;
                var f = this.screwTop;
                var p = t;
                this.currentScrew = null;
                this.screwOut = null;
                this.screwTop = null;
                cc.tween(u).then(c).start();
                cc.tween(f)
                    .then(s)
                    .call(function () {
                        u.destroy();
                        if (!(p == o.currentScrew && null != o.screwOut)) {
                            t.opacity = 255;
                        }
                        o.screwStatus = r.IDLE;
                    })
                    .start();
            }
        }
    };
    n.prototype.setScrew = function (e, t) {
        var n = this;
        if (
            1 == $commonData.default.currLevel &&
            0 == $commonData.default.passedNovice &&
            2 == $noviceView.default.instance.progress
        ) {
            $noviceView.default.instance.nextStep();
        }
        var o = 20;
        if (70 == y) {
            o = 10;
        }
        var a = cc.moveBy(0.2, 0, -40);
        var i = cc.moveBy(0.2, 0, -o);
        cc.tween(this.screwOut).then(a).start();
        cc.tween(this.screwTop)
            .then(i)
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
                if (70 == y) {
                    o.width = 60;
                    o.height = 60;
                    o.getComponent(cc.PhysicsCircleCollider).radius = 18;
                }
                o.setPosition(e.position);
                o.setParent(n.Screws);
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
    n.prototype.saveLevelData = function () {
        console.log("记录关卡配置");
        this.cloneNode2 = this.cloneNode1;
        this.cloneNode1 = this.cloneNode;
        this.cloneNode = cc.instantiate(this.bg);
        $gameManager.default.instance.changeWithDrew();
        this.desScrew = null;
    };
    n.prototype.withDrew = function () {
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
            if (null != this.desScrew) {
                var t = this.findScrew(this.desScrew);
                if (!(null == t)) {
                    t.destroy();
                }
            }
            this.screwOut = null;
            this.screwTop = null;
            this.currentScrew = null;
            this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            $commonData.default.TotalSteel = this.Steels.children.length;
            $commonData.default.screwNum = this.Screws.children.length;
            console.log("撤回", $commonData.default.useItemNum[1]);
            this.screwStatus = r.IDLE;
            $gameManager.default.instance.changeWithDrew();
            $gameManager.default.instance.changePullOutBtn();
        } else {
            console.log("无法撤回");
        }
    };
    n.prototype.setSpriteType = function (e) {
        for (; null == e.getChildByName("skinNode"); ) {
            e = e.getChildByName("holemask");
        }
        e.getChildByName("skinNode").getComponent(cc.Sprite).type = cc.Sprite.Type.TILED;
    };
    n.prototype.createLevelAni = function () {
        var e = this;
        this.currentLevelconfig = $commonData.default.levelConfig[$commonData.default.currLevel];
        console.log("当前关卡", $commonData.default.currLevel);
        this.bg.width = $commonData.default.levelConfig[$commonData.default.currLevel].bg.x * y;
        this.bg.height = $commonData.default.levelConfig[$commonData.default.currLevel].bg.y * y;
        var t = this.currentLevelconfig.hole.num;
        for (var n = 0; n < t; n++) {
            if (1 == this.currentLevelconfig.hole[n].screw) {
                var o = cc.instantiate(this.screwPre);
               
                o.getComponent(cc.Sprite).spriteFrame =
                    $newSkinView.default.instance.nailSkinImg[$commonData.default.currentNailSkin];
                var a = cc.instantiate(this.holePre);
                var i = cc.instantiate(this.screwOutPre);
                i.children[1].getComponent(cc.Sprite).spriteFrame =
                    $newSkinView.default.instance.nailSkinImg[$commonData.default.currentNailSkin];
                $commonData.default.screwNum++;
                if (70 == y) {
                    o.width = 60;
                    o.height = 60;
                    a.width = 50;
                    a.height = 50;
                    a.getComponent(cc.CircleCollider).radius = 18;
                    o.getComponent(cc.PhysicsCircleCollider).radius = 18;
                    i.getChildByName("top").width = 60;
                    i.getChildByName("top").height = 60;
                    i.width = 60;
                    i.height = 60;
                }
                o.x = y * this.currentLevelconfig.hole[n].x;
                o.y = y * this.currentLevelconfig.hole[n].y;
                o.setParent(this.Screws);
                o.name = "screw";
                o.group = "screw";
                o.opacity = 0;
                a.x = y * this.currentLevelconfig.hole[n].x;
                a.y = y * this.currentLevelconfig.hole[n].y;
                a.setParent(this.Holes);
                i.setParent(this.Screws);
                i.x = y * this.currentLevelconfig.hole[n].x;
                i.y = y * this.currentLevelconfig.hole[n].y + 40;
                i.getChildByName("top").y = 40;
                i.name = "screwOut";
            } else {
                a = cc.instantiate(this.holePre);
                if (70 == y) {
                    a.getComponent(cc.CircleCollider).radius = 18;
                    a.width = 50;
                    a.height = 50;
                }
                a.x = y * this.currentLevelconfig.hole[n].x;
                a.y = y * this.currentLevelconfig.hole[n].y;
                a.setParent(this.Holes);
                if (1 == this.currentLevelconfig.hole[n].lock) {
                    var c = cc.instantiate(this.lockPre);
                    c.setParent(a);
                    c.setPosition(0, 0);
                    $gameManager.default.instance.setAniNodePosition(cc.v2(a.position), 0);
                    $commonData.default.isUnLock = !1;
                    $gameManager.default.instance.changeDigBtn();
                }
            }
        }
        $gameManager.default.instance.changePullOutBtn();
        if (this.currentLevelconfig.spSteel) {
            console.log("有特殊钢条11");
            var r = this.currentLevelconfig.spSteel.num;
            for (n = 0; n < r; n++) {
                var s = this.currentLevelconfig.spSteel[n].index;
                var d = cc.v2(this.currentLevelconfig.spSteel[n].x * y, this.currentLevelconfig.spSteel[n].y * y);
                var f = void 0;
                if (70 == y) {
                    f = cc.instantiate(this.spSteelPre2[s]);
                } else {
                    f = cc.instantiate(this.spSteelPre[s]);
                }
                if (0 == s) {
                    f.getComponent(cc.PhysicsPolygonCollider).enabled = !1;
                } else {
                    if (1 == s) {
                        f.getComponent(cc.PhysicsCircleCollider).enabled = !1;
                    }
                }
                f.setPosition(d);
                f.setParent(this.Steels);
                f.getComponent(cc.RigidBody).gravityScale = 0;
            }
        }
        var p = this.currentLevelconfig.steel.num;
        $commonData.default.TotalSteel = p;
        $commonData.default.LevelSteel = p;
        var m;
        var g;
        var v;
        var w = function (t) {
            var n = new cc.Node();
            n.setParent(S.Steels);
            n.name = "steel";
            S.steelx = [];
            S.steely = [];
            var o = Object.keys(S.currentLevelconfig.steel[t]).length - 1;
            for (var a = 0; a < o; a++) {
                S.steelx.push(S.currentLevelconfig.steel[t][a].x);
                S.steely.push(S.currentLevelconfig.steel[t][a].y);
            }
            var i;
            var c = S.currentLevelconfig.steel[t].color;
            S.sortPos();
            i = Math.atan2(S.steely[0] - S.steely[1], S.steelx[0] - S.steelx[1]) * (180 / Math.PI);
            var r = ((S.steelx[0] + S.steelx[o - 1]) / 2) * y;
            var s = ((S.steely[o - 1] + S.steely[0]) / 2) * y;
            var d =
                S.getDistance(cc.v2(S.steelx[0], S.steely[0]), cc.v2(S.steelx[o - 1], S.steely[o - 1])) * y + y + 50;
            m = null;
            g = null;
            for (a = 0; a < o; a++) {
                var f = null;
                if (0 == a || a == o - 1) {
                    (f = cc.instantiate(S.steel_hole2Pre)).getComponent(cc.Sprite).spriteFrame = S.setColor(c, 0);
                } else {
                    (f = cc.instantiate(S.steel_holePre)).getComponent(cc.Sprite).spriteFrame = S.setColor(c, 1);
                }
                if (70 == y) {
                    f.scale = 0.7;
                }
                f.setPosition(S.steelx[a] * y, S.steely[a] * y);
                f.setParent(n);
                if (0 == a) {
                    f.angle = i - 90;
                } else {
                    f.angle = i + 90;
                    f.scaleX=-0.8
                    f.scaleY= 0.8
                  //  f.setScale(-0.8, 0.8);
                    70 == y && (f.scaleX=-0.7,f.scaleY=0.7) //f.setScale(-0.7, 0.7);
                }
                f.name = "steel_hole";
                var h = f.convertToWorldSpaceAR(cc.v2(0, 0));
                var w = cc.instantiate(S.holeMaskPre);
                if (null == g) {
                    g = w;
                    v = n.convertToNodeSpaceAR(h);
                    g.setParent(n);
                    g.setPosition(v);
                } else {
                    {
                        var k = m.convertToNodeSpaceAR(h);
                        w.setPosition(k);
                        w.setParent(m);
                    }
                }
                m = w;
            }
            for (a = 0; a < o - 1; a++) {
                var b =
                    Math.sqrt(Math.pow(S.steelx[a] - S.steelx[a + 1], 2) + Math.pow(S.steely[a] - S.steely[a + 1], 2)) -
                    1;
                if (!(b <= 0)) {
                    var P = cc.instantiate(S.steelPre);
                    if (70 == y) {
                        P.width = 70;
                        P.height = 70;
                    }
                    P.setPosition(((S.steelx[a] + S.steelx[a + 1]) * y) / 2, ((S.steely[a] + S.steely[a + 1]) * y) / 2);
                    P.setParent(n);
                    P.scaleY = b;
                    P.getComponent(cc.Sprite).spriteFrame = S.setColor(c, 2);
                    P.angle = i - 90;
                }
            }
            g.removeFromParent();
            g.setParent(n);
            g.setPosition(v);
            S.setSkinNode(n, r, s, d, i, m, c);
            var _ = cc.v2(n.position);
            if (t % 2 == 1) {
                n.setPosition(1e3, 0);
            } else {
                n.setPosition(-1e3, 0);
            }
            if (1 == $commonData.default.currLevel && 0 == $commonData.default.passedNovice) {
                $gameManager.default.instance.showNovice();
            }
            var N = cc.moveTo(0.5, _);
            S.scheduleOnce(function () {
                cc.tween(n)
                    .then(N)
                    .call(function () {
                        if (t == p - 1) {
                            e.scheduleOnce(function () {
                                e.Steels.removeAllChildren();
                                $gameManager.default.instance.hideMask();
                                e.createLevel();
                            });
                        }
                    })
                    .start();
            }, 0.08 * t);
        };
        var S = this;
        for (n = 0; n < p; n++) {
            w(n);
        }
    };
    n.prototype.createLevel = function () {
        if (!(1 == $uIManager.default.instance.setPnl.active)) {
            $commonData.default.isPause = !1;
        }
        var e = 20;
        if (70 == y) {
            e = 10;
        }
        var t = cc.moveBy(0.3, 0, -30);
        var n = cc.moveBy(0.3, 0, -e);
        var o = 0;
        var a = function (e) {
            var a = i.Screws.children[e];
            if ("screw" == a.name) {
                o++;
                $screwNumberManager.screwNumberRecord(a, o.toString());
                i.scheduleOnce(function () {
                    a.opacity = 255;
                }, 0.3);
            } else {
                if ("screwOut" == a.name) {
                    cc.tween(a).then(t).start();
                    cc.tween(a.getChildByName("top"))
                        .then(n)
                        .call(function () {
                            a.destroy();
                        })
                        .start();
                }
            }
        };
        var i = this;
        for (var c = 0; c < this.Screws.children.length; c++) {
            a(c);
        }
        var r = this.currentLevelconfig.steel.num;
        $commonData.default.TotalSteel = r;
        $commonData.default.LevelSteel = r;
        if (this.currentLevelconfig.spSteel) {
            this.createSpSteel();
        }
        console.log("-----------板子数量", $commonData.default.LevelSteel);
        for (c = 0; c < r; c++) {
            var s = new cc.Node();
            s.setParent(this.Steels);
            s.group = "default";
            s.name = "steel";
            s.addComponent(cc.RigidBody).linearDamping = 1;
            var u = s.addComponent(cc.PhysicsPolygonCollider);
            this.steelx = [];
            this.steely = [];
            var d = Object.keys(this.currentLevelconfig.steel[c]).length - 1;
            for (var f = 0; f < d; f++) {
                this.steelx.push(this.currentLevelconfig.steel[c][f].x);
                this.steely.push(this.currentLevelconfig.steel[c][f].y);
            }
            var h;
            var g;
            var v = this.currentLevelconfig.steel[c].color;
            this.sortPos();
            h = (g = Math.atan2(this.steely[0] - this.steely[1], this.steelx[0] - this.steelx[1])) * (180 / Math.PI);
            var w = ((this.steelx[0] + this.steelx[d - 1]) / 2) * y;
            var S = ((this.steely[d - 1] + this.steely[0]) / 2) * y;
            var k =
                this.getDistance(cc.v2(this.steelx[0], this.steely[0]), cc.v2(this.steelx[d - 1], this.steely[d - 1])) *
                    y +
                y +
                50;
            var b = this.getRectPos(cc.v2(w, S), g, k, y);
            for (f = 0; f < u.points.length; f++) {
                if (null != b[f]) {
                    u.points[f] = b[f];
                }
            }
            s.getComponent(cc.PhysicsPolygonCollider).apply();
            var P;
            var _ = null;
            var N = null;
            for (f = 0; f < d; f++) {
                var M = null;
                if (0 == f || f == d - 1) {
                    (M = cc.instantiate(this.steel_hole2Pre)).getComponent(cc.Sprite).spriteFrame = this.setColor(v, 0);
                } else {
                    (M = cc.instantiate(this.steel_holePre)).getComponent(cc.Sprite).spriteFrame = this.setColor(v, 1);
                }
                M.setPosition(this.steelx[f] * y, this.steely[f] * y);
                M.setParent(s);
                if (70 == y) {
                    M.scale = 0.7;
                }
                if (0 == f) {
                    M.angle = h - 90;
                } else {
                    M.angle = h + 90;
                     M.scaleX=-0.8;M.scaleY=0.8;  //M.setScale(-0.8, 0.8);
                    70 == y &&(M.scaleX=-0.7,M.scaleY=0.7) //M.setScale(-0.7, 0.7);
                }
                M.name = "steel_hole";
                var A = M.convertToWorldSpaceAR(cc.v2(0, 0));
                var I = (this.Steels.convertToNodeSpaceAR(A), this.findScrew(A));
                if ("screwOut" == (null == I ? void 0 : I.name)) {
                    I = null;
                }
                if (I) {
                    var D = s.addComponent(cc.RevoluteJoint);
                    D.anchor.x = this.steelx[f] * y;
                    D.anchor.y = this.steely[f] * y;
                    D.connectedBody = I.getComponent(cc.RigidBody);
                }
                var C = cc.instantiate(this.holeMaskPre);
                if (null == N) {
                    N = C;
                    P = s.convertToNodeSpaceAR(A);
                    N.setParent(s);
                    N.setPosition(P);
                } else {
                    {
                        var B = _.convertToNodeSpaceAR(A);
                        C.setPosition(B);
                        C.setParent(_);
                    }
                }
                _ = C;
            }
            for (f = 0; f < d - 1; f++) {
                var L =
                    Math.sqrt(
                        Math.pow(this.steelx[f] - this.steelx[f + 1], 2) +
                            Math.pow(this.steely[f] - this.steely[f + 1], 2)
                    ) - 1;
                if (!(L <= 0)) {
                    var O = cc.instantiate(this.steelPre);
                    if (70 == y) {
                        O.width = 70;
                        O.height = 70;
                    }
                    O.setPosition(
                        ((this.steelx[f] + this.steelx[f + 1]) * y) / 2,
                        ((this.steely[f] + this.steely[f + 1]) * y) / 2
                    );
                    O.setParent(s);
                    O.scaleY = L;
                    O.getComponent(cc.Sprite).spriteFrame = this.setColor(v, 2);
                    O.angle = h - 90;
                    O.name = "steel";
                }
            }
            N.removeFromParent();
            N.setParent(s);
            N.setPosition(P);
            this.setSkinNode(s, w, S, k, h, _, v);
        }
    };
    n.prototype.setSkinNode = function (e, t, n, o, a, i, c) {
        var r = cc.instantiate(this.skinNodePre);
        var s = r.getComponent(cc.Sprite);
        if ($commonData.default.boardSkinData.currentSkin <= 6) {
            s.spriteFrame = $commonData.default.skinImgArr[c];
        } else {
            s.spriteFrame = $commonData.default.skinImgArr[0];
        }
        r.setParent(e);
        r.setPosition(t, n);
        var u = r.convertToWorldSpaceAR(cc.v2(0, 0));
        var d = i.convertToNodeSpaceAR(u);
        r.setParent(i);
        r.setPosition(d);
        s.type = cc.Sprite.Type.TILED;
        r.width = 0.9 * y;
        r.height = o - 10;
        r.angle = a + 90;
        r.name = "skinNode";
    };
    n.prototype.createSpSteel = function () {
        console.log("有特殊钢条22");
        var e = this.currentLevelconfig.spSteel.num;
        $commonData.default.TotalSteel += e;
        $commonData.default.LevelSteel += e;
        for (var t = 0; t < e; t++) {
            var n = this.currentLevelconfig.spSteel[t].index;
            var o = $commonData.default.spSteelData[n].baseIndex;
            var a = void 0;
            if (70 == y) {
                a = cc.instantiate(this.spSteelPre2[n]);
            } else {
                console.log("------------");
                a = cc.instantiate(this.spSteelPre[n]);
            }
            var i = cc.v2(this.currentLevelconfig.spSteel[t].x * y, this.currentLevelconfig.spSteel[t].y * y);
            a.setPosition(i);
            a.setParent(this.Steels);
            if (0 == o) {
                a.name = "spSteel_square";
                a.getComponent(cc.PhysicsPolygonCollider).enabled = !0;
            } else {
                if (1 == o) {
                    a.name = "spSteel_circle";
                    a.getComponent(cc.PhysicsCircleCollider).enabled = !0;
                }
            }
            for (var c = 0; c < a.children.length; c++) {
                var r = a.children[c];
                var s = r.convertToWorldSpaceAR(cc.v2(0, 0));
                var u = (this.Steels.convertToNodeSpaceAR(s), this.findScrew(s));
                if ("screwOut" == (null == u ? void 0 : u.name)) {
                    u = null;
                }
                if (u) {
                    var d = a.addComponent(cc.RevoluteJoint);
                    d.anchor.x = r.x;
                    d.anchor.y = r.y;
                    d.connectedBody = u.getComponent(cc.RigidBody);
                }
            }
        }
    };
    n.prototype.getDistance = function (e, t) {
        var n = cc.v2(e.x - t.x, e.y - t.y);
        return Math.sqrt(n.x * n.x + n.y * n.y);
    };
    n.prototype.getRectPos = function (e, t, n, o) {
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
    n.prototype.getRotatePos = function (e, t, n) {
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
    n.prototype.sortPos = function () {
        if (this.steelx[0] == this.steelx[1]) {
            this.selectSortMIN(1);
        } else {
            this.steely[0] == this.steely[1]
                ? this.selectSortMIN(0)
                : this.steelx[0] > this.steelx[1] && this.steely[0] > this.steely[1]
                ? (this.selectSortMIN(1), this.selectSortMIN(0))
                : this.steelx[0] > this.steelx[1] &&
                  this.steely[0] < this.steely[1] &&
                  (this.selectSortMIN(1), this.selectSortMAX(0));
        }
    };
    n.prototype.selectSortMIN = function (e) {
        var t = [];
        if (0 == e) {
            t = this.steelx;
        } else {
            if (1 == e) {
                t = this.steely;
            }
        }
        var n;
        var o = t.length;
        for (var a = 0; a < o - 1; a++) {
            n = a;
            for (var i = a + 1; i < o; i++) {
                if (t[n] > t[i]) {
                    n = i;
                }
            }
            if (n != a) {
                var c = t[a];
                t[a] = t[n];
                t[n] = c;
            }
        }
        return t;
    };
    n.prototype.selectSortMAX = function (e) {
        var t = [];
        if (0 == e) {
            t = this.steelx;
        } else {
            if (1 == e) {
                t = this.steely;
            }
        }
        var n;
        var o = t.length;
        for (var a = 0; a < o - 1; a++) {
            n = a;
            for (var i = a + 1; i < o; i++) {
                if (t[n] < t[i]) {
                    n = i;
                }
            }
            if (n != a) {
                var c = t[a];
                t[a] = t[n];
                t[n] = c;
            }
        }
        return t;
    };
    n.prototype.setColor = function (e, t) {
        var n;
        if (0 == t) {
            n = $gameManager.default.instance.steelholeImg;
        } else {
            n = 1 == t ? $gameManager.default.instance.steelholeCenterImg : $gameManager.default.instance.steelImg;
        }
        return $commonData.default.boardSkinData.currentSkin <= 6 ? n[e] : n[4];
    };
    n.prototype.setSpeed = function () {
        var e;
        var t;
        var n = function (n) {
            for (
                var a = o.Steels.children[n],
                    i = a.getComponent(cc.RigidBody),
                    c = a.getComponents(cc.RevoluteJoint),
                    r = 0,
                    l = 0;
                l < c.length;
                l++
            )
                if (
                    null === (t = null === (e = c[l].connectedBody) || void 0 === e ? void 0 : e.node) || void 0 === t
                        ? void 0
                        : t.active
                ) {
                    r += 1;
                }
            if (1 == r) {
                o.scheduleOnce(function () {
                    if (i.angularVelocity < 2) {
                        i.angularVelocity = 5;
                    }
                });
            }
            if (0 == r) {
                o.scheduleOnce(function () {
                    if (i.linearVelocity.x < 15) {
                        i.linearDamping = 0.2;
                        i.linearVelocity = cc.v2(50, 0);
                    }
                });
            }
        };
        var o = this;
        for (var a = 0; a < this.Steels.children.length; a++) {
            n(a);
        }
    };
    __decorate([w(cc.Prefab)], n.prototype, "screwPre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "screwOutPre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "holePre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "steelPre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "steel_holePre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "steel_hole2Pre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "lockPre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "spSteelPre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "spSteelPre2", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "holeMaskPre", void 0);
    __decorate([w(cc.Prefab)], n.prototype, "skinNodePre", void 0);
    return __decorate([v], n);
})(cc.Component);
exports.default = S;
