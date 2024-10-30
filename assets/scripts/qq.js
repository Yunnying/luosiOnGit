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
    exports.showShare =
    exports.showTips =
    exports.openShare =
    exports.showRewardAD =
    exports.showAppBoxAd =
    exports.showInterstitialAd =
    exports.showBannerAD =
    exports.showGridAD =
    exports.createBlockAd =
    exports.createRewardedVideoAd =
    exports.createAppBox =
    exports.createInterstitialAd =
    exports.createBannerAd =
    exports.initAds =
    exports.init =
        void 0;
var o;
var a;
var i;
var $shareTitle = require("./ShareTitle");
var r = cc._decorator;
var l = (r.ccclass, r.property, "");
var s = null;
var u = null;
var d = null;
var f = null;
var p = null;
var h = !1;
var m = !1;

function g() {
    if (qq.createBannerAd && "" != l) {
        s = qq.createBannerAd({
            adUnitId: l,
            style: {
                width: 200,
                left: qq.getSystemInfoSync().windowWidth / 2 - 100,
                top: qq.getSystemInfoSync().windowHeight - 112.5
            }
        });
        qq.getSystemInfo({
            success: function (e) {
                console.log(e.appName);
                s.onResize(function (e) {
                    console.log(e.width, e.height);
                    s.style.top = qq.getSystemInfoSync().windowHeight - e.height;
                    s.style.left = (qq.getSystemInfoSync().windowWidth - e.width) / 2;
                });
                s.onError(function (e) {
                    console.log(e);
                    console.log("createBannerAd fail");
                });
            }
        });
    }
}

function v() {
    qq.createInterstitialAd;
}

function w() {
    qq.createAppBox;
}

function y() {
    qq.createRewardedVideoAd;
}

function S() {
    qq.createBlockAd;
}

function k(e) {
    qq.showToast({
        title: e,
        icon: "none",
        duration: 2500
    });
}
exports.init = function () {
    qq.onShow(function () {
        if (m) {
            m = !1;
            Date.now() - o >= 2500 ? a && a(i) : k("分享失败，请重试！");
            a = null;
        }
    });
};
exports.initAds = function () {
    g();
    v();
    y();
    w();
};
exports.createBannerAd = g;
exports.createInterstitialAd = v;
exports.createAppBox = w;
exports.createRewardedVideoAd = y;
exports.createBlockAd = S;
exports.showGridAD = function (e) {
    if (e) {
        S();
    } else {
        if (null != f) {
            f.destroy();
        }
    }
};
exports.showBannerAD = function (e) {
    if (null != s) {
        e ? s.show() : s.hide();
    }
};
exports.showInterstitialAd = function () {
    if (null != u) {
        u.show().catch(function (e) {
            console.warn("interAD error", e);
        });
    }
};
exports.showAppBoxAd = function () {
    if (p) {
        p.show();
    }
};
exports.showRewardAD = function () {
    return new Promise(function (e, t) {
        if (null == d) {
            qq.showToast({
                title: "暂时没有可播放的广告，请稍后再试!",
                icon: "none",
                duration: 2500
            });
            y();
            return void t("暂时没有可播放的广告，请稍后再试!");
        }
        cc.game.pause();
        d.show()
            .then(function () {
                d.onClose(function (n) {
                    cc.game.resume();
                    if ((n && n.isEnded) || void 0 === n) {
                        console.log("播放完成关闭");
                        e(0);
                    } else {
                        console.log("中途关闭播放");
                        qq.showToast({
                            title: "完整观看视频才能获得奖励哦",
                            icon: "none",
                            duration: 2500
                        });
                        t("完整观看视频才能获得奖励哦");
                    }
                });
            })
            .catch(function () {
                console.log("show catch");
                if (!h) {
                    qq.showToast({
                        title: "暂时没有可播放的广告，请稍后再试!",
                        icon: "none",
                        duration: 2500
                    });
                    d.load();
                    t("暂时没有可播放的广告，请稍后再试!");
                }
                cc.game.resume();
            });
    });
};
exports.openShare = function () {
    if (qq.showShareMenu) {
        qq.showShareMenu({
            withShareTicket: !0,
            showShareItems: ["qq", "qzone"]
        });
        qq.onShareAppMessage(function () {
            return {
                title: $shareTitle.default.getRandomTitle(),
                imageUrl: $shareTitle.default.getRandomImageUrl()
            };
        });
    }
};
exports.showTips = k;
exports.showShare = function (e, t) {
    qq.shareAppMessage({
        title: $shareTitle.default.getRandomTitle(),
        imageUrl: $shareTitle.default.getRandomImageUrl()
    });
    a = e;
    i = t;
    m = !0;
    o = Date.now();
};
exports.showModal = function (e, t, n, o) {
    qq.showModal({
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
    qq.vibrateLong({
        success: function (e) {
            console.log("" + e);
        },
        fail: function () {
            console.log("vibrateLong调用失败");
        }
    });
};
exports.vibrateShort = function () {
    qq.vibrateShort({
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
        return qq.getSystemInfoSync();
    } catch (e) {
        console.log("getSystemInfoSync fail");
    }
};
exports.getSystemInfo = function (e) {
    qq.getSystemInfo({
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
    qq.navigateToMiniProgram({
        appId: e,
        path: "",
        extraData: {
            time: new Date().valueOf()
        },
        success: function () {}
    });
};
exports.onHide = function (e) {
    qq.onHide(function () {
        e();
    });
};
exports.onShow = function (e) {
    qq.onShow(function () {
        e();
    });
};
exports.login = function () {
    return new Promise(function (e, t) {
        qq.login({
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
        qq.loadSubpackage({
            name: e,
            success: function () {
                console.log("qq加载分包====> 成功", "分包名:" + e);
                t(0);
            },
            fail: function (t) {
                console.log("qq加载分包====> 失败", "分包名:" + e, "err = " + t);
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
    var r = qq.getFileSystemManager();
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
                qq.downloadFile({
                    url: e,
                    success: function (e) {
                        r.saveFile({
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
    var r = qq.getFileSystemManager();
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
