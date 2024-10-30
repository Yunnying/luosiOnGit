var a;
var $commonData = require("./commonData");
var $localStorage = require("./localStorage");
var $uIManager = require("./UIManager");
var u = cc._decorator;
var d = u.ccclass;
var f = u.property;
var p = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.NumLabel = null;
        t.whippingBtn = null;
        t.originNum = [13346, 3453];
        return t;
    }
    __extends(t, e);
    t.prototype.onEnable = function () {
        this.originNum[0] = $localStorage.default.getLocalItem("WhippingNum_gra", 13346);
        if (!(null != this.originNum[0] && null != this.originNum[0])) {
            this.originNum[0] = 1336;
            $localStorage.default.setLocalItem("WhippingNum_gra", 13346);
        }
        this.originNum[1] = $localStorage.default.getLocalItem("WhippingNum_eli", 3453);
        if (!(null != this.originNum[1] && null != this.originNum[1])) {
            this.originNum[1] = 1336;
            $localStorage.default.setLocalItem("WhippingNum_eli", 3453);
        }
        console.log(this.originNum);
        this.whippingBtn.interactable = !0;
        switch ($commonData.default.GameMode) {
            case $commonData.GAME_MODE_ENUM.ELIMINATE:
                console.log("ELIMINATE===>", this.originNum[1]);
                this.NumLabel.string = "" + this.originNum[1];
                if ($commonData.default.WhippingNum_eli >= 5) {
                    this.whippingBtn.interactable = !1;
                }
                break;
            case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                console.log("GARAPHICAL===>", this.originNum[0]);
                this.NumLabel.string = "" + this.originNum[0];
                if ($commonData.default.WhippingNum_gra >= 5) {
                    this.whippingBtn.interactable = !1;
                }
                break;
            default:
                console.log("default===>", this.originNum[0]);
                this.NumLabel.string = "" + this.originNum[0];
                if ($commonData.default.WhippingNum_gra >= 5) {
                    this.whippingBtn.interactable = !1;
                }
        }
    };
    t.prototype.clickClose = function () {
        $uIManager.default.instance.showPassAllLevelPnl(!1);
    };
    t.prototype.AddNum = function () {
        if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.GARAPHICAL) {
            $commonData.default.WhippingNum_gra++;
            this.originNum[0]++;
            $localStorage.default.setLocalItem("WhippingNum_gra", this.originNum[0]);
            this.NumLabel.string = "" + this.originNum[0];
            $commonData.default.WhippingNum_gra >= 5 && (this.whippingBtn.interactable = !1);
        } else {
            if ($commonData.default.GameMode == $commonData.GAME_MODE_ENUM.ELIMINATE) {
                $commonData.default.WhippingNum_eli++;
                this.originNum[1]++;
                $localStorage.default.setLocalItem("WhippingNum_eli", this.originNum[1]);
                this.NumLabel.string = "" + this.originNum[1];
                if ($commonData.default.WhippingNum_eli >= 5) {
                    this.whippingBtn.interactable = !1;
                }
            }
        }
    };
    __decorate(
        [
            f({
                type: cc.Label,
                tooltip: "人数"
            })
        ],
        t.prototype,
        "NumLabel",
        void 0
    );
    __decorate(
        [
            f({
                type: cc.Button,
                tooltip: "鞭策按钮"
            })
        ],
        t.prototype,
        "whippingBtn",
        void 0
    );
    return __decorate([d], t);
})(cc.Component);
exports.default = p;
