var a;
var log=console.error
var $commonData = require("./commonData");
var $platform = require("./platform");
var $config = require("./config");
var $game = require("./Game");
var $battleManager = require("./BattleManager");
var $postUserData = require("./PostUserData");
var $readOnlineLvs = require("./readOnlineLvs");
var $localStorage = require("./localStorage");
var m = cc._decorator;
var g = m.ccclass;
var v = m.property;
var w = !1;
var y = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.progressBar = null;
        t.mask = null;
        t.isloadUserData = !1;
        t.loadSubCount = 0;
        t.preLoadScene = !1;
        t.startLoad = !1;
        t.subPackageName = [
            "loadingUI",
            "texture",
            "levels",
            "audio",
            "font",
            "view",
            "levelBundle",
            "sceneBundle",
            "edgeImg",
            "Eliminatemode",
            "steelImg"
        ];
        t.gameBundle = null;
        t.GameScene = null;
        t.InitialValue = [
            14574, 3, 7249, 7351, 12183, 6689, 37492, 9195, 11499, 3246, 20788, 26672, 6496, 12641, 12316, 5132, 25726,
            9962, 9023, 7840, 2260, 1694, 26055, 11849, 14703, 7522, 20211, 111, 4627, 2971, 59, 8269, 13153, 23654,
            2654
        ];
        t.DailyGrowth = [
            146, 3, 72, 74, 122, 67, 375, 92, 115, 32, 208, 267, 65, 126, 123, 51, 257, 100, 90, 78, 23, 17, 261, 118,
            147, 75, 202, 10, 46, 30, 5, 83, 132, 237, 111
        ];
        t.Floating = [
            40, 10, 30, 30, 40, 30, 50, 30, 40, 20, 50, 50, 30, 40, 40, 20, 50, 40, 30, 30, 20, 20, 50, 40, 40, 30, 50,
            10, 20, 20, 10, 30, 40, 50, 25
        ];
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onLoad = function () {
        wxSDK.checkUserInfo();
        wxSDK.userInit();
        $platform.init();
       
    };
    t.prototype.start = function () {
        if (!cc.sys.isBrowser) {
            // console.log = function () {};
            // console.warn = function () {};
        }
        this.upDateIsCheck();
        this.start0();
    };
    t.prototype.start0 = function () {
        var e = this;
        var t = cc.find("Canvas").getComponent(cc.Canvas);
        var n = cc.view.getVisibleSize().height;
        var o = cc.view.getVisibleSize().width;
        $commonData.default.windowHeight = n;
        $commonData.default.windowWidth = o;
        if (n / o < 1.8) {
            t.fitHeight = !0;
            t.fitWidth = !1;
        } else {
            t.fitHeight = !1;
            t.fitWidth = !0;
        }
        if (window.tt && $config.currentPlatform == $config.platformEnum.toutiao) {
            this.node.getChildByName("titlett").active = !0;
            this.node.getChildByName("titlewx").active = !1;
        } else {
            $config.currentPlatform == $config.platformEnum.wechat
                ? ((this.node.getChildByName("titlett").active = !1), (this.node.getChildByName("titlewx").active = !0))
                : $config.currentPlatform == $config.platformEnum.web &&
                  ((this.node.getChildByName("titlett").active = !0),
                  (this.node.getChildByName("titlewx").active = !1));
        }
     
            e.loadSubCount = 0;
            e.mask.width = 0;
            e.preLoadScene = !1;
            e.startLoad = !0;
            e.loadEliminateData();
            e.loadSubPackages();
            e.loadData();
            $platform.reportPage("loadPage", 0);
       
    };
    t.prototype.isLoadData=false;
    t.prototype.isLoadSubPackages=false;
    t.prototype.checkLoad=function(){
        console.error("checkLoad",this.isLoadData,this.isLoadSubPackages)
        if(this.isLoadData&&this.isLoadSubPackages){
            console.error("==============下载完成启动游戏============",this.loadNum)
            this.mask.width=this.mask.children[0].width
           cc.director.loadScene("Game")
           
            //this.loadGameScene("Game")
        }
    };
    t.prototype.loadSubPackages = function () {
        var e = this;
        console.log("--------------->>loadSubPackage begin");
        var t = function (t) {
            $game.default.loadModeBundle(n.subPackageName[t], n.subPackageName[t], function () {
                console.log("分包加载成功", e.subPackageName[t]);
                e.loadSubCount++;
                e.loadNum++;
                if (e.loadSubCount == e.subPackageName.length) {
                    console.error("--------------->>  分包加载完成    loadSubPackage end");
                  //  e.loadData();
                  e.isLoadSubPackages=true;
                  e.checkLoad()
                }
            });
        };
        var n = this;
        for (var o = 0; o < this.subPackageName.length; o++) {
            t(o);
        }
    };
    t.prototype.loadData = function () {
        var e = this;
        var t = [];
        // console.log("--------------->>loadData begin");
        // if (window.tt && $config.currentPlatform == $config.platformEnum.toutiao && !cc.sys.isBrowser) {
        //     var n = tt.getLaunchOptionsSync();
        //     if ("021036" == n.scene) {
        //         $commonData.default.formSidebarCard = !0;
        //     }
        //     if (n.scene) {
        //         tt.reportAnalytics("scene", {
        //             scene: n.scene
        //         });
        //         $commonData.default.sceneId = n.scene;
        //     }
        // }
        $commonData.default.firstIntoElimateGame = !1;
        t.push(this.loadBundleScene().then(function () {console.log("loadBundleScene完成"),e.loadNum++;}));
        t.push(this.loadLevel().then(function () {console.log("loadLevel完成"),e.loadNum++;}));
        t.push(this.loadSkinPieceImg().then(function () {console.log("loadSkinPieceImg完成"),e.loadNum++;}));
        Promise.all(t).then(function () {
            console.error("==== loadData Completed ====>> next loadGameScene");
            e.isLoadData=true;
            e.checkLoad()
            // e.loadGameScene("Game").then(function () {
            //     if (!($config.currentPlatform != $config.platformEnum.wechat || cc.sys.isBrowser)) {
            //       //  wx.uploadUserEvent($commonData.default.openId, 0);
            //     }
            // });
        });
        this.scheduleOnce(function () {
            e.loadSetting();
            e.loadOtherSkinData();
            e.checkData();
        }, 0.1);
        console.warn("openid=1111======================================>", $commonData.default.openId);
        if (cc.sys.isBrowser || $config.currentPlatform == $config.platformEnum.web) {
            this.loadLocalData();
        }
    };
    t.prototype.loadEliminateData = function () {
        $readOnlineLvs.default.readStrategyData().then(function (e) {
            if (e && null != e) {
                $commonData.default.strategyData = e;
                console.log("已经读到网络策略数据====》", $commonData.default.strategyData);
            } else {
                $game.default.resManager
                    .loadBundleRes("Eliminatemode", "eliminateStrategy", cc.JsonAsset)
                    .then(function (e) {
                        $commonData.default.strategyData = e.json.data;
                    });
            }
        });
        $readOnlineLvs.default.readLevelData().then(function (e) {
            if (e && null != e) {
                $commonData.default.eliminateLevelData = e;
                console.log("已经读到网络关卡数据====》", $commonData.default.eliminateLevelData);
            } else {
                $game.default.resManager
                    .loadBundleRes("Eliminatemode", "eliminateStrategy", cc.JsonAsset)
                    .then(function (e) {
                        $commonData.default.eliminateLevelData = e.json.eliminateLevelData;
                        console.error("主线模式关卡数量大小--->", $commonData.default.eliminateLevelData.length);
                    });
            }
        });
    };
    t.prototype.loadLocalData = function () {
        console.error("---------加载本地数据");
        this.loadGameData();
        this.loadSkinData();
        this.loadScrewSkinData();
        this.isloadUserData = !0;
        $postUserData.postAllUserData();
    };

    
    t.prototype.loadNum=0;
    t.prototype.loadTotalNum=14;  
    t.prototype.update = function () {
        if(this.mask.width<this.mask.children[0].width*(this.loadNum/this.loadTotalNum)){
            this.mask.width+=8;
        }
        // if (this.startLoad) {
        //     this.mask.width < 0.36 * 480
        //         ? (this.mask.width += 0.96)
        //         : this.mask.width < 0.78 * 480 && 0 == this.preLoadScene
        //         ? (this.mask.width += 0.048)
        //         : this.mask.width < 480 &&
        //           this.loadSubCount == this.subPackageName.length &&
        //           1 == this.preLoadScene &&
        //           1 == this.isloadUserData
        //         ? (this.mask.width += 3.84)
        //         : 0 == w && this.mask.width >= 480 && ((w = !0), cc.director.runScene(this.GameScene));
        // }
    };
    t.prototype.loadBundleScene = function () {
        return this.loadGameBundle("sceneBundle");
    };
    t.prototype.loadLevel = function () {
        var e = [];
        e.push(
            new Promise(function (e) {
                $game.default.resManager
                    .loadBundleRes("GraphicalLevel", "graphicalLevel", cc.JsonAsset)
                    .catch(function () {
                        e(null);
                    })
                    .then(function (t) {
                        $commonData.default.graphicalMaxLv = Object.keys(t.json.level).length;
                        $commonData.default.graphicalLevelConfig = t.json.level;
                        console.error("图形关卡信息加载成功", $commonData.default.graphicalMaxLv);
                        var n = t.json.level;
                        var o = 1;
                        $commonData.default.graphicalLevelConfig = {};
                        $commonData.default.graphicalRandomLevelList.forEach(function (e) {
                            var t = n[e.toString()];
                            if (t) {
                                $commonData.default.graphicalLevelConfig[o.toString()] = t;
                                o += 1;
                            }
                        });
                        $commonData.default.graphicalMaxLv = o - 1;
                        e(null);
                    });
            })
        );
        e.push(
            new Promise(function (e) {
                cc.assetManager.loadBundle("levelBundle", function (t, n) {
                    if (t) {
                        console.log("关卡信息读取失败，请重试");
                        e(null);
                    } else {
                        console.log("levelBundle success");
                    }
                    n.load("level", cc.JsonAsset, function (t, n) {
                        if (t) {
                            console.log("[加载失败] level", t);
                            e(null);
                        } else {
                            $commonData.default.maxLv = Object.keys(n.json.level).length;
                            $commonData.default.levelConfig = n.json.level;
                            console.log("关卡信息加载成功", $commonData.default.maxLv);
                            e(null);
                        }
                    });
                });
            })
        );
        return Promise.all(e);
    };
    t.prototype.loadSetting = function () {
        var e = this;
        return new Promise(function (t) {
            cc.sys.localStorage.setItem("vibe", "true");
            var n = cc.sys.localStorage.getItem("music");
            var o = cc.sys.localStorage.getItem("sound");
            var a = cc.sys.localStorage.getItem("vibe");
            if (e.checkIfExist("music")) {
                $commonData.default.soundOn = "true" == o;
                $commonData.default.musicOn = "true" == n;
                $commonData.default.vibrateOn = "true" == a;
            } else {
                cc.sys.localStorage.setItem("music", "true");
                cc.sys.localStorage.setItem("sound", "true");
                cc.sys.localStorage.setItem("vibe", "true");
                $commonData.default.soundOn = !0;
                $commonData.default.musicOn = !0;
                $commonData.default.vibrateOn = !0;
            }
            if (e.checkIfExist("openid")) {
                $commonData.default.openId = e.checkIfExist("openid");
            }
            if (!(1 != e.checkIfExist("getTTUserInfo") && "true" != e.checkIfExist("getTTUserInfo"))) {
                $commonData.default.getTTUserInfo = !0;
                $commonData.default.UserAvatarUrl = cc.sys.localStorage.getItem("UserAvatar");
                $commonData.default.UserNickName = cc.sys.localStorage.getItem("UserNickName");
            }
            if (!(1 != e.checkIfExist("getWxUserInfo") && "true" != e.checkIfExist("getWxUserInfo"))) {
                $commonData.default.getWxUserInfo = !0;
                $commonData.default.UserAvatarUrl = cc.sys.localStorage.getItem("UserAvatar");
                $commonData.default.UserNickName = cc.sys.localStorage.getItem("UserNickName");
            }
            if (e.checkIfExist("skinProgress")) {
                $commonData.default.boardSkinData.skinProgress = e.checkIfExist("skinProgress");
            }
            if (e.checkIfExist("screwSkinProgress")) {
                $commonData.default.screwSkinData.skinProgress = e.checkIfExist("screwSkinProgress");
            }
            if (e.checkIfExist("version")) {
                console.log("-----------has version", $commonData.default.version);
                cc.sys.localStorage.getItem("version") != $commonData.default.version &&
                    (($commonData.default.isShowAchievement = !0),
                    cc.sys.localStorage.setItem("version", $commonData.default.version),
                    console.log("-----------has different version "));
            } else {
                console.log("-----------dont has version");
                cc.sys.localStorage.setItem("version", $commonData.default.version);
                $commonData.default.isShowAchievement = !0;
            }
            var i = cc.sys.localStorage.getItem("myProvinceIndex");
            if (isNaN(parseInt(i))) {
                $commonData.default.myProvinceIndex = -1;
            } else {
                $commonData.default.myProvinceIndex = parseInt(i);
            }
            console.log("地区信息", $commonData.default.myProvinceIndex);
            e.updateWatchData();
            var c = cc.sys.localStorage.getItem("isSubscribe");
            if (null == c || null == c || "" == c) {
                $commonData.default.isSubscribe = !1;
            } else {
                if (!(1 != c && "true" != c)) {
                    $commonData.default.isSubscribe = !0;
                }
            }
            if (e.checkIfExist("skinVideoCoupon")) {
                $commonData.default.skinVideoCoupon = parseInt(e.checkIfExist("skinVideoCoupon"));
            }
            console.log("============无广告券的数量", $commonData.default.skinVideoCoupon);
            if (e.checkIfExist("provincePoint")) {
                var l = e.checkIfExist("provincePoint").split(",");
                for (var s = 0; s < $commonData.default.provinceArr.length; s++) {
                    $commonData.default.provincePoint[s] = parseInt(l[s]);
                }
            } else {
                e.initRankData();
            }
            if (e.checkIfExist("currentBgSkin")) {
                $commonData.default.currentBgSkin = e.checkIfExist("currentBgSkin");
            }
            if (e.checkIfExist("currentNailSkin")) {
                $commonData.default.currentNailSkin = e.checkIfExist("currentNailSkin");
            }
            console.log("loadSetting  end");
            t(null);
        });
    };
    t.prototype.loadGameData = function () {
        var e = cc.sys.localStorage.getItem("passedNovice");
        if (0 == this.checkIfExist("goldNum")) {
            $commonData.default.goldNum = 200;
            cc.sys.localStorage.setItem("goldNum", $commonData.default.goldNum);
        } else {
            $commonData.default.goldNum = parseInt(this.checkIfExist("goldNum"));
        }
        if (this.checkIfExist("firstgame")) {
            $commonData.default.isFirstGame = !1;
        } else {
            $commonData.default.isFirstGame = !0;
        }
        if (this.checkIfExist("passedNovice")) {
            $commonData.default.isFirstGame = !1;
            cc.sys.localStorage.setItem("firstgame", "played");
            $commonData.default.passedNovice = "true" == e || 1 == e;
        } else {
            $commonData.default.passedNovice = !1;
            cc.sys.localStorage.setItem("passedNovice", !1);
        }
        if (this.checkIfExist("screwLevel")) {
            $commonData.default.currLevel = parseInt(this.checkIfExist("screwLevel"));
        } else {
            $commonData.default.currLevel = 1;
            cc.sys.localStorage.setItem("screwLevel", $commonData.default.currLevel);
        }
        if (this.checkIfExist("gametime")) {
            cc.sys.localStorage.removeItem("gametime");
        }
        if (this.checkIfExist("pointNum")) {
            $commonData.default.pointNum = parseInt(this.checkIfExist("pointNum"));
        }
        if (this.checkIfExist("myRank")) {
            $commonData.default.myRank = parseInt(this.checkIfExist("myRank"));
        }
    };
    t.prototype.checkData = function () {
        var e = this;
        return new Promise(function (t) {
            if ($config.currentPlatform == $config.platformEnum.web) {
                cc.sys.localStorage.setItem("signIndex", "7");
            }
            $localStorage.default.setLocalItem("firstAdNumDay", 0);
            $commonData.default.firstAdNumDay = 0;
            var n = cc.sys.localStorage.getItem("Data_Day");
            if ("" == n || null == n || null == n || e.changeToDate(Date.now()) != parseInt(n)) {
                console.log("不是同一天", n, e.changeToDate(Date.now()));
                "" == n || null == n || null == n ? e.checkContinue(e.changeToDate(Date.now())) : e.checkContinue(n);
                $commonData.default.provincePoint.length > 0 && e.changeRankData();
                $commonData.default.dailyVideoTimes = 0;
                cc.sys.localStorage.setItem("Data_Day", String(e.changeToDate(Date.now())));
                cc.sys.localStorage.setItem("isShare", !1);
                cc.sys.localStorage.setItem("isGetSidebarCardGift", !1);
                cc.sys.localStorage.setItem("shareUseProp", 0);
                cc.sys.localStorage.removeItem("shopSkinIndex");
                cc.sys.localStorage.removeItem("WhippingNum_gra");
                cc.sys.localStorage.removeItem("WhippingNum_eli");
                cc.sys.localStorage.removeItem("isBuyScrewSkin");
                cc.sys.localStorage.removeItem("priceCoefficient_0");
                cc.sys.localStorage.removeItem("priceCoefficient_1");
                cc.sys.localStorage.removeItem("refreshNum");
                $commonData.default.priceCoefficient = [1, 1];
                $commonData.default.refreshNum = 0;
                $commonData.default.shareUseProp = 0;
                $commonData.default.isShare = !1;
                $commonData.default.isBuyScrewSkin = !1;
                cc.sys.localStorage.removeItem("isWatchGraphicalAd");
                cc.sys.localStorage.removeItem("isWatchUnscrewAd");
                cc.sys.localStorage.removeItem("isWatchIronAd");
                cc.sys.localStorage.removeItem("isWatchUnlinkAd");
                cc.sys.localStorage.removeItem("isWatchCategorySortAd");
                cc.sys.localStorage.removeItem("isWatchKanjiaAd");
                cc.sys.localStorage.removeItem("isWatchPPAd");
                cc.sys.localStorage.removeItem("isWatchDTGHAd");
                cc.sys.localStorage.removeItem("isWatchTetrisAd");
                cc.sys.localStorage.removeItem("isWatchLandmineAd");
                cc.sys.localStorage.removeItem("isWatchArrowChainAd");
                e.updateWatchData();
            } else {
                {
                    var o = cc.sys.localStorage.getItem("isShare");
                    $commonData.default.isShare = "true" == o || 1 == o;
                    var a = cc.sys.localStorage.getItem("isGetSidebarCardGift");
                    $commonData.default.isGetSidebarCardGift = "true" == a || 1 == a;
                    var i = cc.sys.localStorage.getItem("shareUseProp");
                    if ("" == i || null == i || null == i) {
                        $commonData.default.shareUseProp = 0;
                    } else {
                        $commonData.default.shareUseProp = parseInt(i);
                    }
                    var c = cc.sys.localStorage.getItem("dailyVideoTimes");
                    if ("" == c || null == c || null == c) {
                        $commonData.default.dailyVideoTimes = 0;
                    } else {
                        c = parseInt(c);
                    }
                    if (e.checkIfExist("refreshNum")) {
                        $commonData.default.refreshNum = parseInt(e.checkIfExist("refreshNum"));
                    }
                    if (e.checkIfExist("priceCoefficient_0")) {
                        $commonData.default.priceCoefficient[0] = parseInt(e.checkIfExist("priceCoefficient_0"));
                    }
                    if (e.checkIfExist("priceCoefficient_1")) {
                        $commonData.default.priceCoefficient[1] = parseInt(e.checkIfExist("priceCoefficient_1"));
                    }
                    var l = cc.sys.localStorage.getItem("isBuyScrewSkin");
                    $commonData.default.isBuyScrewSkin = "true" == l || 1 == l;
                    if (e.checkIfExist("WhippingNum_gra")) {
                        $commonData.default.WhippingNum_gra = parseInt(e.checkIfExist("WhippingNum_gra"));
                    }
                    if (e.checkIfExist("WhippingNum_eli")) {
                        $commonData.default.WhippingNum_eli = parseInt(e.checkIfExist("WhippingNum_eli"));
                    }
                    console.log("是同一天", n);
                }
            }
            console.log("今日分享获得道具次数", $commonData.default.shareUseProp);
            console.log("checkData  end");
            t(null);
        });
    };
    t.prototype.checkContinue = function (e) {
        if ($config.currentPlatform == $config.platformEnum.toutiao) {
            var t = cc.sys.localStorage.getItem("ContinuousLoginDays");
            if (!isNaN(parseInt(t)) && null != t && null != t) {
                cc.sys.localStorage.setItem("loginDay", e);
                cc.sys.localStorage.setItem("ContinuousLoginDay", -1);
                return void cc.sys.localStorage.removeItem("ContinuousLoginDays");
            }
            var n = cc.sys.localStorage.getItem("loginDay");
            if (null == n || null == n || isNaN(parseInt(n))) {
                $commonData.default.loginDay = e;
                $commonData.default.ContinuousLoginDays = 0;
                cc.sys.localStorage.setItem("loginDay", e);
                cc.sys.localStorage.setItem("ContinuousLoginDay", 0);
            } else {
                {
                    $commonData.default.loginDay = parseInt(n);
                    if (this.changeToDate(Date.now()) - parseInt(e) == 1) {
                        var o = parseInt(cc.sys.localStorage.getItem("ContinuousLoginDay"));
                        if (-1 != o) {
                            $commonData.default.ContinuousLoginDays = o + 1;
                        } else {
                            $commonData.default.ContinuousLoginDays = -1;
                        }
                    } else {
                        $commonData.default.ContinuousLoginDays = -1;
                    }
                    cc.sys.localStorage.setItem("ContinuousLoginDay", $commonData.default.ContinuousLoginDays);
                }
            }
            if ($commonData.default.ContinuousLoginDays <= 30 && -1 != $commonData.default.ContinuousLoginDays) {
                $platform.reportRemain();
            }
        }
    };
    t.prototype.changeToDate = function (e) {
        return Math.floor(e / 864e5);
    };
    t.prototype.loadSkinData = function () {
        if ($config.currentPlatform == $config.platformEnum.web) {
            var e = "";
            $commonData.default.boardSkinData.skinData.forEach(function (t, n) {
                if (0 != n) {
                    e += ",1";
                } else {
                    e += "1";
                }
            });
            var t = "";
            $commonData.default.boardSkinData.piece.forEach(function (e, n) {
                if (0 != n) {
                    t += ",1";
                } else {
                    t += "1";
                }
            });
            cc.sys.localStorage.setItem("skinData", e);
            cc.sys.localStorage.setItem("piece", t);
        }
        var n = cc.sys.localStorage.getItem("skinData");
        if (null == n || null == n || "" == n) {
            this.setArrData("skinData");
            console.log("设置皮肤数据");
        } else {
            {
                console.log("-------skindata------", n);
                var o = n.split(",");
                for (var a = 0; a < $commonData.default.boardSkinData.skinData.length; a++) {
                    if (a < o.length) {
                        $commonData.default.boardSkinData.skinData[a] = parseInt(o[a]);
                    } else {
                        $commonData.default.boardSkinData.skinData[a] = 0;
                    }
                }
            }
        }
        var i = cc.sys.localStorage.getItem("piece");
        if (null == i || null == i || "" == i) {
            this.setArrData("piece");
        } else {
            console.log("-------piecedata------", i);
            o = i.split(",");
            for (a = 0; a < $commonData.default.boardSkinData.piece.length; a++) {
                if (a < o.length) {
                    $commonData.default.boardSkinData.piece[a] = parseInt(o[a]);
                } else {
                    $commonData.default.boardSkinData.piece[a] = 0;
                }
            }
        }
        console.log("板子皮肤2---->", $commonData.default.boardSkinData.piece);
        console.log("板子皮肤1---->", $commonData.default.boardSkinData.skinData);
        var c = cc.sys.localStorage.getItem("currentSkin");
        if (null == c || null == c || "" == c) {
            cc.sys.localStorage.setItem("currentSkin", 0);
            $commonData.default.boardSkinData.currentSkin = 0;
        } else {
            $commonData.default.boardSkinData.currentSkin = parseInt(c);
        }
    };
    t.prototype.loadScrewSkinData = function () {
        if ($config.currentPlatform == $config.platformEnum.web) {
            var e = "";
            $commonData.default.screwSkinData.skinData.forEach(function (t, n) {
                if (0 != n) {
                    e += ",1";
                } else {
                    e += "1";
                }
            });
            cc.sys.localStorage.setItem("screwSkinData", e);
        }
        var t = cc.sys.localStorage.getItem("screwSkinData");
        if (null == t || null == t || "" == t) {
            this.setArrData("screwSkinData");
            console.log("设置皮肤数据");
        } else {
            {
                console.log("-------screwSkindata------", t);
                var n = t.split(",");
                for (var o = 0; o < $commonData.default.screwSkinData.skinData.length; o++) {
                    if (o < n.length) {
                        $commonData.default.screwSkinData.skinData[o] = parseInt(n[o]);
                    } else {
                        $commonData.default.screwSkinData.skinData[o] = 0;
                    }
                }
            }
        }
        console.log("角色皮肤---->", $commonData.default.screwSkinData.skinData);
        var a = cc.sys.localStorage.getItem("currentScrewSkin");
        if (null == a || null == a || "" == a) {
            cc.sys.localStorage.setItem("currentScrewSkin", 0);
            $commonData.default.screwSkinData.currentSkin = 0;
        } else {
            $commonData.default.screwSkinData.currentSkin = parseInt(a);
        }
    };
    t.prototype.loadOtherSkinData = function () {
        var e = this;
        return new Promise(function (t) {
            if ($config.currentPlatform == $config.platformEnum.web) {
                var n = "";
                $commonData.default.bgSkinData.forEach(function (e, t) {
                    if (0 != t) {
                        n += ",1";
                    } else {
                        n += "1";
                    }
                });
                var o = "";
                $commonData.default.nailSkinData.forEach(function (e, t) {
                    if (0 != t) {
                        o += ",1";
                    } else {
                        o += "1";
                    }
                });
                cc.sys.localStorage.setItem("bgSkinData", n);
                cc.sys.localStorage.setItem("nailSkinData", o);
                cc.sys.localStorage.setItem("watchNailSkinTimes", 1e3);
            }
            var a = cc.sys.localStorage.getItem("bgSkinData");
            if (e.checkIfExist("bgSkinData")) {
                var i = a.split(",");
                console.error(i);
                for (var c = 0; c < i.length; c++) {
                    $commonData.default.bgSkinData[c].isGot = "1" == i[c];
                    console.log($commonData.default.bgSkinData[c].ID);
                }
            }
            if (e.checkIfExist("watchNailSkinTimes")) {
                $commonData.default.watchNailSkinTimes = e.checkIfExist("watchNailSkinTimes");
            }
            var l = cc.sys.localStorage.getItem("nailSkinData");
            if (e.checkIfExist("nailSkinData")) {
                i = l.split(",");
                console.error(i);
                for (c = 0; c < i.length; c++) {
                    $commonData.default.nailSkinData[c].isGot = "1" == i[c];
                    "ad" == $commonData.default.nailSkinData[c].unlockType &&
                        $commonData.default.nailSkinData[c].unlockValue <= $commonData.default.watchNailSkinTimes &&
                        ($commonData.default.nailSkinData[c].isGot = !0);
                }
            }
            console.log("=========广告次数watchNailSkinTimes", $commonData.default.watchNailSkinTimes);
            console.log("=========钉子皮肤nailSkinDateArr", $commonData.default.nailSkinData);
            console.log("=========背景皮肤bgSkinDateArr", $commonData.default.bgSkinData);
            t(null);
        });
    };
    t.prototype.loadAchievementData = function () {};
    t.prototype.loadRecordData = function () {};
    t.prototype.setArrData = function (e) {
        var t;
        switch (e) {
            case "skinData":
                t = $commonData.default.boardSkinData.skinData;
                break;
            case "screwSkinData":
                t = $commonData.default.screwSkinData;
                break;
            case "claimAchievementRewards":
                t = $commonData.default.AchievementData.claimAchievementRewards;
                break;
            case "piece":
                t = $commonData.default.boardSkinData.piece;
                break;
            case "provincePoint":
                t = $commonData.default.provincePoint;
        }
        var n = "";
        for (var o = 0; o < t.length; o++) {
            n += t[o];
            o != t.length - 1 && (n += ",");
        }
        cc.sys.localStorage.setItem(e, n);
    };
    t.prototype.checkIfExist = function (e) {
        var t = cc.sys.localStorage.getItem(e);
        return null != t && null != t && "" != t && t;
    };
    t.prototype.loadSkinPieceImg = function () {
        var e = [];
        var t = function (t) {
            e.push(
                new Promise(function (e) {
                    $game.default.resManager
                        .loadBundleRes("levels", "skin/puzzle/" + String(t + 7) + "_off", cc.SpriteFrame)
                        .catch(function () {
                            console.error("加载", "skin/puzzle/" + String(t + 7) + "_off", "失败!");
                            e(null);
                        })
                        .then(function (n) {
                            $commonData.default.skinPieceImgArr[t] = n;
                            e(null);
                        });
                })
            );
            e.push(
                new Promise(function (e) {
                    $game.default.resManager
                        .loadBundleRes("levels", "skin/puzzle/" + String(t + 7) + "_on", cc.SpriteFrame)
                        .catch(function () {
                            console.error("加载", "skin/puzzle/" + String(t + 7) + "_on", "失败!");
                            e(null);
                        })
                        .then(function (n) {
                            $commonData.default.skinPieceImgArr[t + 6] = n;
                            e(null);
                        });
                })
            );
        };
        for (var n = 0; n < 6; n++) {
            t(n);
        }
        return Promise.all(e).then(function () {
            console.warn("loadData --------------->> 皮肤素材加载完成");
        });
    };
    t.prototype.loadGameBundle = function (e) {
        var t = this;
        return new Promise(function (n, o) {
            if (t.gameBundle && t.gameBundle.name == e) {
                n(1);
            } else {
                cc.assetManager.loadBundle(e, function (a, i) {
                    if (a) {
                        console.log("加载", e, "失败", a);
                        return void o();
                    }
                    if (t.gameBundle) {
                        t.gameBundle.releaseAll();
                    }
                    t.gameBundle = i;
                    n(1);
                });
            }
        });
    };
    t.prototype.loadGameScene = function (e) {
        var t = this;
        return new Promise(function (n) {
            console.log("------加载场景1111---->", e);
            t.gameBundle.loadScene(e, function (o, a) {
                if (o) {
                    console.log("----加载", e, "失败", o);
                } else {
                    console.log("--------加载场景2222");
                    t.preLoadScene = !0;
                    t.GameScene = a;
                    n(a);
                }
            });
        });
    };
    t.prototype.initRankData = function () {
        for (var e = 0; e < this.InitialValue.length; e++) {
            $commonData.default.provincePoint.push(this.InitialValue[e]);
        }
        $battleManager.default.instance.setArrData("provincePoint");
    };
    t.prototype.changeRankData = function () {
        for (var e = 0; e < $commonData.default.provincePoint.length; e++) {
            $commonData.default.provincePoint[e] += this.DailyGrowth[e] + Math.floor(Math.random() * this.Floating[e]);
        }
        $battleManager.default.instance.setArrData("provincePoint");
    };
    t.prototype.checkModeAd = function (e) {
        var t = cc.sys.localStorage.getItem(e);
        if (null == t || null == t || "" == t) {
            return cc.sys.localStorage.setItem(e, !1), !1;
        } else {
            return 1 == t || "true" == t;
        }
    };
    t.prototype.updateWatchData = function () {
        $commonData.default.isWatchGraphicalAd = this.checkModeAd("isWatchGraphicalAd");
    };
    t.prototype.upDateIsCheck = function () {
        // if (!(cc.sys.isBrowser && $config.currentPlatform !== $config.platformEnum.web)) {
        //     if ($config.currentPlatform != $config.platformEnum.web) {
        //         console.log("=======>>>> 1226");
        //         $platform.request(
        //             "https://web.flysheeep.com/tongquApi/newFunctionManage?platform=wx&appId=wxa4b5da3ef462c1b2&version=1.0.22",
        //             null,
        //             function (e) {
        //                 console.warn("res", e);
        //                 $commonData.default.isCheck = JSON.parse(e.data).data.display;
        //                 console.warn("isCheck", $commonData.default.isCheck);
        //             },
        //             function () {
        //                 $commonData.default.isCheck = !1;
        //             },
        //             "GET"
        //         );
        //     }
        // }
    };
    t.instance = null;
    __decorate([v(cc.ProgressBar)], t.prototype, "progressBar", void 0);
    __decorate([v(cc.Node)], t.prototype, "mask", void 0);
    return (n = __decorate([g], t));
})(cc.Component);
exports.default = y;

