var o;
exports.isTouTiaoPlatform =
    exports.isWeChatPlatform =
    exports.isOpenLog =
    exports.SUB_PACKAGE =
    exports.platform_APPName =
    exports.platform_APPID =
    exports.currentPlatform =
    exports.platformEnum =
        void 0;
(function (e) {
    e[(e.wechat = 1)] = "wechat";
    e[(e.toutiao = 2)] = "toutiao";
    e[(e.qq = 3)] = "qq";
    e[(e.oppo = 4)] = "oppo";
    e[(e.meizu = 5)] = "meizu";
    e[(e.vivo = 6)] = "vivo";
    e[(e.android = 7)] = "android";
    e[(e.ios = 8)] = "ios";
    e[(e.huawei = 9)] = "huawei";
    e[(e.native = 10)] = "native";
    e[(e.web = 11)] = "web";
    e[(e.ks = 12)] = "ks";
})((o = exports.platformEnum || (exports.platformEnum = {})));
cc.Enum(o);
exports.currentPlatform = o.wechat;
(function (e) {
    e.wechat_ID = "wxf49b0a26d9405058";
    e.toutiao_ID = "tt60981625ffa5581f02";
    e.qq_ID = "";
    e.oppo_ID = "";
    e.vivo_ID = "";
    e.android_ID = "";
    e.ios_ID = "";
})(exports.platform_APPID || (exports.platform_APPID = {}));
(function (e) {
    e.wechat_Name = "   ";
    e.toutiao_Name = " ";
    e.qq_Name = " ";
    e.oppo_Name = " ";
    e.vivo_Name = " ";
    e.android_Name = " ";
    e.ios_Name = " ";
})(exports.platform_APPName || (exports.platform_APPName = {}));
exports.isWeChatPlatform = function () {
    return cc.sys.platform === cc.sys.WECHAT_GAME && exports.currentPlatform == o.wechat;
};
exports.isTouTiaoPlatform = function () {
    return exports.currentPlatform === o.toutiao;
};
