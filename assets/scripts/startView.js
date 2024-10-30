var a;
var $commonData = require("./commonData");
var $game = require("./Game");
var $gameLevel = require("./GameLevel");
var $gameManager = require("./GameManager");
var $battleManager = require("./BattleManager");
var $wxSubContextView = require("./wxSubContextView");
var $graphicalGameLevel = require("./GraphicalGameLevel");
var $topView = require("./topView");
var $uIManager = require("./UIManager");
var $platform = require("./platform");
var $config = require("./config");
var $toutiao = require("./toutiao");
var $wechat = require("./wechat");
var $postUserData = require("./PostUserData");
var $shareTitle = require("./ShareTitle");
var b = cc._decorator;
var P = b.ccclass;
var _ = b.property;
var N = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.shopPnl = null;
        t.gamePnl = null;
        t.inviteBtn = null;
        t.invitePnl = null;
        t.playButton = null;
        t.giftButton = null;
        t.chooseModePnl = null;
        t.addShortCutButton = null;
        t.loadImg = null;
        t.screwBtn = null;
        t.graphicalBtn = null;
        t.unscrewBtn = null;
        t.eliminateBtn = null;
        t.choosePnl = null;
        t.provinceContent = null;
        t.gameclob = null;
        t.inventNode = null;
        t.addShort = null;
        t.skinSpine = null;
        t.signBtn = null;
        t.chooseNode = null;
        t.HuTuiPnl = null;
        t.visibleItemCount = 3;
        t.sortedProvince = [];
        t.sortedPoint = [];
        t.isLogin = !1;
        t.nowLoadLv = 0;
        t.gamelevel = null;
        t.isloadPrefab = !1;
        t.lvPrefab = null;
        t.gameClubBtn = null;
        t.isshowSign = !1;
        t.haveBtn = !0;
        t.ifFirst = "";
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onLoad = function () {
        $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.NONE;
        this.ifFirst = cc.sys.localStorage.getItem("firstgame");
        if ($config.currentPlatform == $config.platformEnum.wechat) {
            this.haveBtn = !1;
            this.addShort.active = !1;
            this.giftButton.active = !1;
            this.inventNode.active = !1;
        }
        if ($config.currentPlatform == $config.platformEnum.toutiao) {
            this.addShort.active = !0;
            this.haveBtn = !1;
        }
        if ($config.currentPlatform == $config.platformEnum.web) {
            this.haveBtn = !1;
            this.inventNode.active = !1;
            this.addShort.active = !1;
        }
        if (cc.sys.isBrowser) {
            console.log("是浏览器开启作弊");
            $battleManager.default.instance.changeTestOpenMode();
            $platform.changeIsAdForFalse();
        }
        this.gamePnl.active = !1;
        var e = cc.find("Canvas").getComponent(cc.Canvas);
        if ($commonData.default.windowHeight / $commonData.default.windowWidth < 1.8) {
            e.fitHeight = !0;
            e.fitWidth = !1;
        } else {
            e.fitHeight = !1;
            e.fitWidth = !0;
        }
    };
    t.prototype.start = function () {
        if ($commonData.default.isCheck) {
            this.graphicalBtn.active = !1;
            this.node.getChildByName("BtnNode").getChildByName("btn_dianpu").active = !1;
            this.node.getChildByName("BtnNode").getChildByName("sign").active = !1;
            this.node.getChildByName("BtnNode").getChildByName("startBtn").active = !1;
        }
        if ($commonData.default.isFirstGame) {
            this.loadImg.active = !0;
        } else {
            this.loadImg.active = !1;
        }
        if ($commonData.default.isCheck) {
            this.loadImg.active = !1;
        } else {
            "played" !== this.ifFirst &&
                (console.log("第一次进去--------》"),
                (this.loadImg.active = !1),
                this.clickEliminate(),
                ($commonData.default.isFirstGame = !1));
            $commonData.default.firstIntoElimateGame ||
                "played" != this.ifFirst ||
                (console.log("直接进入Eliminate------->"), this.clickEliminate());
        }
        this.initChanllengePool();
        this.initBtn();
        $gameManager.default.instance.loadSkin($commonData.default.boardSkinData.currentSkin);
        if (
            $commonData.default.isShowAchievement &&
            $commonData.default.passLevel >= $commonData.default.AchievementData.achievementGoal[0]
        ) {
            this.scheduleOnce(function () {
                $battleManager.default.instance.showAchievementPopup();
            }, 0.5);
        }
    };
    t.prototype.onEnable = function () {
        $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.NONE;
        this.initSkinSpine();
        $battleManager.default.instance.playBGM();
        if ($commonData.default.isFirstGame) {
            this.showGameClubBtn(!0);
        } else {
            this.createGameClubBtn();
        }
        $topView.default.instance.changeSetBtn();
        if ($uIManager.default.instance.loadUI) {
            this.preloadlevel();
        }
        this.getCurrentLv();
        $battleManager.default.instance.playGroundMusic();
        $battleManager.default.instance.stopFailSound();
        $battleManager.default.instance.stopWinSound();
        $platform.reportPage("StartPage", 0);
    };
    t.prototype.onDisable = function () {
        this.showGameClubBtn(!1);
    };
    t.prototype.initSkinSpine = function () {
        this.skinSpine.animation = $commonData.default.screwSkinName[$commonData.default.screwSkinData.currentSkin];
    };
    t.prototype.clickSpecialOpenBtn = function () {
        if ($commonData.default.canOpenAI) {
            $game.default.apiPlatform.showTips("开启自动游玩");
            $commonData.default.eliminte_game_mode = $commonData.Eliminate_Mode.AIPLAY;
            $platform.changeIsAdForFalse();
            this.chooseNode.active = !0;
        }
    };
    t.prototype.clickSpecialcloseBtn = function () {
        if ($commonData.default.canOpenAI) {
            $platform.changeIsAdForTrue();
            $commonData.default.eliminte_game_mode = $commonData.Eliminate_Mode.NORMALPLAY;
        }
    };
    t.prototype.changeInviteLabel = function () {};
    t.prototype.clickInviteBtn = function () {
        console.log("点击喊人");
        $platform.reportButton("StartPage", "inviteBtn");
        this.invitePnl.getComponent("inviteView").show();
    };
    t.prototype.onClickInvite = function () {
        var e = $shareTitle.default.getRandomTitle2(0);
        wx.shareAppMessage({
            title: e,
            imageUrl: $shareTitle.default.getRandomImageUrl(),
            imageUrlId: "12MoTxt+QBipr5RF0qcfGg==",
            query: "openId=" + $commonData.default.openId
        });
    };
    t.prototype.changeNewLevelNodeSkin = function () {};
    t.prototype.initBtn = function () {
        this.screwBtn.children[0].active = !1;
        if ($commonData.default.isWatchGraphicalAd) {
            this.graphicalBtn.children[0].active = !1;
        } else {
            this.graphicalBtn.children[0].active = !0;
        }
        if ($commonData.default.isWatchUnscrewAd) {
            this.unscrewBtn.children[0].active = !1;
        } else {
            this.unscrewBtn.children[0].active = !0;
        }
    };
    t.prototype.createGameClubBtn = function () {
        if (this.haveBtn) {
            this.gameclob.active = !0;
            if (window.wx) {
                console.warn("------生成游戏圈按钮");
                var e = wx.getSystemInfoSync().windowHeight;
                var t = wx.getSystemInfoSync().windowWidth;
                var n;
                if (e / t < 1.8) {
                    n = e / 1334;
                } else {
                    n = t / 750;
                }
                console.log("-------screwH", e);
                console.log("-------screwW", t);
                console.log("-------k", n);
                this.gameClubBtn = wx.createGameClubButton({
                    type: "text",
                    text: "",
                    style: {
                        left: 0.026 * t,
                        top: 0.3788 * e,
                        width: 115 * n,
                        height: 124 * n
                    }
                });
            }
        } else {
            this.gameclob.active = !1;
        }
    };
    t.prototype.showGameClubBtn = function (e) {
        if (null != this.gameClubBtn && window.wx && $config.currentPlatform == $config.platformEnum.wechat) {
            e && 1 == this.node.active ? this.gameClubBtn.show() : this.gameClubBtn.hide();
        }
    };
    t.prototype.changeGift = function () {
        var e = this;
        if (
            $commonData.default.formSidebarCard &&
            0 == $commonData.default.isGetSidebarCardGift &&
            $commonData.default.canUseSidebarCard
        ) {
            $uIManager.default.instance.giftPnl.active = !0;
        }
        if ($commonData.default.isGetSidebarCardGift) {
            this.giftButton.active = !1;
        }
        if (window.tt && $config.currentPlatform == $config.platformEnum.toutiao) {
            console.log("启动游戏");
            tt.onShow(function (e) {
                console.log("启动场景：", e);
                if ("homepage" == e.launch_from && "sidebar_card" == e.location) {
                    console.log("从侧边栏进入游戏");
                    $commonData.default.formSidebarCard = !0;
                    if (!$commonData.default.isGetSidebarCardGift) {
                        $uIManager.default.instance.giftPnl.active = !0;
                    }
                }
                $battleManager.default.instance.playBGM();
                console.log("返回游戏");
            });
        }
        if (window.wx && $config.currentPlatform == $config.platformEnum.wechat) {
            wx.onShow(function () {
                $battleManager.default.instance.playBGM();
                console.log("返回游戏");
                $wechat.newShareRecall();
            });
        }
        if (
            window.tt &&
            $config.currentPlatform == $config.platformEnum.toutiao &&
            "Douyin" == tt.getSystemInfoSync().appName
        ) {
            tt.checkScene({
                scene: "sidebar",
                success: function (t) {
                    console.log("check scene success: ", t.isExist);
                    if (t.isExist) {
                        $commonData.default.canUseSidebarCard = !0;
                        $commonData.default.isGetSidebarCardGift
                            ? (e.giftButton.active = !1)
                            : (e.giftButton.active = !0);
                    } else {
                        $commonData.default.canUseSidebarCard = !1;
                        e.giftButton.active = !1;
                    }
                },
                fail: function (t) {
                    console.log("check scene fail:", t);
                    $commonData.default.canUseSidebarCard = !1;
                    e.giftButton.active = !1;
                }
            });
        } else {
            this.giftButton.active = !1;
        }
    };
    t.prototype.getCurrentLv = function () {
        var e = cc.sys.localStorage.getItem("screwLevel");
        if (!(null != e && null != e && "" != e)) {
            e = 1;
            cc.sys.localStorage.setItem("screwLevel", 1);
        }
        var t = cc.sys.localStorage.getItem("currLvGraphical");
        if (!(null != t && null != t && "" != t)) {
            t = 1;
            cc.sys.localStorage.setItem("currLvGraphical", 1);
        }
        var n = cc.sys.localStorage.getItem("currLvUnscrew");
        if (!(null != n && null != n && "" != n)) {
            n = 1;
            cc.sys.localStorage.setItem("currLvUnscrew", 1);
        }
        var o = cc.sys.localStorage.getItem("currentLevel");
        if (null == o || null == o || "" == o) {
            $commonData.default.eliminatePasslevel = 1;
            $commonData.default.currLevel = 1;
            cc.sys.localStorage.setItem("currentLevel", 1);
        } else {
            $commonData.default.eliminatePasslevel = parseInt(o);
            console.log("------commonData.currentLevel", $commonData.default.eliminatePasslevel);
        }
        switch ($commonData.default.GameMode) {
            case $commonData.GAME_MODE_ENUM.NORMAL:
                $commonData.default.currLevel = parseInt(e);
                break;
            case $commonData.GAME_MODE_ENUM.CHALLENGE:
                $gameManager.default.instance.getChallengeLv();
                break;
            case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                if (t > $commonData.default.graphicalMaxLv) {
                    console.warn("随机进入");
                    $commonData.default.currLevel = Math.ceil(Math.random() * $commonData.default.graphicalMaxLv);
                } else {
                    console.warn("正常进入");
                    $commonData.default.currLevel = parseInt(t);
                }
                break;
            case $commonData.GAME_MODE_ENUM.UNSCREW:
                if (n > $commonData.default.unscrewMaxLv) {
                    $commonData.default.currLevel = Math.ceil(Math.random() * $commonData.default.unscrewMaxLv);
                } else {
                    $commonData.default.currLevel = parseInt(n);
                }
                break;
            case $commonData.GAME_MODE_ENUM.ELIMINATE:
                if ($commonData.default.eliminatePasslevel > $commonData.default.eliminateMaxLv) {
                    $commonData.default.currLevel = Math.ceil(Math.random() * $commonData.default.eliminateMaxLv);
                } else {
                    console.log("---commonData.eliminatePasslevel", $commonData.default.eliminatePasslevel);
                    $commonData.default.currLevel = $commonData.default.eliminatePasslevel;
                }
        }
        if ($commonData.default.currLevel <= 0) {
            $commonData.default.currLevel = 1;
        }
        console.log("-----------currentLevel", $commonData.default.currLevel);
    };
    t.prototype.preloadlevel = function () {
        var e = this;
        if (
            $commonData.default.passLevel >= $commonData.default.maxLv &&
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL
        ) {
            $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.CHALLENGE;
        }
        $game.default.resManager
            .loadBundleRes("levels", "level0", cc.Prefab)
            .catch(function () {
                console.error("加载level0失败!");
            })
            .then(function (t) {
                e.gamePnl.getChildByName("gameNode").removeAllChildren();
                var n = cc.instantiate(t);
                n.setParent(e.gamePnl.getChildByName("gameNode"));
                n.setPosition(0, 0);
                e.gamelevel = n.getComponent($gameLevel.default);
                $commonData.default.gamelevel = e.gamelevel;
                e.isloadPrefab = !0;
                console.log("加载level0成功");
            });
    };
    t.prototype.clickPlayAd = function () {
        $commonData.default.isWatchScrewAd = !0;
        this.screwBtn.children[0].active = !1;
        cc.sys.localStorage.setItem("isWatchScrewAd", !0);
        this.clickPlay(0);
    };
    t.prototype.clickPlay = function (e) {
        if (void 0 === e) {
            e = 0;
        }
        this.showGameClubBtn(!1);
        if ($commonData.default.isWatchScrewAd) {
            $commonData.default.currLevel = cc.sys.localStorage.getItem("screwLevel");
            1 != e &&
                ($commonData.default.currLevel > $commonData.default.maxLv
                    ? ($commonData.default.GameMode = $commonData.GAME_MODE_ENUM.CHALLENGE)
                    : ($commonData.default.GameMode = $commonData.GAME_MODE_ENUM.NORMAL),
                this.getCurrentLv());
            this.isloadPrefab && $uIManager.default.instance.loadUI
                ? ($platform.reportButton("StartPage", "screwBtn"),
                  console.log("-------------start", $commonData.default.currLevel),
                  this.gamelevel.init(),
                  $gameManager.default.instance.init(),
                  (this.node.active = !1),
                  $platform.showBannerAD(!1),
                  $platform.showGridAD(!1),
                  (this.gamePnl.active = !0),
                  $gameManager.default.instance.startClock())
                : $platform.showTips("关卡信息未加载完成，请稍后再试！");
        } else {
            this.clickPlayAd();
        }
    };
    t.prototype.clickGraphical = function (e) {
        var t = this;
        this.showGameClubBtn(!1);
        if ($commonData.default.isWatchGraphicalAd || $commonData.default.isCheck) {
            if ($uIManager.default.instance.loadUI) {
                $platform.showBannerAD(!1);
                $platform.showGridAD(!1);
                $platform.reportButton("StartPage", "graphicalBtn");
                $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.GARAPHICAL;
                var n = cc.sys.localStorage.getItem("currLvGraphical");
                console.warn("===========>>currLvGraphical", n, $commonData.default.graphicalMaxLv);
                if (1 != e && (this.getCurrentLv(), n > $commonData.default.graphicalMaxLv)) {
                    $uIManager.default.instance.showPassAllLevelPnl(!0);
                } else {
                    this.loadImg.active = !0;
                    $game.default.resManager
                        .loadBundleRes("graphicalMode", "prefab/Lv0", cc.Prefab)
                        .catch(function () {
                            console.error("加载特殊关卡失败!");
                        })
                        .then(function (e) {
                            console.log("----加载levels/Lv" + $commonData.default.currLevel + "成功");
                            t.gamePnl.getChildByName("gameNode").removeAllChildren();
                            var n = cc.instantiate(e);
                            n.setParent(t.gamePnl.getChildByName("gameNode"));
                            n.setPosition(0, 0);
                            $commonData.default.gamelevel = n.getComponent($graphicalGameLevel.default);
                            $commonData.default.isAddTime = !1;
                            $gameManager.default.instance.init();
                            t.node.active = !1;
                            t.gamePnl.active = !0;
                            $gameManager.default.instance.startClock();
                            console.log("   commonData.currLevel========》", $commonData.default.currLevel);
                        });
                }
            } else {
                $platform.showTips("关卡信息未加载完成，请稍后再试！");
            }
        } else {
            this.clickGraphicalAd();
        }
    };
    t.prototype.clickGraphicalAd = function () {
        var e = this;
        $platform.reportButton("StartPage", "graphicalVideoBtn_video", 0, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("StartPage", "graphicalVideoBtn_video_success", 0, 2);
            $commonData.default.isWatchGraphicalAd = !0;
            e.graphicalBtn.children[0].active = !1;
            cc.sys.localStorage.setItem("isWatchGraphicalAd", !0);
            e.clickGraphical(0);
        });
    };
    t.prototype.clickUnscrewBtn = function (e) {
        var t = this;
        if (void 0 === e) {
            e = 0;
        }
        this.showGameClubBtn(!1);
        if ($commonData.default.isWatchUnscrewAd) {
            $uIManager.default.instance.loadUI
                ? (($commonData.default.GameMode = $commonData.GAME_MODE_ENUM.UNSCREW),
                  1 != e && this.getCurrentLv(),
                  console.log("----unscrewLevel", $commonData.default.currLevel),
                  (this.loadImg.active = !0),
                  $platform.showBannerAD(!1),
                  $platform.showGridAD(!1),
                  $platform.reportButton("StartPage", "unscrewBtn"),
                  $game.default.resManager
                      .loadBundleRes("UnscrewMode", "prefab/Lv0", cc.Prefab)
                      .catch(function () {
                          console.error("加载解开螺丝关卡失败!");
                      })
                      .then(function (e) {
                          t.gamePnl.getChildByName("gameNode").removeAllChildren();
                          var n = cc.instantiate(e);
                          n.setParent(t.gamePnl.getChildByName("gameNode"));
                          n.setPosition(0, 0);
                          $commonData.default.isAddTime = !1;
                          $gameManager.default.instance.init();
                          t.node.active = !1;
                          t.gamePnl.active = !0;
                          $gameManager.default.instance.startClock();
                      }))
                : $platform.showTips("关卡信息未加载完成，请稍后再试！");
        } else {
            this.clickUnscrewAd();
        }
    };
    t.prototype.clickUnscrewAd = function () {
        var e = this;
        $platform.reportButton("StartPage", "unscrewVideoBtn_video", 0, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("StartPage", "unscrewVideoBtn_video_success", 0, 2);
            $commonData.default.isWatchUnscrewAd = !0;
            e.unscrewBtn.children[0].active = !1;
            cc.sys.localStorage.setItem("isWatchUnscrewAd", !0);
            e.clickUnscrewBtn();
        });
    };
    t.prototype.clickEliminate = function (e) {
        if (void 0 === e) {
            e = 0;
        }
        this.showGameClubBtn(!1);
        if ($commonData.default.isCheck) {
            this.clickGraphical(0);
        } else {
            $platform.reportButton("StartPage", "eliminateBtn");
            $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.ELIMINATE;
            1 != e && this.getCurrentLv();
            this.loadImg.active = !0;
            $game.default
                .loadBundleRes("Eliminatemode", "texture/gameItem/U", cc.SpriteFrame)
                .catch(function () {})
                .then(function () {
                    $platform.showBannerAD(!1);
                    $platform.showGridAD(!1);
                    cc.director.loadScene("Eliminate");
                });
        }
    };
    t.prototype.clickEliminateAd = function () {
        var e = this;
        $platform.reportButton("StartPage", "EliminateVideoBtn_video", 0, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("StartPage", "EliminateVideoBtn_video_success", 0, 2);
            $commonData.default.isWatchEliminateAd = !0;
            e.eliminateBtn.children[0].active = !1;
            cc.sys.localStorage.setItem("isWatchEliminateAd", !0);
            e.clickEliminate();
        });
    };
    t.prototype.clickAchievement = function () {
        $uIManager.default.instance.showAchievementPnl(!0);
    };
    t.prototype.clickCareer = function () {
        $platform.reportButton("StartPage", "careerBtn");
        var e = this;
        if ($config.currentPlatform == $config.platformEnum.toutiao && window.tt) {
            console.log("-------------------commonData.getTTUserInfo", $commonData.default.getTTUserInfo);
            0 == $commonData.default.getTTUserInfo
                ? tt.getUserInfo({
                      success: function (t) {
                          console.log("getUserInfo 调用成功：", t.userInfo);
                          $commonData.default.getTTUserInfo = !0;
                          $commonData.default.UserAvatarUrl = t.userInfo.avatarUrl;
                          $commonData.default.UserNickName = t.userInfo.nickName;
                          cc.sys.localStorage.setItem("getTTUserInfo", !0);
                          cc.sys.localStorage.setItem("UserAvatar", $commonData.default.UserAvatarUrl);
                          cc.sys.localStorage.setItem("UserNickName", $commonData.default.UserNickName);
                          if ("" != $commonData.default.openId) {
                              $postUserData.seletPostUserData(["head_url", "nick_name"]);
                          }
                          e.showCareer();
                      },
                      fail: function (t) {
                          console.log("getUserInfo 调用失败", t);
                          e.showCareer();
                      }
                  })
                : e.showCareer();
        } else {
            $config.currentPlatform == $config.platformEnum.wechat && window.wx
                ? 1 == $commonData.default.getWxUserInfo
                    ? "" == $commonData.default.UserAvatarUrl
                        ? wx.getUserInfo({
                              success: function (t) {
                                  $commonData.default.UserNickName = t.userInfo.nickName;
                                  $commonData.default.UserAvatarUrl = t.userInfo.avatarUrl;
                                  console.log("---------------------取得微信授权", t.userInfo);
                                  cc.sys.localStorage.setItem("getWxUserInfo", $commonData.default.getWxUserInfo);
                                  cc.sys.localStorage.setItem("UserAvatar", $commonData.default.UserAvatarUrl);
                                  cc.sys.localStorage.setItem("UserNickName", $commonData.default.UserNickName);
                                  if ("" != $commonData.default.openId) {
                                      $postUserData.seletPostUserData(["head_url", "nick_name"]);
                                  }
                                  e.showCareer();
                              }
                          })
                        : e.showCareer()
                    : $commonData.default.getWxInfo
                    ? e.showCareer()
                    : $wxSubContextView.default.instance.initUserInfoButton()
                : e.showCareer();
        }
    };
    t.prototype.showCareer = function () {
        $uIManager.default.instance.showCareerPnl(!0);
    };
    t.prototype.clickGift = function () {
        $platform.reportButton("StartPage", "giftBtn");
        $uIManager.default.instance.giftPnl.active = !0;
    };
    t.prototype.clickRank = function () {
        wxSDK.updateScore();
        UIMgr.open("rankPnl");
        var e = cc.sys.localStorage.getItem("screwLevel");
        if (!(null != e && null != e && "" != e)) {
            e = "1";
        }
        var t = cc.sys.localStorage.getItem("currentLevel");
        if (!(null != t && null != t && "" != t)) {
            t = "1";
        }
        var n = parseInt(e) - 1 + (parseInt(t) - 1);
        wxSDK.getUserInfo()
      
        return;
        $platform.reportButton("StartPage", "rankBtn");
       
        $platform.setRank(n);
        $platform.getRank();
    };
    t.prototype.clickSkin = function () {
        $platform.reportButton("StartPage", "skinBtn");
        $platform.showBannerAD(!1);
        $platform.showGridAD(!1);
        $uIManager.default.instance.showSkinPnl(!0);
    };
    t.prototype.loadLv = function (e) {
        console.warn("-----------------GameMode", $commonData.default.GameMode);
        $commonData.default.currLevel = e;
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.NORMAL) {
            this.clickPlay(1);
        } else {
            $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL
                ? this.clickGraphical(1)
                : $commonData.default.GameMode == $commonData.GAME_MODE_ENUM.UNSCREW && this.clickUnscrewBtn(1);
        }
    };
    t.prototype.clickAddShortCut = function () {
        var e = this;
        $platform.reportButton("StartPage", "addshortCutBtn");
        if ($config.currentPlatform == $config.platformEnum.toutiao) {
            $toutiao.addshortCut(function () {
                e.addShortCutReward();
            });
        }
    };
    t.prototype.addShortCutReward = function () {
        console.error("获得添加桌面奖励");
        var e = cc.sys.localStorage.getItem("addshortCut");
        if (!(null != e && null != e && "" != e)) {
            $commonData.default.goldNum += 1e3;
            $topView.default.instance.changeGoldNum();
        }
        cc.sys.localStorage.setItem("addshortCut", !0);
        this.addShort.active = !1;
    };
    t.prototype.initChanllengePool = function () {
        for (var e = 110; e <= 330; e++) {
            $commonData.default.challengePool.push(e);
        }
    };
    t.prototype.removeRankItem = function (e) {
        var t = this.provinceContent.getChildByName(String(e));
        if (t) {
            t.removeFromParent();
        }
    };
    t.prototype.clickChooseBtn = function () {
        this.choosePnl.active = !0;
    };
    t.prototype.aaaClear = function () {
        cc.sys.localStorage.clear();
    };
    t.prototype.showShop = function () {
        UIMgr.open("shopCollectPnlNew",{type:2});
        return;
        $commonData.default.currLevel = cc.sys.localStorage.getItem("currentLevel");
        if ($commonData.default.currLevel > $commonData.default.eliminateMaxLv) {
            $commonData.default.currLevel = $commonData.default.eliminateMaxLv;
        }
        console.log("cccccc===>", $commonData.default.currLevel);
        this.shopPnl.active = !0;
        this.showGameClubBtn(!1);
    };
    t.prototype.clickChooseModeBtn = function () {
        console.log("点击玩一玩");
        this.showGameClubBtn(!1);
        this.chooseModePnl.getChildByName("bg").getComponent(cc.Animation).play("appear");
        this.chooseModePnl.active = !0;
    };
    t.prototype.checkSignState = function () {
        if ($commonData.default.signIndex >= 7) {
            this.showGameClubBtn(!0);
            return void (this.signBtn.active = !1);
        }
        if ($commonData.default.signDate) {
            var e = new Date();
            if (
                e.getFullYear() === $commonData.default.signDate.year &&
                e.getMonth() === $commonData.default.signDate.month &&
                e.getDate() === $commonData.default.signDate.date
            ) {
                console.error("同一天");
                return void (0 === $commonData.default.signState
                    ? (console.error("未领取过奖励"),
                      $commonData.default.isFirstGame ||
                          ($uIManager.default.instance.signPnl.getComponent("signView").show(), (this.isshowSign = !0)))
                    : this.showGameClubBtn(!0));
            }
        }
        console.error("新的一天");
        var t = new Date();
        var n = {
            year: t.getFullYear(),
            month: t.getMonth(),
            date: t.getDate()
        };
        $commonData.default.signDate = n;
        $commonData.default.signIndex++;
        $commonData.default.signState = 0;
        if (!$commonData.default.isFirstGame) {
            $uIManager.default.instance.signPnl.getComponent("signView").show();
            this.isshowSign = !0;
        }
    };
    t.prototype.clickSignBtn = function () {
        if ($uIManager.default.instance.loadUI) {
            console.log("----clickSignBtn");
            $platform.reportButton("StartPage", "signBtn");
            if (!($commonData.default.signIndex >= 7)) {
                $uIManager.default.instance.signPnl.getComponent("signView").show();
            }
        }
    };
    t.prototype.clickShopBtn = function () {
        $platform.reportButton("StartPage", "shopBtn");
        $uIManager.default.instance.showShopPnl(!0);
    };
    t.prototype.clickHuTuiBtn = function () {
        $platform.reportButton("StartPage", "Hutui");
        this.HuTuiPnl.active = !0;
    };
    t.instance = null;
    __decorate([_(cc.Node)], t.prototype, "shopPnl", void 0);
    __decorate([_(cc.Node)], t.prototype, "gamePnl", void 0);
    __decorate([_(cc.Node)], t.prototype, "inviteBtn", void 0);
    __decorate([_(cc.Node)], t.prototype, "invitePnl", void 0);
    __decorate([_(cc.Node)], t.prototype, "playButton", void 0);
    __decorate([_(cc.Node)], t.prototype, "giftButton", void 0);
    __decorate([_(cc.Node)], t.prototype, "chooseModePnl", void 0);
    __decorate([_(cc.Node)], t.prototype, "addShortCutButton", void 0);
    __decorate([_(cc.Node)], t.prototype, "loadImg", void 0);
    __decorate([_(cc.Node)], t.prototype, "screwBtn", void 0);
    __decorate([_(cc.Node)], t.prototype, "graphicalBtn", void 0);
    __decorate([_(cc.Node)], t.prototype, "unscrewBtn", void 0);
    __decorate([_(cc.Node)], t.prototype, "eliminateBtn", void 0);
    __decorate([_(cc.Node)], t.prototype, "choosePnl", void 0);
    __decorate([_(cc.Node)], t.prototype, "provinceContent", void 0);
    __decorate([_(cc.Node)], t.prototype, "gameclob", void 0);
    __decorate([_(cc.Node)], t.prototype, "inventNode", void 0);
    __decorate([_(cc.Node)], t.prototype, "addShort", void 0);
    __decorate([_(sp.Skeleton)], t.prototype, "skinSpine", void 0);
    __decorate([_(cc.Node)], t.prototype, "signBtn", void 0);
    __decorate([_(cc.Node)], t.prototype, "chooseNode", void 0);
    __decorate([_(cc.Node)], t.prototype, "HuTuiPnl", void 0);
    return (n = __decorate([P], t));
})(cc.Component);
exports.default = N;
