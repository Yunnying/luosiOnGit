exports.onRewardAdFail =
    exports.onRewardAdSuccess =
    exports.showTips =
    exports.showShare =
    exports.showRewardAD =
    exports.exitGame =
    exports.createRewardedVideoAd =
    exports.showInterstitialAd =
    exports.showBannerAD =
    exports.initAds =
    exports.rewardAdFuncTar =
    exports.rewardAdFailFunc =
    exports.rewardAdSuccessFunc =
        void 0;
var o = cc._decorator;
var a = (o.ccclass, o.property, "org/cocos2dx/javascript/AppActivity");
window.Global_onRewardAdClose = function (e) {
    cc.game.resume();
    if (e) {
        s();
    } else {
        u();
    }
    exports.rewardAdSuccessFunc = null;
};
exports.rewardAdSuccessFunc = null;
exports.rewardAdFailFunc = null;
exports.rewardAdFuncTar = null;
var i = 0;
var c = 0;

function r() {
    console.log("---lante---createRewardVideoAd");
    jsb.reflection.callStaticMethod(a, "createRewardVideoAd", "()V");
}

function l(e) {
    jsb.reflection.callStaticMethod(a, "showTips", "(Ljava/lang/String)V", e);
}

function s() {
    console.log("---lante---onRewardAdSuccess");
    exports.rewardAdSuccessFunc(exports.rewardAdFuncTar);
    cc.game.resume();
}

function u() {
    console.log("---lante---onRewardAdFail");
    l("完整观看视频才能获得奖励！");
    if (exports.rewardAdFailFunc) {
        exports.rewardAdFailFunc(exports.rewardAdFuncTar);
    }
    cc.game.resume();
}
exports.initAds = function () {
    console.log("---lante---初始化广告");
    r();
};
exports.showBannerAD = function (e) {
    console.log("---lante---showBanner");
    jsb.reflection.callStaticMethod(a, "showBannerAd", "(Z)V", e);
};
exports.showInterstitialAd = function () {
    var e = new Date().getTime();
    if (e - c > 18e4) {
        c = e;
        console.log("---lante---showIFullAd");
        jsb.reflection.callStaticMethod(a, "showFullAd", "()V");
    } else {
        if (e - i > 75e3) {
            i = e;
            console.log("---lante---showInterstitialAd");
            jsb.reflection.callStaticMethod(a, "showInterstitialAd", "()V");
        }
    }
};
exports.createRewardedVideoAd = r;
exports.exitGame = function () {
    console.log("---lante---exitGame");
    jsb.reflection.callStaticMethod(a, "exitGame", "()V");
};
exports.showRewardAD = function (e, t, o) {
    if (void 0 === t) {
        t = null;
    }
    if (void 0 === o) {
        o = null;
    }
    return new Promise(function (i, c) {
        exports.rewardAdSuccessFunc = function () {
            if (e) {
                e();
            }
            i(null);
        };
        exports.rewardAdFailFunc = function () {
            if (t) {
                t();
            }
            c(null);
        };
        exports.rewardAdFuncTar = o;
        console.log("---lante---showRewardedVideoAd");
        jsb.reflection.callStaticMethod(a, "showRewardedVideoAd", "()V");
        cc.game.pause();
    });
};
exports.showShare = function () {
    jsb.reflection.callStaticMethod(a, "showShare", "()V");
};
exports.showTips = l;
exports.onRewardAdSuccess = s;
exports.onRewardAdFail = u;
