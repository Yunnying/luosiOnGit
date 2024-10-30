var a;
var r = cc._decorator;
var l = r.ccclass;
var s = (r.property, require("./itemView"));
var u = (function (e) {
    function t() {
        return (null !== e && e.apply(this, arguments)) || this;
    }
    __extends(t, e);
    t.prototype.start = function () {
        console.log("lockstart");
    };
    t.prototype.clickLock = function () {
        console.log("clickLock");
        s.default.instance.clickDigHole();
    };
    return __decorate([l], t);
})(cc.Component);
exports.default = u;
