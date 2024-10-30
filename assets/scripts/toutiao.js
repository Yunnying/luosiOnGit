exports.request =
    exports.getLocation3 =
    exports.requestSubscribe =
    exports.reportRemain =
    exports.reportPass =
    exports.reportPage =
    exports.reportButton =
    exports.removeDownloadFile =
    exports.downImageFile =
    exports.loadSubpackage =
    exports.getRankList =
    exports.setScore =
    exports.checkTable =
    exports.addshortCut =
    exports.login =
    exports.onShow =
    exports.onHide =
    exports.toMiniGame =
    exports.getSystemInfo =
    exports.getSystemInfoSync =
    exports.vibrateShort =
    exports.vibrateLong =
    exports.showModal =
    exports.shareLp =
    exports.stopLp =
    exports.resumeLp =
    exports.pauseLp =
    exports.startLp =
    exports.showShare =
    exports.setMoreGamesInfo =
    exports.showTips =
    exports.openShare =
    exports.showRewardAD =
    exports.showInterstitialAd =
    exports.createInterstitialAd =
    exports.showBannerAD =
    exports.createRewardedVideoAd =
    exports.getTTOpenid =
    exports.createBannerAd =
    exports.initAds =
    exports.init =
        void 0;
var o;
var a;
var i;
var c;
var r;
var $config = require("./config");
var $shareTitle = require("./ShareTitle");
var $oceanengine = require("./Oceanengine");
var $commonData = require("./commonData");
var $publicManager = require("./PublicManager");
var p = cc._decorator;
var h = (p.ccclass, p.property, "hs12qu156b3k2f4m71");
var m = null;
var g = null;

function v() {
    if (tt.createRewardedVideoAd) {
        (g = tt.createRewardedVideoAd({
            adUnitId: h
        })).onLoad(function () {
            console.log("加载成功");
        });
        g.onClose(function (e) {
            cc.game.resume();
            if ((e && e.isEnded) || void 0 === e) {
                console.log("播放完成关闭");
                o && (o(), (o = null));
                console.log("bluem-test-cloce-ad");
                setTimeout(function () {}, 1500);
            } else {
                w("完整观看视频才能获得奖励哦");
                a && (a(), (a = null));
            }
        });
        g.onError(function (e) {
            console.log("Rewarded 加载失败" + e, e.errCode);
        });
        g.load();
    }
}

function w(e) {
    tt.showToast({
        title: e,
        icon: "none",
        duration: 2500
    });
}
exports.init = function () {
    console.log("[录屏] 初始化");
    (m = new tt.getGameRecorderManager()).onStop(function (e) {
        console.log(e.videoPath);
        r = e.videoPath;
        console.log("[录屏] 结束");
    });
    $oceanengine.init();
    console.log("巨量引擎初始化结束");
};
exports.initAds = function () {
    console.log("init ad");
    v();
};
exports.createBannerAd = function () {};
exports.getTTOpenid = function () {
    return new Promise(function (e) {
        $oceanengine.getOpenid().then(function (t) {
            return e(t);
        });
    });
};
exports.createRewardedVideoAd = v;
exports.showBannerAD = function () {};
exports.createInterstitialAd = function () {};
exports.showInterstitialAd = function () {};
exports.showRewardAD = function (e) {
    if (void 0 === e) {
        e = function () {};
    }
    return new Promise(function (t, n) {
        if (null == g) {
            v();
            w("暂时没有可播放的广告，请稍后再试!");
            return void n("暂时没有可播放的广告，请稍后再试!");
        }
        cc.game.pause();
        g.show()
            .then(function () {
                o = function () {
                    $commonData.default.watchNailSkinTimes++;
                    $publicManager.default.onGetVideoReward();
                    e();
                    t("播放完成关闭");
                    setTimeout(function () {
                        $oceanengine.postVideoSuccess();
                    }, 1500);
                };
                a = function () {
                    n("完整观看视频才能获得奖励哦");
                };
            })
            .catch(function () {
                g.load();
                w("暂时没有可播放的广告，请稍后再试!");
                n("暂时没有可播放的广告，请稍后再试!");
                cc.game.resume();
            });
    });
};
exports.openShare = function () {
    if (wx.showShareMenu) {
        wx.showShareMenu({
            withShareTicket: !0
        });
        wx.onShareAppMessage(function () {
            return {};
        });
    }
};
exports.showTips = w;
exports.setMoreGamesInfo = function () {
    if (tt.setMoreGamesInfo) {
        tt.setMoreGamesInfo({
            appLaunchOptions: []
        });
    }
};
exports.showShare = function (e, t) {
    tt.shareAppMessage({
        title: $shareTitle.default.getRandomTitle(),
        imageUrl: $shareTitle.default.getRandomImageUrl(),
        success: function () {
            console.log("分享成功！");
            if (e) {
                e(t);
            }
        },
        fail: function (e) {
            console.log("分享失败！", e);
        },
        complete: function () {
            console.log("complete");
        }
    });
};
exports.startLp = function () {
    cc.log("startLp");
    if (m) {
        m.start({
            duration: 300
        });
        i = Date.now();
        console.log("startLp");
    }
};
exports.pauseLp = function () {
    if (m) {
        m.pause();
        console.log("pauseLp");
    }
};
exports.resumeLp = function () {
    if (m) {
        m.resume();
        console.log("resumeLp");
    }
};
exports.stopLp = function () {
    if (m) {
        m.stop();
        c = Date.now();
    }
    console.log("stopLp");
};
exports.shareLp = function (e, t) {
    if (m && c - i >= 3100) {
        tt.shareAppMessage({
            channel: "video",
            query: "",
            extra: {
                videoPath: r,
                videoTopics: ["汉字热梗王"],
                hashtag_list: ["汉字热梗王"]
            },
            success: function () {
                console.log("分享视频成功");
                if (e) {
                    e(t);
                }
            },
            fail: function (e) {
                console.log("分享视频失败", e);
                if (-1 == e.errMsg.split(":")[1].search("cancel")) {
                    tt.getSystemInfo({
                        success: function (e) {
                            console.log(e.appName);
                            if (!("XiGua" == e.appName)) {
                                tt.showToast({
                                    title: "分享录屏失败！",
                                    icon: "none",
                                    duration: 2e3
                                });
                            }
                        }
                    });
                } else {
                    tt.showToast({});
                }
            }
        });
    } else {
        tt.showToast({
            title: "录制视频不足3s",
            icon: "none",
            duration: 2e3
        });
    }
};
exports.showModal = function (e, t, n, o) {
    tt.showModal({
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
        },
        fail: function () {
            console.log("showModal调用失败");
        }
    });
};
exports.vibrateLong = function () {
    tt.vibrateLong({
        success: function (e) {
            console.log("" + e);
        },
        fail: function () {
            console.log("vibrateLong调用失败");
        }
    });
};
exports.vibrateShort = function () {
    tt.vibrateShort({
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
        return tt.getSystemInfoSync();
    } catch (e) {
        console.log("getSystemInfoSync fail");
    }
};
exports.getSystemInfo = function (e) {
    tt.getSystemInfo({
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
exports.toMiniGame = function () {
    tt.showMoreGamesModal({
        appLaunchOptions: [],
        success: function (e) {
            console.log("success", e.errMsg);
        },
        fail: function (e) {
            console.log("fail", e.errMsg);
        }
    });
};
exports.onHide = function (e) {
    tt.onHide(function () {
        e();
    });
};
exports.onShow = function (e) {
    tt.onShow(function () {
        e();
    });
};
exports.login = function () {
    return new Promise(function (e, t) {
        tt.login({
            force: !1,
            success: function (t) {
                if (t.isLogin) {
                    e(t.code);
                } else {
                    e(t.anonymousCode);
                }
                console.log("成功登录");
            },
            fail: function (e) {
                t(e);
                console.log("登录失败");
            }
        });
    });
};
exports.addshortCut = function (e, t) {
    console.log("头条添加桌面");
    tt.addShortcut({
        success: function () {
            console.log("添加桌面成功");
            if (e) {
                e(t);
            }
            tt.showToast({
                title: "添加桌面成功",
                icon: "none",
                duration: 2500
            });
        },
        fail: function (e) {
            console.log("添加桌面失败", e.errMsg);
            tt.showToast({
                title: "添加桌面失败",
                icon: "none",
                duration: 2500
            });
        }
    });
};
exports.checkTable = function (e, t) {
    tt.checkShortcut({
        success: function (t) {
            if (e) {
                e(t);
            }
            console.log("检查快捷方式", t.status.exist);
        },
        fail: function (e) {
            console.log("检查快捷方式失败", e.errMsg);
            if (t) {
                t();
            }
        }
    });
};
exports.setScore = function (e) {
    if ("Douyin" == tt.getSystemInfoSync().appName) {
        tt.setImRankData({
            dataType: 0,
            value: String(e),
            priority: 0,
            extra: "extra",
            success: function (e) {
                console.log("setImRankData success res: " + e);
            },
            fail: function (e) {
                console.log("setImRankData fail res: " + e.errMsg);
            }
        });
    }
};
exports.getRankList = function () {
    if ("Douyin" == tt.getSystemInfoSync().appName) {
        tt.getImRankList({
            relationType: "default",
            dataType: 0,
            rankType: "day",
            suffix: "关",
            rankTitle: "每日排行榜",
            success: function (e) {
                console.log("getImRankData success res: " + e);
            },
            fail: function (e) {
                console.log("getImRankData fail res: " + e.errMsg);
            }
        });
    } else {
        tt.showToast({
            title: "该平台暂无排行榜",
            icon: "none",
            duration: 1500
        });
    }
};
exports.loadSubpackage = function (e) {
    return new Promise(function (t, n) {
        tt.loadSubpackage({
            name: e,
            success: function () {
                console.log("头条加载分包====> 成功", "分包名:" + e);
                t(0);
            },
            fail: function (t) {
                console.log("头条加载分包====> 失败", "分包名:" + e, "err = " + t);
                n();
            }
        });
    });
};
exports.downImageFile = function (e) {
    var t = "" + tt.env.USER_DATA_PATH;
    for (var n = e.split("resource/")[1]; -1 != n.indexOf("/"); ) {
        var o = n.indexOf("/");
        var a = n.substring(0, o);
        var i = n.substring(o + 1, n.length);
        n = a + "-" + i;
    }
    var c = t + "/" + n;
    var r = tt.getFileSystemManager();
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
                tt.downloadFile({
                    url: e,
                    success: function (e) {
                        tt.saveFile({
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
    var t = "" + tt.env.USER_DATA_PATH;
    for (var n = e.split("resource/")[1]; -1 != n.indexOf("/"); ) {
        var o = n.indexOf("/");
        var a = n.substring(0, o);
        var i = n.substring(o + 1, n.length);
        n = a + "-" + i;
    }
    var c = t + "/" + n;
    var r = tt.getFileSystemManager();
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
    if ($config.currentPlatform === $config.platformEnum.toutiao) {
        if (window.tt) {
            tt.reportAnalytics("Button", {
                page: e,
                name: t,
                level: n,
                type: o,
                mode: a,
                scene: $commonData.default.sceneId
            });
            if (!(1 != o && 2 != o)) {
                tt.reportAnalytics("video", {
                    page: e,
                    name: t,
                    level: n,
                    type: o,
                    mode: a,
                    scene: $commonData.default.sceneId
                });
            }
        }
        console.log("上报按钮埋点,page" + e + ",name:" + t + ",level:" + n + ",type:" + o + ",mode:" + a);
    }
};
exports.reportPage = function (e, t) {
    if ($config.currentPlatform === $config.platformEnum.toutiao) {
        tt.reportAnalytics("page", {
            name: e,
            level: t
        });
    }
};
exports.reportPass = function (e, t, n, o, a) {
    if ($config.currentPlatform === $config.platformEnum.toutiao) {
        tt.reportAnalytics("level", {
            level: e,
            Mode: t,
            degree: n,
            ID: o,
            state: a
        });
        console.log("上报通关埋点", e, t, n, o);
    }
};
exports.reportRemain = function () {
    if ($config.currentPlatform === $config.platformEnum.toutiao) {
        var e;
        var t =
            ((e = new Date(864e5 * $commonData.default.loginDay)),
            String(e.getMonth() + 1) +
                "." +
                String(e.getDate()).padStart(2, "0") +
                "_" +
                String($commonData.default.ContinuousLoginDays));
        tt.reportAnalytics("remain", {
            continuum: t,
            scene: $commonData.default.sceneId
        });
    }
};
exports.requestSubscribe = function () {
    console.log("------toutiao show sub");
    if ("Douyin" == tt.getSystemInfoSync().appName || "douyin_lite" == tt.getSystemInfoSync().appName) {
        tt.requestSubscribeMessage({
            tmplIds: ["MSG1698556137157348703892856637734"],
            success: function (e) {
                console.log("-----订阅完成", e);
                cc.sys.localStorage.setItem("isSubscribe", "true");
                $commonData.default.isSubscribe = !0;
            },
            fail: function (e) {
                console.warn("----订阅失败", e);
            }
        });
    }
};
exports.getLocation3 = function () {
    console.log("访问ip 3-------------------");
    return new Promise(function (e, t) {
        tt.request({
            url: "https://txt.go.sohu.com/ip/soip",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            success: function (t) {
                console.warn("----3------>>res:");
                e(t.data.toString());
            },
            fail: function () {
                console.log("----->>fail");
                t("访问链接失败");
            }
        });
    });
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
    tt.request({
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
