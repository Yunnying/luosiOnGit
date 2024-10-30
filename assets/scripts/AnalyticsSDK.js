exports.videoTrack = exports.completeTrack = exports.setSuperProperties = exports.initialize = exports.init = void 0;
var $commonData = require("./commonData");
var a = null;
exports.init = function () {
    var e = {
        accessToken: "eaf9qcegDmtvxp4ajhPr6EIvlMq0nknU",
        clientId: $commonData.default.openId,
        autoTrack: {
            appLaunch: !0,
            appShow: !0,
            appHide: !0
        },
        name: "ge",
        debugMode: "debug"
    };
    return
    (a = new GravityAnalyticsAPI(e)).setupAndStart();
};
exports.initialize = function () {
    console.warn("=====>>> initialize");
    return
    a.initialize({
        name: $commonData.default.openId,
        version: 11,
        openid: $commonData.default.openId,
        enable_sync_attribution: !1
    })
        .then(function (e) {
            console.log("initialize success " + e);
        })
        .catch(function (e) {
            console.log("initialize failed, error is " + e);
        });
};
exports.setSuperProperties = function (e) {
    return
    a.setSuperProperties({
        step: e
    });
};
exports.completeTrack = function (e, t, n) {
    if (void 0 === n) {
        n = 0;
    }
    // a.track("complete", {
    //     level: e,
    //     type: t,
    //     levelnum: n
    // });
};
exports.videoTrack = function (e, t, n, o) {
    // a.track("videoevent", {
    //     name: e,
    //     page: t,
    //     level: n,
    //     state: o
    // });
};
