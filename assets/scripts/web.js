exports.showShare = exports.checkHad4399Ad = exports.showRewardAd = void 0;
var o = cc.Enum({
    playSuccess: 0,
    successClose: 1,
    playFaild: 2
});
exports.showRewardAd = function (e, t) {
    if (void 0 === e) {
        e = null;
    }
    if (void 0 === t) {
        t = null;
    }
    return new Promise(function (n) {
        window.h5api.playAd(function (a) {
            console.log("code" + a.code + ", msg" + a.message);
            if (1e4 === a.code) {
                cc.log("开始播放");
                o.playSuccess;
            } else {
                10001 === a.code
                    ? (cc.log("播放结束"), o.successClose, e && e(t), n())
                    : (cc.log("广告异常"), o.playFaild);
            }
        });
    });
};
exports.checkHad4399Ad = function (e) {
    window.h5api.canPlayAd(function (t) {
        console.log("是否可播放广告", t.canPlayAd, "剩余次数", t.remain);
        if (t.canPlayAd) {
            e();
        } else {
            console.log("没有广告");
        }
    });
};
exports.showShare = function (e, t) {
    window.h5api.share();
    e(t);
};
