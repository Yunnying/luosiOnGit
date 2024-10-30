var o;
var r = cc._decorator;
var a = r.ccclass;
var c = r.property;
var $platform = require("../../scripts/platform");
var $commonData = require("../../scripts/commonData");
var $eliminateManager = require("./EliminateManager");
var $enum = require("../../scripts/Enum");
var $battleManager = require("../../scripts/BattleManager");
var $topView = require("../../scripts/topView");
var $game = require("../../scripts/Game");
var $localStorage = require("../../scripts/localStorage");
const { default: UIMgrClass } = require("../../ts/UIMgr");
const { wxSDK } = require("../../ts/wxSDK");
var v = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.timeNode = null;
        t.progressNode = null;
        t.imgNode = null;
        t.screwNode = null;
        t.progessLabel = null;
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
        t.ShopImgNode = null;
        t.winImg = [];
        t.loseImg = [];
        t.subscribLevel = 0;
        t.gold = 0;
        y.instance = t;
        return t;
    }
    var y;
    __extends(t, e);
    y = t;
    t.prototype.showImg = function (e) {
        var t = this;
        this.havaOpenAIControl(e);
        if (e) {
            if (
                "挑战关卡" !== $eliminateManager.default.instance.levelLabel.string &&
                $commonData.default.currLevel <= 181
            ) {
                this.ImgNode.node.active = !1;
                this.ShopImgNode.node.active = !0;
                this.ShopImgNode.node.on(cc.Node.EventType.TOUCH_START,()=>{
                    if(!this.isClickHouse){
                        UIMgrClass.I.open("shopCollectPnlNew",{isUnlock:true})
                    }else{
                        UIMgrClass.I.open("shopCollectPnlNew",{isUnlock:false})
                    }
                    this.isClickHouse=true;
                   
                },this)
                if($commonData.default.currLevel==2){
                    cc.find("Canvas/gameOverPnl/bg/shopImgNode/rent/rent").getComponent(cc.Label).string="+100/天"
                }else{
                     cc.find("Canvas/gameOverPnl/bg/shopImgNode/rent/rent").getComponent(cc.Label).string="+5/天"
                }
                var y = "EliminateShop-" + Math.floor(($commonData.default.currLevel - 2) / 5);
                $game.default.resManager
                    .loadBundleRes(
                        y,
                        $commonData.default.collectNameConfig[$commonData.default.currLevel - 2],
                        cc.SpriteFrame
                    )
                    .then(function (e) {
                        t.ShopImgNode.spriteFrame = e;
                    });
            } else {
                this.ImgNode.node.active = !0;
                this.ShopImgNode.node.active = !1;
                var x = Math.floor(this.winImg.length * Math.random());
                this.ImgNode.spriteFrame = this.winImg[x];
            }
        } else {
            this.ImgNode.node.active = !0;
            this.ShopImgNode.node.active = !1;
            x = Math.floor(this.loseImg.length * Math.random());
            this.ImgNode.spriteFrame = this.loseImg[x];
        }
    };
    t.prototype.onEnable = function () {
        this.node.getChildByName("bg").scale = 0;
        this.node.getChildByName("bg").getComponent(cc.Animation).play("appear");
        this.node.getChildByName("bg").getChildByName("fiveGet").getComponent(cc.Animation).start();
        window["eGameOver"]=this;
        this.changeScrewAni();
        cc.find("Canvas/tutorialPnl").active = !1;
        this.isClickHouse=false;
    };
    t.prototype.onDisable = function () {
        $commonData.default.goldNum += this.gold;
        $topView.default.instance.changeGoldNum();
        $battleManager.default.instance.stopFailSound();
        $battleManager.default.instance.stopWinSound();
        $battleManager.default.instance.playGroundMusic();
    };
    t.prototype.changeScrewAni = function () {
        this.screwAni.animation = $commonData.default.screwSkinName[$commonData.default.screwSkinData.currentSkin];
    };
    t.prototype.setRecord = function () {
        $commonData.default.eliminatePasslevel;
        $commonData.default.eliminateMaxLv;
    };
    t.prototype.init = function () {
        $eliminateManager.default.instance.stopTimeSchedule();
        $eliminateManager.default.instance.revivePnl.active = !1;
        $eliminateManager.default.instance.propPnl.active = !1;
        $eliminateManager.default.instance.setPnl.active = !1;
        this.fiveGetBtn.node.active = !0;
        this.fiveGetBtn.node.x=160;
        this.fiveGetBtn.interactable = !0;
        if ($commonData.default.isShare) {
            this.sharetip.active = !1;
        }
        switch ($eliminateManager.default.instance.gameState) {
            case $enum.ENUM_GAME_STATES.WIN:
                this.timeNode.active = !0;
                this.progressNode.active = !1;
                $localStorage.default.setLocalItem("eliminatePlayNum", 1);
                this.showImg(!0);
                console.log("----win");
                wxSDK.addAreaScore(1);
               // wxSDK.updateScore();
                this.win.active = !0;
                this.lose.active = !1;
                $battleManager.default.instance.playWinSound();
                var e = this.win.getChildByName("Confetti");
                e.opacity = 255;
                cc.tween(e)
                    .to(0.4, {
                        y: 56
                    })
                    .to(0.6, {
                        y: -80,
                        opacity: 0
                    })
                    .start();
                this.goldLabel.string = "+100";
                this.levelLabel.string =
                    "闯关时间: " + this.formatSeconds("" + $commonData.default.gamingtime, "i's''");
                this.gold = 100;
                this.nextLevel.active = !0;
                $platform.reportGameOver(
                    $commonData.default.currLevel - 1 + "",
                    $commonData.default.GameMode,
                    $commonData.default.gamingtime,
                    1
                );
                $platform.reportPage("winPage", $commonData.default.currLevel - 1);
                $platform.completeTrack($commonData.default.currLevel - 1, "winPage");
                $platform.completeTrack(
                    $commonData.default.currLevel - 1,
                    "reply",
                    $localStorage.default.getLocalItem("eliminateRePlayNum", 0)
                );
                $platform.completeTrack(
                    $commonData.default.currLevel - 1,
                    "failReply",
                    $localStorage.default.getLocalItem("eliminateRePlayNum1", 0)
                );
                this.backToMenu.active = !1;
                $commonData.default.gamingtime = 0;
                this.setRecord();
                break;
            case $enum.ENUM_GAME_STATES.LOSE:
                this.timeNode.active = !1;
               
                this.progressNode.active = !0;
                $platform.reportGameOver(
                    $commonData.default.currLevel + "",
                    $commonData.default.GameMode,
                    $commonData.default.gamingtime,
                    0
                );
                $localStorage.default.setLocalItem(
                    "eliminatePlayNum",
                    $localStorage.default.getLocalItem("eliminatePlayNum", 1) + 1 >= 5
                        ? 5
                        : $localStorage.default.getLocalItem("eliminatePlayNum", 1) + 1
                );
                this.showImg(!1);
                console.log("----lose");
                this.win.active = !1;
                this.lose.active = !0;
                this.nextLevel.active = !1;
                $battleManager.default.instance.playFailSound();
                var t =
                    (($commonData.default.eliminateWholeScrewNum - $commonData.default.eliminateScrewNum) /
                        $commonData.default.eliminateWholeScrewNum) *
                    100;
                 
                if (t < 50) {
                    this.gold = 0;
                    this.fiveGetBtn.interactable = !1;
                } else {
                    this.gold = 50;
                    this.fiveGetBtn.interactable = !0;
                }
                    
                this.fiveGetBtn.node.x =this.gol> 0?160:9000;
               
                 this.again.setPosition(0 === this.gold ? 0 : -160, this.again.y);
                 this.backMain.setPosition(0 === this.gold ? 0 : -160, this.backMain.y);
                 
                this.goldLabel.string = "+" + this.gold;
                this.levelLabel.string = "关卡进度:" + t.toFixed(1) + "%";
               
                this.imgNode.width = 0;
                this.screwNode.setPosition(cc.v2(0));
                this.progessLabel.string = "0%";
                this.progressAni((t / 100) * 680);
                this.nextLevel.active = !1;
                this.backToMenu.active = !0;
                $commonData.default.gamingtime = 0;
                
        }
    };
    t.prototype.havaOpenAIControl = function (e) {
        var t = this;
        var y = this;
        this.scheduleOnce(function () {
            if ($commonData.default.eliminte_game_mode == $commonData.Eliminate_Mode.AIPLAY) {
                e
                    ? $commonData.default.shopCollect.node.active
                        ? (console.error("有打开店铺---------------》"),
                          t.scheduleOnce(function () {
                              $commonData.default.shopCollect.onClickClose();
                              t.scheduleOnce(function () {
                                  y.clickNextLevel();
                              }, 1);
                          }, 1.5))
                        : t.scheduleOnce(function () {
                              y.clickNextLevel();
                          }, 1)
                    : t.scheduleOnce(function () {
                          y.clickReplay();
                      }, 1);
            }
        }, 0.5);
    };
    t.prototype.goldAni = function (e, t, y, x) {
        var o = this;
        if (void 0 === x) {
            x = $eliminateManager.default.instance.timeLabel;
        }
        console.log("=======");
        if (0 != t) {
            $eliminateManager.default.instance.timeLabel.scheduleOnce(function () {
                e.string = "+" + (y + 1).toString();
                x.string = $eliminateManager.default.instance.changeSecondToMinute(t - 1);
                o.goldAni(e, t - 1, y + 1, x);
            }, 0.005);
        } else {
            $commonData.default.gameTime = 0;
        }
    };
    t.prototype.progressAni = function (e) {
        var t = this;
        let prossNum =
                    (($commonData.default.eliminateWholeScrewNum - $commonData.default.eliminateScrewNum) /
                        $commonData.default.eliminateWholeScrewNum) *
                    100;
        if (!(e <= 0)) {
            this.scheduleOnce(function () {
                t.screwNode.setPosition(t.screwNode.getPosition().x + 5, 15);
                t.imgNode.width += 5;
                e -= 5;
                t.progessLabel.string = (prossNum).toFixed(1) + "%";
                t.progressAni(e);
            }, 0.01);
        }
    };
    t.prototype.formatSeconds = function (e, t) {
        if (void 0 === t) {
            t = "h:i:s";
        }
        e = Number(e);
        var y = {};
        y.h = Number.parseInt(String(e / 3600));
        y.i = Number.parseInt(String((e - 3600 * y.h) / 60));
        y.s = Number.parseInt(String(e - 3600 * y.h - 60 * y.i));
        if (y.h < 10) {
            y.h = "0" + y.h;
        }
        if (y.i < 10) {
            y.i = "" + y.i;
        }
        if (y.s < 10) {
            y.s = "0" + y.s;
        }
        return t.replace("h", y.h).replace("i", y.i).replace("s", y.s);
    };
    t.prototype.clickBackToMenu = function () {
        $platform.reportButton("GameOverPage", "backToMenuBtn", $commonData.default.currLevel, 1);
        cc.director.getCollisionManager().enabled = !1;
        $eliminateManager.default.instance.gameState = $enum.ENUM_GAME_STATES.WIN;
        $eliminateManager.default.instance.closeGamePnl()
        cc.director.loadScene("Game");
        // this.scheduleOnce(function () {
        //     cc.director.getCollisionManager().enabled = !1;
        //     cc.director.loadScene("Game");
        // }, 0.21);
    };
    t.prototype.clickNextLevel = function () {
        $eliminateManager.default.instance.getNextLevel();
        $eliminateManager.default.instance.GameInit();
        $eliminateManager.default.instance.showUI(this.node, !1);
    };
    t.prototype.clickFiveGet = function () {
        var e = this;
        $platform.reportButton("GameOverPage", "fiveGetBtn_video", $commonData.default.currLevel, 1, 1);
        $game.default.apiPlatform.showRewardAD(function () {
            $platform.reportButton("GameOverPage", "fiveGetBtn_video_success", $commonData.default.currLevel, 1, 2);
            e.gold = 5 * e.gold;
            e.goldLabel.string = "+" + e.gold;
            e.fiveGetBtn.interactable = !1;
            e.node.getChildByName("bg").getChildByName("fiveGet").getComponent(cc.Animation).stop();
            e.fiveGetBtn.node.scale=1
            $platform.showTips("领取成功！");
            if ($eliminateManager.default.instance.gameState == $enum.ENUM_GAME_STATES.LOSE) {
                e.clickReplay();
            }
            $eliminateManager.default.instance.InitFlag();
            e.clickNextLevel();
        });
    };
    t.prototype.clickShare = function () {
        var e = this;
        wxSDK.share();
        // $platform.showShare(function () {
        //     if (!$commonData.default.isShare) {
        //         e.sharetip.active = !1;
        //         $commonData.default.goldNum += 100;
        //         $topView.default.instance.changeGoldNum();
        //         $commonData.default.isShare = !0;
        //         cc.sys.localStorage.setItem("isShare", !0);
        //     }
        // });
    };
    t.prototype.clickReplay = function () {
        $eliminateManager.default.instance.GameInit();
        $eliminateManager.default.instance.showUI(this.node, !1);
    };
    t.instance = null;
    __decorate([c(cc.Node)], t.prototype, "timeNode", void 0);
    __decorate([c(cc.Node)], t.prototype, "progressNode", void 0);
    __decorate([c(cc.Node)], t.prototype, "imgNode", void 0);
    __decorate([c(cc.Node)], t.prototype, "screwNode", void 0);
    __decorate([c(cc.Label)], t.prototype, "progessLabel", void 0);
    __decorate([c(cc.Node)], t.prototype, "backMain", void 0);
    __decorate([c(cc.Node)], t.prototype, "win", void 0);
    __decorate([c(cc.Node)], t.prototype, "lose", void 0);
    __decorate([c(cc.Label)], t.prototype, "levelLabel", void 0);
    __decorate([c(cc.Label)], t.prototype, "goldLabel", void 0);
    __decorate([c(cc.Button)], t.prototype, "fiveGetBtn", void 0);
    __decorate([c(cc.Node)], t.prototype, "sharetip", void 0);
    __decorate([c(cc.Node)], t.prototype, "backToMenu", void 0);
    __decorate([c(cc.Node)], t.prototype, "nextLevel", void 0);
    __decorate([c(cc.Node)], t.prototype, "again", void 0);
    __decorate([c(sp.Skeleton)], t.prototype, "screwAni", void 0);
    __decorate([c(cc.Sprite)], t.prototype, "ImgNode", void 0);
    __decorate([c(cc.Sprite)], t.prototype, "ShopImgNode", void 0);
    __decorate(
        [
            c({
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
            c({
                type: cc.SpriteFrame,
                displayName: "失败图"
            })
        ],
        t.prototype,
        "loseImg",
        void 0
    );
    return (y = __decorate([a], t));
})(cc.Component);
exports.default = v;
