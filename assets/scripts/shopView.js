var a;
var $commonData = require("./commonData");
var $newSkinView = require("./newSkinView");
var $platform = require("./platform");
var $battleManager = require("./BattleManager");
var $uIManager = require("./UIManager");
var $getSkinView = require("./getSkinView");
var $topView = require("./topView");
var $startView = require("./startView");
var m = cc._decorator;
var g = m.ccclass;
var v = m.property;
var w = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.screwSkinSp = null;
        t.screwSkinBuyBtn = null;
        t.boardPieceBuyBtn = null;
        t.skipVideoBuyBtn = null;
        t.refreshBtn = null;
        t.priceLabel = [];
        t.skipVideoNumLabel = null;
        t.skinVideoNode = [];
        t.basePrice = 1e3;
        t.screwSkinIndex = -1;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onEnable = function () {
        $platform.reportPage("shopPage", 0);
        this.init();
        $startView.default.instance.showGameClubBtn(!1);
        this.initSkipVideoNode();
    };
    t.prototype.initSkipVideoNode = function () {
        if ($commonData.default.skinVideoCoupon > 0) {
            this.skinVideoNode.forEach(function (e) {
                e.active = !0;
            });
        } else {
            this.skinVideoNode.forEach(function (e) {
                e.active = !1;
            });
        }
        this.skipVideoNumLabel.string = "" + $commonData.default.skinVideoCoupon;
    };
    t.prototype.init = function () {
        this.refreshBtn.children[0].getComponent(cc.Label).string = "（" + $commonData.default.refreshNum + "/1）";
        if ($commonData.default.refreshNum >= 1 || this.getScrewSkinNum() >= 7) {
            this.refreshBtn.getComponent(cc.Button).interactable = !1;
        }
        this.priceLabel[0].string = $commonData.default.priceCoefficient[0] * this.basePrice + "";
        this.priceLabel[1].string = $commonData.default.priceCoefficient[1] * this.basePrice + "";
        if (this.isGetAllSkinPiece()) {
            this.boardPieceBuyBtn.children[0].active = !1;
            this.boardPieceBuyBtn.children[1].active = !0;
            this.boardPieceBuyBtn.getComponent(cc.Button).interactable = !1;
        }
        if (this.getScrewSkinNum() >= 8) {
            this.screwSkinBuyBtn.children[0].active = !1;
            this.screwSkinBuyBtn.children[1].active = !0;
        }
        if ($commonData.default.isBuyScrewSkin) {
            this.screwSkinBuyBtn.getComponent(cc.Button).interactable = !1;
        } else {
            this.screwSkinBuyBtn.getComponent(cc.Button).interactable = !0;
        }
        this.skipVideoNumLabel.string = "" + $commonData.default.skinVideoCoupon;
    };
    t.prototype.clickCloseBtn = function () {
        var e;
        var t = this;
        $platform.reportButton("shopPage", "closeBtn");
        if (!(null === (e = this.node.getChildByName("bg").getComponent(cc.Animation)) || void 0 === e)) {
            e.play("disappear");
        }
        this.scheduleOnce(function () {
            t.node.active = !1;
            $startView.default.instance.showGameClubBtn(!0);
        }, 0.2);
    };
    t.prototype.clickBuyScrewSkin = function () {
        if (1 != $commonData.default.screwSkinData.skinData[this.screwSkinIndex]) {
            $commonData.default.goldNum < 3e4
                ? $platform.showTips("金币不足！")
                : ($platform.reportButton("shopPage", "BuyScrewSkinBtn"),
                  ($commonData.default.goldNum -= 3e4),
                  $topView.default.instance.changeGoldNum(),
                  $getSkinView.default.instance.initScrewSkinAni(this.screwSkinIndex, !1),
                  $uIManager.default.instance.showGetSkinPnl(!0),
                  ($commonData.default.isBuyScrewSkin = !0),
                  cc.sys.localStorage.setItem("isBuyScrewSkin", "true"),
                  $battleManager.default.instance.setArrData("screwSkinData"),
                  this.init());
        }
    };
    t.prototype.clickBuyskinVideoCoupon = function () {
        console.log("==============>>>clickBuyskinVideoCoupon");
        if ($commonData.default.goldNum < $commonData.default.priceCoefficient[1] * this.basePrice) {
            $platform.showTips("金币不足！");
        } else {
            $platform.reportButton("shopPage", "BuyskinVideoCouponBtn");
            $commonData.default.goldNum -= $commonData.default.priceCoefficient[1] * this.basePrice;
            $topView.default.instance.changeGoldNum();
            $commonData.default.skinVideoCoupon++;
            $battleManager.default.instance.initSkipVideoNode();
            $getSkinView.default.instance.initSkipVideoCoupon();
            $uIManager.default.instance.showGetSkinPnl(!0);
            $commonData.default.priceCoefficient[1] = 2 * $commonData.default.priceCoefficient[1];
            cc.sys.localStorage.setItem("priceCoefficient_1", $commonData.default.priceCoefficient[1]);
            this.init();
        }
    };
    t.prototype.clickBuySkinPiece = function () {
        if ($commonData.default.goldNum < $commonData.default.priceCoefficient[0] * this.basePrice) {
            $platform.showTips("金币不足！");
        } else {
            if (!this.isGetAllSkinPiece()) {
                $platform.reportButton("shopPage", "BuySkinPieceBtn");
                $commonData.default.goldNum -= $commonData.default.priceCoefficient[0] * this.basePrice;
                $topView.default.instance.changeGoldNum();
                for (var e = Math.floor(6 * Math.random() + 7); $commonData.default.boardSkinData.piece[e] >= 3; ) {
                    e = Math.floor(6 * Math.random() + 7);
                }
                console.log("------随机到的皮肤碎片", e);
                $getSkinView.default.instance.initGetPuzzle(e);
                $getSkinView.default.instance.showGetSkinView();
                $commonData.default.priceCoefficient[0] = 2 * $commonData.default.priceCoefficient[0];
                cc.sys.localStorage.setItem("priceCoefficient_0", $commonData.default.priceCoefficient[0]);
                this.init();
            }
        }
    };
    t.prototype.clickRefresh = function () {
        var e = this;
        $platform.reportButton("shopPage", "RefreshBtn", 0, 0, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("shopPage", "RefreshBtn", 0, 0, 2);
            e.initScrewSkin(!0);
            $commonData.default.refreshNum++;
            cc.sys.localStorage.setItem("refreshNum", $commonData.default.refreshNum);
            cc.sys.localStorage.removeItem("isBuyScrewSkin");
            $commonData.default.isBuyScrewSkin = !1;
            e.init();
        });
    };
    t.prototype.initScrewSkin = function (e) {
        if (void 0 === e) {
            e = !1;
        }
        if (8 != this.getScrewSkinNum()) {
            if (7 == this.getScrewSkinNum()) {
                this.screwSkinIndex = $commonData.default.screwSkinData.skinData.indexOf(0);
                return void (this.screwSkinSp.spriteFrame =
                    $newSkinView.default.instance.screwSkinImg[this.screwSkinIndex]);
            }
            console.log("============>isrefresh", e);
            if (e) {
                for (var t = Math.floor(8 * Math.random()); 1 == $commonData.default.screwSkinData.skinData[t]; ) {
                    t = Math.floor(8 * Math.random());
                }
                this.screwSkinIndex = t;
            } else {
                var n = cc.sys.localStorage.getItem("shopSkinIndex");
                if ("" == n || null == n || null == n) {
                    for (t = Math.floor(8 * Math.random()); 1 == $commonData.default.screwSkinData.skinData[t]; ) {
                        t = Math.floor(8 * Math.random());
                    }
                    this.screwSkinIndex = t;
                } else {
                    this.screwSkinIndex = parseInt(n);
                }
            }
            cc.sys.localStorage.setItem("shopSkinIndex", this.screwSkinIndex);
            this.screwSkinSp.spriteFrame = $newSkinView.default.instance.screwSkinImg[this.screwSkinIndex];
            console.log("===>", $commonData.default.screwSkinData.describe[this.screwSkinIndex].skinName);
        }
    };
    t.prototype.isGetAllSkinPiece = function () {
        var e = 0;
        $commonData.default.boardSkinData.piece.forEach(function (t) {
            e += t;
        });
        console.log("=============>wholePiece", e);
        return e >= 18;
    };
    t.prototype.getScrewSkinNum = function () {
        var e = 0;
        for (var t = 0; t <= 7; t++) {
            if (1 == $commonData.default.screwSkinData.skinData[t]) {
                e++;
            }
        }
        return e;
    };
    t.instance = null;
    __decorate([v(cc.Sprite)], t.prototype, "screwSkinSp", void 0);
    __decorate(
        [
            v({
                type: cc.Node,
                tooltip: "购买螺丝皮肤按钮"
            })
        ],
        t.prototype,
        "screwSkinBuyBtn",
        void 0
    );
    __decorate(
        [
            v({
                type: cc.Node,
                tooltip: "购买皮肤碎片按钮"
            })
        ],
        t.prototype,
        "boardPieceBuyBtn",
        void 0
    );
    __decorate(
        [
            v({
                type: cc.Node,
                tooltip: "购买广告跳过券按钮"
            })
        ],
        t.prototype,
        "skipVideoBuyBtn",
        void 0
    );
    __decorate(
        [
            v({
                type: cc.Node,
                tooltip: "刷新按钮"
            })
        ],
        t.prototype,
        "refreshBtn",
        void 0
    );
    __decorate(
        [
            v({
                type: cc.Label,
                tooltip: "价格label: 0皮肤碎片; 1广告跳过券"
            })
        ],
        t.prototype,
        "priceLabel",
        void 0
    );
    __decorate(
        [
            v({
                type: cc.Label,
                tooltip: "广告跳过券数量"
            })
        ],
        t.prototype,
        "skipVideoNumLabel",
        void 0
    );
    __decorate([v(cc.Node)], t.prototype, "skinVideoNode", void 0);
    return (n = __decorate([g], t));
})(cc.Component);
exports.default = w;
