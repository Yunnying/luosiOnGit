var a;
var r = cc._decorator;
var l = r.ccclass;
var s = (r.property, require("./commonData"));
var $gameManager = require("./GameManager");
var d = (function (e) {
    function t() {
        return (null !== e && e.apply(this, arguments)) || this;
    }
    __extends(t, e);
    t.prototype.update = function () {
        if (s.default.GameMode == s.GAME_MODE_ENUM.GARAPHICAL) {
            if (this.node.y <= -(967 + this.node.height / 2)) {
                this.node.removeFromParent();
                this.node.destroy();
                s.default.TotalSteel--;
                $gameManager.default.instance.checkSteel();
            }
        } else {
            if (this.node.parent.y <= -(967 + this.node.height / 2)) {
                this.node.parent.removeFromParent();
                this.node.parent.destroy();
                s.default.TotalSteel--;
                $gameManager.default.instance.checkSteel();
            }
        }
    };
    return __decorate([l], t);
})(cc.Component);
exports.default = d;
