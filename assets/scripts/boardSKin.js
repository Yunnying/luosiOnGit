var a;
var $newSkinView = require("./newSkinView");
var $commonData = require("./commonData");
var s = cc._decorator;
var u = s.ccclass;
var d =
    (s.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        __extends(t, e);
        t.prototype.clickUse = function () {
            var e = parseInt(this.node.name);
            if (
                0 != $commonData.default.boardSkinData.skinData[e] &&
                $commonData.default.boardSkinData.currentSkin != e
            ) {
                $newSkinView.default.instance.changeBoardSkin(e);
            }
        };
        t.prototype.clickActive = function () {
            var e = parseInt(this.node.name);
            $newSkinView.default.instance.changeActive(e);
        };
        return __decorate([u], t);
    })(cc.Component));
exports.default = d;
