var a;
var $commonData = require("./commonData");
var l = cc._decorator;
var s = l.ccclass;
var u = (l.property, require("./startView"));
var d = (function (e) {
    function t() {
        return (null !== e && e.apply(this, arguments)) || this;
    }
    __extends(t, e);
    t.prototype.clickLvBtn = function () {
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.CHALLENGE) {
            $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.NORMAL;
        }
        var e = parseInt(this.node.name);
        u.default.instance.loadLv(e);
    };
    return __decorate([s], t);
})(cc.Component);
exports.default = d;
