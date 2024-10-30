var a;
var $commonData = require("./commonData");
var $startView = require("./startView");
var s = cc._decorator;
var u = s.ccclass;
var d = s.property;
var f = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.chooseModePnl = null;
        t.chooseLevelPnl = null;
        t.LvEditBox = null;
        t.maxLevelTipsLabel = null;
        t.loadLv = 0;
        t.maxLevel = 0;
        return t;
    }
    __extends(t, e);
    t.prototype.onEnable = function () {
        this.chooseModePnl.active = !0;
        this.chooseLevelPnl.active = !1;
        $startView.default.instance.showGameClubBtn(!1);
    };
    t.prototype.clickModeBtn = function (e, t) {
        console.log("-------------data", t);
        switch (parseInt(t)) {
            case 0:
                $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.NORMAL;
                this.maxLevelTipsLabel.string = "最大关卡：" + $commonData.default.maxLv;
                this.maxLevel = $commonData.default.maxLv;
                break;
            case 1:
                $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.GARAPHICAL;
                this.maxLevelTipsLabel.string = "最大关卡：" + $commonData.default.graphicalMaxLv;
                this.maxLevel = $commonData.default.graphicalMaxLv;
                break;
            case 2:
                $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.ELIMINATE;
                this.maxLevelTipsLabel.string = "最大关卡：" + $commonData.default.eliminateMaxLv;
                this.maxLevel = $commonData.default.eliminateMaxLv;
                break;
            case 3:
                $commonData.default.GameMode = $commonData.GAME_MODE_ENUM.UNSCREW;
                this.maxLevelTipsLabel.string = "最大关卡：" + $commonData.default.unscrewMaxLv;
                this.maxLevel = $commonData.default.unscrewMaxLv;
                case 4:
                    cc.director.loadScene("Edit1");
                    this.clickClose();
                    break;
        }
        this.chooseModePnl.active = !1;
        this.chooseLevelPnl.active = !0;
    };
    t.prototype.clickLoadLv = function () {
        if (!(this.loadLv > this.maxLevel)) {
            $commonData.default.currLevel = this.loadLv;
            console.log("   commonData.currLevel-------", $commonData.default.currLevel);
            switch ($commonData.default.GameMode) {
                case $commonData.GAME_MODE_ENUM.NORMAL:
                    $startView.default.instance.clickPlay(1);
                    break;
                case $commonData.GAME_MODE_ENUM.GARAPHICAL:
                    $startView.default.instance.clickGraphical(1);
                    break;
                case $commonData.GAME_MODE_ENUM.UNSCREW:
                    $startView.default.instance.clickUnscrewBtn(1);
                    break;
                case $commonData.GAME_MODE_ENUM.ELIMINATE:
                    cc.sys.localStorage.setItem("currentLevel", this.loadLv);
                    $commonData.default.eliminatePasslevel = parseInt(cc.sys.localStorage.getItem("currentLevel"));
                    $startView.default.instance.clickEliminate(1);
               
            }
            this.clickClose();
        }
    };
    t.prototype.clickClose = function () {
        this.node.active = !1;
        $startView.default.instance.showGameClubBtn(!0);
    };
    t.prototype.changeBoxString = function () {
        this.loadLv = parseInt(this.LvEditBox.string);
    };
    __decorate([d(cc.Node)], t.prototype, "chooseModePnl", void 0);
    __decorate([d(cc.Node)], t.prototype, "chooseLevelPnl", void 0);
    __decorate([d(cc.EditBox)], t.prototype, "LvEditBox", void 0);
    __decorate([d(cc.Label)], t.prototype, "maxLevelTipsLabel", void 0);
    return __decorate([u], t);
})(cc.Component);
exports.default = f;
