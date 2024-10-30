var a;
var r = cc._decorator;
var l = r.ccclass;
var s = (r.property, require("./newSkinView"));
//var $showScrewView = require("./showScrewView");
var $commonData = require("./commonData");
var f = (function (e) {
    function t() {
        return (null !== e && e.apply(this, arguments)) || this;
    }
    __extends(t, e);
    t.prototype.clickBgSkinItem = function () {
        var e = parseInt(this.node.name);
        if ($commonData.default.bgSkinData[e].isGot) {
            s.default.instance.equipBgSkin(e);
        } else {
           // $showScrewView.default.instance.showBgSkin(e);
        }
    };
    return __decorate([l], t);
})(cc.Component);
exports.default = f;
