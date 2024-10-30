var a;
var r = cc._decorator;
var l = r.ccclass;
var s = r.property;
var $commonData = require("./commonData");
var $topView = require("./topView");
var $getSkinView = require("./getSkinView");
var $battleManager = require("./BattleManager");
var $platform = require("./platform");
var $config = require("./config");
var $gameManager = require("./GameManager");
var $game = require("./Game");
var $graphicalCreateLevel = require("./GraphicalCreateLevel");
var $postUserData = require("./PostUserData");
var $uIManager = require("./UIManager");
var $startView = require("./startView");
var $unscrew = require("./unscrew");
var $localStorage = require("./localStorage");
var _ = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.backMain = null;
        t.win = null;
        t.lose = null;
        t.levelLabel = null;
        t.goldLabel = null;
        t.fiveGetBtn = null;
        t.sharetip = null;
        t.backToMenu = null;
        t.nextLevel = null;
        t.again = null;
        t.screwAni = null;
        t.ImgNode = null;
        t.winImg = [];
        t.loseImg = [];
        t.subscribLevel = 0;
        t.gold = 0;
        t.gamePnl = null;
        t.startPnl = null;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onLoad = function () {
        this.gamePnl = cc.find("Canvas/gamePnl");
        this.startPnl = cc.find("Canvas/startPnl");
        window["gameOver"]=this;
    };
    t.prototype.showImg = function (e) {
        if (1 == e) {
            var t = Math.floor(this.winImg.length * Math.random());
            this.ImgNode.spriteFrame = this.winImg[t];
        } else {
            t = Math.floor(this.loseImg.length * Math.random());
            this.ImgNode.spriteFrame = this.loseImg[t];
        }
    };
    t.prototype.init = function (e) {
        var t = this;
        console.error("===>", $commonData.default.currLevel, $commonData.default.gamingtime);
        switch ($commonData.default.GameMode) {
            case $commonData.GAME_MODE_ENUM.CHALLENGE:
                break;
            case $commonData.GAME_MODE_ENUM.NORMAL:
                $platform.reportGameOver(
                    $commonData.default.currLevel - e + "",
                    $commonData.default.GameMode,
                    $commonData.default.gamingtime,
                    e
                );
                break;
            case $commonData.GAME_MODE_ENUM.COMPETITION:
                break;
            case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                $platform.reportGameOver(
                    $commonData.default.currLevel - e + "",
                    $commonData.default.GameMode,
                    $commonData.default.gamingtime,
                    e
                );
                break;
            case $commonData.GAME_MODE_ENUM.ELIMINATE:
                break;
            case $commonData.GAME_MODE_ENUM.UNSCREW:
                $platform.reportGameOver(
                    $commonData.default.currLevel - e + "",
                    $commonData.default.GameMode,
                    $commonData.default.gamingtime,
                    e
                );
              
        }
        $platform.showInterstitialAd();
        $platform.showBannerAD(!0);
        $gameManager.default.instance.stopTimeSchedule();
        this.showImg(e);
        if (1 == e) {
            this.getSubPassLevel();
            this.checkSkinProgress();
            this.fiveGetBtn.node.active = !0;
            this.fiveGetBtn.interactable = !0;
            this.win.active = !0;
            var n = this.win.getChildByName("Confetti");
            n.opacity = 255;
            cc.tween(n)
                .to(0.4, {
                    y: 56
                })
                .to(0.6, {
                    y: -80,
                    opacity: 0
                })
                .start();
            this.lose.active = !1;
            this.goldLabel.string = "+100";
            this.levelLabel.string = "闯关时间: " + this.formatSeconds("" + $commonData.default.gamingtime, "i's''");
            this.gold = 100 + $commonData.default.gameTime;
            $battleManager.default.instance.playWinSound();
            this.nextLevel.active = !0;
            $platform.reportPage("winPage", $commonData.default.currLevel - 1);
            this.backToMenu.active = !1;
            $gameManager.default.instance.timeLabel.scheduleOnce(function () {
                t.goldAni(t.goldLabel, $commonData.default.gameTime, 100);
            }, 1);
            $commonData.default.gamingtime = 0;
            switch ($commonData.default.GameMode) {
                case $commonData.GAME_MODE_ENUM.CHALLENGE:
                    $commonData.default.isgameing = !1;
                    break;
                case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                    if ($commonData.default.currLevel > $commonData.default.graphicalMaxLv) {
                        this.nextLevel.active = !1;
                        this.backToMenu.active = !0;
                    }
            }
            if (
                !(
                    $commonData.default.GameMode != $commonData.GAME_MODE_ENUM.NORMAL &&
                    $commonData.default.GameMode != $commonData.GAME_MODE_ENUM.CHALLENGE
                )
            ) {
                $localStorage.default.setLocalItem("normalFailNum", 0);
            }
        } else {
            this.win.active = !1;
            this.lose.active = !0;
            this.nextLevel.active = !1;
            var o = Math.ceil(
                (($commonData.default.LevelSteel - $commonData.default.TotalSteel) / $commonData.default.LevelSteel) *
                    100
            );
            if (o < 50) {
                this.gold = 0;
                this.fiveGetBtn.interactable = !1;
            } else {
                this.gold = 50;
                this.fiveGetBtn.interactable = !0;
            }
            this.fiveGetBtn.node.active = 0 !== this.gold;
            this.again.setPosition(0 === this.gold ? 0 : -160, this.again.y);
            this.backMain.setPosition(0 === this.gold ? 0 : -160, this.backMain.y);
            this.goldLabel.string = "+" + this.gold;
            this.levelLabel.string = "关卡进度:" + o + "%";
            this.nextLevel.active = !1;
            this.backToMenu.active = !0;
            if ($config.currentPlatform == $config.platformEnum.wechat) {
                this.backToMenu.active = !1;
                this.lose.getChildByName("wx").active = !0;
            } else {
                this.lose.getChildByName("wx").active = !1;
            }
            $battleManager.default.instance.playFailSound();
            $commonData.default.gamingtime = 0;
            $commonData.default.isgameing = !1;
            $platform.reportPage("losePage", $commonData.default.currLevel);
            if (
                !(
                    $commonData.default.GameMode != $commonData.GAME_MODE_ENUM.NORMAL &&
                    $commonData.default.GameMode != $commonData.GAME_MODE_ENUM.CHALLENGE
                )
            ) {
                $localStorage.default.setLocalItem(
                    "normalFailNum",
                    $localStorage.default.getLocalItem("normalFailNum", 0) + 1
                );
            }
        }
        if (1 == $commonData.default.isShare || $config.currentPlatform == $config.platformEnum.wechat) {
            this.sharetip.active = !1;
        } else {
            this.sharetip.active = !0;
        }
    };
  
    t.prototype.goldAni = function (e, t, n, o) {
        var a = this;
        if (void 0 === o) {
            o = $gameManager.default.instance.timeLabel;
        }
        $gameManager.default.instance.timeLabel.schedule(()=>{
            e.string = "+"+(Number( e.string)+1 );
        }, 0.005,t);
        // console.log("=======");
        // if (0 != t) {
        //     $gameManager.default.instance.timeLabel.scheduleOnce(function () {
        //         e.string = "+" + (n + 1).toString();
        //         o.string = t - 1 + "s";
        //         a.goldAni(e, t - 1, n + 1, o);
        //     }, 0.005);
        // } else {
        //     $commonData.default.gameTime = 0;
        // }
    };
    t.prototype.saveLv = function () {
        if ($commonData.default.currLevel % 2 == 0) {
            $commonData.default.currLevel--;
            cc.sys.localStorage.setItem("screwLevel", $commonData.default.currLevel);
        } else {
            cc.sys.localStorage.setItem("screwLevel", $commonData.default.currLevel);
        }
    };
    t.prototype.onEnable = function () {
        this.node.getChildByName("bg").scale = 0;
        this.node.getChildByName("bg").getComponent(cc.Animation).play("appear");
        this.node.getChildByName("bg").getChildByName("fiveGet").getComponent(cc.Animation).start();
        this.changeScrewAni();
    };
    t.prototype.onDisable = function () {
        $battleManager.default.instance.stopFailSound();
        $battleManager.default.instance.stopWinSound();
        $battleManager.default.instance.playGroundMusic();
    };
    t.prototype.changeScrewAni = function () {
        this.screwAni.animation = $commonData.default.screwSkinName[$commonData.default.screwSkinData.currentSkin];
    };
    t.prototype.clickBackToMenu = function () {
        var e = this;
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.ELIMINATE) {
            cc.director.loadScene("Game");
        } else {
            $platform.reportButton("GameOverPage", "backToMenuBtn", $commonData.default.currLevel, 1);
            this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
            this.scheduleOnce(function () {
                e.closeGameOverView();
            }, 0.2);
        }
    };
    t.prototype.clickNextLevel = function () {
        var e = this;
        console.error("gameOverView    nextLevel=========>  ", $commonData.default.GameMode);
        this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        $platform.reportButton("GameOverPage", "nextLevelBtn", $commonData.default.currLevel, 1);
        $platform.showBannerAD(!1);
        console.log("------click next level", $commonData.default.GameMode);
        switch ($commonData.default.GameMode) {
            case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                console.log("---------loadGraphicalLv");
                $platform.showTips("恭喜获得" + this.gold + "金币");
                $commonData.default.goldNum += this.gold;
                $topView.default.instance.changeGoldNum();
                this.loadGraphicalLv();
                break;
            case $commonData.GAME_MODE_ENUM.UNSCREW:
                this.scheduleOnce(function () {
                    e.node.active = !1;
                    $unscrew.default.instance.reset();
                    $commonData.default.goldNum += e.gold;
                    $topView.default.instance.changeGoldNum();
                    $gameManager.default.instance.init();
                }, 0.2);
                break;
            default:
                this.scheduleOnce(function () {
                    e.node.active = !1;
                    $platform.showTips("恭喜获得" + e.gold + "金币");
                    $commonData.default.goldNum += e.gold;
                    $topView.default.instance.changeGoldNum();
                    $commonData.default.gamelevel.reload();
                    $gameManager.default.instance.init();
                }, 0.2);
        }
    };
    t.prototype.loadGraphicalLv = function () {
        var e = this;
        console.log("---------loadGraphicalLv");
        $startView.default.instance.loadImg.active = !0;
        $game.default.resManager
            .loadBundleRes("graphicalMode", "prefab/Lv0", cc.Prefab)
            .catch(function () {
                console.error("加载特殊关卡失败!");
            })
            .then(function (t) {
                console.log("----加载levels/Lv" + $commonData.default.currLevel + "成功");
                e.gamePnl.getChildByName("gameNode").children[0].destroy();
                e.scheduleOnce(function () {
                    $gameManager.default.instance.init();
                    var n = cc.instantiate(t);
                    n.setParent(e.gamePnl.getChildByName("gameNode"));
                    n.setPosition(0, 0);
                    $commonData.default.gamelevel = n.getComponent($graphicalCreateLevel.default);
                    e.node.active = !1;
                });
            });
    };
    t.prototype.clickFiveGet = function (e) {
        var e = this;
       
        $platform.reportButton("GameOverPage", "fiveGetBtn_video", $commonData.default.currLevel, 1, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("GameOverPage", "fiveGetBtn_video_success", $commonData.default.currLevel, 1, 2);
            $gameManager.default.instance.timeLabel.unscheduleAllCallbacks();
            e.gold = 5 * e.gold;
            e.goldLabel.string = "+" + e.gold;
            e.fiveGetBtn.interactable = !1;
            $platform.showTips("领取成功！");
           
            e.node.getChildByName("bg").getChildByName("fiveGet").getComponent(cc.Animation).stop();
            e.node.getChildByName("bg").getChildByName("fiveGet").scale=1
           
            if (1 == e.lose.active) {
                e.clickReplay();
                $commonData.default.goldNum += e.gold;
                $topView.default.instance.changeGoldNum();
            }
        }, this);
    };
    t.prototype.clickShare = function (e, t) {
        var n = this;
        $platform.reportButton("GameOverPage", "shareBtn", $commonData.default.currLevel, 1, 3);
        console.log("-----------分享参数", t);
        $platform.showShare(
            function () {
                if (0 == $commonData.default.isShare) {
                    $commonData.default.isShare = !0;
                    cc.sys.localStorage.setItem("isShare", !0);
                    n.sharetip.active = !1;
                    if (!($config.currentPlatform == $config.platformEnum.wechat)) {
                        $commonData.default.goldNum += 100;
                        $topView.default.instance.changeGoldNum();
                    }
                }
                $platform.showTips("分享成功！");
                $platform.reportButton("GameOverPage", "shareBtn_success", $commonData.default.currLevel, 1, 4);
            },
            null,
            t
        );
    };
    t.prototype.closeGameOverView = function () {
        this.gamePnl.active = !1;
        $commonData.default.gamelevel.node.destroy();
        $commonData.default.gamelevel = null;
        this.startPnl.active = !0;
        this.node.active = !1;
        if (0 != this.gold) {
            $platform.showTips("恭喜获得" + this.gold + "金币");
            $commonData.default.goldNum += this.gold;
            $topView.default.instance.changeGoldNum();
        }
    };
    t.prototype.formatSeconds = function (e, t) {
        if (void 0 === t) {
            t = "h:i:s";
        }
        e = Number(e);
        var n = {};
        n.h = Number.parseInt(String(e / 3600));
        n.i = Number.parseInt(String((e - 3600 * n.h) / 60));
        n.s = Number.parseInt(String(e - 3600 * n.h - 60 * n.i));
        if (n.h < 10) {
            n.h = "0" + n.h;
        }
        if (n.i < 10) {
            n.i = "" + n.i;
        }
        if (n.s < 10) {
            n.s = "0" + n.s;
        }
        return t.replace("h", n.h).replace("i", n.i).replace("s", n.s);
    };
    t.prototype.clickReplay = function () {
        $gameManager.default.instance.reset();
        this.node.active = !1;
        $platform.showBannerAD(!1);
        $commonData.default.isgameing = !0;
        $gameManager.default.instance.startClock();
    };
    t.prototype.checkSkinProgress = function () {
        if (
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL ||
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE
        ) {
            $commonData.default.boardSkinData.skinProgress++;
            $commonData.default.screwSkinData.skinProgress++;
            cc.sys.localStorage.setItem("skinProgress", $commonData.default.boardSkinData.skinProgress);
            cc.sys.localStorage.setItem("screwSkinProgress", $commonData.default.screwSkinData.skinProgress);
            console.log("--------------skinProgress", $commonData.default.boardSkinData.skinProgress);
            if (
                -1 !=
                $commonData.default.screwSkinData.skinProgressTarget.indexOf(
                    $commonData.default.screwSkinData.skinProgress
                )
            ) {
                var e = $commonData.default.screwSkinData.skinProgressTarget.indexOf(
                    $commonData.default.screwSkinData.skinProgress
                );
                console.log("应该解锁的皮肤", e);
                if (1 == $commonData.default.screwSkinData.skinData[e]) {
                    return;
                }
                $getSkinView.default.instance.initScrewSkinAni(e);
                $commonData.default.screwSkinData.skinData[e] = 1;
                var t = $commonData.default.screwSkinData.skinData.indexOf(0);
                console.log("---------下一个皮肤", t, $commonData.default.screwSkinData);
                if (-1 != t) {
                    var n =
                        $commonData.default.screwSkinData.skinProgressTarget[t] -
                        $commonData.default.screwSkinData.skinProgress;
                    var o = $uIManager.default.instance.getSkinPnl.children[1].getChildByName("tips");
                    if (n > 0) {
                        o.getComponent(cc.Label).string = "再通关" + n + "关可获得新皮肤";
                        o.active = !0;
                    } else {
                        o.active = !1;
                    }
                } else {
                    $uIManager.default.instance.getSkinPnl.children[1].getChildByName("tips").active = !1;
                }
                this.scheduleOnce(function () {
                    $uIManager.default.instance.getSkinPnl.active = !1;
                }, 0.5);
                $battleManager.default.instance.setArrData("screwSkinData");
                return void ("" != $commonData.default.openId && $postUserData.seletPostUserData(["little_man_skin"]));
            }
            if (
                -1 !=
                $commonData.default.boardSkinData.skinProgressTarget.indexOf(
                    $commonData.default.boardSkinData.skinProgress
                )
            ) {
                e = $commonData.default.boardSkinData.skinProgressTarget.indexOf(
                    $commonData.default.boardSkinData.skinProgress
                );
                console.log("应该解锁的皮肤", e);
                if (1 == $commonData.default.boardSkinData.skinData[e]) {
                    return;
                }
                $getSkinView.default.instance.initBoardSkinImg(e);
                $commonData.default.boardSkinData.skinData[e] = 1;
                t = $commonData.default.boardSkinData.skinData.indexOf(0);
                console.log("---------下一个皮肤", t, $commonData.default.boardSkinData.skinData);
                if (-1 != t) {
                    n =
                        $commonData.default.boardSkinData.skinProgressTarget[t] -
                        $commonData.default.boardSkinData.skinProgress;
                    o = $uIManager.default.instance.getSkinPnl.children[1].getChildByName("tips");
                    n > 0
                        ? ((o.getComponent(cc.Label).string = "再通关" + n + "关可获得新皮肤"), (o.active = !0))
                        : (o.active = !1);
                } else {
                    $uIManager.default.instance.getSkinPnl.children[1].getChildByName("tips").active = !1;
                }
                this.scheduleOnce(function () {
                    $uIManager.default.instance.getSkinPnl.active = !1;
                }, 0.5);
                $battleManager.default.instance.setArrData("skinData");
                if ("" != $commonData.default.openId) {
                    $postUserData.seletPostUserData(["board_skin"]);
                }
            }
        }
    };
    t.prototype.getSubPassLevel = function () {
        var e = $commonData.default.GameMode + "SubPassLevel";
        var t = cc.sys.localStorage.getItem(e);
        if ("" == t || null == t || null == t) {
            t = 1;
        } else {
            t++;
        }
        console.log("----subLevel", t);
        this.subscribLevel = t;
        if (t >= 4) {
            t = 0;
        }
        cc.sys.localStorage.setItem(e, t);
    };
    t.prototype.PopUpSubscription = function () {
        if (this.subscribLevel >= 4 && !$commonData.default.isSubscribe) {
            $platform.requestSubscribe();
            console.log("-----native show sub");
        }
    };
    t.instance = null;
    __decorate([s(cc.Node)], t.prototype, "backMain", void 0);
    __decorate([s(cc.Node)], t.prototype, "win", void 0);
    __decorate([s(cc.Node)], t.prototype, "lose", void 0);
    __decorate([s(cc.Label)], t.prototype, "levelLabel", void 0);
    __decorate([s(cc.Label)], t.prototype, "goldLabel", void 0);
    __decorate([s(cc.Button)], t.prototype, "fiveGetBtn", void 0);
    __decorate([s(cc.Node)], t.prototype, "sharetip", void 0);
    __decorate([s(cc.Node)], t.prototype, "backToMenu", void 0);
    __decorate([s(cc.Node)], t.prototype, "nextLevel", void 0);
    __decorate([s(cc.Node)], t.prototype, "again", void 0);
    __decorate([s(sp.Skeleton)], t.prototype, "screwAni", void 0);
    __decorate([s(cc.Sprite)], t.prototype, "ImgNode", void 0);
    __decorate([s(cc.Animation)], t.prototype, "breath", void 0);
    __decorate(
        [
            s({
                type: cc.SpriteFrame,
                displayName: "胜利图"
            })
        ],
        t.prototype,
        "winImg",
        void 0
    );
    __decorate(
        [
            s({
                type: cc.SpriteFrame,
                displayName: "失败图"
            })
        ],
        t.prototype,
        "loseImg",
        void 0
    );
    return (n = __decorate([l], t));
})(cc.Component);
exports.default = _;
