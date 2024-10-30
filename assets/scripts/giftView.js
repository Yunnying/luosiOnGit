var a;
var $commonData = require("./commonData");
var $topView = require("./topView");
var $platform = require("./platform");
var $config = require("./config");
var d = cc._decorator;
var f = d.ccclass;
var p = d.property;
var h = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.close = null;
        t.getBtn = null;
        t.toSidebar = null;
        t.giftBtn = null;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.start = function () {
        this.giftBtn = cc.find("Canvas").getChildByName("startPnl").getChildByName("BtnNode").getChildByName("giftBtn");
    };
    t.prototype.onEnable = function () {
        console.log("奖励页面");
        this.node.getChildByName("bg").getComponent(cc.Animation).play("appear");
        if ($commonData.default.formSidebarCard) {
            this.getBtn.interactable = !0;
        } else {
            this.getBtn.interactable = !1;
        }
        $platform.reportPage("giftPage", $commonData.default.currLevel);
    };
    t.prototype.clickGet = function () {
        $platform.reportButton("giftPage", "getRewardBtn");
        $commonData.default.goldNum += 100;
        $platform.showTips("恭喜获得100金币");
        $topView.default.instance.changeGoldNum();
        $commonData.default.isGetSidebarCardGift = !0;
        this.giftBtn.active = !1;
        this.clickClose();
        cc.sys.localStorage.setItem("isGetSidebarCardGift", !0);
    };
    t.prototype.goSideBar = function () {
        this.node.active = !1;
        $platform.reportButton("giftPage", "goSideBarCardBtn");
        if (window.tt && $config.currentPlatform == $config.platformEnum.toutiao) {
            tt.navigateToScene({
                scene: "sidebar",
                success: function () {
                    console.log("navigate to scene success");
                },
                fail: function (e) {
                    console.log("navigate to scene fail: ", e);
                }
            });
        }
    };
    t.prototype.clickClose = function () {
        var e = this;
        $platform.reportButton("giftPage", "closeBtn");
        this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.node.active = !1;
        }, 0.2);
    };
    t.instance = null;
    __decorate([p(cc.Node)], t.prototype, "close", void 0);
    __decorate([p(cc.Button)], t.prototype, "getBtn", void 0);
    __decorate([p(cc.Node)], t.prototype, "toSidebar", void 0);
    return (n = __decorate([f], t));
})(cc.Component);
exports.default = h;
