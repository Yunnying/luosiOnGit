exports.onShow =
    exports.onHide =
    exports.getSystemInfo =
    exports.getSystemInfoSync =
    exports.vibrateShort =
    exports.vibrateLong =
    exports.showModal =
    exports.shareLp =
    exports.stopLp =
    exports.startLp =
    exports.showShare =
    exports.showTips =
    exports.showRewardAD =
    exports.createRewardedVideoAd =
    exports.initAds =
    exports.init =
        void 0;
var o = null;
var a = null;

function i() {
    if (!o) {
        console.log("快手创建Rewarded 视频广告");
        (o = ks.createRewardedVideoAd({
            adUnitId: "2300001331_01"
        })).onError(function (e) {
            console.log("快手Rewarded 加载失败" + e.msg, e.code);
        });
    }
}

function c(e) {
    ks.showToast({
        title: e,
        icon: "none",
        duration: 2500
    });
}
exports.init = function () {
    (a = new ks.getGameRecorder()).on("start", function () {
        console.log("录屏开始");
    });
    a.on("error", function (e) {
        console.log(e.error.code, "录屏错误");
    });
    a.on("stop", function (e) {
        console.log(e.videoPath);
        e.videoPath;
        console.log("录屏结束");
    });
};
exports.initAds = function () {
    i();
};
exports.createRewardedVideoAd = i;
exports.showRewardAD = function () {
    return new Promise(function (e, t) {
        cc.game.pause();
        o.show();
        o.onClose(function (n) {
            cc.game.resume();
            if (n && n.isEnded) {
                e();
            } else {
                c("观看完整视频才能获得奖励");
                t();
            }
        });
    });
};
exports.showTips = c;
exports.showShare = function (e, t) {
    ks.shareAppMessage({
        success: function () {
            console.log("分享成功！");
            if (e) {
                e(t);
            }
        },
        fail: function () {
            console.log("分享失败！");
        },
        complete: function () {
            console.log("complete");
        }
    });
};
exports.startLp = function () {
    if (a) {
        a.start();
        console.log("startLP");
    }
};
exports.stopLp = function () {
    if (a) {
        a.stop();
    }
};
exports.shareLp = function (e, t) {
    if (a) {
        a.publishVideo({
            callback: function (n) {
                if (null == n || null == n) {
                    console.log("分享录屏成功");
                    e(t);
                } else {
                    console.log("录屏分享失败：" + JSON.stringify(n));
                }
            }
        });
    }
};
exports.showModal = function (e, t, n, o) {
    ks.showModal({
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
exports.vibrateLong = function () {};
exports.vibrateShort = function () {};
exports.getSystemInfoSync = function () {};
exports.getSystemInfo = function () {};
exports.onHide = function () {};
exports.onShow = function () {};
