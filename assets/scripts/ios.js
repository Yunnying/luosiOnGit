exports.onRewardAdStop =
    exports.onRewardAdClose =
    exports.showTips =
    exports.showRewardAD =
    exports.createRewardedVideoAd =
    exports.showInterstitialAd =
    exports.showBannerAD =
    exports.initAds =
    exports.showinsinterval =
    exports.lastshowinstime =
    exports.adFailFunc =
    exports.rewardFuncTar =
    exports.adRewardFunc =
        void 0;
var o = cc._decorator;
var a = (o.ccclass, o.property, "IOSPlatformCallback");

function i(e) {
    console.log("showTips");
    jsb.reflection.callStaticMethod(a, "showTips:", e);
}

function c() {
    exports.adRewardFunc(exports.rewardFuncTar);
}

function r() {
    i("完整观看视频才能获得奖励！");
    if (exports.adFailFunc) {
        exports.adFailFunc(exports.rewardFuncTar);
    }
}
window.Global_onRewardAdClose_IOS = function (e) {
    cc.game.resume();
    exports.lastshowinstime = new Date().getTime();
    if (e) {
        c();
    } else {
        r();
    }
    exports.adRewardFunc = null;
};
exports.adRewardFunc = null;
exports.rewardFuncTar = null;
exports.adFailFunc = null;
exports.lastshowinstime = 0;
exports.showinsinterval = 5e4;
exports.initAds = function () {};
exports.showBannerAD = function (e) {
    jsb.reflection.callStaticMethod(a, "showBannerAd:", e);
};
exports.showInterstitialAd = function () {
    var e = new Date().getTime();
    if (e - exports.lastshowinstime > exports.showinsinterval) {
        jsb.reflection.callStaticMethod(a, "showInterstitialAd");
        exports.lastshowinstime = e;
    }
};
exports.createRewardedVideoAd = function () {};
exports.showRewardAD = function (e, t) {
    return new Promise(function (o, i) {
        exports.adRewardFunc = e.success;
        exports.adRewardFunc = function (t) {
            e.success(t);
            o(null);
        };
        exports.rewardFuncTar = t;
        if (e.fail) {
            exports.adFailFunc = function (t) {
                e.fail(t);
                i(null);
            };
        }
        cc.game.pause();
        jsb.reflection.callStaticMethod(a, "showRewardedVideoAd");
    });
};
exports.showTips = i;
exports.onRewardAdClose = c;
exports.onRewardAdStop = r;
