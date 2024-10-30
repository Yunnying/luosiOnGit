var a;
var r = cc._decorator;
var l = r.ccclass;
var s =
    (r.property,
    (function (e) {
        function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            t.APPID = "";
            t.PATH = "";
            return t;
        }
        __extends(t, e);
        t.prototype.start = function () {};
        t.prototype.clickItem = function () {
            wx.navigateToMiniProgram({
                appId: this.APPID,
                path: this.PATH,
                success: function () {}
            });
        };
        return __decorate([l], t);
    })(cc.Component));
exports.default = s;
