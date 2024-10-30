exports.request =
    exports.reportGameOver =
    exports.reportPass =
    exports.getWXOpenid =
    exports.reportPage =
    exports.reportButton =
    exports.removeDownloadFile =
    exports.downImageFile =
    exports.loadSubpackage =
    exports.login =
    exports.onShow =
    exports.onHide =
    exports.toMiniGame =
    exports.getSystemInfo =
    exports.getSystemInfoSync =
    exports.vibrateShort =
    exports.vibrateLong =
    exports.showModal =
    exports.showShare2 =
    exports.showShare =
    exports.setInvite =
    exports.showTips =
    exports.openShare =
    exports.showRewardAD =
    exports.showInterstitialAd =
    exports.showGridAD =
    exports.showCustomAd =
    exports.showBannerAD =
    exports.createRewardedVideoAd =
    exports.createInterstitialAd =
    exports.createCustomAd =
    exports.createGridAd =
    exports.createBannerAd =
    exports.initAds =
    exports.newShareRecall =
    exports.HUTUi =
    exports.shareSuccess =
    exports.checkOpenid =
    exports.init =
        void 0;
var o;
var a;
var i;
var c;
var r;
var l;
var $battleManager = require("./BattleManager");
var $shareTitle = require("./ShareTitle");
var $commonData = require("./commonData");
var $config = require("./config");
var $analysis = require("./Analysis");
var $postUserData = require("./PostUserData");
var $publicManager = require("./PublicManager");
var $analyticsSDK = require("./AnalyticsSDK");
var v = cc._decorator;
var w = (v.ccclass, v.property, "");
var y = "adunit-d31b25ccc4bcd9d3";
var S = null;
var k = null;
var b = null;
var P = null;
var _ = !1;
var N = !1;
var M = 0;
var A = 0;
var I = function () {};
var D = "";
var C = null;
var B = "wxa4b5da3ef462c1b2";

function L() {
    // var e = "https://data.darknight.games/api/dy/getLGG/" + $commonData.default.openId;
    // console.error("检查的用的url----->", e);
    // wx.request({
    //     url: e,
    //     success: function (e) {
    //         console.error("获取到的白名单结果---->", e);
    //         if (e.data.code && 200 == e.data.code && e.data.data && 1 == e.data.data) {
    //             console.error("开启自动标识符-----》");
    //             $commonData.default.canOpenAI = !0;
    //         } else {
    //             console.error("关闭自动标识符-----》");
    //             $commonData.default.canOpenAI = !1;
    //         }
    //     },
    //     fail: function (e) {
    //         console.error("获取到的白名单失败---->", $commonData.default.openId, e);
    //         $commonData.default.canOpenAI = !1;
    //     }
    // });
}

function O() {
    M = 0;
    if (c) {
        c(l);
    }
    console.log("------------分享成功获得道具------------");
}

function E(e) {
    if (0 == e) {
        Math.random() < 0.5
            ? wx.showToast({
                  title: "请分享到群获取",
                  icon: "none",
                  duration: 2500
              })
            : wx.showToast({
                  title: "分享失败，请分享到群里",
                  icon: "none",
                  duration: 2500
              });
    } else {
        Math.random() < 0.33
            ? wx.showToast({
                  title: "请分享到不同群获取",
                  icon: "none",
                  duration: 2500
              })
            : Math.random() < 0.66
            ? wx.showToast({
                  title: "该群已分享过，请换个群",
                  icon: "none",
                  duration: 2500
              })
            : wx.showToast({
                  title: "分享失败，请换个群重试",
                  icon: "none",
                  duration: 2500
              });
    }
}
exports.init = function () {
    var e = wx.getLaunchOptionsSync();
    C = e.query;
    console.log("============ wx on Launch", C);
    wx.onShow(function () {
        if (N) {
            N = !1;
            if (++A >= 3 && c) {
                A = 0;
                c(l);
            }
            Date.now() - a >= 2500 ? c && ((A = 0), c(l)) : F("分享失败，请分享到不同的群获得！");
            c = null;
        }
        if (_) {
            _ = !1;
            if (i) {
                i(r);
            }
            i = null;
        }
    });
    if ("" == $commonData.default.openId) {
        q().then(function () {
            L();
            $analyticsSDK.init();
            $analyticsSDK.initialize();
        });
    } else {
        L();
        $analyticsSDK.init();
        $analyticsSDK.initialize();
    }
    j();
    //$analysis.init();
    //this.HUTUi();
};
exports.checkOpenid = L;
exports.shareSuccess = O;
exports.HUTUi = function () {
    return new Promise(function (e, t) {
        wx.request({
            url: "https://darknight.games/api/wx/findGameLoc",
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            data: {
                appid: B
            },
            method: "POST",
            success: function (t) {
                $commonData.default.HuTuiData = t.data.data;
                e("成功获取数据");
            },
            fail: function () {
                t("未拉取数据");
            }
        });
    });
};
exports.newShareRecall = function () {
    if (N) {
        console.error("share1");
        N = !1;
        if (Date.now() - a >= 2e3) {
            console.error("share2", $commonData.default.shareUseProp);
            switch ($commonData.default.shareUseProp) {
                case 0:
                    if (1 == M) {
                        Math.random() < 0.7 ? E(0) : O();
                    } else {
                        2 == M && Math.random() < 0.35 ? E(0) : O();
                    }
                    break;
                case 1:
                    if (1 == M) {
                        Math.random() < 0.8 ? E(2) : O();
                    } else {
                        2 == M && Math.random() < 0.4 ? E(2) : O();
                    }
                    break;
                default:
                    if (1 == M) {
                        Math.random() < 0.9 ? E(2) : O();
                    } else {
                        2 == M && Math.random() < 0.45 ? E(2) : O();
                    }
            }
        } else {
            {
                console.error("share3");
                var e = Math.floor(Math.random() * R.length);
                F(R[e]);
            }
        }
        c = null;
    }
};
var R = ["分享失败，请分享到不同的群获得！"];

function x() {
    if (wx.createBannerAd && "" != w) {
        S = wx.createBannerAd({
            adUnitId: w,
            style: {
                width: 200,
                left: wx.getSystemInfoSync().windowWidth / 2 - 100,
                top: wx.getSystemInfoSync().windowHeight - 112.5
            }
        });
        wx.getSystemInfo({
            success: function () {
                S.onResize(function (e) {
                    console.log(e.width, e.height);
                    S.style.top = wx.getSystemInfoSync().windowHeight - e.height;
                    S.style.left = (wx.getSystemInfoSync().windowWidth - e.width) / 2;
                });
                S.onError(function (e) {
                    console.log(e);
                    console.log("createBannerAd fail");
                });
                S.onLoad(function () {
                    if (U) {
                        S.show();
                    } else {
                        S.hide();
                    }
                    console.log("----create banner success");
                });
            }
        });
    }
}

function T() {
    wx.createGridAd;
}

function G() {
    wx.createInterstitialAd;
}

function V() {
    if (wx.createRewardedVideoAd) {
        (b = wx.createRewardedVideoAd({
            adUnitId: y
        })).onLoad(function () {
            console.log("加载成功");
        });
        b.onError(function (e) {
            console.log("Rewarded 加载失败" + e);
        });
        b.onClose(function (e) {
            b.onClose = null;
            cc.game.resume();
            if ((e && e.isEnded) || void 0 === e) {
                console.log("播放完成关闭");
                //wx.uploadUserEvent($commonData.default.openId, 1);
                I && (I(), $commonData.default.watchNailSkinTimes++, $publicManager.default.onGetVideoReward());
            } else {
                console.log("中途关闭播放");
                wx.showToast({
                    title: "完整观看视频才能获得奖励哦",
                    icon: "none",
                    duration: 2500
                });
            }
            $battleManager.default.instance.playBGM();
        });
    }
}
exports.initAds = function () {
    V();
    console.log("加载广告");
};
exports.createBannerAd = x;
exports.createGridAd = T;
exports.createCustomAd = function () {
    wx.createCustomAd;
};
exports.createInterstitialAd = G;
exports.createRewardedVideoAd = V;
var U = !1;

function j() {
    if (wx.showShareMenu) {
        wx.showShareMenu({
            withShareTicket: !0,
            menus: ["shareAppMessage", "shareTimeline"]
        });
        wx.onShareAppMessage(function () {
            return {
                title: $shareTitle.default.getRandomTitle(),
                imageUrl: $shareTitle.default.getRandomImageUrl(),
                imageUrlId: "12MoTxt+QBipr5RF0qcfGg==",
                query: $shareTitle.default.getShareIdInfo()
            };
        });
        if (wx.onShareTimeline) {
            wx.onShareTimeline(function () {
                return {
                    title: $shareTitle.default.getRandomTitle(),
                    imageUrl: $shareTitle.default.getRandomImageUrl(),
                    imageUrlId: "12MoTxt+QBipr5RF0qcfGg==",
                    query: $shareTitle.default.getShareIdInfo()
                };
            });
        }
    }
}

function F(e) {
    wx.showToast({
        title: e,
        icon: "none",
        duration: 2500
    });
}

function q() {
    return new Promise(function (e) {
        e(null);
        return
        wx.login({
            success: function (t) {
                var n = t.code;
                wx.request({
                    url: "https://api.flysheeep.com/api/expro/getopenid",
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    data: {
                        appid: B,
                        code: n
                    },
                    method: "POST",
                    success: function (t) {
                        var n = t.data.data;
                        console.warn("----------------------> get open-id res", t);
                        console.error("----------------------> get open-id json", n);
                        if (n.openid) {
                            D = n.openid;
                            $commonData.default.openId = D;
                            $postUserData.getUserInformation(1);
                            console.warn(
                                "----------------------> openid_get",
                                cc.sys.localStorage.getItem("openid_get")
                            );
                        } else {
                            if (n.anonymous_openid) {
                                D = n.anonymous_openid;
                                $commonData.default.openId = D;
                            }
                        }
                        console.warn("----------------------> get open-id success", D);
                        cc.sys.localStorage.setItem("openid", D);
                        e(D);
                    },
                    fail: function (t) {
                        console.log("------------get openid---------fail-------", t);
                        $postUserData.getUserInformation(2);
                        e(null);
                    }
                });
            },
            fail: function (t) {
                console.log("------------login---------fail-------", t);
                $postUserData.getUserInformation(2);
                e(null);
            }
        });
    });
}
exports.showBannerAD = function (e) {
    U = e;
    if (null != S) {
        try {
            if (e) {
                S.show();
            } else {
                S.hide();
            }
        } catch (e) {}
    } else {
        x();
    }
};
exports.showCustomAd = function (e) {
    if (null != P) {
        try {
            if (e) {
                P.show();
            } else {
                P.hide();
            }
        } catch (e) {}
    } else {
        T();
    }
};
exports.showGridAD = function (e) {
    if (null != P) {
        e ? (o ? S.show() : P.show()) : o ? S.hide() : P.hide();
    } else {
        T();
    }
};
exports.showInterstitialAd = function () {
    if (null != k) {
        k.show().catch(function (e) {
            console.warn("interAD error", e);
        });
    } else {
        G();
    }
};
exports.showRewardAD = function (e) {
    var t = this;
    
    return new Promise(function (n, o) {
        if (null == b) {
            wx.showToast({
                title: "暂无广告，分享一下游戏吧！",
                icon: "none",
                duration: 2500
            });
            V();
            t.showShare(function () {
                console.log("分享成功！！！！");
                if ((I = e)) {
                    I();
                    $commonData.default.watchNailSkinTimes++;
                    $publicManager.default.onGetVideoReward();
                }
                n(null);
            });
            return void o("暂无广告，分享一下游戏吧！");
        }
        cc.game.pause();
        b.show()
            .then(function () {
                $battleManager.default.instance.playBGM();
                I = e;
                n(null);
            })
            .catch(function () {
                b.onClose = null;
                console.log("show catch");
                b.load();
                wx.showToast({
                    title: "暂无广告，分享一下游戏吧！",
                    icon: "none",
                    duration: 2500
                });
                t.showShare(function () {
                    console.log("分享成功！！！");
                    if ((I = e)) {
                        I();
                        $commonData.default.watchNailSkinTimes++;
                        $publicManager.default.onGetVideoReward();
                    }
                    n(null);
                });
                cc.game.resume();
            });
    });
};
exports.openShare = j;
exports.showTips = F;
exports.setInvite = function () {};
exports.showShare = function (e, t, n) {
    if (void 0 === n) {
        n = 0;
    }
    var o = $shareTitle.default.getRandomTitle2(n);
    wx.shareAppMessage({
        title: o,
        imageUrl: $shareTitle.default.getRandomImageUrl(),
        imageUrlId: "12MoTxt+QBipr5RF0qcfGg=="
    });
    i = e;
    r = t;
    _ = !0;
    Date.now();
};
exports.showShare2 = function (e, t) {
    console.error("-----------------showShare2");
    var n = $shareTitle.default.getRandomTitle2(5);
    wx.shareAppMessage({
        title: n,
        imageUrl: $shareTitle.default.getRandomImageUrl(),
        imageUrlId: "12MoTxt+QBipr5RF0qcfGg=="
    });
    c = e;
    l = t;
    N = !0;
    M++;
    a = Date.now();
};
exports.showModal = function (e, t, n, o) {
    wx.showModal({
        title: e,
        content: t,
        success: function (e) {
            if (e.confirm) {
                if (n) {
                    n();
                }
            } else {
                if (e.cancel && o) {
                    o();
                }
            }
        }
    });
};
exports.vibrateLong = function () {
    wx.vibrateLong({
        success: function (e) {
            console.log("" + e);
        },
        fail: function () {
            console.log("vibrateLong调用失败");
        }
    });
};
exports.vibrateShort = function () {
    wx.vibrateShort({
        success: function (e) {
            console.log("" + e);
        },
        fail: function () {
            console.log("vibrateLong调用失败");
        }
    });
};
exports.getSystemInfoSync = function () {
    try {
        return wx.getSystemInfoSync();
    } catch (e) {
        console.log("getSystemInfoSync fail");
    }
};
exports.getSystemInfo = function (e) {
    wx.getSystemInfo({
        success: function () {
            e.success();
        },
        fail: function () {
            if (e.fail) {
                e.fail();
            }
        },
        complete: function () {
            if (e.complete) {
                e.complete();
            }
        }
    });
};
exports.toMiniGame = function (e) {
    wx.navigateToMiniProgram({
        appId: e,
        path: "",
        extraData: {
            time: new Date().valueOf()
        },
        success: function () {}
    });
};
exports.onHide = function (e) {
    wx.onHide(function () {
        e();
    });
};
exports.onShow = function (e) {
    wx.onShow(function () {
        e();
    });
};
exports.login = function () {
    return new Promise(function (e, t) {
        wx.login({
            timeout: 3e3,
            success: function (n) {
                if (n.code) {
                    e(n.code);
                } else {
                    t("未获取到code");
                }
            },
            fail: function (e) {
                t(e);
            }
        });
    });
};
exports.loadSubpackage = function (e) {
    return new Promise(function (t, n) {
        wx.loadSubpackage({
            name: e,
            success: function () {
                console.log("微信加载分包====> 成功", "分包名:" + e);
                t(0);
            },
            fail: function (t) {
                console.log("微信加载分包====> 失败", "分包名:" + e, "err = " + t);
                n();
            }
        });
    });
};
exports.downImageFile = function (e) {
    var t = "" + wx.env.USER_DATA_PATH;
    for (var n = e.split("resource/")[1]; -1 != n.indexOf("/"); ) {
        var o = n.indexOf("/");
        var a = n.substring(0, o);
        var i = n.substring(o + 1, n.length);
        n = a + "-" + i;
    }
    var c = t + "/" + n;
    var r = wx.getFileSystemManager();
    return new Promise(function (t, n) {
        r.stat({
            path: c,
            success: function (e) {
                e.stats.isDirectory();
                if (e.stats.isFile()) {
                    t(c);
                }
            },
            fail: function () {
                wx.downloadFile({
                    url: e,
                    success: function (e) {
                        wx.saveFile({
                            tempFilePath: e.tempFilePath,
                            filePath: c,
                            success: function () {
                                console.log("保存到本地!!!");
                                t(c);
                            },
                            fail: function () {
                                n("文件保存失败!");
                            }
                        });
                    },
                    fail: function () {
                        n("文件下载失败!");
                    }
                });
            }
        });
    });
};
exports.removeDownloadFile = function (e) {
    var t = "" + wx.env.USER_DATA_PATH;
    for (var n = e.split("resource/")[1]; -1 != n.indexOf("/"); ) {
        var o = n.indexOf("/");
        var a = n.substring(0, o);
        var i = n.substring(o + 1, n.length);
        n = a + "-" + i;
    }
    var c = t + "/" + n;
    var r = wx.getFileSystemManager();
    return new Promise(function (t, n) {
        r.stat({
            path: c,
            success: function (o) {
                if (o.stats.isFile()) {
                    r.unlink({
                        filePath: c,
                        success: function () {
                            console.log("删除本地图片成功!!!!!", e);
                            t(0);
                        },
                        fail: function () {
                            n();
                        }
                    });
                    t(c);
                }
            },
            fail: function () {
                console.log("本地图片不存在", e);
                t(0);
            }
        });
    });
};
exports.reportButton = function (e, t, n, o, a) {
    if ($config.currentPlatform === $config.platformEnum.wechat && window.wx) {
        wx.reportEvent("button", {
            name: t,
            page: e,
            level: n,
            type: o
        });
        $analysis.reportAnalytics("button", {
            page: e,
            name: t,
            level: n,
            type: o,
            mode: a
        });
    }
};
exports.reportPage = function (e, t) {
    if ($config.currentPlatform === $config.platformEnum.wechat) {
        wx.reportEvent("page", {
            page_name: e,
            level: t
        });
        $analysis.reportAnalytics("page", {
            pagename: e,
            level: t
        });
    }
};
exports.getWXOpenid = q;
exports.reportPass = function (e, t, n, o, a) {
    if ($config.currentPlatform === $config.platformEnum.wechat) {
        $analysis.reportAnalytics("level", {
            level: e,
            Mode: t,
            degree: n,
            ID: o,
            state: a
        });
    }
};
exports.reportGameOver = function (e, t, n, o) {
    if ($config.currentPlatform === $config.platformEnum.wechat) {
        $analysis.reportAnalytics("level_finish", {
            level: e,
            mode: t,
            time: n,
            result: o
        });
    }
};
exports.request = function (e, t, n, o, a) {
    if (void 0 === n) {
        n = function () {};
    }
    if (void 0 === o) {
        o = function () {};
    }
    if (void 0 === a) {
        a = "POST";
    }
    wx.request({
        url: e,
        data: t,
        header: {
            "content-type": "application/json"
        },
        method: a,
        dataType: "JSON",
        responseType: "text",
        success: function (e) {
            n(e);
        },
        fail: function (e) {
            o(e);
        }
    });
};
