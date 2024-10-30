var a;
var $newSkinView = require("./newSkinView");
var $commonData = require("./commonData");
var $showScrewView = require("./showScrewView");
var $platform = require("./platform");
var $config = require("./config");
var $uIManager = require("./UIManager");
var $topView = require("./topView");
var $getSkinView = require("./getSkinView");
var $battleManager = require("./BattleManager");
var g = cc._decorator;
var v = g.ccclass;
var w =
    (g.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        __extends(t, e);
        t.prototype.clickSkinItem = function () {
            console.log("===========>", $commonData.default.screwSkinData.skinData);
            var e = parseInt(this.node.name);
            if (0 != $commonData.default.screwSkinData.skinData[e]) {
                if ($commonData.default.screwSkinData.currentSkin != e) {
                    console.log("装备===》", e);
                    $newSkinView.default.instance.equipScrewSkin(e);
                }
            } else {
                if (e <= 7) {
                    var t =
                        $commonData.default.screwSkinData.skinProgressTarget[e] -
                        $commonData.default.screwSkinData.skinProgress;
                  //  $showScrewView.default.instance.showScrewSkin(e, "再通关" + t + "次即可解锁皮肤哦！");
                } else {
                    var n = "达成成就即可解锁皮肤哦！";
                    switch (e) {
                        case 12:
                        case 16:
                            n = "";
                            break;
                        case 13:
                            if ($config.currentPlatform == $config.platformEnum.wechat) {
                                n = "邀请好友获得！";
                            }
                            break;
                        case 14:
                        case 15:
                            n = "签到获得！";
                            break;
                        case 17:
                            if ($config.currentPlatform == $config.platformEnum.wechat) {
                                n = "关注公众号获得！";
                            }
                    }
                   // $showScrewView.default.instance.showScrewSkin(e, n);
                }
            }
        };
        t.prototype.clickBuyBtn = function () {
            var e = parseInt(this.node.name);
            if ("coin" == $commonData.default.screwSkinData.describe[e].unlockType) {
                var t = $commonData.default.screwSkinData.describe[e].unlockValue;
                console.log("=================>>数额", t);
                if ($commonData.default.goldNum < t) {
                    $platform.showTips("金币不足！");
                } else {
                    $commonData.default.goldNum -= t;
                    $topView.default.instance.changeGoldNum();
                    $getSkinView.default.instance.initScrewSkinAni(e);
                    $newSkinView.default.instance.initScrewView();
                    $battleManager.default.instance.setArrData("screwSkinData");
                    $uIManager.default.instance.showGetSkinPnl(!0);
                }
            }
        };
        t.prototype.clickShopBtn = function () {
            $uIManager.default.instance.showSkinPnl(!1);
            $uIManager.default.instance.showShopPnl(!0);
        };
        return __decorate([v], t);
    })(cc.Component));
exports.default = w;
