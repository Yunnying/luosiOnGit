var a;
var r = cc._decorator;
var l = r.ccclass;
var s =
    (r.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        __extends(t, e);
        t.prototype.onEnable = function () {
            this.node.getChildByName("bg").getComponent(cc.Animation).play("appear");
        };
        return __decorate([l], t);
    })(cc.Component));
exports.default = s;
