var a;
var $battleManager = require("./BattleManager");
var $commonData = require("./commonData");
var $platform = require("./platform");
var $postUserData = require("./PostUserData");
var $topView = require("./topView");
var f = cc._decorator;
var p = f.ccclass;
var h = f.property;
var m = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.boxPnl = null;
        t.piecePnl = null;
        t.box = null;
        t.rewardTitle = null;
        t.rewardSprite = null;
        t.box_open = null;
        t.box_close = null;
        t.goldImg = null;
        t.pieceIndex = -1;
        t.rewardType = 0;
        return t;
    }
    __extends(t, e);
    t.prototype.onEnable = function () {
        this.boxPnl.active = !0;
        this.box.scale = 1;
        this.box.opacity = 255;
        this.box.getComponent(cc.Sprite).spriteFrame = this.box_close;
        this.piecePnl.active = !1;
        this.giftAnim();
        this.initReward();
    };
    t.prototype.clickBox = function () {
        this.stopGiftAnim();
    };
    t.prototype.initReward = function () {
        if (Math.random() < 0.4) {
            this.rewardType = 0;
            this.rewardSprite.spriteFrame = this.goldImg;
            this.rewardTitle.string = "金币X100";
        } else {
            {
                this.rewardType = 1;
                this.rewardTitle.string = "皮肤碎片X1";
                var e = Math.floor(6 * Math.random() + 7);
                this.rewardSprite.spriteFrame = $commonData.default.skinPieceImgArr[e - 7 + 6];
                this.pieceIndex = e;
                console.log("-----------开出来的皮肤碎片", this.pieceIndex);
            }
        }
        $platform.reportPage("comp_treasurePage_" + this.rewardType, 0);
    };
    t.prototype.clickPiece = function () {
        if (0 == this.rewardType) {
            $commonData.default.goldNum += 100;
            $platform.showTips("恭喜获得100金币！");
            $topView.default.instance.changeGoldNum();
        } else {
            if (1 == this.rewardType) {
                $commonData.default.boardSkinData.piece[this.pieceIndex] >= 3
                    ? (($commonData.default.goldNum += 500),
                      $platform.showTips("已获得该皮肤，获得500金币！"),
                      $topView.default.instance.changeGoldNum())
                    : ($commonData.default.boardSkinData.piece[this.pieceIndex]++,
                      $platform.showTips("恭喜获得皮肤碎片！"),
                      "" != $commonData.default.openId && $postUserData.seletPostUserData(["skin_debris"]),
                      $battleManager.default.instance.setArrData("piece"));
            }
        }
        this.node.active = !1;
    };
    t.prototype.showPiecePnl = function () {
        this.rewardSprite.node.scale = 0;
        this.piecePnl.active = !0;
        cc.tween(this.rewardSprite.node)
            .to(0.3, {
                scale: 1
            })
            .start();
    };
    t.prototype.giftAnim = function () {
        this.giftAnim[0] = cc.repeatForever(
            cc.sequence(
                cc.rotateTo(0.18, 10),
                cc.rotateTo(0.18, -10),
                cc.rotateTo(0.18, 8),
                cc.rotateTo(0.18, -8),
                cc.rotateTo(0.18, 4),
                cc.rotateTo(0.18, 0),
                cc.rotateTo(0.5, 0)
            )
        );
        this.box.runAction(this.giftAnim[0]);
    };
    t.prototype.stopGiftAnim = function () {
        var e = this;
        this.box.stopAction(this.giftAnim[0]);
        cc.tween(this.box)
            .to(0.1, {
                angle: 0
            })
            .to(0.3, {
                scale: 0.85
            })
            .call(function () {
                e.box.getComponent(cc.Sprite).spriteFrame = e.box_open;
                $battleManager.default.instance.playBoxOpenSound();
            })
            .to(0.3, {
                scale: 1.05
            })
            .delay(0.2)
            .to(0.1, {
                scale: 0,
                opacity: 0
            })
            .call(function () {
                e.boxPnl.active = !1;
                e.showPiecePnl();
            })
            .start();
    };
    __decorate([h(cc.Node)], t.prototype, "boxPnl", void 0);
    __decorate([h(cc.Node)], t.prototype, "piecePnl", void 0);
    __decorate([h(cc.Node)], t.prototype, "box", void 0);
    __decorate([h(cc.Label)], t.prototype, "rewardTitle", void 0);
    __decorate([h(cc.Sprite)], t.prototype, "rewardSprite", void 0);
    __decorate([h(cc.SpriteFrame)], t.prototype, "box_open", void 0);
    __decorate([h(cc.SpriteFrame)], t.prototype, "box_close", void 0);
    __decorate([h(cc.SpriteFrame)], t.prototype, "goldImg", void 0);
    return __decorate([p], t);
})(cc.Component);
exports.default = m;
