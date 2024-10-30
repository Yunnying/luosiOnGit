module.exports = {
    umKey: "662f74cb940d5a4c494b8cc9",
    wxgamecid: "",
    init: function () {
        return
        if (CC_WECHATGAME) {
            wx.uma.init({
                appKey: this.umKey,
                useOpenid: !1,
                autoGetOpenid: !1,
                debug: !0
            });
            var e = wx.getLaunchOptionsSync().query.wxgamecid;
            this.wxgamecid = e || "self";
            console.log("-------------wx.uma.init------------");
        }
    },
    reportAnalytics: function (e, t) {
        console.error("打点事件",e,t)
        return
        if (CC_WECHATGAME) {
            wx.uma.trackEvent(e, t);
        }
    },
    channelReportAnalytics: function (e, t, n) {
        console.error("打点事件",e,t,n)
        return
        if (CC_WECHATGAME) {
            wx.uma.trackEvent(e, {
                wxgamecid: this.wxgamecid,
                state: t,
                jump: n
            });
        }
    }
};
