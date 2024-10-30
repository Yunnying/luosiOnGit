var o;
var r = cc._decorator;
var a = r.ccclass;
var c = r.property;
var $game = require("../../scripts/Game");
var $enum = require("../../scripts/Enum");
var $commonData = require("../../scripts/commonData");
var $localStorage = require("../../scripts/localStorage");
var $eliminateGamelevel = require("./EliminateGamelevel");
var $elinimateGameOverView = require("./ElinimateGameOverView");
var $propView = require("./propView");
var $platform = require("../../scripts/platform");
var $eliminateProgressManager = require("./EliminateProgressManager");
var $battleManager = require("../../scripts/BattleManager");
var $elinimateCreatelevel = require("./ElinimateCreatelevel");
var $config = require("../../scripts/config");
var $postUserData = require("../../scripts/PostUserData");
const { default: UIMgrClass } = require("../../ts/UIMgr");
var P = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.moveTipNode = null;
        t.loadImg = null;
        t.gamePnl = null;
        t.levelLabel = null;
        t.timeLabel = null;
        t.propBtnNode = null;
        t.SetlevelNode = null;
        t.gameOverPnl = null;
        t.propPnl = null;
        t.setPnl = null;
        t.revivePnl = null;
        t.ExitPnl = null;
        t.LvEditBox = null;
        t.propBtnVideImg = [];
        t.videImg = [];
        t.shareImg = [];
        t.skinVideoImg = [];
        t.digNode = null;
        t.nandu = null;
        t.specialSkinVideoIcon = [];
        t.propState = $enum.ENUM_PROP_STATES.NONE;
        t.gameState = $enum.ENUM_GAME_STATES.NORMAL;
        t.nowLoadLv = 0;
        t.canvas = null;
        t.isSpecialLevel = !1;
        t.specialLayerNum = 0;
        t.normalLayerNum = 0;
        t.first = !0;
        t.isDisPlay = !1;
        t._levelPrefab = null;
        t._levelData = null;
        t.crushGuide = null;
        y.instance = t;
        return t;
    }
    var y;
    __extends(t, e);
    y = t;
    t.prototype.onLoad = function () {
        this.gamePnl.active = !0;
        cc.director.getCollisionManager().enabled = !0;
        $commonData.default.firstIntoElimateGame = !0;
        this.first = !0;
        this.GameInit();
        window["emgr"]=this;
    };
    t.prototype.onEnable = function () {
        $battleManager.default.instance.playBGM();
    };
    t.prototype.start = function () {
        var e = this;
        if (this.moveTipNode) {
            this.moveTipNode.on(
                "touchmove",
                function (t) {
                    e.moveHouse(t);
                },
                this.moveTipNode,
                !1
            );
        }
    };
    t.prototype.moveHouse = function (e) {
        this.moveTipNode.setPosition(this.moveTipNode.parent.convertToNodeSpaceAR(e.getLocation()));
    };
    t.prototype.InitFlag = function () {
        console.error("设置显示--->", $commonData.default.firstAdNumDay, $commonData.default.skinVideoCoupon);
        [this.shareImg, this.skinVideoImg, this.videImg].forEach(function (e) {
            return e.forEach(function (e) {
                return (e.active = !1);
            });
        });
        this.InitProp();
        if ($commonData.default.firstAdNumDay > 0) {
            this.shareImg.forEach(function (e) {
                return (e.active = !0);
            });
        } else {
            $commonData.default.skinVideoCoupon > 0
                ? this.skinVideoImg.forEach(function (e) {
                      return (e.active = !0);
                  })
                : this.videImg.forEach(function (e) {
                      return (e.active = !0);
                  });
        }
    };
    t.prototype.InitBntInteractable = function () {
        this.propBtnVideImg.forEach(function (e) {
            e.parent.getComponent(cc.Button).interactable = !0;
        });
    };
    t.prototype.InitProp = function () {
        var e = $localStorage.default.getLocalItem("addHoleHave", !1);
        var t = $localStorage.default.getLocalItem("clearHoleHave", !1);
        var y = $localStorage.default.getLocalItem("creshSteelPreHave", !1);
        this.propBtnVideImg[0].active = !!e;
        this.propBtnVideImg[1].active = !!t;
        this.propBtnVideImg[2].active = !!y;
    };
    t.prototype.getCurrentLv = function () {
        if ($commonData.default.eliminatePasslevel > $commonData.default.eliminateMaxLv) {
            for (
                var e = Math.ceil($commonData.default.eliminateMaxLv * Math.random());
                e == $commonData.default.currLevel;

            ) {
                e = Math.ceil($commonData.default.eliminateMaxLv * Math.random());
            }
            $commonData.default.currLevel = e;
        } else {
            $commonData.default.currLevel = $commonData.default.eliminatePasslevel;
        }
    };
    t.prototype.GameInit = function () {
        var e = this;
        this.isDisPlay = $localStorage.default.getLocalItem("secondDisPlay", !1);
        this.showModeTip2();
        $platform.reportLevel($commonData.default.currLevel, "startLevel", $commonData.default.GameMode);
        $platform.completeTrack($commonData.default.currLevel, "startLevel");
        this.loadImg.active = !0;
        this.SetlevelNode.removeAllChildren();
        this.stopTimeSchedule();
        this.scheduleOnce(function () {
            $eliminateProgressManager.default.instance.initNodePos();
            $commonData.default.isAddTime = !1;
            $commonData.default.isgameing = !1;
            $commonData.default.isPause = !1;
            $commonData.default.gameTime = 10;
            $commonData.default.eliminatePropUseNum = [0, 0, 0, 0, 0];
            e.timeLabel.string = e.changeSecondToMinute($commonData.default.gameTime);
            e.propState = $enum.ENUM_PROP_STATES.NONE;
            e.gameState = $enum.ENUM_GAME_STATES.NORMAL;
            e.propBtnNode.active = !0;
            e.crushGuide.active = !1;
            e.loadEliminateRes($commonData.default.currLevel).then(function () {
                if ($commonData.default.eliminatePasslevel > $commonData.default.eliminateMaxLv) {
                    e.levelLabel.string = "挑战关卡";
                    e.isDisPlay = !1;
                    $localStorage.default.setLocalItem("secondDisPlay", !1);
                } else {
                    e.levelLabel.string = "关卡 " + $commonData.default.currLevel;
                }
                cc.instantiate(e._levelPrefab).setParent(e.SetlevelNode);
                $eliminateGamelevel.default.instance.init(e._levelData);
                e.setTips();
            });
        });
    };
    t.prototype.loadEliminateRes = function (e) {
        var t = this;
        let lll=e;
        console.log("显示是第===》", e);
        if (2 == e && this.isDisPlay) {
            this.isDisPlay = !0;
        } else {
            this.isDisPlay = !1;
        }
        var y = this;
        if (!(e = $commonData.default.eliminateLevelData[e - 1])) {
            console.error("映射文件没有该关卡名===>", e);
            e = 1;
        }
        console.log("实际是第===》", e);
        if (1 == e) {
            $commonData.default.eliminateScrewFirstLevel = ["level2", "level2", "level2"];
            $commonData.default.eliminateScrewFirstData = [2, 1, 0];
        } else {
            if (192 == e) {
                $commonData.default.eliminateScrewFirstLevel = ["level2", "level2", "level2"];
                $commonData.default.eliminateScrewFirstData = [2, 1, 0];
            }
        }
        this.initSpecialFlag(e);
        return Promise.all([
            $game.default.resManager.loadBundleRes("Eliminatemode", "eliminateLevel", cc.JsonAsset).then(function (t) {
                console.error("实际关卡id",e.toString());
                if(window["edit1"]&&window["edit1"].setGameLevel){
                    y._levelData =window["edit1"].setGameLevel(e,lll);
                }else{
                    y._levelData = t.json[e.toString()];
                }
               
            }),
            $game.default.resManager.loadBundleRes("Eliminatemode", "level/Lv0", cc.Prefab).then(function (e) {
                y._levelPrefab = e;
            }),
            new Promise(function (y) {
                if (null == $commonData.default.strategyData) {
                    $game.default.resManager
                        .loadBundleRes("Eliminatemode", "eliminateStrategy", cc.JsonAsset)
                        .then(function (y) {
                            $commonData.default.strategyData = y.json.data;
                            $eliminateGamelevel.default.instance.strategyData = t.findStrategy(e);
                        });
                    console.log("拿的本地的");
                } else {
                    $eliminateGamelevel.default.instance.strategyData = t.findStrategy(e);
                }
                console.log("拿到的策略----》", $eliminateGamelevel.default.instance.strategyData);
                y(null);
            })
        ]);
    };
    t.prototype.findStrategy = function (e) {
        for (var t = 0; t < $commonData.default.strategyData.length; t++) {
            if ($commonData.default.strategyData[t].level == e.toString()) {
                return $commonData.default.strategyData[t];
            }
        }
    };
    t.prototype.initSpecialFlag = function (e) {
        this.isSpecialLevel = !1;
        this.specialLayerNum = 0;
        var t = $commonData.default.eliminateSpecialLevel.indexOf(e);
        if (-1 != t) {
            this.isSpecialLevel = !0;
            this.specialLayerNum = $commonData.default.eliminateSpeciallayer[t];
        }
    };
    t.prototype.setTips = function () {
        var e = this;
        var t = cc.sys.localStorage.getItem("firstgame");
        var y = $localStorage.default.getLocalItem("isTip", !1);
        if (!("played" != t || y)) {
            this.digNode.active = !0;
            $localStorage.default.setLocalItem("isTip", !0);
            cc.tween(this.digNode)
                .delay(3)
                .to(1, {
                    opacity: 0
                })
                .call(function () {
                    e.digNode.opacity = 255;
                    e.digNode.active = !1;
                })
                .start();
        }
    };
    t.prototype.abTestLevel = function (e, t) {
        return new Promise(function (y) {
            if (!($config.currentPlatform == $config.platformEnum.wechat)) {
                $game.default.resManager
                    .loadBundleRes("Eliminatemode", "eliminateLevel", cc.JsonAsset)
                    .then(function (x) {
                        e._levelData = x.json[t.toString()];
                        y(null);
                    });
            }
        });
    };
    t.prototype.reviveAddTime = function () {
        $commonData.default.gameTime += 120;
        $commonData.default.isAddTime = !0;
        this.timeLabel.string = this.changeSecondToMinute($commonData.default.gameTime);
        this.updateTime();
    };
    t.prototype.addTime = function (e) {
        $commonData.default.gameTime += e;
        this.timeLabel.string = this.changeSecondToMinute($commonData.default.gameTime);
    };
    t.prototype.startGame = function () {
        var e = this;
        Promise.all($elinimateCreatelevel.default.instance.loadArray).then(function () {
            e.scheduleOnce(function () {
                $commonData.default.isgameing = !0;
                e.startClock();
                e.updateTime();
                $eliminateGamelevel.default.instance.boxCurArrInit();
                $eliminateGamelevel.default.instance.guideInit();
                if (e.first && 1 != $commonData.default.currLevel) {
                    e.first = !1;
                    e.clickReplay();
                } else {
                    e.loadImg.active = !1;
                    e.isDisPlay &&
                        ((e.nandu.active = !0),
                        e.scheduleOnce(function () {
                            e.nandu.active = !1;
                            $localStorage.default.setLocalItem("secondDisPlay", !1);
                        }, 2.2));
                }
            }, 0.05);
        });
    };
    t.prototype.pauseGame = function () {
        $commonData.default.isPause = !0;
    };
    t.prototype.resumeGame = function () {
        if ($commonData.default.isgameing) {
            $commonData.default.isPause = !1;
        }
    };
    t.prototype.endGame = function (e) {
        $commonData.default.isgameing = !1;
        $commonData.default.isPause = !0;
        if (e) {
            this.gameState = $enum.ENUM_GAME_STATES.WIN;
            $platform.reportLevel($commonData.default.currLevel, "passLevel", $commonData.default.GameMode);
            if ($commonData.default.eliminatePasslevel <= 180 && $commonData.default.currLevel <= 180) {
               
                //let com= UIMgrClass.I.open("shopCollectPnlNew",{isUnlock:true});
                // var t = $commonData.default.currLevel - 1;
                // $commonData.default.shopCollect.show();
                // this.scheduleOnce(function () {
                //     $commonData.default.shopCollect.unlockUnitByIndexWithAni(
                //         t,
                //         $eliminateProgressManager.default.instance.collectNode2
                //     );
                // }, 1);
            }
            this.setLevel();
        } else {
            this.gameState = $enum.ENUM_GAME_STATES.LOSE;
        }
        $elinimateGameOverView.default.instance.init();
        this.showUI(this.gameOverPnl);
    };
    t.prototype.closeGamePnl = function () {
        $commonData.default.isgameing = !1;
        $commonData.default.isPause = !0;
        this.levelLabel.unscheduleAllCallbacks();
        this.timeLabel.unscheduleAllCallbacks();
        this.showUI(this.gameOverPnl, !1);
    };
    t.prototype.startClock = function () {
        this.levelLabel.unscheduleAllCallbacks();
        $commonData.default.gamingtime = 0;
        this.levelLabel.schedule(function () {
            if (!$commonData.default.isPause) {
                $commonData.default.gamingtime++;
            }
        }, 1);
    };
    t.prototype.updateTime = function () {
        var e = this;
        this.stopTimeSchedule();
        this.timeLabel.schedule(function () {
            if ($commonData.default.gameTime <= 1) {
                e.stopTimeSchedule();
            }
            if (!$commonData.default.isPause) {
                $commonData.default.gameTime--;
            }
            if ($commonData.default.gameTime < 0) {
                $commonData.default.gameTime = 0;
            }
            e.timeLabel.string = e.changeSecondToMinute($commonData.default.gameTime);
        }, 1);
    };
    t.prototype.stopTimeSchedule = function () {
        this.timeLabel.unscheduleAllCallbacks();
    };
    t.prototype.showProp = function () {
        $commonData.default.isPause = !0;
        this.showUI(this.propPnl);
    };
    t.prototype.getNextLevel = function () {
        console.warn("获取下一个关卡", $commonData.default.eliminatePasslevel, $commonData.default.eliminateMaxLv);
        if ($commonData.default.eliminatePasslevel > $commonData.default.eliminateMaxLv) {
            for (
                var e = Math.ceil($commonData.default.eliminateMaxLv * Math.random());
                e == $commonData.default.currLevel;

            ) {
                e = Math.ceil($commonData.default.eliminateMaxLv * Math.random());
            }
            $commonData.default.currLevel = e;
        }
    };
    t.prototype.setLevel = function () {
        console.log("setLevel------>", $commonData.default.eliminatePasslevel, $commonData.default.eliminateMaxLv);
        if ($commonData.default.eliminatePasslevel <= $commonData.default.eliminateMaxLv) {
            $commonData.default.eliminatePasslevel++;
            $commonData.default.currLevel = $commonData.default.eliminatePasslevel;
            cc.sys.localStorage.setItem("currentLevel", $commonData.default.eliminatePasslevel);
            if ("" != $commonData.default.openId) {
                $postUserData.seletPostUserData(["level"]);
            }
        }
    };
    t.prototype.clickAddHole = function () {
        if (this.propState == $enum.ENUM_PROP_STATES.NONE) {
            this.propState = $enum.ENUM_PROP_STATES.ADD_HOLE;
            $propView.default.instance.initProp();
        }
    };
    t.prototype.clickAddHole2 = function () {
        if (this.propState == $enum.ENUM_PROP_STATES.NONE) {
            this.propState = $enum.ENUM_PROP_STATES.ADD_HOLE;
            $propView.default.instance.initProp(!0);
        }
    };
    t.prototype.clickClearHole = function () {
        if (this.propState == $enum.ENUM_PROP_STATES.NONE) {
            this.propState = $enum.ENUM_PROP_STATES.CLEAR_HOLE;
            $propView.default.instance.initProp();
        }
    };
    t.prototype.clickClearHole2 = function () {
        if (this.propState == $enum.ENUM_PROP_STATES.NONE) {
            this.propState = $enum.ENUM_PROP_STATES.CLEAR_HOLE;
            $propView.default.instance.initProp(!0);
        }
    };
    t.prototype.clickCrushSteel = function () {
        if (this.propState == $enum.ENUM_PROP_STATES.NONE) {
            this.propState = $enum.ENUM_PROP_STATES.CRESH_STEEL_PRE;
            $propView.default.instance.initProp();
        }
    };
    t.prototype.clickCrushSteel2 = function () {
        if (this.propState == $enum.ENUM_PROP_STATES.NONE) {
            this.propState = $enum.ENUM_PROP_STATES.CRESH_STEEL_PRE;
            $propView.default.instance.initProp(!0);
        }
    };
    t.prototype.clickAddBox = function () {
        if (this.propState == $enum.ENUM_PROP_STATES.NONE) {
            this.propState = $enum.ENUM_PROP_STATES.ADD_BOX;
            $propView.default.instance.initProp();
        }
    };
    t.prototype.clickAddBox2 = function () {
        if (this.propState == $enum.ENUM_PROP_STATES.NONE) {
            this.propState = $enum.ENUM_PROP_STATES.ADD_BOX;
            $propView.default.instance.initProp(!0);
        }
    };
    t.prototype.changeSecondToMinute = function (e) {
        if (void 0 === e) {
            e = 180;
        }
        var t = ~~(e / 3600);
        var y = ~~(e / 60) - 60 * t;
        var x = e % 60;
        t = String(t).padStart(2, "0");
        y = String(y).padStart(2, "0");
        x = String(x).padStart(2, "0");
        return "00" === t ? y + ":" + x : t + ":" + y + ":" + x;
    };
    t.prototype.showCrushGuide = function () {
        this.propBtnNode.active = !1;
        this.crushGuide.active = !0;
    };
    t.prototype.showHammer = function (e, t) {
        var y = this;
        var x = cc.instantiate(this.crushGuide.getChildByName("newHammer"));
        x.setParent(this.crushGuide);
        x.active = !0;
        var o = this.crushGuide.convertToNodeSpaceAR(e.convertToWorldSpaceAR(cc.Vec2.ZERO));
        cc.tween(x)
            .to(0.25, {
                x: o.x,
                y: o.y
            })
            .call(function () {
                x.getChildByName("hammer").getComponent(sp.Skeleton).animation = "animation";
                y.scheduleOnce(function () {
                    y.propBtnNode.active = !0;
                    y.crushGuide.active = !1;
                    if (t) {
                        t();
                    }
                    x.destroy();
                }, 0.5);
            })
            .start();
    };
    t.prototype.clickSkip = function () {
        this.setLevel();
        y.instance.getNextLevel();
        y.instance.GameInit();
    };
    t.prototype.showUI = function (e, t) {
        var y;
        var x;
        if (void 0 === t) {
            t = !0;
        }
        if (t) {
            e.children[1].scale = 0;
            e.active = !0;
            null === (y = e.children[1].getComponent(cc.Animation)) || void 0 === y || y.play("appear");
        } else {
            null === (x = e.children[1].getComponent(cc.Animation)) || void 0 === x || x.play("disappear");
            this.scheduleOnce(function () {
                e.active = !1;
            }, 0.2);
        }
    };
    t.prototype.changeLoadLv = function () {
        this.nowLoadLv = parseFloat(this.LvEditBox.string);
    };
    t.prototype.clickLoadLv = function () {
        $commonData.default.currLevel = this.nowLoadLv;
        $commonData.default.eliminatePasslevel = this.nowLoadLv;
        this.GameInit();
    };
    t.prototype.clickHide = function () {
        $battleManager.default.instance.testNode[1].children.forEach(function (e) {
            if ("只变透明" == e.name) {
                e.opacity = 255 == e.opacity ? 0 : 255;
            } else {
                if ("不受隐藏ui影响" != e.name) {
                    e.active = !e.active;
                }
            }
        });
        $battleManager.default.instance.testNode[0].active = !$battleManager.default.instance.testNode[0].active;
    };
    t.prototype.clickShow = function () {};
    t.prototype.showModeTip = function () {
        if (this.moveTipNode) {
            this.moveTipNode.active = !this.moveTipNode.active;
            this.moveTipNode.children[1].getComponent(cc.Label).string =
                "主线模式-->第" + $commonData.default.currLevel + "关";
        }
    };
    t.prototype.showModeTip2 = function () {
        if (this.moveTipNode) {
            this.moveTipNode.children[1].getComponent(cc.Label).string =
                "主线模式-->第" + $commonData.default.currLevel + "关";
        }
    };
    t.prototype.clickReplay = function () {
        this.GameInit();
    };
    t.prototype.clickAddTime = function () {
        this.addTime(30);
    };
    t.prototype.showSteel = function () {
        var e;
        var t = function (t, y) {
            y++;
            var x = $elinimateCreatelevel.default.instance.gameNode.children[t].children[0];
            if (0 == x.childrenCount) {
                e = y;
                return "continue";
            }
            var o = $elinimateCreatelevel.default.instance.gameNode.children[t].children[1];
            x.active = !0;
            x.opacity = 255;
            x.children.forEach(function (e) {
                cc.tween(e)
                    .to(0.2, {
                        color: $elinimateCreatelevel.default.instance._steelColor[
                            $elinimateCreatelevel.default.instance.steelColorMap.get(x.parent.name)
                        ]
                    })
                    .start();
                e.children.forEach(function (e) {
                    e.active = !0;
                    e.opacity = 210;
                });
                e.children[0].color = cc.color(255, 255, 255);
                e.children[0].opacity = 210;
                e.opacity = 210;
            });
            cc.tween(o)
                .to(0.5, {
                    opacity: 255
                })
                .start();
            e = y;
        };
        var y = $elinimateCreatelevel.default.instance.gameNode.childrenCount - 1;
        for (var x = 0; y >= 0; y--) {
            t(y, x);
            x = e;
        }
    };
    t.instance = null;
    __decorate([c(cc.Node)], t.prototype, "moveTipNode", void 0);
    __decorate([c(cc.Node)], t.prototype, "loadImg", void 0);
    __decorate([c(cc.Node)], t.prototype, "gamePnl", void 0);
    __decorate([c(cc.Label)], t.prototype, "levelLabel", void 0);
    __decorate([c(cc.Label)], t.prototype, "timeLabel", void 0);
    __decorate([c(cc.Node)], t.prototype, "propBtnNode", void 0);
    __decorate([c(cc.Node)], t.prototype, "SetlevelNode", void 0);
    __decorate([c(cc.Node)], t.prototype, "gameOverPnl", void 0);
    __decorate([c(cc.Node)], t.prototype, "propPnl", void 0);
    __decorate([c(cc.Node)], t.prototype, "setPnl", void 0);
    __decorate([c(cc.Node)], t.prototype, "revivePnl", void 0);
    __decorate([c(cc.Node)], t.prototype, "ExitPnl", void 0);
    __decorate([c(cc.EditBox)], t.prototype, "LvEditBox", void 0);
    __decorate(
        [
            c({
                type: cc.Node,
                tooltip: "道具角标 0是addhole  1是clearhole 2是crushsteel "
            })
        ],
        t.prototype,
        "propBtnVideImg",
        void 0
    );
    __decorate(
        [
            c({
                type: cc.Node,
                tooltip: "本场景所有视频角标"
            })
        ],
        t.prototype,
        "videImg",
        void 0
    );
    __decorate(
        [
            c({
                type: cc.Node,
                tooltip: "本场景所有分享角标"
            })
        ],
        t.prototype,
        "shareImg",
        void 0
    );
    __decorate(
        [
            c({
                type: cc.Node,
                tooltip: "本场景所有跳过券角标"
            })
        ],
        t.prototype,
        "skinVideoImg",
        void 0
    );
    __decorate([c(cc.Node)], t.prototype, "digNode", void 0);
    __decorate([c(cc.Node)], t.prototype, "nandu", void 0);
    __decorate([c(cc.Node)], t.prototype, "specialSkinVideoIcon", void 0);
    __decorate([c(cc.Node)], t.prototype, "crushGuide", void 0);
    return (y = __decorate([a], t));
})(cc.Component);
exports.default = P;
