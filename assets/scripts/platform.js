exports.videoTrack =
    exports.completeTrack =
    exports.request =
    exports.requestSubscribe =
    exports.reportRemain =
    exports.reportGameOver =
    exports.reportLevel =
    exports.reportPage =
    exports.reportButton =
    exports.getCity =
    exports.installShortcut =
    exports.hasShortcutInstalled =
    exports.showGameDrawerAd =
    exports.exitGame =
    exports.setRank =
    exports.getRank =
    exports.showAppBoxAD =
    exports.onShow =
    exports.onHide =
    exports.shareLp =
    exports.stopLp =
    exports.resumeLp =
    exports.pauseLp =
    exports.startLp =
    exports.toMiniGame =
    exports.getSystemInfo =
    exports.getSystemInfoSync =
    exports.vibrateShort =
    exports.vibrateLong =
    exports.showModal =
    exports.setMoreGamesInfo =
    exports.showShare2 =
    exports.showShare =
    exports.showTips =
    exports.openShare =
    exports.recrodSkinData =
    exports.showRewardAD =
    exports.showGridAD =
    exports.showInterstitialAd =
    exports.showBannerAD =
    exports.initAds =
    exports.addshortCut =
    exports.login =
    exports.getPlatformOpenid =
    exports.init =
    exports.changeIsAdForTrue =
    exports.changeIsAdForFalse =
    exports.changeIsAd =
    exports.isAd =
        void 0;
var $config = require("./config");
var $toutiao = require("./toutiao");
var $wechat = require("./wechat");
var $qq = require("./qq");
var $android = require("./android");
var $ios = require("./ios");
var $oppo = require("./oppo");
var $ks = require("./ks");
var $web = require("./web");
var $vivo = require("./vivo");
var $oceanengine = require("./Oceanengine");
var $commonData = require("./commonData");
var $battleManager = require("./BattleManager");
var $publicManager = require("./PublicManager");
var $localStorage = require("./localStorage");
var $analyticsSDK = require("./AnalyticsSDK");
var y = cc._decorator;

function S() {
    if ((!cc.sys.isBrowser && exports.isAd) || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.initAds();
                break;
            case $config.platformEnum.toutiao:
                $toutiao.initAds();
                break;
            case $config.platformEnum.qq:
                $qq.initAds();
                break;
            case $config.platformEnum.oppo:
                $oppo.initAds();
                break;
            case $config.platformEnum.android:
                $android.initAds();
                break;
            case $config.platformEnum.ios:
                $ios.initAds();
                break;
            case $config.platformEnum.ks:
                $ks.initAds();
                break;
            case $config.platformEnum.vivo:
                $vivo.initAds();
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：initAds");
        }
    }
}

function k(e) {
    console.log("showTips : ", e);
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.showTips(e);
                break;
            case $config.platformEnum.toutiao:
                $toutiao.showTips(e);
                break;
            case $config.platformEnum.qq:
                $qq.showTips(e);
                break;
            case $config.platformEnum.oppo:
                $oppo.showTips(e);
                break;
            case $config.platformEnum.android:
                $android.showTips(e);
                break;
            case $config.platformEnum.ios:
                $ios.showTips(e);
                break;
            case $config.platformEnum.ks:
                $ks.showTips(e);
                break;
            case $config.platformEnum.vivo:
                return $vivo.showTips(e);
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：showTips");
        }
    }
}

function b(e, t, n) {
    if (void 0 === e) {
        e = null;
    }
    if (void 0 === t) {
        t = null;
    }
    if (void 0 === n) {
        n = 0;
    }
    if ($config.currentPlatform !== $config.platformEnum.web && cc.sys.isBrowser) {
        e();
    }
    switch ($config.currentPlatform) {
        case $config.platformEnum.wechat:
            $wechat.showShare2(e, t);
            break;
        case $config.platformEnum.toutiao:
            $toutiao.showShare(e, t);
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：showShare");
    }
}

function P(e, t) {
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        console.log("config.currentPlatform===>", $config.currentPlatform);
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao.reportPage(e, t);
                break;
            case $config.platformEnum.wechat:
                $wechat.reportPage(e, t);
                break;
            default:
                console.log("平台未定义埋点");
        }
    }
}
y.ccclass;
y.property;
exports.isAd = !0;
exports.changeIsAd = function () {
    exports.isAd = !exports.isAd;
};
exports.changeIsAdForFalse = function () {
    exports.isAd = !1;
};
exports.changeIsAdForTrue = function () {
    exports.isAd = !0;
};
exports.init = function () {
    if ((!cc.sys.isBrowser && exports.isAd) || $config.currentPlatform === $config.platformEnum.web) {
        console.log("平台接口初始化");
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.init();
                break;
            case $config.platformEnum.toutiao:
                $toutiao.init();
                break;
            case $config.platformEnum.qq:
                $qq.init();
                break;
            case $config.platformEnum.ks:
                $ks.init();
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：init");
        }
        S();
    }
};
exports.getPlatformOpenid = function () {
    return new Promise(function (e) {
        if (cc.sys.isBrowser || $config.currentPlatform !== $config.platformEnum.web) {
            e(null);
        }
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.getWXOpenid().then(function (t) {
                    console.warn("wxopenid---->", t);
                    e(t);
                });
                break;
            case $config.platformEnum.toutiao:
                $oceanengine.getOpenid().then(function (t) {
                    e(t);
                });
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：init");
                e(null);
        }
    });
};
exports.login = function () {
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.login();
                break;
            case $config.platformEnum.toutiao:
                $toutiao.login();
                break;
            case $config.platformEnum.qq:
                $qq.login();
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：init");
        }
    }
};
exports.addshortCut = function () {
    if ((!cc.sys.isBrowser && exports.isAd) || $config.currentPlatform != $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                break;
            case $config.platformEnum.toutiao:
                $toutiao.addshortCut();
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：initAds");
        }
    } else {
        console.log("添加到桌面");
    }
};
exports.initAds = S;
exports.showBannerAD = function (e) {
    if (void 0 === e) {
        e = !0;
    }
};
exports.showInterstitialAd = function () {};
exports.showGridAD = function () {};
exports.showRewardAD = function (e, t) {
    if (void 0 === e) {
        e = function () {};
    }
    if (void 0 === t) {
        t = null;
    }
    console.error("显示广告");
    if (cc.sys.isBrowser || !exports.isAd) {
        return new Promise(function (t) {
            if (e) {
                $commonData.default.watchNailSkinTimes++;
                console.error("===========>>platform 2");
                $publicManager.default.onGetVideoReward();
                e();
            }
            t();
        });
    }
    if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.ELIMINATE && $commonData.default.firstAdNumDay > 0) {
        console.error("开始每日分享1");
        return new Promise(function (t) {
            console.error("开始每日分享2");
            b(function () {
                console.error("开始每日分享3");
                $commonData.default.firstAdNumDay = 0;
                $localStorage.default.setLocalItem("firstAdNumDay", 0);
                e();
                console.error("分享---》", $commonData.default.firstAdNumDay);
            });
            t();
        });
    }
    if ($commonData.default.skinVideoCoupon > 0) {
        $commonData.default.skinVideoCoupon--;
        $battleManager.default.instance.initSkipVideoNode();
        P("UseSkipVideoCoupon", $commonData.default.currLevel);
        k("使用了一张视频跳过券");
        return new Promise(function (t) {
            if (e) {
                $commonData.default.watchNailSkinTimes++;
                console.error("===========>>platform 1");
                $publicManager.default.onGetVideoReward();
                e();
            }
            t();
        });
    }
    switch ($config.currentPlatform) {
        case $config.platformEnum.wechat:
            return $wechat.showRewardAD(e);
        case $config.platformEnum.toutiao:
            return $toutiao.showRewardAD(e);
        case $config.platformEnum.qq:
            return $qq.showRewardAD();
        case $config.platformEnum.oppo:
            return $oppo.showRewardAD(e);
        case $config.platformEnum.ks:
            return $ks.showRewardAD();
        case $config.platformEnum.web:
            return $web.showRewardAd();
        case $config.platformEnum.android:
            return $android.showRewardAD(e, t);
        case $config.platformEnum.vivo:
            return $vivo.showRewardAD(e, t);
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：showRewardAD");
    }
};
exports.recrodSkinData = function () {
    for (var e = 0; e < $commonData.default.nailSkinData.length; e++) {
        if (
            "ad" == $commonData.default.nailSkinData[e].unlockType &&
            $commonData.default.nailSkinData[e].unlockValue <= $commonData.default.watchNailSkinTimes &&
            0 == $commonData.default.nailSkinData[e].isGot
        ) {
            $commonData.default.nailSkinData[e].isGot = !0;
        }
    }
    for (e = 0; e < $commonData.default.screwSkinData.skinData.length; e++) {
        var t = $commonData.default.screwSkinData.describe;
        if (
            "ad" == t[e].unlockType &&
            t[e].unlockValue <= $commonData.default.watchNailSkinTimes &&
            0 == $commonData.default.screwSkinData.skinData[e]
        ) {
            $commonData.default.screwSkinData.skinData[e] = 1;
        }
    }
    $battleManager.default.instance.setArrData("nailSkinData");
    $battleManager.default.instance.setArrData("screwSkinData");
    console.log("==========watchNailSkinTimes", $commonData.default.watchNailSkinTimes);
    cc.sys.localStorage.setItem("watchNailSkinTimes", $commonData.default.watchNailSkinTimes);
};
exports.openShare = function () {
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.openShare();
                break;
            case $config.platformEnum.toutiao:
                $toutiao.openShare();
                break;
            case $config.platformEnum.qq:
                $qq.openShare();
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：openShare");
        }
    }
};
exports.showTips = k;
exports.showShare = function (e, t, n) {
    if (void 0 === e) {
        e = null;
    }
    if (void 0 === t) {
        t = null;
    }
    if (void 0 === n) {
        n = 0;
    }
    if ($config.currentPlatform !== $config.platformEnum.web && cc.sys.isBrowser) {
        e();
    } else {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.showShare(e, t, n);
                break;
            case $config.platformEnum.toutiao:
                $toutiao.showShare(e, t);
                break;
            case $config.platformEnum.qq:
                $qq.showShare(e, t);
                break;
            case $config.platformEnum.ks:
                $ks.showShare(e, t);
                break;
            case $config.platformEnum.web:
                $web.showShare();
                break;
            case $config.platformEnum.android:
                $android.showShare();
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：showShare");
        }
    }
};
exports.showShare2 = b;
exports.setMoreGamesInfo = function () {
    switch ($config.currentPlatform) {
        case $config.platformEnum.toutiao:
            $toutiao.setMoreGamesInfo();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：setMoreGamesInfo");
    }
};
exports.showModal = function (e, t, n, r) {
    if (void 0 === n) {
        n = null;
    }
    if (void 0 === r) {
        r = null;
    }
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.showModal(e, t, n, r);
                break;
            case $config.platformEnum.toutiao:
                $toutiao.showModal(e, t, n, r);
                break;
            case $config.platformEnum.qq:
                $qq.showModal(e, t, n, r);
                break;
            case $config.platformEnum.oppo:
                $oppo.showModal(e, t, n, r);
                break;
            case $config.platformEnum.ks:
                $ks.showModal(e, t, n, r);
                break;
            case $config.platformEnum.vivo:
                return $vivo.showModal(e, t, n, r);
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：showShare");
        }
    }
};
exports.vibrateLong = function () {};
exports.vibrateShort = function () {
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.vibrateShort();
                break;
            case $config.platformEnum.toutiao:
                $toutiao.vibrateShort();
                break;
            case $config.platformEnum.qq:
                $qq.vibrateShort();
                break;
            case $config.platformEnum.vivo:
                $vivo.vibrateShort();
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：showShare");
        }
    }
};
exports.getSystemInfoSync = function () {
    var e = null;
    switch ($config.currentPlatform) {
        case $config.platformEnum.wechat:
            e = $wechat.getSystemInfoSync();
            break;
        case $config.platformEnum.toutiao:
            e = $toutiao.getSystemInfoSync();
            break;
        case $config.platformEnum.qq:
            e = $qq.getSystemInfoSync();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：showShare");
    }
    return e;
};
exports.getSystemInfo = function (e) {
    switch ($config.currentPlatform) {
        case $config.platformEnum.wechat:
            $wechat.getSystemInfo(e);
            break;
        case $config.platformEnum.toutiao:
            $toutiao.getSystemInfo(e);
            break;
        case $config.platformEnum.qq:
            $qq.getSystemInfo(e);
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：showShare");
    }
};
exports.toMiniGame = function (e) {
    switch ($config.currentPlatform) {
        case $config.platformEnum.wechat:
            $wechat.toMiniGame(e);
            break;
        case $config.platformEnum.toutiao:
            $toutiao.toMiniGame();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：showShare");
    }
};
exports.startLp = function () {
    switch ($config.currentPlatform) {
        case $config.platformEnum.toutiao:
            $toutiao.startLp();
            break;
        case $config.platformEnum.ks:
            $ks.startLp();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：startLp");
    }
};
exports.pauseLp = function () {
    switch ($config.currentPlatform) {
        case $config.platformEnum.toutiao:
            $toutiao.pauseLp();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "pauseLp");
    }
};
exports.resumeLp = function () {
    switch ($config.currentPlatform) {
        case $config.platformEnum.toutiao:
            $toutiao.resumeLp();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "resumeLp");
    }
};
exports.stopLp = function () {
    switch ($config.currentPlatform) {
        case $config.platformEnum.toutiao:
            $toutiao.stopLp();
            break;
        case $config.platformEnum.ks:
            $ks.stopLp();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：stopLp");
    }
};
exports.shareLp = function (e, t) {
    if (void 0 === t) {
        t = null;
    }
    if (!cc.sys.isBrowser && exports.isAd) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao.shareLp(e, t);
                break;
            case $config.platformEnum.ks:
                $ks.shareLp(e, t);
                break;
            case $config.platformEnum.web:
                $web.showRewardAd(e, t);
                break;
            case $config.platformEnum.android:
                $android.showRewardAD(e, t);
            case $config.platformEnum.oppo:
                $oppo.showRewardAD(e);
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：shareLp");
        }
    } else {
        e();
    }
};
exports.onHide = function (e) {
    switch ($config.currentPlatform) {
        case $config.platformEnum.wechat:
            $wechat.onHide(e);
            break;
        case $config.platformEnum.toutiao:
            $toutiao.onHide(e);
            break;
        case $config.platformEnum.qq:
            $qq.onHide(e);
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：onHide");
    }
};
exports.onShow = function (e) {
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.onShow(e);
                break;
            case $config.platformEnum.toutiao:
                $toutiao.onShow(e);
                break;
            case $config.platformEnum.qq:
                $qq.onShow(e);
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：onShow");
        }
    }
};
exports.showAppBoxAD = function () {
    switch ($config.currentPlatform) {
        case $config.platformEnum.wechat:
            $qq.showAppBoxAd();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：showAppBoxAD");
    }
};
exports.getRank = function () {
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao.getRankList();
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：getRank");
        }
    }
};
exports.setRank = function (e) {
    console.log("设置排行榜", e);
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao.setScore(e);
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：setRank");
        }
    }
};
exports.exitGame = function () {
    switch ($config.currentPlatform) {
        case $config.platformEnum.android:
            $android.exitGame();
            break;
        default:
            console.log("平台" + $config.currentPlatform + "未定义API：exitGame");
    }
};
exports.showGameDrawerAd = function () {
    if (!cc.sys.isBrowser) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.oppo:
                $oppo.createGameDrawerAd();
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：showGameDrawerAd");
        }
    }
};
exports.hasShortcutInstalled = function (e) {
    if (cc.sys.isBrowser) {
        e.success();
    } else {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
            case $config.platformEnum.toutiao:
            case $config.platformEnum.qq:
                e.success();
                break;
            case $config.platformEnum.oppo:
                $oppo.hasShortcutInstalled(e);
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：login");
        }
    }
};
exports.installShortcut = function (e) {
    if (cc.sys.isBrowser) {
        e.success();
    } else {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
            case $config.platformEnum.toutiao:
            case $config.platformEnum.qq:
                e.success();
                break;
            case $config.platformEnum.oppo:
                $oppo.installShortcut(e);
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：login");
        }
    }
};
exports.getCity = function (e) {
    if (cc.sys.isBrowser && $config.currentPlatform !== $config.platformEnum.web) {
        e("上海市");
    } else {
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao
                    .getLocation3()
                    .catch(function () {
                        e("上海市");
                    })
                    .then(function (t) {
                        e(t);
                    });
        }
    }
};
exports.reportButton = function (e, t, n, c, r) {
    if (void 0 === n) {
        n = 0;
    }
    if (void 0 === c) {
        c = 0;
    }
    if (void 0 === r) {
        r = 5;
    }
    var l = "";
    switch (c) {
        case 0:
        default:
            break;
        case 1:
            l = $commonData.default.GameMode;
    }
    console.error("上报===》", "page", e, ";name", t, ";level", n, ";mode", l, ";type", r);
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao.reportButton(e, t, n, r, l);
                break;
            case $config.platformEnum.wechat:
                $wechat.reportButton(e, t, n, r, l);
                break;
            default:
                console.log("平台未定义埋点");
        }
    }
};
exports.reportPage = P;
exports.reportLevel = function (e, t, n, c, r) {
    if (void 0 === n) {
        n = "normal";
    }
    if (void 0 === c) {
        c = "";
    }
    if (void 0 === r) {
        r = 0;
    }
    console.log("-----dfasfasdfnamsn---上报埋点", e, t, n);
    if (!cc.sys.isBrowser || $config.currentPlatform === $config.platformEnum.web) {
        if ("competition" == n) {
            c = $commonData.default.CompetitionLevel[e].type;
            r = $commonData.default.CompetitionLevel[e].index;
        }
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao.reportPass(e, n, c, r, t);
                break;
            case $config.platformEnum.wechat:
                $wechat.reportPass(e, n, c, r, t);
                break;
            default:
                console.log("平台未定义埋点");
        }
    }
};
exports.reportGameOver = function (e, t, a, c) {
    console.error("上报关卡完成埋点 关卡", e, ",模式", t, ",时间", a, ",结果", c);
    if ((!cc.sys.isBrowser && exports.isAd) || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.reportGameOver(e, t, a, c);
                break;
            default:
                console.log("平台未定义埋点");
        }
    }
};
exports.reportRemain = function () {
    if ((!cc.sys.isBrowser && exports.isAd) || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao.reportRemain();
                break;
            default:
                console.log("平台未定义埋点");
        }
    }
};
exports.requestSubscribe = function () {
    if ((!cc.sys.isBrowser && exports.isAd) || $config.currentPlatform === $config.platformEnum.web) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.toutiao:
                $toutiao.requestSubscribe();
                break;
            default:
                console.log("平台未定义订阅消息");
        }
    }
};
exports.request = function (e, t, n, c, r) {
    if (void 0 === n) {
        n = function () {};
    }
    if (void 0 === c) {
        c = function () {};
    }
    if (void 0 === r) {
        r = "POST";
    }
    if (cc.sys.isBrowser||true) {
        n(null);
    } else {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $wechat.request(e, t, n, c, r);
                break;
            case $config.platformEnum.toutiao:
                $toutiao.request(e, t, n, c, r);
                break;
            case $config.platformEnum.web:
                cc.loader.load(e, function (e, t) {
                    if (e) {
                        cc.error(e);
                        c(e);
                    } else {
                        cc.error(JSON.parse(t));
                        n(t);
                    }
                });
                break;
            default:
                console.log("平台" + $config.currentPlatform + "未定义API：request");
        }
    }
};
exports.completeTrack = function (e, t, n) {
    if (void 0 === n) {
        n = 0;
    }
    if (!cc.sys.isBrowser) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $analyticsSDK.completeTrack(e, t, n);
        }
    }
};
exports.videoTrack = function (e, t, n, a) {
    if (!cc.sys.isBrowser) {
        switch ($config.currentPlatform) {
            case $config.platformEnum.wechat:
                $analyticsSDK.videoTrack(e, t, n, a);
        }
    }
};
