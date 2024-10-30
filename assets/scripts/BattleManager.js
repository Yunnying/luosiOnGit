var a;
exports.isTestMode = void 0;
var $game = require("./Game");
var $commonData = require("./commonData");
var $platform = require("./platform");
var $config = require("./config");
var $uIManager = require("./UIManager");
var $postUserData = require("./PostUserData");
var $shopView = require("./shopView");
//var $showScrewView = require("./showScrewView");
var $shopCollectView = require("./shopCollectView");
var g = cc._decorator;
var v = g.ccclass;
var w = g.property;
exports.isTestMode = !1;
var y = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.layerStart = null;
        t.achieveMentPopup = null;
        t.setMusic = null;
        t.digMusic = null;
        t.fallMusic = null;
        t.winMusic = null;
        t.failMusic = null;
        t.boxOpenMusic = null;
        t.testNode = [];
        t.gameNode = null;
        t.ttNode = [];
        t.wxNode = [];
        t.bgNode = null;
        t.bgImg = [];
        t.skinVideoIcon = [];
        t.clickSpine = null;
        t.gameBundle = null;
        t.stageBundle = null;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.start = function () {
        var e = this;
        if (this.clickSpine) {
            this.clickSpine.node.active = !0;
            this.node.on(
                "touchstart",
                function (t) {
                    e.click(t);
                },
                this.node,
                !1
            );
        }
        var t = cc.find("Canvas").getComponent(cc.Canvas);
        if (cc.view.getVisibleSize().height / cc.view.getVisibleSize().width < 1.8) {
            t.fitHeight = !0;
            t.fitWidth = !1;
            console.log("ipad");
        } else {
            t.fitHeight = !1;
            t.fitWidth = !0;
        }
        this.changetestNode();
        this.changePlatformNode();
        this.clickChangeBG();
        this.initSkipVideoNode();
        this.creatUnit();
    };
    t.prototype.click = function (e) {
        this.clickSpine.node.setPosition(this.clickSpine.node.parent.convertToNodeSpaceAR(e.getLocation()));
        this.clickSpine.animation = "animation";
    };
    t.prototype.creatUnit = function () {
        var e = this.node.getChildByName("shopCollectPnl");
        if (e) {
            $commonData.default.shopCollect = e.getComponent($shopCollectView.default);
            $commonData.default.shopCollect.createItems();
        }
    };
    t.prototype.changeTestMode = function () {
        exports.isTestMode = !exports.isTestMode;
        this.changetestNode();
    };
    t.prototype.changeTestOpenMode = function () {
        exports.isTestMode = !0;
        this.changetestNode();
    };
    t.prototype.changetestNode = function () {
        console.log("?????????????????");
        if (exports.isTestMode) {
            for (var e = 0; e < this.testNode.length; e++) {
                this.testNode[e].active = !0;
            }
        } else {
            for (e = 0; e < this.testNode.length; e++) {
                this.testNode[e].active = !1;
            }
        }
    };
    t.prototype.initSkipVideoNode = function () {
        cc.sys.localStorage.setItem("skinVideoCoupon", $commonData.default.skinVideoCoupon);
        console.error("无广告券的数量", $commonData.default.skinVideoCoupon);
        if ($commonData.default.GameMode != $commonData.GAME_MODE_ENUM.ELIMINATE) {
            $commonData.default.skinVideoCoupon > 0
                ? this.skinVideoIcon.forEach(function (e) {
                      e.active = !0;
                  })
                : this.skinVideoIcon.forEach(function (e) {
                      e.active = !1;
                  });
            if ($commonData.default.GameMode != $commonData.GAME_MODE_ENUM.COMPETITION) {
                $uIManager.default.instance.setPnl;
                $uIManager.default.instance.revivePnl;
                if (null != $uIManager.default.instance.shopPnl) {
                    $shopView.default.instance.initSkipVideoNode();
                }
                if (null != $uIManager.default.instance.showScrewPnl) {
                   // $showScrewView.default.instance.initSkipVideoNode();
                }
            }
        }
    };
    t.prototype.changePlatformNode = function () {
        if ($config.currentPlatform == $config.platformEnum.wechat) {
            this.showWXBtn(!0);
            this.showTTBtn(!1);
        } else {
            if ($config.currentPlatform == $config.platformEnum.toutiao) {
                this.showWXBtn(!1);
                this.showTTBtn(!0);
            }
        }
    };
    t.prototype.showWXBtn = function (e) {
        for (var t = 0; t < this.wxNode.length; t++) {
            this.wxNode[t].active = e;
        }
    };
    t.prototype.showTTBtn = function (e) {
        for (var t = 0; t < this.ttNode.length; t++) {
            this.ttNode[t].active = e;
        }
    };
    t.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = !0;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -980);
    };
    t.prototype.playBGM = function () {
        cc.audioEngine.stopMusic();
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NONE) {
            $game.default.resManager
                .loadBundleRes("audio", "BG_main", cc.AudioClip)
                .catch(function () {
                    console.error("加载BGM失败");
                })
                .then(function (e) {
                    cc.audioEngine.playMusic(e, !0);
                    console.log("播放背景音乐");
                });
        } else {
            $game.default.resManager
                .loadBundleRes("audio", "BG_game", cc.AudioClip)
                .catch(function () {
                    console.error("加载BGM失败");
                })
                .then(function (e) {
                    cc.audioEngine.playMusic(e, !0);
                    console.log("播放背景音乐");
                });
        }
        this.playGroundMusic();
    };
    t.prototype.playGroundMusic = function () {
        if ($commonData.default.musicOn) {
            cc.audioEngine.setMusicVolume(1);
        } else {
            cc.audioEngine.setMusicVolume(0);
        }
    };
    t.prototype.stopGroundMusic = function () {
        cc.audioEngine.setMusicVolume(0);
        console.log("-----stop");
    };
    t.prototype.playWinSound = function () {
        if ($commonData.default.soundOn) {
            this.winMusic.play();
        }
    };
    t.prototype.stopWinSound = function () {
        this.winMusic.stop();
    };
    t.prototype.playFailSound = function () {
        if ($commonData.default.soundOn) {
            this.failMusic.play();
        }
    };
    t.prototype.stopFailSound = function () {
        this.failMusic.stop();
    };
    t.prototype.playSetSound = function () {
        if ($commonData.default.soundOn) {
            this.setMusic.play();
        }
    };
    t.prototype.playDigSound = function () {
        if ($commonData.default.soundOn) {
            this.digMusic.play();
        }
    };
    t.prototype.playFallSound = function () {
        if ($commonData.default.soundOn) {
            this.fallMusic.play();
        }
    };
    t.prototype.playBoxOpenSound = function () {
        if ($commonData.default.soundOn) {
            this.boxOpenMusic.play();
        }
    };
    t.prototype.showAchievementPopup = function () {};
    t.prototype.setArrData = function (e) {
        var t = [];
        switch (e) {
            case "skinData":
                t = $commonData.default.boardSkinData.skinData;
                $postUserData.seletPostUserData(["board_skin", "little_man_skin", "skin_debris"]);
                break;
            case "piece":
                t = $commonData.default.boardSkinData.piece;
                $postUserData.seletPostUserData(["board_skin", "little_man_skin", "skin_debris"]);
                break;
            case "screwSkinData":
                t = $commonData.default.screwSkinData.skinData;
                $postUserData.seletPostUserData(["board_skin", "little_man_skin", "skin_debris"]);
                break;
            case "claimAchievementRewards":
                t = $commonData.default.AchievementData.claimAchievementRewards;
                break;
            case "provincePoint":
                t = $commonData.default.provincePoint;
                break;
            case "nailSkinData":
                $commonData.default.nailSkinData.forEach(function (e) {
                    if (e.isGot) {
                        t.push(1);
                    } else {
                        t.push(0);
                    }
                });
                break;
            case "bgSkinData":
                $commonData.default.bgSkinData.forEach(function (e) {
                    if (e.isGot) {
                        t.push(1);
                    } else {
                        t.push(0);
                    }
                });
                break;
            case "recentRecord":
                t = $commonData.default.recentGameRecord.recentRecord;
                var n = JSON.stringify(t);
                return void cc.sys.localStorage.setItem("recentRecord", n);
        }
        var o = "";
        for (var a = 0; a < t.length; a++) {
            o += t[a];
            a != t.length - 1 && (o += ",");
        }
        cc.sys.localStorage.setItem(e, o);
    };
    t.prototype.playVibe = function () {
        if ($commonData.default.vibrateOn) {
            $platform.vibrateShort();
            this.scheduleOnce(function () {
                $platform.vibrateShort();
            }, 0.1);
        }
    };
    t.prototype.loadGameBundle = function (e) {
        var t = this;
        return new Promise(function (n, o) {
            if (t.gameBundle && t.gameBundle.name == e) {
                n(1);
            } else {
                cc.assetManager.loadBundle(e, function (e, a) {
                    if (e) {
                        o();
                    } else {
                        t.gameBundle && t.gameBundle.releaseAll();
                        t.gameBundle = a;
                        n(1);
                    }
                });
            }
        });
    };
    t.prototype.loadGameScene = function (e) {
        var t = this;
        return new Promise(function (n) {
            t.gameBundle.loadScene(e, function (e, t) {
                if (!e) {
                    n(t);
                }
            });
        });
    };
    t.prototype.initWatchVideoArr = function () {
        $commonData.default.watchModeVideo = [];
        $commonData.default.watchModeVideo.push($commonData.default.isWatchGraphicalAd);
        $commonData.default.watchModeVideo.push($commonData.default.isWatchEliminateAd);
        $commonData.default.watchModeVideo.push($commonData.default.isWatchUnscrewAd);
        $commonData.default.watchModeVideo.push(!0);
    };
    t.prototype.clickChangeBG = function () {
        if (null != this.bgNode) {
            console.log("--------->", $commonData.default.bgSkinData[$commonData.default.currentBgSkin].type);
            switch ($commonData.default.bgSkinData[$commonData.default.currentBgSkin].type) {
                case "img":
                    var e = $commonData.default.bgSkinData[$commonData.default.currentBgSkin].imgIndex;
                    this.bgNode.getComponent(cc.Sprite).spriteFrame = this.bgImg[e];
                    this.bgNode.color = cc.color(255, 255, 255);
                    break;
                case "color":
                    this.bgNode.getComponent(cc.Sprite).spriteFrame = this.bgImg[1];
                    var t = $commonData.default.bgSkinData[$commonData.default.currentBgSkin].color;
                    console.log(t);
                    this.bgNode.color = cc.color(t[0], t[1], t[2]);
                    console.log(this.bgNode.color);
            }
        }
    };
    t.instance = null;
    __decorate([w(cc.Node)], t.prototype, "layerStart", void 0);
    __decorate([w(cc.Node)], t.prototype, "achieveMentPopup", void 0);
    __decorate(
        [
            w({
                type: cc.AudioSource,
                tooltip: "设置音效"
            })
        ],
        t.prototype,
        "setMusic",
        void 0
    );
    __decorate(
        [
            w({
                type: cc.AudioSource,
                tooltip: "打孔音效"
            })
        ],
        t.prototype,
        "digMusic",
        void 0
    );
    __decorate(
        [
            w({
                type: cc.AudioSource,
                tooltip: "消除音效"
            })
        ],
        t.prototype,
        "fallMusic",
        void 0
    );
    __decorate(
        [
            w({
                type: cc.AudioSource,
                tooltip: "胜利音效"
            })
        ],
        t.prototype,
        "winMusic",
        void 0
    );
    __decorate(
        [
            w({
                type: cc.AudioSource,
                tooltip: "失败音效"
            })
        ],
        t.prototype,
        "failMusic",
        void 0
    );
    __decorate(
        [
            w({
                type: cc.AudioSource,
                tooltip: "开箱音效"
            })
        ],
        t.prototype,
        "boxOpenMusic",
        void 0
    );
    __decorate([w(cc.Node)], t.prototype, "testNode", void 0);
    __decorate([w(cc.Node)], t.prototype, "gameNode", void 0);
    __decorate([w(cc.Node)], t.prototype, "ttNode", void 0);
    __decorate([w(cc.Node)], t.prototype, "wxNode", void 0);
    __decorate([w(cc.Node)], t.prototype, "bgNode", void 0);
    __decorate([w(cc.SpriteFrame)], t.prototype, "bgImg", void 0);
    __decorate([w(cc.Node)], t.prototype, "skinVideoIcon", void 0);
    __decorate([w(sp.Skeleton)], t.prototype, "clickSpine", void 0);
    return (n = __decorate([v], t));
})(cc.Component);
exports.default = y;
