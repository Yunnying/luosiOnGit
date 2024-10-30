var a;
var $chooseModeView = require("./chooseModeView");
var $startView = require("./startView");
var s = cc._decorator;
var u = s.ccclass;
var d =
    (s.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        __extends(t, e);
        t.prototype.clickPlay = function () {
            var e = parseInt(this.node.name);
            console.error("=======name", e);
            switch (e) {
                case 0:
                    $startView.default.instance.clickGraphical();
                    break;
                case 1:
                    $startView.default.instance.clickEliminate();
                    break;
                case 2:
                    $startView.default.instance.clickUnscrewBtn();
                    break;
                case 3:
                    $startView.default.instance.clickCompetition();
                    break;
                case 4:
                    $startView.default.instance.clickIron();
                    break;
                case 5:
                    $startView.default.instance.clickUnlink();
                    break;
                case 6:
                    $startView.default.instance.clickCateGorySort();
                    break;
                case 7:
                    $startView.default.instance.clickPullNail();
            }
            $chooseModeView.default.instance.closeChooseModePnl();
        };
        return __decorate([u], t);
    })(cc.Component));
exports.default = d;
