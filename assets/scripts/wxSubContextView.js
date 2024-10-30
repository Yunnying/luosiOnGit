var a;
var $config = require("./config");
var $platform = require("./platform");
var $commonData = require("./commonData");
var $postUserData = require("./PostUserData");
var d = cc._decorator;
var f = d.ccclass;
var p = d.property;
var h = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.rankBox = null;
        t.rankButton = null;
        t.openData = null;
        t.count = 0;
        t.firstclick = !1;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    /*
    t.prototype.onLoad = function () {
        var e = this;
        if ($config.currentPlatform == $config.platformEnum.wechat && "undefined" != typeof wx) {
            this.checkUserInfo();
            this.checkFriendInfo();
            this.rankBox.opacity = 0;
            this.rankBox.active = !0;
            this.openData.getComponent(cc.SubContextView).enabled = !0;
            console.log("--------set SubContextView enabled", !0);
            this.scheduleOnce(function () {
                e.openData.getComponent(cc.SubContextView).enabled = !1;
                console.log("--------set SubContextView enabled", !1);
                e.scheduleOnce(function () {
                    e.rankBox.active = !1;
                }, 0.2);
            }, 0.1);
        }
    };
    t.prototype.clickRank = function () {
        if ($config.currentPlatform == $config.platformEnum.wechat && "undefined" != typeof wx) {
            0 == this.firstclick
                ? (console.log("wxSubContextView----clickRank----"),
                  $commonData.default.getWxUserInfo && $commonData.default.getWxFriendInfo
                      ? (console.log("取得所有权限"), this.showRanks())
                      : (this.initSubContextView(), console.log("没有取得所有权限，获取用户授权")),
                  (this.firstclick = !0))
                : this.showRanks();
        }
    };
    t.prototype.initSubContextView = function () {
        if ($config.currentPlatform == $config.platformEnum.wechat && "undefined" != typeof wx) {
            console.log("wxSubContextView----init----");
            $commonData.default.getWxUserInfo || this.initUserInfoButton();
            $commonData.default.getWxFriendInfo ||
                $commonData.default.getWxFriendInfo ||
                (wx.authorize({
                    scope: "scope.WxFriendInteraction",
                    success: function () {
                        console.log("已获得用户朋友授权");
                        $commonData.default.getWxFriendInfo = !0;
                    },
                    fail: function () {
                        $commonData.default.getWxFriendInfo = !1;
                    }
                }),
                $platform.showTips("请开启微信朋友权限"));
        } else {
            console.log("?");
        }
    };
    t.prototype.checkUserInfo = function () {
        wx.getSetting({
            success: function (e) {
                if (e.authSetting["scope.userInfo"]) {
                    console.log("已获得用户授权");
                    $commonData.default.getWxUserInfo = !0;
                    cc.sys.localStorage.setItem("getWxUserInfo", $commonData.default.getWxUserInfo);
                } else {
                    console.log("未获得用户授权");
                    $commonData.default.getWxUserInfo = !1;
                }
            }
        });
    };
    t.prototype.checkFriendInfo = function () {
        console.log("wxSubContextView----checkFriendInfo");
        wx.getSetting({
            success: function (e) {
                if (e.authSetting["scope.WxFriendInteraction"]) {
                    console.log("已获得用户朋友授权");
                    $commonData.default.getWxFriendInfo = !0;
                } else {
                    $commonData.default.getWxFriendInfo = !1;
                }
            }
        });
    };
    t.prototype.initUserInfoButton = function () {
        var e = this;
        console.log("wxSubContextView----initUserInfoButton----");
        var t = wx.getSystemInfoSync();
        var n = t.windowWidth;
        var o = t.windowHeight;
        var a = wx.createUserInfoButton({
            type: "text",
            text: "",
            style: {
                left: 0,
                top: 0,
                width: n,
                height: o,
                lineHeight: 40,
                backgroundColor: "#00000000",
                color: "#00000000",
                textAlign: "center",
                fontSize: 10,
                borderRadius: 4
            }
        });
        a.onTap(function (t) {
            if (t.userInfo) {
                console.log("authorized success!");
                $commonData.default.UserNickName = t.userInfo.nickName;
                $commonData.default.UserAvatarUrl = t.userInfo.avatarUrl;
                console.log("---------------------取得微信授权", t.userInfo);
                cc.sys.localStorage.setItem("UserAvatar", $commonData.default.UserAvatarUrl);
                cc.sys.localStorage.setItem("UserNickName", $commonData.default.UserNickName);
                "" != $commonData.default.openId && $postUserData.seletPostUserData(["head_url", "nick_name"]);
                e.checkUserInfo();
                $commonData.default.getWxInfo = !0;
            } else {
                $commonData.default.getWxInfo = !0;
                console.log("authorized fail!");
            }
            a.hide();
            a.destroy();
        });
    };
    t.prototype.showRanks = function () {
        var e = this;
        if ($config.currentPlatform == $config.platformEnum.wechat && "undefined" != typeof wx) {
            if (!$commonData.default.getWxUserInfo) {
                $platform.showTips("请开启权限");
                return void this.initSubContextView();
            }
            if (!$commonData.default.getWxFriendInfo) {
                wx.authorize({
                    scope: "scope.WxFriendInteraction",
                    success: function () {
                        console.log("已获得用户朋友授权");
                        $commonData.default.getWxFriendInfo = !0;
                    },
                    fail: function () {
                        $commonData.default.getWxFriendInfo = !1;
                    }
                });
                return void $platform.showTips("请开启微信朋友权限");
            }
            console.log("wxshowranks");
            this.rankBox.opacity = 255;
            this.rankBox.active = !0;
            this.scheduleOnce(function () {
                e.openData.getComponent(cc.SubContextView).enabled = !0;
                console.log("--------set SubContextView enabled", !0);
            }, 0.2);
            this.rankBox.getChildByName("bg").getComponent(cc.Animation).play("appear");
            var t = cc.sys.localStorage.getItem("screwLevel");
            if (!(null != t && null != t && "" != t)) {
                t = "1";
            }
            var n = cc.sys.localStorage.getItem("currentLevel");
            if (!(null != n && null != n && "" != n)) {
                n = "1";
            }
            var o = parseInt(t) - 1 + (parseInt(n) - 1);
            console.warn("主线--->", n);
            console.warn("经典--->", t);
            console.warn("排行榜--->", o);
            if (wx.getSystemInfoSync().SDKVersion >= "1.9.92") {
                console.log("发送消息到子域---1---");
                wx.postMessage({
                    message: o,
                    type: 1
                });
                this.scheduleOnce(function () {
                    if (!$commonData.default.getWxUserInfo) {
                        $platform.showTips("请开启权限");
                        return void e.clickclose();
                    }
                    if (!$commonData.default.getWxFriendInfo) {
                        $platform.showTips("请开启微信朋友权限");
                        e.clickclose();
                    }
                }, 1);
            } else {
                wx.showModal({
                    title: "提示",
                    content: "当前微信版本过低，无法使用排行榜功能，请升级到最新微信版本后重试。"
                });
            }
        } else {
            console.log("?");
        }
    };
    t.prototype.clickclose = function () {
        var e = this;
        this.rankBox.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        $platform.reportButton("rankPage", "closeBtn", $commonData.default.currLevel);
        console.log("发送消息到子域---2---");
        wx.postMessage({
            message: "clear",
            type: 2
        });
        this.scheduleOnce(function () {
            e.openData.getComponent(cc.SubContextView).enabled = !1;
            console.log("--------set SubContextView enabled", !1);
            e.scheduleOnce(function () {
                e.rankBox.active = !1;
            }, 0.2);
        }, 0.2);
    };
    t.prototype.clickShare = function () {
        $platform.reportButton("rankPage", "shareBtn", $commonData.default.currLevel, 3);
        $platform.showShare(
            function () {
                $platform.reportButton("rankPage", "shareBtn_success", $commonData.default.currLevel, 4);
            },
            null,
            1
        );
    };
    */
    t.instance = null;
    __decorate([p(cc.Node)], t.prototype, "rankBox", void 0);
    __decorate([p(cc.Button)], t.prototype, "rankButton", void 0);
    __decorate([p(cc.Node)], t.prototype, "openData", void 0);
    return (n = __decorate([f], t));
})(cc.Component);
exports.default = h;
