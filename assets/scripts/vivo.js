exports.vibrateLong =
    exports.vibrateShort =
    exports.showTips =
    exports.showModal =
    exports.showRewardAD =
    exports.showInterstitialAd =
    exports.showBannerAD =
    exports.installShortcut =
    exports.hasShortcutInstalled =
    exports.createNativeAd =
    exports.createRewardedVideoAd =
    exports.createInterstitialAd =
    exports.createBannerAd =
    exports.initAds =
    exports.init =
        void 0;
var $localStorage = require("./localStorage");
var a = cc._decorator;
var i = (a.ccclass, a.property, "e8e6a5465401451e925d8fa781228e9c");
var c = "3bfbc4c17efd4959bdaf98bd5f3de8ea";
var r = "7d10385095eb42cda405d0568e3007e3";
var l = null;
var s = null;
var u = null;
var d = null;
var f = !1;
var p = !1;

function h() {
    console.log("createBannerAd");
    if (!(qg.getSystemInfoSync().platformVersionCode < 1031)) {
        if (qg.createBannerAd) {
            (l = qg.createBannerAd({
                posId: i,
                style: {}
            })).onLoad(function () {
                console.log("createBannerAd success");
            });
            l.onError(function (e) {
                console.log(e.errCode);
                console.log("createBannerAd fail");
            });
        }
    }
}

function m() {
    console.log("createInterstitialAd");
    if (!(qg.getSystemInfoSync().platformVersionCode < 1031)) {
        if (qg.createInterstitialAd) {
            (s = qg.createInterstitialAd({
                posId: c
            })).onLoad(function () {
                console.log("插屏广告加载");
            });
            s.onError(function (e) {
                console.log(e.errCode, "createInterstitialAd fail");
            });
        }
    }
}

function g() {
    if (!(qg.getSystemInfoSync().platformVersionCode < 1041)) {
        f = !1;
        (u = qg.createRewardedVideoAd({
            posId: r
        })).load();
        u.onLoad(function () {
            console.log("视频广告加载成功");
            f = !0;
        });
        u.onError(function (e) {
            console.log("Rewarded 加载失败" + e.errCode);
            f = !1;
        });
    }
}
exports.init = function () {};
exports.initAds = function () {
    h();
    m();
    g();
};
exports.createBannerAd = h;
exports.createInterstitialAd = m;
exports.createRewardedVideoAd = g;
var v = null;

function w(e) {
    qg.showToast({
        message: e
    });
}
exports.createNativeAd = function () {
    if (!(qg.getSystemInfoSync().platformVersionCode < 1053)) {
        if (
            qg.createNativeAd &&
            null !=
                (d = qg.createNativeAd({
                    posId: "e4ab257204c34f988328e9a17c0083e4"
                }))
        ) {
            d.onLoad(function (e) {
                if (e && e.adList) {
                    v = e.adList.pop();
                    console.log("[原生广告]", e, v);
                }
            });
            d.onError(function (e) {
                console.log("[原生广告]", e);
            });
        }
    }
};
exports.hasShortcutInstalled = function (e) {
    if (qg && qg.hasShortcutInstalled) {
        qg.hasShortcutInstalled({
            success: function (t) {
                if (0 == t) {
                    e.fail();
                } else {
                    e.success();
                }
            },
            fail: function () {},
            complete: function () {}
        });
    }
};
exports.installShortcut = function (e) {
    if (qg && qg.installShortcut) {
        qg.installShortcut({
            success: function () {
                e.success();
            },
            fail: function () {
                if (e.fail) {
                    e.fail();
                }
            },
            complete: function () {}
        });
    }
};
exports.showBannerAD = function (e) {
    if (null != l) {
        if (!e) {
            l.hide();
            return void (p = !1);
        }
        if (!p) {
            var t = $localStorage.default.getLocalItem("showBannerTimes", 0);
            var n = $localStorage.default.getLocalItem("secondBannerShowTime", 0);
            var a = Date.now() - n;
            if (!(a < 30 && t >= 2)) {
                if (a > 30 && t >= 2) {
                    t = 0;
                    n = Date.now();
                }
                t++;
                l.show()
                    .then(function () {
                        p = !0;
                        console.log("banner展示");
                        $localStorage.default.setLocalItem("showBannerTimes", t);
                        $localStorage.default.setLocalItem("secondBannerShowTime", n);
                    })
                    .catch(function (e) {
                        console.log("banner err", e.errCode);
                        h();
                        l.show();
                    });
            }
        }
    }
};
exports.showInterstitialAd = function () {
    if (null != s) {
        s.show()
            .then(function () {
                console.log("interstitialAd");
            })
            .catch(function (e) {
                console.log("interstitialAd err", e);
                m();
                s.show();
            });
    } else {
        m();
    }
};
exports.showRewardAD = function (e) {
    if (void 0 === e) {
        e = function () {};
    }
    return new Promise(function (t, n) {
        console.log(u, f);
        if (null != u && f) {
            u.show().catch(function (e) {
                w("暂时没有可播放的广告，请稍后再试");
                console.log("showRewardAD err", e);
                u.load();
            });
            u.onClose(function (o) {
                f = !1;
                u.load();
                if ((o && o.isEnded) || void 0 === o) {
                    console.log(e);
                    e();
                    e = function () {};
                    console.log("播放完成关闭");
                    t("播放完成");
                } else {
                    n("完整观看视频才能获得奖励哦");
                    console.log("中途关闭播放");
                    w("完整观看视频才能获得奖励哦");
                }
            });
        } else {
            w("暂时没有可播放的广告，请稍后再试");
            n();
            g();
        }
    });
};
exports.showModal = function (e, t, n, o) {
    qg.showDialog({
        title: e,
        message: t,
        buttons: [
            {
                text: "确认",
                color: "#33dd44"
            },
            {
                text: "取消",
                color: "#FF0044"
            }
        ],
        success: function () {
            n();
            console.log("handling callback");
        },
        cancel: function () {
            o();
            console.log("handling cancel");
        },
        fail: function (e, t) {
            o();
            console.log("handling fail, code = " + t);
        }
    });
};
exports.showTips = w;
exports.vibrateShort = function () {
    qg.vibrateShort();
};
exports.vibrateLong = function () {
    qg.vibrateLong();
};
