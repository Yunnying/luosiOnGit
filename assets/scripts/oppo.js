exports.showTips =
    exports.showModal =
    exports.showRewardAD =
    exports.showInterstitialAd =
    exports.showBannerAD =
    exports.installShortcut =
    exports.hasShortcutInstalled =
    exports.createRewardedVideoAd =
    exports.createInterstitialAd =
    exports.createBannerAd =
    exports.showGameDrawerAd =
    exports.createGameDrawerAd =
    exports.initAds =
        void 0;
var o;
var a;
var $localStorage = require("./localStorage");
var c = cc._decorator;
var r = (c.ccclass, c.property, "565111");
var l = null;
var s = null;
var u = null;

function d() {
    if (cc.sys.isBrowser || qg.getSystemInfoSync().platformVersionCode < 1090) {
        console.log("快应用平台号低于1090， 暂不支持互推盒子相关 API");
    } else {
        u = qg.createGameDrawerAd({
            adUnitId: "395677",
            style: {
                top: 350
            }
        });
    }
}

function f() {
    console.log("createBannerAd");
    if (qg.createBannerAd) {
        (l = qg.createBannerAd({
            adUnitId: r,
            style: {
                top: qg.getSystemInfoSync().windowHeight - 150
            }
        })).onLoad(function () {
            console.log("createBannerAd success");
        });
        l.onError(function (e) {
            console.log(e.errCode, "createBannerAd fail");
        });
    }
}

function p() {
    console.log("createRewardedVideoAd");
    if (qg.createRewardedVideoAd) {
        (s = qg.createRewardedVideoAd({
            adUnitId: "565115"
        })).onLoad(function () {
            console.log("视频广告加载成功");
        });
        s.onError(function (e) {
            console.log("Rewarded 加载失败" + e.errCode);
        });
        s.onClose(function (e) {
            cc.game.resume();
            if ((e && e.isEnded) || void 0 === e) {
                console.log("播放完成关闭");
                h("播放完成关闭");
                o && (o(), (o = null));
            } else {
                console.log("中途关闭播放");
                h("完整观看视频才能获得奖励哦");
                a && (a(), (a = null));
            }
            s.load();
        });
        s.load();
    } else {
        console.log("qg 不存在");
    }
}

function h(e) {
    qg.showToast({
        title: e,
        icon: "none",
        duration: 1500
    });
}
exports.initAds = function () {
    f();
    p();
};
exports.createGameDrawerAd = d;
exports.showGameDrawerAd = function (e) {
    if (void 0 === e) {
        e = !0;
    }
    if (u) {
        e ? u.show() : u.hide();
    } else {
        d();
    }
};
exports.createBannerAd = f;
exports.createInterstitialAd = function () {};
exports.createRewardedVideoAd = p;
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
    if (cc.director.getTotalTime() < 6e4) {
        console.log("显示banner失败  ====>  err: 60s后才能显示");
    } else {
        if (l) {
            if (e) {
                var t = $localStorage.default.getLocalItem("showBannerTimes", 0);
                var n = $localStorage.default.getLocalItem("secondBannerShowTime", 0);
                var o = Date.now() - n;
                if (o < 30 && t >= 2) {
                    return;
                }
                if (o > 30 && t >= 2) {
                    t = 0;
                    n = Date.now();
                }
                t++;
                l.show()
                    .catch(function (e) {
                        console.log("banner err", e.errCode);
                        f();
                        l.show();
                    })
                    .then(function () {
                        console.log("banner展示");
                        $localStorage.default.setLocalItem("showBannerTimes", t);
                        $localStorage.default.setLocalItem("secondBannerShowTime", n);
                    });
            } else {
                l.hide();
            }
        } else {
            f();
        }
    }
};
exports.showInterstitialAd = function () {};
exports.showRewardAD = function (e) {
    if (void 0 === e) {
        e = function () {};
    }
    return new Promise(function (t, n) {
        if (!s) {
            h("暂时没有可播放的广告，请稍后再试!");
            p();
            return void n();
        }
        cc.game.pause();
        o = function () {
            e();
            t("播放完成");
        };
        a = function () {
            n("完整观看视频才能获得奖励哦");
        };
        s.show().catch(function () {
            cc.game.resume();
            h("暂时没有可播放的广告，请稍后再试!");
            s.load();
            n();
        });
    });
};
exports.showModal = function () {};
exports.showTips = h;
