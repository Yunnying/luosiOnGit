var o;
var $eliminateGamelevel = require("./EliminateGamelevel");
var a = cc._decorator;
var c = a.ccclass;
var l =
    (a.property,
    (function (e) {
        function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            t.revoluteJointArray = [];
            return t;
        }
        __extends(t, e);
        t.prototype.getScrewNum = function () {
            this.revoluteJointArray = this.node.getComponents(cc.RevoluteJoint);
            var e = 0;
            this.revoluteJointArray.forEach(function (t) {
                if (t.connectedBody.node) {
                    e++;
                }
            });
            return e;
        };
        t.prototype.update = function () {
            if (this.node.y <= -(900 + this.node.height / 2)) {
                if (1 == this.node.parent.childrenCount) {
                    this.node.removeFromParent();
                    console.log("????");
                    $eliminateGamelevel.default.instance.setBoxFade();
                }
                $eliminateGamelevel.default.instance.showBreakPropWindow();
                this.node.destroy();
            }
        };
        return __decorate([c], t);
    })(cc.Component));
exports.default = l;
