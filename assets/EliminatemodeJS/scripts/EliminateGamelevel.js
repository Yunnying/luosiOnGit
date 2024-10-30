var o;
var $enum = require("../../scripts/Enum");
var $elinimateCreatelevel = require("./ElinimateCreatelevel");
var $battleManager = require("../../scripts/BattleManager");
var $eliminateManager = require("./EliminateManager");
var $commonData = require("../../scripts/commonData");
var $game = require("../../scripts/Game");
var $propView = require("./propView");
var $eliminateProgressManager = require("./EliminateProgressManager");
var $eliminateManager = require("./EliminateManager");
var $eliminateBoxManager = require("./EliminateBoxManager");
var $elinimateCreatelevel = require("./ElinimateCreatelevel");
var $localStorage = require("../../scripts/localStorage");
var $elinimatesteel = require("./Elinimatesteel");
var _ = cc._decorator;
var w = _.ccclass;
var S = _.property;
var P = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.boxPre = null;
        t.boxMotionTrail = null;
        t.boxNode = null;
        t.boxUnlockNode = null;
        t.holeNode = null;
        t.tipHoleAnimation = null;
        t.holeFather = null;
        t.adHoleNodeArr = [];
        t.screwImgPre = null;
        t.screwMotionTrail = null;
        t.Shovel = null;
        t.addHoleAni = null;
        t.addHoleButton = null;
        t.closeBoxMusic = null;
        t.addScrewMusic = null;
        t.screwMusic = null;
        t.pushSpine = null;
        t.putHoleNode = null;
        t.clearWindow = null;
        t.breakWindow = null;
        t.controlAi = null;
        t.screwNum_Hole = 0;
        t.screwHoleUnlockNum = 5;
        t.screwHoleMaxNum = 7;
        t.tipScrewHoleIndex = 0;
        t.firstPosX = -130;
        t.holeDistance = 65;
        t.emptyHole = [];
        t.emptyHoleMap = new Map();
        t.clrearWindowState = 0;
        t.breakWindowState = 0;
        t.strategyData = null;
        t.BoxColorList = [];
        t.boxCurArr = [];
        t.ifOnGuiding = !1;
        t._unlockBoxIndex = 0;
        t.tempTimeCount1 = 0;
        t.tempTimeCount2 = 0;
        t.aiTime = 1;
        y.instance = t;
        return t;
    }
    var y;
    __extends(t, e);
    y = t;
    t.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.controlAi = cc.find("Canvas/bgmain").getComponent(cc.Sprite);
        window["EGameLevel"]=this;
    };
    Object.defineProperty(t.prototype, "targetColor", {
        get: function () {
            var e = [];
            for (var t = 0; t < this.boxCurArr.length; t++) {
                if (this.boxCurArr[t]) {
                    e.push(this.boxCurArr[t].name.split("box_")[1]);
                }
            }
            return e;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function (e) {
        var t = this;
        $eliminateBoxManager.default.instance.playNum = $localStorage.default.getLocalItem("eliminatePlayNum", 1);
        $eliminateManager.default.instance.InitBntInteractable();
        $eliminateBoxManager.default.instance.easyBoxNum = 0;
        this.boxNode.removeAllChildren();
        this.holeNode.removeAllChildren();
        this.screwState = $enum.ENUM_SCREW_STATES.IDLE;
        $eliminateProgressManager.default.instance.progressInit();
        this.addHoleAni.stop();
        this.addHoleAni.node.scale = 0.9;
        this.tipHoleAnimation.stop();
        this.tipHoleAnimation.node.scale = 1;
        this.tipHoleAnimation.node.active = !1;
        this.BoxColorList = [];
        this.boxCurArr = [];
        this._unlockBoxIndex = 0;
        for (var y = 0; y < this.boxUnlockNode.children.length; y++) {
            this.boxUnlockNode.children[y].stopAllActions();
            var x;
            if (0 == y) {
                x = 90;
            } else {
                x = 270;
            }
            this.boxUnlockNode.children[y].setPosition(x, -90);
            this.boxUnlockNode.children[y].active = !0;
            this.boxUnlockNode.children[y].getComponent(cc.Button).interactable = !0;
            this.boxUnlockNode.children[y].children.forEach(function (e) {
                return (e.active = !1);
            });
        }
        $eliminateManager.default.instance.InitFlag();
        this.setEmptyHoleData(5, !0);
        this.tipScrewHoleIndex = 0;
        this.Shovel.x = 500;
        this.Shovel.active = !1;
        this.holeFather.children.forEach(function (e) {
            return (e.children[0].active = !1);
        });
        this.adHoleNodeArr.forEach(function (e) {
            e.active = !1;
        });
        this.putHoleNode.setPosition(0, this.putHoleNode.getPosition().y);
        [this.breakWindow, this.clearWindow].forEach(function (e) {
            e.setPosition(cc.v2(-200, e.getPosition().y));
            e.active = !1;
        });
        this.clrearWindowState = 0;
        this.breakWindowState = 0;
        $elinimateCreatelevel.default.instance.init(e);
        this.setBoxFade();
        if ($commonData.default.eliminte_game_mode == $commonData.Eliminate_Mode.AIPLAY) {
            this.scheduleOnce(function () {
                t.setSpeedForAI();
            }, 0.3);
        }
        this.scheduleOnce(function () {
            console.error(
                $eliminateBoxManager.default.instance.getFrequency(
                    $elinimateCreatelevel.default.instance.screwArr.map(function (e) {
                        return e.name;
                    })
                )
            );
        }, 1);
    };
    t.prototype.setEmptyHoleData = function (e, t) {
        if (void 0 === t) {
            t = !1;
        }
        if (t) {
            this.screwHoleUnlockNum = e;
            this.screwNum_Hole = 0;
            this.emptyHole = [];
            this.emptyHoleMap.clear();
            for (var y = 0; y < e; y++) {
                var x = cc.v3(this.firstPosX + this.holeDistance * y, 0, 0);
                this.emptyHoleMap.set(y, new N(!1, x, null));
            }
        } else {
            y = e - 1;
            x = cc.v3(this.firstPosX + this.holeDistance * y, 0, 0);
            this.emptyHoleMap.set(y, new N(!1, x, null));
        }
    };
    t.prototype.findEmptyPos = function () {
        for (var e = 0; e < this.screwHoleUnlockNum; e++) {
            if (!this.emptyHoleMap.get(e).haveScrew) {
                return e;
            }
        }
        return -1;
    };
    t.prototype.findEmptyIndexByScrew = function (e) {
        for (var t = 0; t < this.screwHoleUnlockNum; t++) {
            if (this.emptyHoleMap.get(t).screwNode == e) {
                return t;
            }
        }
        return -1;
    };
    t.prototype.setEmptyMap = function (e, t, y) {
        console.log("index ---》", t);
        var x = this.emptyHoleMap.get(t).pos;
        this.emptyHoleMap.set(t, new N(y, x, e));
    };
    t.prototype.findOptimalBoxIndex = function (e) {
        var t = this;
        var y = [];
        for (var x = 0; x < this.targetColor.length; x++) {
            if (this.targetColor[x] == e) {
                y.push(x);
            }
        }
        if (0 == y.length) {
            return -1;
        }
        if (1 == y.length) {
            return y[0];
        }
        var o = y.sort(function (e, y) {
            return t.boxCurArr[y].childrenCount - t.boxCurArr[e].childrenCount;
        });
        for (x = 0; x < o.length; x++) {
            if ($elinimateCreatelevel.default.instance.boxMap.get(this.boxCurArr[o[x]]).getCanPushScrew()) {
                return o[x];
            }
        }
        return -1;
    };
    t.prototype.checkBoxScrew = function (e, t, y) {
        var x = $elinimateCreatelevel.default.instance.boxMap.get(e);
        if (!(x.getHaveScrewPush() || x.getCanPushScrew())) {
            this.closeCapAni(e, y);
        }
    };
    t.prototype.InitUnluckBoxVideoIcon = function () {
        this.boxUnlockNode.children.forEach(function (e) {
            if (!e.children[0].active && $commonData.default.skinVideoCoupon > 0) {
                e.children[1].active = !0;
            } else {
                e.children[1].active = !1;
            }
        });
    };
    t.prototype.boxCurArrInit = function () {
        var e = this;
        var t = $eliminateBoxManager.default.instance.strategy_1(
            $elinimateCreatelevel.default.instance.screwArr,
            $elinimateCreatelevel.default.instance.boxArr,
            this.boxCurArr
        );
        t.opacity = 255;
        this.boxCurArr.push(t);
        var y = $eliminateBoxManager.default.instance.strategy_1(
            $elinimateCreatelevel.default.instance.screwArr,
            $elinimateCreatelevel.default.instance.boxArr,
            this.boxCurArr
        );
        y.opacity = 255;
        this.boxCurArr.push(y);
        this.scheduleOnce(function () {
            for (var t = 0; t < e.boxCurArr.length; t++) {
                var y = 180 * t - 270;
                e.boxCurArr[t].setPosition(y, -90);
            }
        });
    };
    t.prototype.guideInit = function () {
        if (!($commonData.default.currLevel > 1)) {
            if ("played" !== cc.sys.localStorage.getItem("firstgame")) {
                cc.sys.localStorage.setItem("firstgame", "played");
                this.ifOnGuiding = !0;
                cc.find("Canvas/tutorialPnl").active = !0;
                var e = cc.find("Canvas/tutorialPnl").getComponent("ElinimateTutorialView");
                this.scheduleOnce(function () {
                    e.nextMaskStep();
                }, 0.01);
               
            }
            this.boxUnlockNode.getComponent(cc.Widget).top = this.boxNode.getComponent(cc.Widget).top;
        }
      
    };
    t.prototype.clickScrew = function (e, t) {
        if (this.ifOnGuiding) {
            var y = cc.find("Canvas/tutorialPnl").getComponent("ElinimateTutorialView");
            var x = t.getSiblingIndex();
            var o = t.parent.parent.name;
            if (0 === y.progress) {
                if (
                    x !== $commonData.default.eliminateScrewFirstData[0] ||
                    o !== $commonData.default.eliminateScrewFirstLevel[0]
                ) {
                    return;
                }
                y.nextStep();
            } else {
                if (1 === y.progress) {
                    if (
                        x !== $commonData.default.eliminateScrewFirstData[1] ||
                        o !== $commonData.default.eliminateScrewFirstLevel[1]
                    ) {
                        return;
                    }
                    y.nextStep();
                } else {
                    if (2 === y.progress) {
                        if (
                            x !== $commonData.default.eliminateScrewFirstData[2] ||
                            o !== $commonData.default.eliminateScrewFirstLevel[2]
                        ) {
                            return;
                        }
                        y.nextStep();
                    }
                }
            }
        }
        this.moveScrew(e, t);
    };
    t.prototype.moveScrew = function (e, t) {
        if (this.screwState != $enum.ENUM_SCREW_STATES.PROPANI && !(this.screwNum_Hole >= this.screwHoleUnlockNum)) {
            this.setSpeed(t);
            $battleManager.default.instance.playVibe();
            this.playScrewSound();
            var y = this.findOptimalBoxIndex(e);
            if (-1 !== y) {
                var x = this.boxCurArr[y];
                var o = $elinimateCreatelevel.default.instance.boxMap.get(x);
                var i = o.getScrewNum();
                if (o.getCanPushScrew()) {
                    this.moveScrewToBox(t, x, i, y);
                } else {
                    this.moveScrewToHole(t);
                }
            } else {
                this.moveScrewToHole(t);
            }
        }
    };
    t.prototype.moveScrewToBox = function (e, t, y, x, o) {
        
        var i;
        var n;
        var r = this;
        if (void 0 === o) {
            o = !1;
        }
        console.log("---------->> 移动螺丝到盒子上");
        var a = $elinimateCreatelevel.default.instance.boxMap.get(t);
        if (o) {
            var c = this.findEmptyIndexByScrew(e);
            this.setEmptyMap(null, c, !1);
            n = e.convertToWorldSpaceAR(cc.v2(0, 0));
            i = e;
        } else {
            (i = cc.instantiate(this.screwImgPre)).getChildByName("screwImg").getComponent(cc.Sprite).spriteFrame = o
                ? e.getChildByName("screwImg").getComponent(cc.Sprite).spriteFrame
                : e.getComponent(cc.Sprite).spriteFrame;
            n = e.convertToWorldSpaceAR(cc.v2(0, 0));
            e.destroy();
        }
        var l = t.convertToNodeSpaceAR(n);
        i.setPosition(l);
        i.setParent(t);
        i.setSiblingIndex(0);
        this.playAddScrewSound();
        var s;
        if (0 === y) {
            s = cc.v3(0, 135, 0);
        } else {
            s = 1 === y ? cc.v3(-52.5, 75, 0) : cc.v3(52.5, 75, 0);
        }
        cc.log("盒子螺丝的位置")
        console.error(s)
        a.addScrewNum(1);
        var d = a.getScrewNum() - 1;
        a.setHaveScrewPush(!0, d);
        this.ScrewPullAni(i, s, 1.3, !o, function () {
            a.setHaveScrewPush(!1, d);
            r.checkBoxScrew(t, y, x);
        });
    };
    t.prototype.moveScrewToHole = function (e) {
        var t = this;
        console.log("移动螺丝到 螺丝孔上");
        if (!(this.screwNum_Hole >= this.screwHoleUnlockNum)) {
            var y = this.findEmptyPos();
            console.log("moveScrewToHole--->", y);
            if (-1 != y) {
                var x = cc.instantiate(this.screwImgPre);
                x.getChildByName("screwImg").getComponent(cc.Sprite).spriteFrame = e.getComponent(
                    cc.Sprite
                ).spriteFrame;
                var o = e.convertToWorldSpaceAR(cc.v2(0, 0));
                var i = this.holeNode.convertToNodeSpaceAR(o);
                x.setPosition(i);
                x.setParent(this.holeNode);
                x.name = e.name;
                e.destroy();
                var n = this.emptyHoleMap.get(y).pos;
                this.setEmptyMap(x, y, !0);
                this.screwNum_Hole++;
                this.showClearPropWindow();
                if (this.screwNum_Hole >= 4) {
                    this.setAddHoleAni(!0);
                }
                if (this.screwHoleUnlockNum - this.screwNum_Hole == 1) {
                    this.setTipHoleAni(!0);
                }
                this.ScrewPullAni(x, cc.v3(n, 0, 0), 0.9, !1, function () {
                    t.holeFather.children.forEach(function (e) {
                        return (e.children[0].active = !1);
                    });
                    if (t.screwHoleUnlockNum - t.screwNum_Hole == 1) {
                        var e = t.findEmptyHoleIndex();
                        t.holeFather.children[e].children[0].active = !0;
                        t.tipScrewHoleIndex = e;
                    }
                    t.checkIfScrewInHole();
                });
            }
        }
    };
    t.prototype.moveScrewToSpecifiedBox = function (e) {
        var t = this.findEmptyIndexByScrew(e);
        this.setEmptyMap(null, t, !1);
        $eliminateManager.default.instance.propState = $enum.ENUM_PROP_STATES.NONE;
        var y = e.name.slice(-1);
        for (var x = 0; x < this.boxNode.children.length; x++) {
            var o = this.boxNode.children[x];
            if (o.name.slice(-1) == y && this.boxNode.children[x].children.length < 4) {
                var i = cc.instantiate(e);
                var n = this.boxNode.children[x].children.length - 1;
                var a;
                cc.log("盒子螺丝的位置")
                if (0 === n) {
                    
                    a = cc.v3(0, 135, 0);
                } else {
                    a = 1 === n ? cc.v3(-52.5, 75, 0) : cc.v3(52.5, 75, 0);
                }
                i.setPosition(a);
                i.setParent(o);
                i.setSiblingIndex(0);
                i.scale = 1.3;
                $elinimateCreatelevel.default.instance.boxMap.get(o).addScrewNum(1);
                e.destroy();
                this.screwNum_Hole--;
                this.showClearPropWindow();
                if (this.screwNum_Hole < 4) {
                    this.setAddHoleAni(!1);
                }
                if (this.screwHoleUnlockNum - this.screwNum_Hole == 1) {
                    this.setTipHoleAni(!0);
                } else {
                    this.setTipHoleAni(!1);
                }
                console.log("是否可以预警---》", this.screwHoleUnlockNum - this.screwNum_Hole);
                this.holeFather.children.forEach(function (e) {
                    return (e.children[0].active = !1);
                });
                if (this.screwHoleUnlockNum - this.screwNum_Hole == 1) {
                    var c = this.findEmptyHoleIndex();
                    this.holeFather.children[c].children[0].active = !0;
                    this.tipScrewHoleIndex = c;
                }
                if (this.screwNum_Hole <= 0) {
                    this.screwState = $enum.ENUM_SCREW_STATES.IDLE;
                }
                break;
            }
        }
    };
    t.prototype.closeCapAni = function (e, t) {
        var y = this;
        var x = e.getChildByName("boxCap");
        cc.tween(x)
            .to(
                0.2,
                {
                    position: cc.v3(0, 100)
                },
                {
                    easing: "quadIn"
                }
            )
            .call(function () {
                y.playCloseBoxSound();
                cc.tween(e)
                    .to(
                        0.075,
                        {
                            scaleY: 0.5
                        },
                        {
                            easing: "quadOut"
                        }
                    )
                    .delay(0.05)
                    .to(
                        0.075,
                        {
                            scaleY: 0.6
                        },
                        {
                            easing: "quadIn"
                        }
                    )
                    .call(function () {
                        y.moveBoxAni(e, t);
                    })
                    .start();
            })
            .start();
    };
    t.prototype.moveBoxAni = function (e, t) {
        
        var y = this;
        $eliminateProgressManager.default.instance.screwRest -= 3;
        $eliminateProgressManager.default.instance.onRemoveBox(e.convertToWorldSpaceAR(cc.v2(0)));
        var x = this.boxCurArr.map(function (e) {
            return e;
        });
        var o = 180 * t - 270;
        x.splice(t, 1);
        var i = $eliminateProgressManager.default.instance.getRestProgress();
        var n = this.strategyData;
        var r = $eliminateBoxManager.default.instance.applyStrategy(
            i,
            n,
            $elinimateCreatelevel.default.instance.screwArr,
            $elinimateCreatelevel.default.instance.boxArr,
            x
        );
        $battleManager.default.instance.playFallSound();
        cc.tween(e)
            .by(0.15, {
                y: 1e3
            })
            .call(function () {
                $commonData.default.eliminateScrewNum -= 3;
                $elinimateCreatelevel.default.instance.boxMap.delete(e);
                e.removeFromParent();
                e.destroy();
                if (r) {
                    cc.tween(r)
                        .to(0.2, {
                            x: o,
                            y: -90,
                            opacity: 255
                        })
                        .call(function () {
                            y.boxCurArr[t] = r;
                            var e = $elinimateCreatelevel.default.instance.boxMap.get(r);
                            e.getScrewNum();
                            if (!e.getCanPushScrew()) {
                                y.closeCapAni(r, t);
                            }
                            if ($elinimateCreatelevel.default.instance.boxArr.length <= 0) {
                                y.boxUnlockNode.children.forEach(function (e) {
                                    e.getComponent(cc.Button).interactable = !1;
                                    e.children[0].active = !1;
                                    e.children[1].active = !1;
                                    cc.tween(e)
                                        .by(0.15, {
                                            position: cc.v3(0, 1e3)
                                        })
                                        .start();
                                });
                            }
                            y.setBoxPosAni(y.boxCurArr);
                            y.checkIfScrewInHole();
                        })
                        .start();
                } else {
                    y.setBoxPosAni(y.boxCurArr);
                    y.checkIfScrewInHole();
                    y.checkSuccess();
                }
            })
            .start();
    };
    t.prototype.ScrewPullAni = function (e, t, y, x, o) {
        var i = this;
        if (1.3 == y) {
            e.scale = 1.6;
        } else {
            e.scale = 1;
        }
        var n = e.getChildByName("screwImg");
        cc.tween(n)
            .to(0.2, {
                angle: 180,
                position: cc.v3(0, 40, 0)
            })
            .call(function () {
                if (x) {
                    var n = cc.instantiate(i.screwMotionTrail);
                    e.addChild(n);
                    n.setSiblingIndex(0);
                    n.setPosition(0, 13);
                }
                i.ScrewMoveAni(e, t, y, x, o);
            })
            .start();
    };
    t.prototype.ScrewMoveAni = function (e, t, y, x, o) {
        var i = this;
        cc.tween(e)
            .to(0.2, {
                position: t,
                scale: y
            })
            .call(function () {
                if (x) {
                    e.removeChild(e.getChildByName("ScrewMotionTrail"));
                }
                i.ScrewPushAni(e, o);
            })
            .start();
    };
    t.prototype.ScrewPushAni = function (e, t) {
        var y = e.getChildByName("screwImg");
        cc.tween(y)
            .to(0.2, {
                angle: 0,
                position: cc.v3(0, 0, 0)
            })
            .call(function () {
                if (t) {
                    t();
                }
            })
            .start();
    };
    t.prototype.checkHoleScrew = function () {
        var e = this;
        if (!(this.screwNum_Hole < this.screwHoleUnlockNum)) {
            this.scheduleOnce(function () {
                if (e.screwNum_Hole >= e.screwHoleUnlockNum) {
                    $elinimateCreatelevel.default.instance.boxArr.length > 0 && e._unlockBoxIndex < 2
                        ? (($propView.default.instance.isReviveMode = !0),
                          $eliminateManager.default.instance.clickAddBox2())
                        : $commonData.default.eliminatePropUseNum[2] < 2
                        ? (($propView.default.instance.isReviveMode = !0),
                          $eliminateManager.default.instance.clickClearHole2())
                        : e.screwHoleUnlockNum < e.screwHoleMaxNum
                        ? (($propView.default.instance.isReviveMode = !0),
                          $eliminateManager.default.instance.clickAddHole2())
                        : $eliminateManager.default.instance.endGame(!1);
                }
            }, 0.5);
        }
    };
    t.prototype.checkIfScrewInHole = function () {
        var e = !1;
        var t = null;
        var y = "";
        for (var x = 0; x < this.screwHoleUnlockNum; x++) {
            if (null != (t = this.emptyHoleMap.get(x).screwNode) && t) {
                y = t.name.slice(-1);
                var o = this.findOptimalBoxIndex(y);
                if (-1 !== o) {
                    var i = this.boxCurArr[o];
                    var n = $elinimateCreatelevel.default.instance.boxMap.get(i);
                    if (!n) {
                        continue;
                    }
                    var a = n.getScrewNum();
                    if (
                        n.getCanPushScrew() &&
                        (this.moveScrewToBox(t, i, a, o, !0),
                        this.screwNum_Hole--,
                        (e = !0),
                        this.showClearPropWindow(),
                        this.screwNum_Hole < 4 && this.setAddHoleAni(!1),
                        this.screwHoleUnlockNum - this.screwNum_Hole == 1
                            ? this.setTipHoleAni(!0)
                            : this.setTipHoleAni(!1),
                        this.holeFather.children.forEach(function (e) {
                            return (e.children[0].active = !1);
                        }),
                        this.screwHoleUnlockNum - this.screwNum_Hole == 1)
                    ) {
                        var c = this.findEmptyHoleIndex();
                        this.holeFather.children[c].children[0].active = !0;
                        this.tipScrewHoleIndex = c;
                    }
                }
            }
        }
        if (!e) {
            this.screwState = $enum.ENUM_SCREW_STATES.IDLE;
            this.checkHoleScrew();
        }
    };
    t.prototype.checkSuccess = function () {
        if ($commonData.default.eliminateScrewNum <= 0) {
            this.holeNode.children.forEach(function (e) {
                e.active = !1;
            });
            var e = 0.2;
            if ($commonData.default.isOpen && $commonData.default.eliminatePasslevel <= 180) {
                e = 0.8;
            }
            this.scheduleOnce(function () {
                $eliminateManager.default.instance.endGame(!0);
            }, e);
        }
    };
    t.prototype.bubbleSort = function (e) {
        var t = e.length;
        for (var y = 0; y < t; y++) {
            for (var x = y + 1; x < t; x++) {
                if (e[x] < e[y]) {
                    var o = e[x];
                    e[x] = e[y];
                    e[y] = o;
                }
            }
        }
        return e;
    };
    t.prototype.setBoxPosAni = function () {
        console.log("剩余盒子数量---------->", $elinimateCreatelevel.default.instance.boxArr.length);
        if(this.boxUnlockNode.children[0].active&&this.boxUnlockNode.children[1].active) return;
        if (!($elinimateCreatelevel.default.instance.boxArr.length > 0)) {
            var e = [];
            switch (
                (e = (e = this.boxNode.children).sort(function (e, t) {
                    return e.x - t.x;
                })).length
            ) {
                case 1:
                    cc.tween(e[0])
                        .to(0.5, {
                            position: cc.v3(0, -90, 0)
                        })
                        .start();
                    break;
                case 2:
                    cc.tween(e[0])
                        .to(0.5, {
                            position: cc.v3(-90, -90, 0)
                        })
                        .start();
                    cc.tween(e[1])
                        .to(0.5, {
                            position: cc.v3(90, -90, 0)
                        })
                        .start();
                    break;
                case 3:
                    cc.tween(e[0])
                        .to(0.5, {
                            position: cc.v3(-180, -90, 0)
                        })
                        .start();
                    cc.tween(e[1])
                        .to(0.5, {
                            position: cc.v3(0, -90, 0)
                        })
                        .start();
                    cc.tween(e[2])
                        .to(0.5, {
                            position: cc.v3(180, -90, 0)
                        })
                        .start();
            }
        }
    };
    t.prototype.findSteel = function (e) {
        var t = null;
        for (var y = $elinimateCreatelevel.default.instance.steelArr.length - 1; y >= 0; y--) {
            var x = $elinimateCreatelevel.default.instance.steelArr[y];
            if (null == x ? void 0 : x.active) {
                var o = x.getComponent(cc.PhysicsPolygonCollider).points;
                var i = x.convertToNodeSpaceAR(e);
                if (cc.Intersection.pointInPolygon(i, o)) {
                    t = x;
                    $elinimateCreatelevel.default.instance.steelArr[y] = null;
                    break;
                }
            }
        }
        return t;
    };
    t.prototype.clickAddHole = function () {
        $eliminateManager.default.instance.propState = $enum.ENUM_PROP_STATES.NONE;
        $battleManager.default.instance.playVibe();
        if (
            this.screwHoleUnlockNum < this.screwHoleMaxNum &&
            ((this.adHoleNodeArr[this.screwHoleUnlockNum - 5].active = !0),
            this.screwHoleUnlockNum++,
            this.setEmptyHoleData(this.screwHoleUnlockNum),
            this.tipScrewHoleIndex++,
            this.setHolePos(this.screwHoleUnlockNum),
            $commonData.default.eliminatePropUseNum[0]++,
            this.showClearPropWindow(),
            this.screwHoleUnlockNum - this.screwNum_Hole == 1 ? this.setTipHoleAni(!0) : this.setTipHoleAni(!1),
            $commonData.default.eliminatePropUseNum[0] >= 2 &&
                (($eliminateManager.default.instance.propBtnVideImg[0].parent.getComponent(cc.Button).interactable =
                    !1),
                this.setAddHoleAni(!1)),
            this.holeFather.children.forEach(function (e) {
                return (e.children[0].active = !1);
            }),
            this.screwHoleUnlockNum - this.screwNum_Hole == 1)
        ) {
            var e = this.findEmptyHoleIndex();
            this.holeFather.children[e].children[0].active = !0;
            this.tipScrewHoleIndex = e;
        }
    };
    t.prototype.setHolePos = function (e) {
        this.putHoleNode.setPosition(-(e - 5) * this.holeDistance, this.putHoleNode.getPosition().y);
    };
    t.prototype.clickClearHole = function () {
        var e = this;
        this.closeClearPropWindow();
        this.screwState = $enum.ENUM_SCREW_STATES.PROPANI;
        $commonData.default.eliminatePropUseNum[2]++;
        if ($commonData.default.eliminatePropUseNum[2] >= 2) {
            $eliminateManager.default.instance.propBtnVideImg[1].parent.getComponent(cc.Button).interactable = !1;
        }
        this.Shovel.active = !0;
        cc.tween(this.Shovel)
            .to(0.5, {
                x: -500
            })
            .call(function () {
                e.Shovel.active = !1;
                e.Shovel.x = 500;
                e.screwState = $enum.ENUM_SCREW_STATES.IDLE;
            })
            .start();
    };
    t.prototype.onTouchStart = function (e) {
        var t = this;
        if ($eliminateManager.default.instance.propState == $enum.ENUM_PROP_STATES.CRESH_STEEL) {
            var y = e.getLocation();
            var x = this.findSteel(y);
            if (x) {
                $eliminateManager.default.instance.propState = $enum.ENUM_PROP_STATES.NONE;
                $commonData.default.eliminatePropUseNum[3]++;
                if ($commonData.default.eliminatePropUseNum[3] >= 2) {
                    $eliminateManager.default.instance.propBtnVideImg[2].parent.getComponent(cc.Button).interactable =
                        !1;
                }
                $eliminateManager.default.instance.showHammer(x, function () {
                    $battleManager.default.instance.playVibe();
                    cc.tween(x)
                        .to(0.2, {
                            scale: 1.1
                        })
                        .to(0.3, {
                            scale: 0.8,
                            opacity: 0
                        })
                        .call(function () {
                            if (1 == x.parent.childrenCount) {
                                x.removeFromParent();
                                t.setBoxFade();
                            }
                            x.destroy();
                        })
                        .start();
                });
            }
        }
    };
    t.prototype.onClickUnlockBox = function () {
        var e = this;
        $game.default.apiPlatform.videoTrack("game", "addBox_video", $commonData.default.currLevel, 1);
        $game.default.apiPlatform.reportButton("GamePage", "addBox_video", $commonData.default.currLevel, 1, 1);
        $game.default.apiPlatform.showRewardAD(function () {
            console.log("????????????");
            (function () {
                console.log("????????????2");
                var t = e.boxCurArr.slice();
                var y = $eliminateBoxManager.default.instance.strategy_5(
                    e.holeNode.children,
                    $elinimateCreatelevel.default.instance.screwArr,
                    $elinimateCreatelevel.default.instance.boxArr,
                    t
                );
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>->", y);
                $game.default.apiPlatform.reportButton(
                    "GamePage",
                    "addBox_video_success",
                    $commonData.default.currLevel,
                    1,
                    2
                );
                $game.default.apiPlatform.videoTrack("game", "addBox_video_success", $commonData.default.currLevel, 2);
                e.unlockBox(y);
                $eliminateBoxManager.default.instance.easyBoxNum = 3;
            })();
            $eliminateManager.default.instance.InitFlag();
        });
    };
    t.prototype.unlockBox = function (e) {
        var t = this;
        var y = this.boxCurArr.slice();
        e =
            e ||
            $eliminateBoxManager.default.instance.strategy_5(
                this.holeNode.children,
                $elinimateCreatelevel.default.instance.screwArr,
                $elinimateCreatelevel.default.instance.boxArr,
                y
            );
        var x = this.boxUnlockNode.children[this._unlockBoxIndex];
        $commonData.default.eliminatePropUseNum[4]++;
        this._unlockBoxIndex++;
        cc.tween(x)
            .to(0.4, {
                y: 1e3
            })
            .call(function () {
                x.active = !1;
                t.boxCurArr.push(e);
                var y = 180 * (t.boxCurArr.length - 1) - 270;
                cc.tween(e)
                    .to(0.25, {
                        x: y,
                        y: -90,
                        opacity: 255
                    })
                    .call(function () {
                        t.onBoxUnlock();
                        $eliminateManager.default.instance.propState = $enum.ENUM_PROP_STATES.NONE;
                        t.checkBoxScrew(e, e.children.length - 1, t._unlockBoxIndex + 1);
                        t.checkIfScrewInHole();
                        if ($elinimateCreatelevel.default.instance.boxArr.length <= 0) {
                            t.boxUnlockNode.children.forEach(function (e) {
                                e.getComponent(cc.Button).interactable = !1;
                                e.children[0].active = !1;
                                e.children[1].active = !1;
                                cc.tween(e)
                                    .by(0.15, {
                                        position: cc.v3(0, 1e3)
                                    })
                                    .start();
                            });
                        }
                        t.setBoxPosAni(t.boxCurArr);
                    })
                    .start();
            })
            .start();
    };
    t.prototype.onBoxUnlock = function () {
        this._unlockBoxIndex;
    };
    t.prototype.setBoxFade = function () {
        var e;
        var t = this;
        var y = function (y, o) {
            var i = $elinimateCreatelevel.default.instance.gameNode.children[y].children[0];
            if (0 == i.childrenCount) {
                e = o;
                return "continue";
            }
            if (
                $eliminateManager.default.instance.isSpecialLevel &&
                y >= $eliminateManager.default.instance.normalLayerNum
            ) {
                e = o;
                return "continue";
            }
            var n = $elinimateCreatelevel.default.instance.gameNode.children[y].children[1];
            if (o < 3) {
                i.children.forEach(function (e) {
                    e.opacity = 210;
                    e.color =
                        $elinimateCreatelevel.default.instance._steelColor[
                            $elinimateCreatelevel.default.instance.steelColorMap.get(i.parent.name)
                        ];
                    e.children.forEach(function (e) {
                        e.active = !0;
                        e.color = cc.color(255, 255, 255);
                    });
                });
                n.opacity = 255;
            }
            if (3 == o) {
                i.children.forEach(function (e) {
                    e.children.forEach(function (e, y) {
                        e.active = !0;
                        if (0 == y) {
                            t.scheduleOnce(function () {
                                cc.tween(e)
                                    .to(0.3, {
                                        opacity: 210,
                                        color: cc.color(255, 255, 255)
                                    })
                                    .start();
                            }, 0.5);
                        } else {
                            t.scheduleOnce(function () {
                                cc.tween(e)
                                    .to(0.3, {
                                        opacity: 210,
                                        color: cc.color(255, 255, 255)
                                    })
                                    .start();
                            }, 0.8);
                        }
                    });
                    cc.tween(e)
                        .to(0.5, {
                            opacity: 210,
                            color: $elinimateCreatelevel.default.instance._steelColor[
                                $elinimateCreatelevel.default.instance.steelColorMap.get(i.parent.name)
                            ]
                        })
                        .start();
                });
                x.scheduleOnce(function () {
                    cc.tween(n)
                        .to(0.3, {
                            opacity: 255
                        })
                        .start();
                }, 1.2);
            } else {
                o > 3 && o <= 5
                    ? (i.children.forEach(function (e) {
                          e.color = $elinimateCreatelevel.default.instance._steelColorGrey;
                          e.opacity = $elinimateCreatelevel.default.instance._steelOpacity;
                          e.children.forEach(function (e) {
                              e.active = !1;
                          });
                          e.children[0].active = !0;
                          e.children[0].color = $elinimateCreatelevel.default.instance._steelColorGrey;
                          e.children[0].opacity = $elinimateCreatelevel.default.instance._steelOpacity;
                      }),
                      (n.opacity = 0),
                      (i.active = !0),
                      cc
                          .tween(i)
                          .to(1, {
                              opacity: 255
                          })
                          .start())
                    : o > 5 && ((n.opacity = 0), (i.opacity = 0), (i.active = !1));
            }
            e = ++o;
        };
        var x = this;
        var o = $elinimateCreatelevel.default.instance.gameNode.childrenCount - 1;
        for (var i = 0; o >= 0; o--) {
            y(o, i);
            i = e;
        }
    };
    t.prototype.findEmptyHoleIndex = function () {
        var e = this.holeNode.children.map(function (e) {
            return Math.round(e.getPosition().x);
        });
        for (var t = 0; t < this.holeFather.childrenCount; t++) {
            if (-1 == e.indexOf(Math.round(this.holeFather.children[t].getPosition().x))) {
                return t;
            }
        }
    };
    t.prototype.setSpeed = function (e) {
        var t = e.parent.parent.children[0];
        for (var y = 0; y < t.children.length; y++) {
            t.children[y].getComponent(cc.RigidBody).gravityScale = 1;
        }
    };
    t.prototype.setAddHoleAni = function (e) {
        if (!this.addHoleButton.interactable) {
            this.addHoleAni.stop();
            return void (this.addHoleAni.node.scale = 0.9);
        }
        if (e) {
            this.addHoleAni.play();
        } else {
            this.addHoleAni.stop();
            this.addHoleAni.node.scale = 0.9;
        }
    };
    t.prototype.setTipHoleAni = function (e) {
        if (e) {
            if (this.screwHoleUnlockNum == this.screwHoleMaxNum) {
                return;
            }
            this.tipHoleAnimation.node.setPosition(this.firstPosX - this.holeDistance, 0);
            this.tipHoleAnimation.node.active = !0;
            this.tipHoleAnimation.play();
        } else {
            this.tipHoleAnimation.node.active = !1;
        }
    };
    t.prototype.setUnLockBoxAni = function () {};
    t.prototype.showClearPropWindow = function () {
        if($commonData.default.eliminatePropUseNum[2] >= 2){
            
            console.error("无法使用不弹窗3")
            return
        }
        var e = this;
        if (
            this.screwHoleUnlockNum == this.screwHoleMaxNum &&
            this.screwHoleUnlockNum - this.screwNum_Hole == 1 &&
           
            1 != this.clrearWindowState
        ) {
            this.clrearWindowState = 1;
            this.clearWindow.active = !0;
            cc.tween(this.clearWindow)
                .to(
                    0.3,
                    {
                        position: cc.v3(0, this.clearWindow.getPosition().y)
                    },
                    {
                        easing: "quadIn"
                    }
                )
                .call(function () {
                    e.tempTimeCount1 = 0;
                    e.CountTimeForClear();
                })
                .start();
        }
    };
    t.prototype.CountTimeForClear = function () {
        var e = this;
        this.scheduleOnce(function () {
            if (0 == e.clrearWindowState || e.tempTimeCount1 >= 10) {
                e.closeClearPropWindow();
            } else {
                e.tempTimeCount1++;
                e.CountTimeForClear();
            }
        }, 1);
    };
    t.prototype.closeClearPropWindow = function () {
        var e = this;
        this.clrearWindowState = 0;
        this.tempTimeCount1 = 0;
        if (this.clearWindow.active) {
            cc.tween(this.clearWindow)
                .to(
                    0.3,
                    {
                        position: cc.v3(-200, this.clearWindow.getPosition().y)
                    },
                    {
                        easing: "quadIn"
                    }
                )
                .call(function () {
                    e.clearWindow.active = !1;
                })
                .start();
        } else {
            this.clearWindow.setPosition(cc.v2(-200, this.clearWindow.getPosition().y));
        }
    };
    t.prototype.showBreakPropWindow = function () {
     if( $commonData.default.eliminatePropUseNum[3]>=2 ){
        console.error("无法使用不弹窗3")
        return;
     }
        var e = this;
        if (1 != this.clrearWindowState) {
            var t = null;
            for (var y = $elinimateCreatelevel.default.instance.gameNode.childrenCount - 1; y >= 0; y--) {
                var x = $elinimateCreatelevel.default.instance.gameNode.children[y].children[0];
                if (0 != x.childrenCount) {
                    if (1 != x.childrenCount) {
                        return;
                    }
                    t = x.children[0];
                    break;
                }
            }
            if (null != t && !(t.getComponent($elinimatesteel.default).getScrewNum() < 4)) {
                var o = [];
                $elinimateCreatelevel.default.instance.screwArr.forEach(function (e) {
                    if (e.name) {
                        e.getComponent("ElinimateScrew")
                            ? e.getComponent("ElinimateScrew").checkClickable() && o.push(e)
                            : "SetScrewNode" === e.parent.name && o.push(e);
                    }
                });
                var i = this.boxCurArr.slice().map(function (t) {
                    return e.getType(t.name, "box_");
                });
                var n = o.map(function (t) {
                    return e.getType(t.name, "screw_");
                });
                console.error("boxCurType------>", i);
                console.error("screwTye------>", n);
                for (y = 0; y < i.length; y++) {
                    if (-1 != n.indexOf(i[y])) {
                        return;
                    }
                }
                this.breakWindowState = 1;
                this.breakWindow.active = !0;
                cc.tween(this.breakWindow)
                    .to(
                        0.3,
                        {
                            position: cc.v3(0, this.breakWindow.getPosition().y)
                        },
                        {
                            easing: "quadIn"
                        }
                    )
                    .call(function () {
                        e.tempTimeCount2 = 0;
                        e.CountTimeForBreak();
                    })
                    .start();
            }
        }
    };
    t.prototype.CountTimeForBreak = function () {
        var e = this;
        this.scheduleOnce(function () {
            if (0 == e.breakWindowState || e.tempTimeCount2 >= 10) {
                e.closeBreakPropWindow();
            } else {
                e.tempTimeCount2++;
                e.CountTimeForBreak();
            }
        }, 1);
    };
    t.prototype.closeBreakPropWindow = function () {
        var e = this;
        this.breakWindowState = 0;
        this.tempTimeCount2 = 0;
        if (this.breakWindow.active) {
            cc.tween(this.breakWindow)
                .to(
                    0.3,
                    {
                        position: cc.v3(-200, this.breakWindow.getPosition().y)
                    },
                    {
                        easing: "quadIn"
                    }
                )
                .call(function () {
                    e.breakWindow.active = !1;
                })
                .start();
        } else {
            this.breakWindow.setPosition(cc.v2(-200, this.breakWindow.getPosition().y));
        }
    };
    t.prototype.playCloseBoxSound = function () {
        if ($commonData.default.soundOn) {
            this.closeBoxMusic.play();
        }
    };
    t.prototype.playAddScrewSound = function () {
        if ($commonData.default.soundOn) {
            this.addScrewMusic.play();
        }
    };
    t.prototype.playScrewSound = function () {
        if ($commonData.default.soundOn) {
            this.screwMusic.play();
        }
    };
    t.prototype.overr = function () {
        $eliminateManager.default.instance.endGame(!0);
    };
    t.prototype.getType = function (e, t) {
        return parseInt(e.split(t)[1]);
    };
    t.prototype.openAI = function () {
        $commonData.default.eliminte_game_mode = $commonData.Eliminate_Mode.AIPLAY;
        this.StartByAI();
    };
    t.prototype.colseAi = function () {
        this.stopByAi();
    };
    t.prototype.StartByAI = function () {
        this.stopByAi();
        var e = this;
        this.controlAi.schedule(function () {
            e.AI();
        }, this.aiTime);
    };
    t.prototype.stopByAi = function () {
        this.controlAi.unscheduleAllCallbacks();
    };
    t.prototype.setSpeedForAI = function () {
        var e = this;
        this.schedule(function () {
            if (
                $commonData.default.isgameing &&
                !$commonData.default.isPause &&
                $commonData.default.eliminte_game_mode == $commonData.Eliminate_Mode.AIPLAY
            ) {
                e.stopByAi();
                e.aiTime = e.getRandomFloat(0.5, 2);
                e.StartByAI();
            }
        }, 3);
    };
    t.prototype.findNextScrew = function () {
        var e = this;
        var t = this.boxCurArr.slice();
        var y = [];
        t.forEach(function (e) {
            var t = $elinimateCreatelevel.default.instance.boxMap.get(e);
            if (t && t.getCanPushScrew()) {
                y.push(e);
            }
        });
        var x = [];
        $elinimateCreatelevel.default.instance.screwArr.forEach(function (e) {
            if (e.name) {
                e.getComponent("ElinimateScrew")
                    ? e.getComponent("ElinimateScrew").checkClickable() && x.push(e)
                    : "SetScrewNode" === e.parent.name && x.push(e);
            }
        });
        if (!(x.length <= 0)) {
            if (y.length <= 0) {
                if (x[x.length - 1]) {
                    x[x.length - 1].getComponent("ElinimateScrew").screwAni();
                }
            } else {
                {
                    var o = y.map(function (t) {
                        return e.getType(t.name, "box_");
                    });
                    var i = x.map(function (t) {
                        return e.getType(t.name, "screw_");
                    });
                    for (var n = 0; n < i.length; n++) {
                        if (-1 != o.indexOf(i[n])) {
                            return void x[n].getComponent("ElinimateScrew").screwAni();
                        }
                    }
                    if (x[x.length - 1]) {
                        x[x.length - 1].getComponent("ElinimateScrew").screwAni();
                    }
                }
            }
        }
    };
    t.prototype.AI = function () {
        if (
            $commonData.default.isgameing &&
            !$commonData.default.isPause &&
            $commonData.default.eliminte_game_mode == $commonData.Eliminate_Mode.AIPLAY
        ) {
            this.findNextScrew();
        }
    };
    t.prototype.getRandomFloat = function (e, t) {
        return Math.random() * (t - e) + e;
    };
    t.instance = null;
    __decorate([S(cc.Prefab)], t.prototype, "boxPre", void 0);
    __decorate([S(cc.Prefab)], t.prototype, "boxMotionTrail", void 0);
    __decorate([S(cc.Node)], t.prototype, "boxNode", void 0);
    __decorate([S(cc.Node)], t.prototype, "boxUnlockNode", void 0);
    __decorate([S(cc.Node)], t.prototype, "holeNode", void 0);
    __decorate([S(cc.Animation)], t.prototype, "tipHoleAnimation", void 0);
    __decorate([S(cc.Node)], t.prototype, "holeFather", void 0);
    __decorate([S(cc.Node)], t.prototype, "adHoleNodeArr", void 0);
    __decorate([S(cc.Prefab)], t.prototype, "screwImgPre", void 0);
    __decorate([S(cc.Prefab)], t.prototype, "screwMotionTrail", void 0);
    __decorate([S(cc.Node)], t.prototype, "Shovel", void 0);
    __decorate([S(cc.Animation)], t.prototype, "addHoleAni", void 0);
    __decorate([S(cc.Button)], t.prototype, "addHoleButton", void 0);
    __decorate(
        [
            S({
                type: cc.AudioSource,
                tooltip: "关闭盒子"
            })
        ],
        t.prototype,
        "closeBoxMusic",
        void 0
    );
    __decorate(
        [
            S({
                type: cc.AudioSource,
                tooltip: "螺丝插入"
            })
        ],
        t.prototype,
        "addScrewMusic",
        void 0
    );
    __decorate(
        [
            S({
                type: cc.AudioSource,
                tooltip: "螺丝拔出"
            })
        ],
        t.prototype,
        "screwMusic",
        void 0
    );
    __decorate(
        [
            S({
                type: sp.Skeleton,
                tooltip: "螺丝拔出spine"
            })
        ],
        t.prototype,
        "pushSpine",
        void 0
    );
    __decorate(
        [
            S({
                type: cc.Node,
                tooltip: "放置孔的总父节点"
            })
        ],
        t.prototype,
        "putHoleNode",
        void 0
    );
    __decorate(
        [
            S({
                type: cc.Node,
                tooltip: "磁铁道具弹窗"
            })
        ],
        t.prototype,
        "clearWindow",
        void 0
    );
    __decorate(
        [
            S({
                type: cc.Node,
                tooltip: "锤子道具弹窗"
            })
        ],
        t.prototype,
        "breakWindow",
        void 0
    );
    __decorate(
        [
            S({
                type: cc.Sprite,
                tooltip: "自动运行速度"
            })
        ],
        t.prototype,
        "controlAi",
        void 0
    );
    return (y = __decorate([w], t));
})(cc.Component);
exports.default = P;
var N = function (e, t, y) {
    this.haveScrew = !1;
    this.pos = cc.v3(0);
    this.screwNode = null;
    this.haveScrew = e;
    this.pos = t;
    this.screwNode = y;
};
