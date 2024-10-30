exports.showTips =
    exports.installShortcut =
    exports.hasShortcutInstalled =
    exports.showRewardAD =
    exports.showInterstitialAd =
    exports.showBannerAD =
    exports.createRewardedVideoAd =
    exports.createInterstitialAd =
    exports.createBannerAd =
    exports.initAds =
        void 0;
var o;
var a;
var i;
var c = cc._decorator;
var r = (c.ccclass, c.property, "0mIfQa0V");
var l = "DiZZNma1";
var s = "OV8gmoUN";
var u = null;
var d = null;
var f = null;
var p = !1;
var h = !1;
var m = !1;
var g = !1;

function v() {
    console.log("createBannerAd");
    p = !1;
    if (qg.createBannerAd && "" != r) {
        var e = qg.getSystemInfoSync().screenHeight;
        var t = qg.getSystemInfoSync().screenWidth;
        (u = qg.createBannerAd({
            adUnitId: r,
            style: {
                left: 0,
                top: e - t / 6.7,
                width: t,
                height: t / 6.7
            }
        })).onLoad(function () {
            console.log("createBannerAd success");
            p = !0;
        });
        u.onError(function (e) {
            console.log("createBannerAd fail err:", e);
            p = !1;
        });
        u.onClose(function () {
            p = !1;
            v();
        });
    }
}

function w() {
    console.log("createInterstitialAd");
    m = !1;
    if (qg.createInsertAd) {
        (d = qg.createInsertAd({
            adUnitId: l
        })).load();
        d.onLoad(function () {
            console.log("插屏广告加载");
            m = !0;
        });
        d.onError(function (e) {
            console.log(e, "createInterstitialAd fail");
            m = !1;
        });
        d.onClose(function () {
            m = !1;
            d.load();
        });
    }
}

function y() {
    h = !1;
    console.log("createRewardedVideoAd");
    if (qg.createRewardedVideoAd) {
        (f = qg.createRewardedVideoAd({
            adUnitId: s
        })).load();
        h = !1;
        f.onLoad(function () {
            console.log("视频广告加载成功");
            h = !0;
        });
        f.onError(function (e) {
            console.log("Rewarded 加载失败", e);
            S("视频广告加载失败" + e.code);
        });
        f.onClose(function (e) {
            h = !1;
            cc.game.resume();
            f.load();
            if ((e && e.isEnded) || void 0 === e) {
                console.log("播放完成关闭");
                o(i);
            } else {
                console.log("中途关闭播放");
                a(i);
                S("完整观看视频才能获得奖励哦");
            }
        });
    }
}

function S(e) {
    mz.showToast({
        duration: 2500,
        message: e
    });
}
exports.initAds = function () {
    v();
    w();
    y();
};
exports.createBannerAd = v;
exports.createInterstitialAd = w;
exports.createRewardedVideoAd = y;
exports.showBannerAD = function (e) {
    if (u) {
        if (e) {
            if (g || !p) {
                return;
            }
            u.show();
        } else {
            u.hide();
            g = !1;
        }
    }
};
exports.showInterstitialAd = function () {
    if (d) {
        if (!m) {
            return void d.load();
        }
        d.show()
            .catch(function (e) {
                console.log("interstitialAd err", e);
                w();
                d.show();
            })
            .then(function () {
                console.log("interstitialAd");
            });
    } else {
        w();
    }
};
exports.showRewardAD = function (e, t) {
    o = e.success;
    i = t;
    if (e.fail) {
        a = e.fail;
    }
    if (null != f && h) {
        cc.game.pause();
        f.show()
            .then(function () {
                console.log("show then");
            })
            .catch(function () {
                console.log("show catch");
                if (!h) {
                    S("暂时没有可播放的广告，请稍后再试!");
                    f.load();
                    cc.game.resume();
                }
            });
    } else {
        S("暂时没有可播放的广告，请稍后再试!");
        y();
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
exports.showTips = S;
