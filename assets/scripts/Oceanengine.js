exports.getWXOpenid = exports.getOpenid = exports.postVideoSuccess = exports.init = void 0;
var $commonData = require("./commonData");
var $postUserData = require("./PostUserData");
var i = "tt677b11c6f84a401f02";
var c = "";
var r = "";
var l = "";

function s() {
    return new Promise(function (e) {
        tt.login({
            success: function (t) {
                var n;
                if (t.isLogin) {
                    n = t.code;
                } else {
                    n = t.anonymousCode;
                }
                tt.request({
                    url: "https://api.flysheeep.com/api/expro/getttopenid",
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    data: {
                        appid: i,
                        code: n
                    },
                    method: "POST",
                    success: function (t) {
                        var n = t.data.data;
                        console.log("----------------------> get open-id json", n);
                        if (n.openid) {
                            c = n.openid;
                            $commonData.default.openId = c;
                            console.log(
                                "----------------------> openid_get",
                                cc.sys.localStorage.getItem("openid_get")
                            );
                            "true" != cc.sys.localStorage.getItem("openid_get") &&
                                (tt.request({
                                    url: "https://api.flysheeep.com/api/expro/set_ecpm_active_newer",
                                    data: {
                                        openid: c,
                                        clickid: r,
                                        event_type: "active",
                                        adid: "",
                                        creativeid: "",
                                        creativetype: "",
                                        appid: i,
                                        requestid: l
                                    },
                                    header: {
                                        "Content-Type": "application/json;charset=utf-8"
                                    },
                                    method: "POST",
                                    success: function (e) {
                                        cc.sys.localStorage.setItem("openid_get", "true");
                                        console.warn("===== fly sheep api =====(active)=====>>  success >>", e);
                                    },
                                    fail: function (e) {
                                        console.warn("===== fly sheep api =====(active)=====>> fail >>", e);
                                    }
                                }),
                                $postUserData.getUserInformation());
                        } else {
                            if (n.anonymous_openid) {
                                c = n.anonymous_openid;
                                $commonData.default.openId = c;
                            }
                        }
                        console.log("----------------------> get open-id success", c);
                        cc.sys.localStorage.setItem("openid", c);
                        e(c);
                    },
                    fail: function (e) {
                        console.log("------------get openid---------fail-------", e);
                        $postUserData.getUserInformation();
                    }
                });
            },
            fail: function (e) {
                console.log("------------login---------fail-------", e);
            }
        });
    });
}
exports.init = function () {
    console.log("----------巨量引擎初始化");
    (function () {
        var e = tt.getLaunchOptionsSync();
        try {
            console.log("----------------------> getLaunchOptionsSync", e, e.query);
            r = e.query.clickid;
            l = e.query.requestid;
            if (!r) {
                r = "";
            }
            if (!l) {
                l = "";
            }
        } catch (e) {
            console.log("----------------------> get clickId fail");
        }
    })();
    s();
};
exports.postVideoSuccess = function () {
    tt.request({
        url: "https://api.flysheeep.com/api/expro/set_ecpm_addiction_newer",
        data: {
            openid: c,
            clickid: r,
            event_type: "game_addiction",
            mp_id: i
        },
        header: {
            "Content-Type": "application/json;charset=utf-8"
        },
        method: "POST",
        success: function (e) {
            console.warn("===== fly sheep api =====(video ad)=====>> success >>", e);
        },
        fail: function (e) {
            console.warn("===== fly sheep api =====(video ad)=====>> fail >>", e);
        }
    });
};
exports.getOpenid = s;
exports.getWXOpenid = function () {
    return new Promise(function (e) {
        wx.login({
            success: function (t) {
                var n = t.code;
                wx.request({
                    url: "https://api.flysheeep.com/api/expro/getopenid",
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    data: {
                        appid: "wxe81c4bd460b9a891",
                        code: n
                    },
                    method: "POST",
                    success: function (t) {
                        var n = t.data.data;
                        console.log("----------------------> get open-id res", t);
                        console.log("----------------------> get open-id json", n);
                        if (n.openid) {
                            c = n.openid;
                            $commonData.default.openId = c;
                            console.log(
                                "----------------------> openid_get",
                                cc.sys.localStorage.getItem("openid_get")
                            );
                            "true" != cc.sys.localStorage.getItem("openid_get") && $postUserData.getUserInformation();
                        } else {
                            if (n.anonymous_openid) {
                                c = n.anonymous_openid;
                                $commonData.default.openId = c;
                            }
                        }
                        console.log("----------------------> get open-id success", c);
                        cc.sys.localStorage.setItem("openid", c);
                        e(c);
                    },
                    fail: function (e) {
                        console.log("------------get openid---------fail-------", e);
                        $postUserData.getUserInformation();
                    }
                });
            },
            fail: function (e) {
                console.log("------------login---------fail-------", e);
            }
        });
    });
};
