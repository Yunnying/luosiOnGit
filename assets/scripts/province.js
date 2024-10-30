var a;
var r = cc._decorator;
var l = r.ccclass;
var s = (r.property, require("./areaView"));
var u = (function (e) {
    function t() {
        return (null !== e && e.apply(this, arguments)) || this;
    }
    __extends(t, e);
    t.prototype.clickProvince = function () {
        var e = parseInt(this.node.name);
        s.default.instance.chooseProvince(e);
    };
    return __decorate([l], t);
})(cc.Component);
exports.default = u;
