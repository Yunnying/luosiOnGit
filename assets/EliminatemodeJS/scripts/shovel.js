var o;
var $eliminateGamelevel = require("./EliminateGamelevel");
var a = cc._decorator;
var c = a.ccclass;
var l =
    (a.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        __extends(t, e);
        t.prototype.onCollisionEnter = function (e) {
            console.log("------onCollisionEnter");
            if ("screw" == e.node.name.slice(0, 5)) {
                $eliminateGamelevel.default.instance.moveScrewToSpecifiedBox(e.node);
            }
        };
        return __decorate([c], t);
    })(cc.Component));
exports.default = l;
