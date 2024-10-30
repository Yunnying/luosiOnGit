var o;
var $commonData = require("../../scripts/commonData");
var $eliminateProgressManager = require("./EliminateProgressManager");
var c = cc._decorator;
var l = c.ccclass;
var s =
    (c.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        __extends(t, e);
        t.prototype.onDisable = function () {
            $eliminateProgressManager.default.instance.collectNode2.active = $commonData.default.isOpen;
        };
        return __decorate([l], t);
    })(cc.Component));
exports.default = s;
