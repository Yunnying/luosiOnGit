var a;
var $commonData = require("./commonData");
var l = cc._decorator;
var s = l.ccclass;
var u =
    (l.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        var n;
        __extends(t, e);
        n = t;
        t.prototype.clickScrew = function () {
            if ($commonData.default.upScrew == this.node.name) {
                this.clickDown();
            } else {
                "" != $commonData.default.upScrew &&
                    this.node.parent.getChildByName($commonData.default.upScrew).getComponent(n).clickDown();
                this.clickUp();
            }
        };
        t.prototype.clickUp = function () {
            console.log("抬起螺丝", this.node.name);
            $commonData.default.upScrew = this.node.name;
        };
        t.prototype.clickDown = function () {
            console.log("放下螺丝", this.node.name);
            $commonData.default.upScrew = "";
        };
        return (n = __decorate([s], t));
    })(cc.Component));
exports.default = u;
