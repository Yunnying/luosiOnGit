var a;
var $commonData = require("./commonData");
var $startView = require("./startView");
var $gameOverView = require("./gameOverView");
var $topView = require("./topView");
var $platform = require("./platform");
var $config = require("./config");
var p = (require("./PostUserData"), require("./Game"));
var $battleManager = require("./BattleManager");
var $graphicalGameLevel = require("./GraphicalGameLevel");
var $uIManager = require("./UIManager");
var $unscrew = require("./unscrew");
var $localStorage = require("./localStorage");
var $screwNumberManager = require("./ScrewNumberManager");
var $newSkinView = require("./newSkinView");
var k = cc._decorator;
var b = k.ccclass;
var P = k.property;
var _ = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.moveTipNode = null;
        t.levelLabel = null;
        t.levelLabel2 = null;
        t.timeLabel = null;
        t.startPnl = null;
        t.novicePnl = null;
        t.mask = null;
        t.aniNode = [];
        t.lockAni = null;
        t.pulloutAni = null;
        t.ButtonNode = null;
        t.Btn = [];
        t.LvEditBox = null;
        t.steelImg = [];
        t.steelholeImg = [];
        t.steelholeCenterImg = [];
        t.destroyAni3 = null;
        t.putIn = null;
        t.putOut = null;
        t.destoryNodeArr = [];
        t.isplayAni = 0;
        t.nowLoadLv = 1;
        t.checkTime = 0;
        t.answerAni = !1;
        t.isloadSkin = !1;
        t.COMBO_count = 0;
        t.COMBO_time = 0;
        t.deltaTime = -1;
        t.gameNodePosition1 = [
            2, 17, 23, 41, 43, 53, 80, 83, 117, 122, 126, 153, 154, 155, 156, 173, 161, 191, 194, 196, 198, 262, 330,
            351
        ];
        t.gameNodePosition2 = [
            16, 31, 45, 48, 49, 51, 55, 64, 65, 76, 82, 84, 85, 86, 95, 97, 98, 101, 102, 106, 108, 111, 113, 120, 123,
            130, 138, 140, 143, 151, 152, 160, 171, 189, 193, 195, 200, 207, 214, 215, 217, 222, 243, 250, 255, 270,
            292, 293, 297, 305, 308, 318, 323
        ];
        t.gameNodePosition3 = [145, 176, 212, 213, 272, 287, 280, 300, 312, 315, 317];
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
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
    t.prototype.onEnable = function () {
        $topView.default.instance.changeSetBtn();
        this.setBtn();
        $battleManager.default.instance.playBGM();
    };
    t.prototype.startClock = function () {
        this.levelLabel.unscheduleAllCallbacks();
        this.levelLabel.schedule(function () {
            if (!$commonData.default.isPause) {
                $commonData.default.gamingtime++;
            }
        }, 1);
    };
    t.prototype.playDestroyAni = function () {};
    t.prototype.checkPassedNovice = function () {
        var e = cc.sys.localStorage.getItem("passedNovice");
        $commonData.default.passedNovice = "" != e && null != e && null != e && 0 != e && "false" != e;
    };
    t.prototype.init = function () {
        this.checkPassedNovice();
        this.showModeTip2();
        console.error("init ====>", $commonData.default.GameMode);
        $commonData.default.gamingtime = 0;
        this.node.getChildByName("dialogNode").destroyAllChildren();
        $platform.reportLevel($commonData.default.currLevel, "startLevel", $commonData.default.GameMode);
        this.changePosition();
        this.stopTimeSchedule();
        if (
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL ||
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE
        ) {
            var e = this.ButtonNode.getComponent(cc.Layout);
            var t = $localStorage.default.getLocalItem("normalFailNum", 0);
            console.error("--->", t);
            if (t >= 2) {
                this.Btn[6].node.active = !0;
                e.spacingX = 50;
            } else {
                this.Btn[6].node.active = !1;
                e.spacingX = 100;
            }
            if (
                $commonData.default.currLevel % 2 == 0 ||
                -1 != $commonData.default.challengePool.indexOf($commonData.default.currLevel)
            ) {
                this.mask.getChildByName("ani").getComponent(sp.Skeleton).animation = "animation";
                this.mask.opacity = 255;
                $commonData.default.isGetAnswer || this.showAnswerVideoTips(!0);
            } else {
                this.mask.opacity = 0;
            }
        } else {
            if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
                this.hideMask();
                $commonData.default.passedNovice = !0;
            } else {
                if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.UNSCREW) {
                    $commonData.default.currLevel % 2 == 0
                        ? ((this.mask.getChildByName("ani").getComponent(sp.Skeleton).animation = "animation"),
                          (this.mask.opacity = 255))
                        : (this.mask.opacity = 0);
                    this.node.getChildByName("gameNode").y = 0;
                }
            }
        }
        $uIManager.default.instance.revivePnl.active = !1;
        $uIManager.default.instance.setPnl.active = !1;
        if ($commonData.default.isAddTime) {
            $commonData.default.gameTime = 120;
        } else {
            $commonData.default.gameTime = 180;
            ($commonData.default.GameMode != $commonData.GAME_MODE_ENUM.NORMAL &&
                $commonData.default.GameMode != $commonData.GAME_MODE_ENUM.CHALLENGE &&
                $commonData.default.GameMode != $commonData.GAME_MODE_ENUM.UNSCREW) ||
                (this.mask.active = !0);
            $commonData.default.isPause = !0;
        }
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE) {
            this.levelLabel.string = "挑战关卡";
            this.levelLabel2.node.active = !1;
        } else {
            if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL) {
                this.levelLabel2.node.active = !0;
                this.levelLabel.string = "第 " + Math.ceil($commonData.default.currLevel / 2) + " 关";
                $commonData.default.currLevel % 2 == 1
                    ? (this.levelLabel2.string = "关卡 1/2")
                    : (this.levelLabel2.string = "关卡 2/2");
            } else {
                if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
                    this.levelLabel2.node.active = !1;
                    this.levelLabel.string = "第 " + $commonData.default.currLevel + " 关";
                } else {
                    if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.UNSCREW) {
                        var n = cc.sys.localStorage.getItem("currLvUnscrew");
                        console.warn("GameManger ===解开螺丝==》", n, ",最大关卡", $commonData.default.unscrewMaxLv);
                        if (parseInt(n) > $commonData.default.unscrewMaxLv) {
                            this.levelLabel.string = "挑战关卡";
                            this.levelLabel2.node.active = !1;
                        } else {
                            this.levelLabel2.node.active = !0;
                            this.levelLabel.string = "第 " + Math.ceil($commonData.default.currLevel / 2) + " 关";
                            $commonData.default.currLevel % 2 == 1
                                ? (this.levelLabel2.string = "关卡 1/2")
                                : (this.levelLabel2.string = "关卡 2/2");
                        }
                    }
                }
            }
        }
        this.timeLabel.string = $commonData.default.gameTime + "s";
        this.updateTime();
        this.Btn[3].getComponent(cc.Animation).stop();
        this.Btn[0].getComponent(cc.Animation).stop();
        $commonData.default.isPullOut = !1;
        this.checkTime = 0;
        this.COMBO_count = 0;
        this.COMBO_time = 0;
        this.answerAni = !1;
    };
    t.prototype.setBtn = function () {
        if ($commonData.default.windowHeight / $commonData.default.windowWidth < 1.8) {
            this.node.getChildByName("Btn").scale = 0.8;
        }
        this.Btn.forEach(function (e) {
            e.node.active = !1;
        });
        var e = this.ButtonNode.getComponent(cc.Layout);
        if (
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL ||
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE
        ) {
            this.Btn[0].node.active = !0;
            this.Btn[1].node.active = !0;
            this.Btn[4].node.active = !0;
            e.spacingX = 100;
        } else {
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL
                ? ((this.Btn[1].node.active = !0), (this.Btn[4].node.active = !0), (e.spacingX = 150))
                : $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.UNSCREW &&
                  ((this.Btn[2].node.active = !0), (this.Btn[5].node.active = !0), (e.spacingX = 150));
        }
    };
    t.prototype.changePosition = function () {
        if (
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL ||
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE
        ) {
            -1 != this.gameNodePosition1.indexOf($commonData.default.currLevel)
                ? (this.node.getChildByName("gameNode").y = 0)
                : -1 != this.gameNodePosition2.indexOf($commonData.default.currLevel)
                ? (this.node.getChildByName("gameNode").y = -50)
                : -1 != this.gameNodePosition3.indexOf($commonData.default.currLevel)
                ? (this.node.getChildByName("gameNode").y = -100)
                : (this.node.getChildByName("gameNode").y = -70);
            201 == $commonData.default.currLevel
                ? (this.node.getChildByName("gameNode").x = -50)
                : (this.node.getChildByName("gameNode").x = 0);
        } else {
            if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
                9 == $commonData.default.currLevel
                    ? (this.node.getChildByName("gameNode").y = 150)
                    : 10 == $commonData.default.currLevel
                    ? (this.node.getChildByName("gameNode").y = 50)
                    : (this.node.getChildByName("gameNode").y = 0);
            }
        }
    };
    t.prototype.showAnswerVideoTips = function (e) {
        this.Btn[3].node.getChildByName("ad").active = e;
    };
    t.prototype.showNovice = function () {
        this.novicePnl.active = !0;
    };
    t.prototype.hideNovice = function () {
        this.novicePnl.active = !1;
        $commonData.default.passedNovice = !0;
        cc.sys.localStorage.setItem("passedNovice", !0);
    };
    t.prototype.clickNextLevel = function () {
        console.warn("GameManager   nextLevel =========>  ", $commonData.default.GameMode);
        if ($commonData.default.currLevel == $commonData.default.maxLv) {
            $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.CHALLENGE;
        }
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE) {
            this.getChallengeLv();
            this.init();
            $commonData.default.gamelevel.reload();
        } else {
            if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL) {
                this.hideNovice();
                $commonData.default.currLevel++;
                cc.sys.localStorage.setItem("screwLevel", $commonData.default.currLevel);
                this.init();
                $commonData.default.gamelevel.reload();
            } else {
                if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
                    var e = cc.sys.localStorage.getItem("currLvGraphical");
                    console.log("============>", e, $commonData.default.currLevel, $commonData.default.graphicalMaxLv);
                    if (e >= $commonData.default.graphicalMaxLv) {
                        console.log("拆图模式已经全部通过");
                        $commonData.default.currLevel++;
                        cc.sys.localStorage.setItem("currLvGraphical", $commonData.default.currLevel);
                        return void cc.director.loadScene("Game");
                    }
                    console.log("拆图模式还未全部通过");
                    $commonData.default.currLevel++;
                    cc.sys.localStorage.setItem("currLvGraphical", $commonData.default.currLevel);
                    console.log("---------", $commonData.default.currLevel);
                    this.reloadGraphicalLevel();
                } else {
                    if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.UNSCREW) {
                        $commonData.default.currLevel++;
                        if ($commonData.default.currLevel > $commonData.default.unscrewMaxLv) {
                            for (
                                var t = Math.ceil(Math.random() * $commonData.default.unscrewMaxLv);
                                t == $commonData.default.currLevel;

                            ) {
                                t = Math.ceil(Math.random() * $commonData.default.unscrewMaxLv);
                            }
                            $commonData.default.currLevel = t;
                        }
                        this.init();
                        $unscrew.default.instance.reset();
                    }
                }
            }
        }
        $commonData.default.isGetAnswer = !1;
    };
    t.prototype.updateTime = function () {
        var e = this;
        this.stopTimeSchedule();
        this.timeLabel.schedule(function () {
            if ($commonData.default.gameTime <= 1) {
                e.timeLabel.unscheduleAllCallbacks();
            }
            if (!$commonData.default.isPause && $commonData.default.passedNovice) {
                $commonData.default.gameTime--;
                e.checkTime++;
            }
            if (e.checkTime >= 30 && 0 == e.answerAni) {
                e.Btn[3].getComponent(cc.Animation).play();
                if (!$commonData.default.isUnLock) {
                    e.Btn[0].getComponent(cc.Animation).play();
                }
                e.answerAni = !0;
            }
            if ($commonData.default.gameTime < 0) {
                $commonData.default.gameTime = 0;
            }
            e.timeLabel.string = $commonData.default.gameTime + "s";
            if ($commonData.default.gameTime <= 0) {
                var t = $commonData.default.gamelevel.screwOut;
                if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
                    t = $graphicalGameLevel.default.instance.screwOut;
                }
                if (null != t) {
                    console.log("不弹出游戏失败");
                    e.updateTime();
                } else {
                    $commonData.default.isAddTime
                        ? (console.log("游戏失败！"), e.showGameoverPnl(0))
                        : ($uIManager.default.instance.showRevivePnl(!0),
                          $platform.reportPage("revivePage", $commonData.default.currLevel));
                }
            }
        }, 1);
    };
    t.prototype.stopTimeSchedule = function () {
        this.timeLabel.unscheduleAllCallbacks();
    };
    t.prototype.checkSteel = function () {
        var e = this;
        this.checkTime = 0;
        this.Btn[3].getComponent(cc.Animation).stop();
        this.Btn[0].getComponent(cc.Animation).stop();
        this.answerAni = !1;
        $commonData.default.AchievementData.TotalRemoveSteel++;
        cc.sys.localStorage.setItem("TotalRemoveSteel", $commonData.default.AchievementData.TotalRemoveSteel);
        this.COMBO_count++;
        this.COMBO_time = 4 / this.deltaTime;
        console.log("连击次数", this.COMBO_count);
        if ($commonData.default.vibrateOn) {
            $platform.vibrateShort();
            this.scheduleOnce(function () {
                $platform.vibrateShort();
            }, 0.1);
        }
        $battleManager.default.instance.playFallSound();
        if ($commonData.default.TotalSteel <= 0) {
            this.playDestroyAni();
            console.error("游戏胜利！=========>", $commonData.default.GameMode);
            $commonData.default.useItemNum = [0, 0, 0];
            $commonData.default.isGetAnswer = !1;
            $commonData.default.isAddTime = !1;
            if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
                $platform.reportLevel($commonData.default.currLevel, "passLevel", $commonData.default.GameMode);
                if (cc.sys.localStorage.getItem("currLvGraphical") > $commonData.default.graphicalMaxLv) {
                    for (
                        var t = Math.ceil(Math.random() * $commonData.default.graphicalMaxLv);
                        t == $commonData.default.currLevel;

                    ) {
                        t = Math.ceil(Math.random() * $commonData.default.graphicalMaxLv);
                    }
                    $commonData.default.currLevel = t;
                    console.log("- checkSteel------已经通关了拆图模式，随机进入关卡", $commonData.default.currLevel);
                } else {
                    $commonData.default.currLevel++;
                    cc.sys.localStorage.setItem("currLvGraphical", $commonData.default.currLevel);
                    console.log("- checkSteel-----没有全部通关拆图模式正常加1---", $commonData.default.currLevel);
                }
                this.scheduleOnce(function () {
                    e.showGameoverPnl(1);
                }, 1);
            } else {
                if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE) {
                    $platform.reportLevel($commonData.default.currLevel, "passLevel", $commonData.default.GameMode);
                    this.getChallengeLv();
                    $platform.reportPage("GamePage_ChallengeLevel", $commonData.default.currLevel);
                    this.scheduleOnce(function () {
                        e.showGameoverPnl(1);
                    }, 1);
                } else {
                    $commonData.default.currLevel++;
                    $platform.reportLevel($commonData.default.currLevel, "passLevel");
                    $platform.reportPage("GamePage_passlevel", $commonData.default.currLevel);
                    0 == $commonData.default.passedNovice && this.hideNovice();
                    $commonData.default.currLevel <= $commonData.default.maxLv
                        ? (console.warn("保存经典模式通关数量===》", $commonData.default.currLevel),
                          cc.sys.localStorage.setItem("screwLevel", $commonData.default.currLevel),
                          $commonData.default.currLevel % 2 == 0
                              ? (this.scheduleOnce(function () {
                                    e.init();
                                    $commonData.default.gamelevel.reload();
                                }, 1),
                                $platform.reportGameOver(
                                    $commonData.default.currLevel - 1 + "",
                                    $commonData.default.GameMode,
                                    $commonData.default.gamingtime,
                                    1
                                ))
                              : this.scheduleOnce(function () {
                                    e.showGameoverPnl(1);
                                }, 1))
                        : (console.warn("保存经典模式最大通关数量===》", $commonData.default.maxLv),
                          cc.sys.localStorage.setItem("screwLevel", $commonData.default.maxLv),
                          $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL &&
                              (($commonData.default.GameMode = $commonData.GAME_MODE_ENUM.CHALLENGE),
                              cc.sys.localStorage.setItem("screwLevel", $commonData.default.currLevel),
                              this.getChallengeLv(),
                              this.scheduleOnce(function () {
                                  e.showGameoverPnl(1);
                              }, 1)));
                }
            }
        } else {
            this.playDestroyAni();
        }
    };
    t.prototype.getChallengeLv = function () {
        for (
            var e = Math.floor(Math.random() * $commonData.default.challengePool.length);
            $commonData.default.lastChallengeLv[0] == e || $commonData.default.lastChallengeLv[1] == e;

        ) {
            e = Math.floor(Math.random() * $commonData.default.challengePool.length);
        }
        console.log("LvIndex", e);
        $commonData.default.currLevel = $commonData.default.challengePool[e];
        $commonData.default.lastChallengeLv[0] = $commonData.default.lastChallengeLv[1];
        $commonData.default.lastChallengeLv[1] = e;
        console.log("挑战关卡", $commonData.default.currLevel);
    };
    t.prototype.showGameoverPnl = function (e) {
        if (!($commonData.default.currLevel != $commonData.default.maxLv && 0 != e && 2 != e)) {
            this.levelLabel.unscheduleAllCallbacks();
        }
        if (
            -1 != $commonData.default.AchievementData.achievementGoal.indexOf($commonData.default.passLevel) &&
            1 == e
        ) {
            $battleManager.default.instance.showAchievementPopup();
        }
        if (1 != $uIManager.default.instance.gameOverPnl.active) {
            $commonData.default.isPause = !0;
            $uIManager.default.instance.revivePnl.active = !1;
            $uIManager.default.instance.setPnl.active = !1;
            1 == e || 0 == e
                ? ($gameOverView.default.instance.init(e),
                  $uIManager.default.instance.showGameOverPnl(!0),
                  $battleManager.default.instance.stopGroundMusic())
                : (($commonData.default.gamingtime = 0),
                  ($commonData.default.isgameing = !1),
                  (this.node.active = !1),
                  $commonData.default.gamelevel.node.destroy(),
                  ($commonData.default.gamelevel = null),
                  (this.startPnl.active = !0));
        }
    };
    t.prototype.reset = function () {
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
            this.reloadGraphicalLevel();
        } else {
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.UNSCREW
                ? ($unscrew.default.instance.reset(), this.init())
                : ($commonData.default.gamelevel.reload(), ($commonData.default.isAddTime = !1), this.init());
        }
    };
    t.prototype.reloadGraphicalLevel = function () {
        var e = this;
        this.node.getChildByName("gameNode").children[0].destroy();
        $startView.default.instance.loadImg.active = !0;
        p.default.resManager
            .loadBundleRes("graphicalMode", "prefab/Lv0", cc.Prefab)
            .catch(function () {
                console.error("加载特殊关卡失败!");
            })
            .then(function (t) {
                e.init();
                var n = cc.instantiate(t);
                n.setParent(e.node.getChildByName("gameNode"));
                n.setPosition(0, 0);
                console.log("------------newNode name", n.name);
                $commonData.default.gamelevel = n.getComponent($graphicalGameLevel.default);
            });
    };
    t.prototype.hideMask = function () {
        this.mask.active = !1;
    };
    t.prototype.playUnlockAni = function () {
        this.lockAni.active = !0;
        this.lockAni.getComponent(sp.Skeleton).animation = "animation";
    };
    t.prototype.playPullOutAni = function () {
        this.pulloutAni.active = !0;
        this.pulloutAni.getComponent(sp.Skeleton).animation = "animation";
    };
    t.prototype.setAniNodePosition = function (e, t) {
        if (0 == t) {
            this.lockAni.setPosition(e);
        } else {
            this.pulloutAni.setPosition(e);
        }
    };
    t.prototype.playVibe = function () {
        if ($commonData.default.vibrateOn) {
            $platform.vibrateShort();
            this.scheduleOnce(function () {
                $platform.vibrateShort();
            }, 0.1);
        }
    };
    t.prototype.changeDigBtn = function () {
        if ($commonData.default.isUnLock) {
            this.Btn[0].interactable = !1;
        } else {
            this.Btn[0].interactable = !0;
        }
    };
    t.prototype.changePullOutBtn = function () {
        if ($commonData.default.screwNum <= 0 || $commonData.default.useItemNum[3] >= 3) {
            this.Btn[4].interactable = !1;
        } else {
            this.Btn[4].interactable = !0;
        }
    };
    t.prototype.changeWithDrew = function () {
        var e = $commonData.default.gamelevel.cloneNode;
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
            e = $graphicalGameLevel.default.instance.cloneNode;
        }
        if (null == e || $commonData.default.useItemNum[1] >= 3) {
            this.Btn[1].interactable = !1;
        } else {
            this.Btn[1].interactable = !0;
        }
    };
    t.prototype.changeReset = function () {
        if ($commonData.default.useItemNum[2] >= 3) {
            this.Btn[2].interactable = !1;
        } else {
            this.Btn[2].interactable = !0;
        }
    };
    t.prototype.changeLoadLv = function () {
        this.nowLoadLv = parseFloat(this.LvEditBox.string);
    };
    t.prototype.loadLv = function () {
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
            if (this.nowLoadLv > $commonData.default.graphicalMaxLv) {
                return;
            }
            $commonData.default.currLevel = this.nowLoadLv;
            this.reloadGraphicalLevel();
        } else {
            if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.UNSCREW) {
                $commonData.default.currLevel = this.nowLoadLv;
                if ($commonData.default.currLevel > $commonData.default.unscrewMaxLv) {
                    return;
                }
                this.init();
                $unscrew.default.instance.reset();
            } else {
                $commonData.default.currLevel = this.nowLoadLv;
                this.init();
                $commonData.default.gamelevel.reload();
            }
        }
    };
    t.prototype.getRank = function () {
        $platform.getRank();
    };
    t.prototype.setRank = function () {};
    t.prototype.getPassLevel = function () {};
    t.prototype.loadSkin = function (e) {
        var t = this;
        $commonData.default.skinImgArr = [];
        if (e <= 6) {
            var n = function (n) {
                p.default.resManager
                    .loadBundleRes("levels", "skin/" + e + "/" + n, cc.SpriteFrame)
                    .catch(function () {
                        console.error("加载", "skin/" + e + "/" + n, "失败!");
                    })
                    .then(function (e) {
                        $commonData.default.skinImgArr[n - 1] = e;
                        if (7 == n) {
                            t.isloadSkin = !0;
                        }
                    });
            };
            for (var o = 1; o <= 7; o++) {
                n(o);
            }
        } else {
            p.default.resManager
                .loadBundleRes("levels", "skin/newSkin/" + e, cc.SpriteFrame)
                .catch(function () {
                    console.error("加载", "skin/newSkin/" + e, "失败!");
                })
                .then(function (e) {
                    $commonData.default.skinImgArr[0] = e;
                    t.isloadSkin = !0;
                });
        }
    };
    t.prototype.changeUseItemMethod = function (e) {
        console.log("----------11-------------更改获取道具的方式", e);
        if ($config.currentPlatform == $config.platformEnum.wechat) {
            console.log("----------22-------------更改获取道具的方式", e);
            if (0 == e) {
                $commonData.default.isShareUseProp = !1;
                for (var t = 0; t < this.ButtonNode.children.length; t++) {
                    this.ButtonNode.children[t].getChildByName("share").active = !1;
                    this.ButtonNode.children[t].getChildByName("ad").active = !0;
                }
                console.log("改为视频获取道具");
            } else {
                $commonData.default.isShareUseProp = !0;
                for (t = 0; t < this.ButtonNode.children.length; t++) {
                    this.ButtonNode.children[t].getChildByName("share").active = !0;
                    this.ButtonNode.children[t].getChildByName("ad").active = !1;
                }
                console.log("改为分享获取道具");
            }
        }
    };
    t.prototype.update = function (e) {
        if (this.deltaTime < 0) {
            this.deltaTime = e;
        }
        if (this.COMBO_time > 0) {
            this.COMBO_time--;
        } else {
            if (this.COMBO_time <= 0) {
                this.COMBO_time = 0;
                this.COMBO_count = 0;
            }
        }
    };
    t.prototype.playPutIn = function () {
        if ($commonData.default.soundOn) {
            cc.audioEngine.play(this.putIn, !1, 1.5);
        }
    };
    t.prototype.playPutOut = function () {
        if ($commonData.default.soundOn) {
            cc.audioEngine.play(this.putOut, !1, 1.5);
        }
    };
    t.prototype.rePlay = function () {
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
            this.reloadGraphicalLevel();
        } else {
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.UNSCREW
                ? (this.init(), $unscrew.default.instance.reset())
                : (this.init(), $commonData.default.gamelevel.reload());
        }
    };
    t.prototype.addTime30s = function () {
        $commonData.default.gameTime += 30;
        this.timeLabel.string = $commonData.default.gameTime + "s";
    };
    t.prototype.showAHide = function () {
        $battleManager.default.instance.testNode[2].children.forEach(function (e) {
            if ("只变透明" == e.name) {
                e.opacity = 255 == e.opacity ? 0 : 255;
            } else {
                if ("不受隐藏ui影响" != e.name) {
                    e.active = !e.active;
                }
            }
        });
        $battleManager.default.instance.testNode[1].active = !$battleManager.default.instance.testNode[1].active;
    };
    t.prototype.showModeTip = function () {
        if (this.moveTipNode) {
            this.moveTipNode.active = !this.moveTipNode.active;
            var e = "";
            var t = 0;
            switch ($commonData.default.GameMode) {
                case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                    e = "图形模式";
                    t = $commonData.default.currLevel;
                    break;
                case $commonData.GAME_MODE_ENUM.NORMAL:
                case $commonData.GAME_MODE_ENUM.CHALLENGE:
                    e = "经典模式";
                    t = Math.ceil($commonData.default.currLevel / 2);
            }
            this.moveTipNode.children[1].getComponent(cc.Label).string = e + "-->第" + t + "关";
        }
    };
    t.prototype.showModeTip2 = function () {
        if (this.moveTipNode) {
            var e = "";
            var t = 0;
            switch ($commonData.default.GameMode) {
                case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                    e = "图形模式";
                    t = $commonData.default.currLevel;
                    break;
                case $commonData.GAME_MODE_ENUM.NORMAL:
                case $commonData.GAME_MODE_ENUM.CHALLENGE:
                    e = "经典模式";
                    t = Math.ceil($commonData.default.currLevel / 2);
            }
            this.moveTipNode.children[1].getComponent(cc.Label).string = e + "-->第" + t + "关";
        }
    };
    t.prototype.isShowScrewNumber = function () {
        $screwNumberManager.isShowNumberChange();
        switch ($commonData.default.GameMode) {
            case $commonData.GAME_MODE_ENUM.NORMAL:
                console.log("主线模式改变编号显示");
                for (var e = 0; e < $commonData.default.gamelevel.Screws.children.length; e++) {
                    if ("screw" == (t = $commonData.default.gamelevel.Screws.children[e]).name) {
                        t.getChildByName("screwNumber").active = $screwNumberManager.isShowNumber;
                    }
                }
                break;
            case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                for (e = 0; e < $commonData.default.gamelevel.Screws.children.length; e++) {
                    var t;
                    if ("screw" == (t = $commonData.default.gamelevel.Screws.children[e]).name) {
                        t.getChildByName("screwNumber").active = $screwNumberManager.isShowNumber;
                    }
                }
        }
    };
    t.prototype.changeScrewSkin = function () {
        if ($commonData.default.currentNailSkin + 1 >= $newSkinView.default.instance.nailSkinImg.length) {
            $commonData.default.currentNailSkin = 0;
        } else {
            $commonData.default.currentNailSkin = $commonData.default.currentNailSkin + 1;
        }
        console.log($commonData.default.currentNailSkin);
        switch ($commonData.default.GameMode) {
            case $commonData.GAME_MODE_ENUM.NORMAL:
                console.log("改变螺丝皮肤");
                for (var e = 0; e < $commonData.default.gamelevel.Screws.children.length; e++) {
                    if ("screw" == (t = $commonData.default.gamelevel.Screws.children[e]).name) {
                        t.getComponent(cc.Sprite).spriteFrame =
                            $newSkinView.default.instance.nailSkinImg[$commonData.default.currentNailSkin];
                    }
                }
                break;
            case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                for (e = 0; e < $commonData.default.gamelevel.Screws.children.length; e++) {
                    var t;
                    if ("screw" == (t = $commonData.default.gamelevel.Screws.children[e]).name) {
                        t.getComponent(cc.Sprite).spriteFrame =
                            $newSkinView.default.instance.nailSkinImg[$commonData.default.currentNailSkin];
                    }
                }
        }
    };
    t.instance = null;
    __decorate([P(cc.Node)], t.prototype, "moveTipNode", void 0);
    __decorate([P(cc.Label)], t.prototype, "levelLabel", void 0);
    __decorate([P(cc.Label)], t.prototype, "levelLabel2", void 0);
    __decorate([P(cc.Label)], t.prototype, "timeLabel", void 0);
    __decorate([P(cc.Node)], t.prototype, "startPnl", void 0);
    __decorate([P(cc.Node)], t.prototype, "novicePnl", void 0);
    __decorate([P(cc.Node)], t.prototype, "mask", void 0);
    __decorate([P(cc.Node)], t.prototype, "aniNode", void 0);
    __decorate([P(cc.Node)], t.prototype, "lockAni", void 0);
    __decorate([P(cc.Node)], t.prototype, "pulloutAni", void 0);
    __decorate([P(cc.Node)], t.prototype, "ButtonNode", void 0);
    __decorate([P(cc.Button)], t.prototype, "Btn", void 0);
    __decorate([P(cc.EditBox)], t.prototype, "LvEditBox", void 0);
    __decorate([P(cc.SpriteFrame)], t.prototype, "steelImg", void 0);
    __decorate([P(cc.SpriteFrame)], t.prototype, "steelholeImg", void 0);
    __decorate([P(cc.SpriteFrame)], t.prototype, "steelholeCenterImg", void 0);
    __decorate([P(cc.Prefab)], t.prototype, "destroyAni3", void 0);
    __decorate(
        [
            P({
                type: cc.AudioClip,
                displayName: "插入音效"
            })
        ],
        t.prototype,
        "putIn",
        void 0
    );
    __decorate(
        [
            P({
                type: cc.AudioClip,
                displayName: "拔起音效"
            })
        ],
        t.prototype,
        "putOut",
        void 0
    );
    return (n = __decorate([b], t));
})(cc.Component);
exports.default = _;
