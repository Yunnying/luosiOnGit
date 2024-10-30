var a;
var $platform = require("./platform");
var $commonData = require("./commonData");
var $getSkinView = require("./getSkinView");
var $topView = require("./topView");
var $battleManager = require("./BattleManager");
var $startView = require("./startView");
var $uIManager = require("./UIManager");
var h = cc._decorator;
var m = h.ccclass;
var g = h.property;
var v = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.bg = null;
        t.content = null;
        t.rewardBtn = null;
        t.doubleBtn = null;
        t.signIndex = -1;
        t.signState = -1;
        t.ifDouble = !1;
        t.skipVideoCoupon = null;
        return t;
    }
    __extends(t, e);
    t.prototype.init = function () {
        this.signIndex = $commonData.default.signIndex;
        this.signState = $commonData.default.signState;
        this.ifDouble = 2 !== this.signIndex && 7 !== this.signIndex;
        console.log("第" + this.signIndex + "天，奖励领取状态" + this.signState + "，是否可以双倍领取" + this.ifDouble);
        for (var e = 0; e < this.signIndex - 1; e++) {
            this.content.children[e].getChildByName("get").active = !0;
            this.content.children[e].getChildByName("describe").active = !1;
        }
        if (0 !== this.signState) {
            this.content.children[this.signIndex - 1].getChildByName("get").active = !0;
            this.content.children[this.signIndex - 1].getChildByName("describe").active = !1;
        } else {
            this.content.children[this.signIndex - 1].getChildByName("day_faguang").active = !0;
        }
        this.rewardBtn.interactable = 0 === this.signState;
        this.doubleBtn.interactable = 2 !== this.signState && this.ifDouble;
    };
    t.prototype.onEnable = function () {
        if ($commonData.default.skinVideoCoupon > 0) {
            this.skipVideoCoupon.active = !0;
        } else {
            this.skipVideoCoupon.active = !1;
        }
    };
    t.prototype.show = function () {
        this.init();
        if (!(this.signIndex >= 8)) {
            this.node.active = !0;
            this.bg.getComponent(cc.Animation).play("appear");
            $startView.default.instance.showGameClubBtn(!1);
        }
    };
    t.prototype.hide = function (e) {
        var t = this;
        this.bg.getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            t.node.active = !1;
            $startView.default.instance.isshowSign = !1;
            $startView.default.instance.showGameClubBtn(!0);
            if (e) {
                e();
            }
        }, 0.2);
    };
    t.prototype.getReward = function () {
        switch (this.signIndex) {
            case 1:
            case 4:
                if (this.isGetAllSkinPiece()) {
                    $platform.showTips("已经获取了全部皮肤碎片，获得200金币！");
                    $commonData.default.goldNum += 200;
                    $topView.default.instance.changeGoldNum();
                } else {
                    {
                        for (
                            var e = Math.floor(6 * Math.random() + 7);
                            $commonData.default.boardSkinData.piece[e] >= 3;

                        ) {
                            e = Math.floor(6 * Math.random() + 7);
                        }
                        console.log("------随机到的皮肤碎片", e);
                        $getSkinView.default.instance.initGetPuzzle(e);
                        $getSkinView.default.instance.showGetSkinView();
                    }
                }
                break;
            case 200:
                $getSkinView.default.instance.initScrewSkinAni(14);
                $getSkinView.default.instance.showGetSkinView();
                break;
            case 7:
                // $getSkinView.default.instance.initScrewSkinAni(15);
                // $getSkinView.default.instance.showGetSkinView();
                $commonData.default.goldNum += 3000;
                this.changeGoldNum();
                break;
            case 2:
            case 3:
            case 5:
            case 6:
                $commonData.default.skinVideoCoupon += 1;
                $getSkinView.default.instance.initSkipVideoCoupon();
                $uIManager.default.instance.showGetSkinPnl(!0);
                $battleManager.default.instance.initSkipVideoNode();
        }
    };
    t.prototype.getDoubleReward = function () {
        switch (this.signIndex) {
            case 1:
            case 4:
                if (this.isGetAllSkinPiece()) {
                    $platform.showTips("已经获取了全部皮肤碎片，获得400金币！");
                    $commonData.default.goldNum += 400;
                    $topView.default.instance.changeGoldNum();
                } else {
                    {
                        var e = Math.floor(6 * Math.random() + 7);
                        for (
                            var t = Math.floor(6 * Math.random() + 7);
                            $commonData.default.boardSkinData.piece[e] >= 3;

                        ) {
                            e = Math.floor(6 * Math.random() + 7);
                        }
                        for (
                            ;
                            $commonData.default.boardSkinData.piece[t] >= 3 &&
                            t == e &&
                            $commonData.default.boardSkinData.piece[e] >= 2;

                        ) {
                            t = Math.floor(6 * Math.random() + 7);
                        }
                        console.log("------随机到的皮肤碎片", e, t);
                        $getSkinView.default.instance.initGetPuzzle(e, t);
                        $getSkinView.default.instance.showGetSkinView();
                    }
                }
                break;
            case 2:
                $getSkinView.default.instance.initScrewSkinAni(14);
                $getSkinView.default.instance.showGetSkinView();
                break;
            case 7:
                $getSkinView.default.instance.initScrewSkinAni(15);
                $getSkinView.default.instance.showGetSkinView();
                break;
            case 3:
            case 5:
            case 6:
                $commonData.default.skinVideoCoupon += 2;
                $getSkinView.default.instance.initSkipVideoCoupon(2);
                $uIManager.default.instance.showGetSkinPnl(!0);
                $battleManager.default.instance.initSkipVideoNode();
        }
    };
    t.prototype.onGetReward = function (e) {
        $commonData.default.signState = e;
    };
    t.prototype.onClickClose = function () {
        this.hide();
    };
    t.prototype.onClickReward = function () {
        $platform.reportButton("signPage", "clickRewardBtn");
        this.getReward();
        this.onGetReward(1);
        this.rewardBtn.interactable = !1;
        if (this.signIndex < 7) {
            this.content.children[this.signIndex - 1].getChildByName("get").active = !0;
            this.content.children[this.signIndex - 1].getChildByName("describe").active = !1;
        } else {
            $startView.default.instance.checkSignState();
        }
        this.hide();
    };
    t.prototype.onClickDouble = function () {
        var e = this;
        $platform.reportButton("signPage", "clickDoubleBtn_video", 0, 0, 1);
        $platform.showRewardAD(function () {
            $platform.reportButton("signPage", "clickDoubleBtn_video_success", 0, 0, 2);
            if (1 === e.signState) {
                e.getReward();
            } else {
                e.getDoubleReward();
            }
            e.onGetReward(2);
            console.error("========changeSignBtn");
            e.rewardBtn.interactable = !1;
            e.doubleBtn.interactable = !1;
            e.content.children[e.signIndex - 1].getChildByName("get").active = !0;
            e.content.children[e.signIndex - 1].getChildByName("describe").active = !1;
            e.hide();
        });
    };
    t.prototype.isGetAllSkinPiece = function () {
        var e = 0;
        $commonData.default.boardSkinData.piece.forEach(function (t) {
            e += t;
        });
        return e >= 18;
    };
    __decorate([g(cc.Node)], t.prototype, "bg", void 0);
    __decorate([g(cc.Node)], t.prototype, "content", void 0);
    __decorate([g(cc.Button)], t.prototype, "rewardBtn", void 0);
    __decorate([g(cc.Button)], t.prototype, "doubleBtn", void 0);
    __decorate([g(cc.Node)], t.prototype, "skipVideoCoupon", void 0);
    return __decorate([m], t);
})(cc.Component);
exports.default = v;
