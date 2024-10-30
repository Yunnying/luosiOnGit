var a;
var $platform = require("./platform");
var $config = require("./config");
var $commonData = require("./commonData");
var $shareTitle = require("./ShareTitle");
var $getSkinView = require("./getSkinView");
var $battleManager = require("./BattleManager");
var $topView = require("./topView");
var $startView = require("./startView");
$shareTitle.default;
var m = "https://api.flysheeep.com/api/luosi/get_luosi_invite";
var g = cc._decorator;
var v = g.ccclass;
var w = g.property;
var y = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.bg = null;
        t.rankLabel = null;
        t.reward1 = null;
        t.reward2 = null;
        t.inviteBtn = null;
        t.rewardBtn = null;
        t.progress = null;
        t.progressLabel = null;
        t.targetLabel = null;
        t.getRewardPnl = null;
        t.skinSF = null;
        t.steelPieceSF = null;
        t.videoSkipSF = null;
        t._rank = 4;
        t._progresss = 0;
        t._rewardConfig = [
            ["角色皮肤X1", "广告跳过券X1"],
            ["板子皮肤碎片X2", "广告跳过券X2"],
            ["板子皮肤碎片X3", "广告跳过券X3"],
            ["板子皮肤碎片X4", "广告跳过券X4"],
            ["板子皮肤碎片X5", "广告跳过券X5"]
        ];
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.init = function () {
        this.refreshData();
    };
    t.prototype.show = function () {
        this.init();
        this.node.active = !0;
        this.bg.getComponent(cc.Animation).play("appear");
        $startView.default.instance.showGameClubBtn(!1);
    };
    t.prototype.hide = function (e) {
        var t = this;
        this.bg.getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            t.node.active = !1;
            $startView.default.instance.showGameClubBtn(!0);
            if (e) {
                e();
            }
        }, 0.2);
    };
    t.prototype.refreshData = function () {
        var e = this;
        this.getInviteData().then(function (t) {
            console.error("已经邀请的人数", t);
            var n = 0;
            var o = 0;
            if (t <= 1) {
                n = 1;
                o = t;
                $commonData.default.inviteProgress = 1 - o;
            } else {
                t <= 3
                    ? ((n = 2), (o = t - 1), ($commonData.default.inviteProgress = 2 - o))
                    : t <= 6
                    ? ((n = 3), (o = t - 3), ($commonData.default.inviteProgress = 3 - o))
                    : t <= 10
                    ? ((n = 4), (o = t - 6), ($commonData.default.inviteProgress = 4 - o))
                    : ((n = Math.floor((t - 10) / 5) + 5), (o = t % 5), ($commonData.default.inviteProgress = 5 - o));
            }
            if ($commonData.default.inviteRewardTimes === n) {
                n++;
                o = 0;
            }
            if (n <= 5) {
                $commonData.default.inviteProgress = n - o;
            } else {
                $commonData.default.inviteProgress = 5 - o;
            }
            console.error(
                "当前奖励等阶为 " + n + "，完成进度为 " + o + "，还差" + $commonData.default.inviteProgress + "人"
            );
            e.updateRewardState(n, o);
            $startView.default.instance.changeInviteLabel();
        });
    };
    t.prototype.getInviteData = function () {
        return new Promise(function (e) {
            if ($commonData.default.openId) {
                $config.currentPlatform === $config.platformEnum.wechat
                    ? wx.request({
                          url: m,
                          data: {
                              platform: 19,
                              open_id: $commonData.default.openId
                          },
                          header: {
                              "Content-Type": "application/json;charset=utf-8"
                          },
                          method: "POST",
                          success: function (t) {
                              console.error("getInviteData success", t);
                              if (t.data.data.list) {
                                  e(t.data.data.count);
                              } else {
                                  e(0);
                                  console.error("interface failed");
                                  $platform.showTips("获取数据失败，请稍后重试");
                              }
                          },
                          fail: function (e) {
                              console.error("request failed", e);
                              $platform.showTips("获取数据失败，请稍后重试");
                          }
                      })
                    : $config.currentPlatform === $config.platformEnum.toutiao &&
                      tt.request({
                          url: m,
                          data: {
                              platform: 20,
                              open_id: $commonData.default.openId
                          },
                          header: {
                              "Content-Type": "application/json;charset=utf-8"
                          },
                          method: "POST",
                          success: function (t) {
                              console.log("getInviteData success");
                              if (t.data.data.list) {
                                  e(t.data.data.count);
                              } else {
                                  e(0);
                                  console.error("interface failed");
                                  $platform.showTips("获取数据失败，请稍后重试");
                              }
                          },
                          fail: function () {
                              console.error("request failed");
                              $platform.showTips("获取数据失败，请稍后重试");
                          }
                      });
            } else {
                console.error("no openid");
                $platform.showTips("获取数据失败，请稍后重试");
            }
        });
    };
    t.prototype.updateRewardState = function (e, t) {
        this._rank = e;
        this._progresss = t;
        this.rankLabel.string = e + "阶奖励";
        var n = this._rewardConfig[Math.min(e - 1, 4)];
        var o = [1 === e ? this.skinSF : this.steelPieceSF, this.videoSkipSF];
        this.reward1.getChildByName("label").getComponent(cc.Label).string = n[0];
        this.reward2.getChildByName("label").getComponent(cc.Label).string = n[1];
        this.reward1.getChildByName("img").getComponent(cc.Sprite).spriteFrame = o[0];
        this.reward2.getChildByName("img").getComponent(cc.Sprite).spriteFrame = o[1];
        var a = Math.min(e, 5);
        this.targetLabel.string = a.toString();
        this.progress.fillRange = t / a;
        this.progressLabel.string = t + "/" + a;
        this.rewardBtn.active = t === a;
        this.inviteBtn.active = t !== a;
    };
    t.prototype.onClickClose = function () {
        console.log("----clickclose");
        this.hide();
    };
    t.prototype.onClickInvite = function () {
        var e = $shareTitle.default.getRandomTitle2(0);
        $platform.reportButton("invitePage", "inviteBtn");
        if ($config.currentPlatform === $config.platformEnum.wechat) {
            wx.shareAppMessage({
                title: e,
                imageUrl: $shareTitle.default.getRandomImageUrl(),
                query: "openId=" + $commonData.default.openId
            });
        } else {
            if ($config.currentPlatform === $config.platformEnum.toutiao) {
                tt.shareAppMessage({
                    title: e,
                    imageUrl: $shareTitle.default.getRandomImageUrl(),
                    query: "openId=" + $commonData.default.openId
                });
            }
        }
    };
    t.prototype.onClickReward = function () {
        $platform.reportButton("invitePage", "getRewardBtn_", this._rank);
        this.getReward();
        $commonData.default.inviteRewardTimes++;
        this.refreshData();
    };
    t.prototype.onClickRefresh = function () {
        this.refreshData();
    };
    t.prototype.getReward = function () {
        switch (this._rank) {
            case 1:
                $getSkinView.default.instance.initScrewSkinAni(13);
                $getSkinView.default.instance.showGetSkinView();
                $commonData.default.skinVideoCoupon++;
                $battleManager.default.instance.initSkipVideoNode();
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                this.initGetRewardPnl();
        }
    };
    t.prototype.initGetRewardPnl = function () {
        this.getRewardPnl.active = !0;
        if (!this.getRewardPnl.active) {
            var e = this.getRewardPnl.children[1].children[0];
            var t = this.getRewardPnl.children[1].children[1];
            e.children[0].getComponent(cc.Label).string = "X" + this._rank;
            t.children[0].getComponent(cc.Label).string = "X" + this._rank;
            $commonData.default.skinVideoCoupon += this._rank;
            $battleManager.default.instance.initSkipVideoNode();
            var n = this._rank;
            $commonData.default.screwSkinData.skinData.forEach(function (e, t) {
                if (t >= 7) {
                    for (; e < 3 && n > 0; ) {
                        e++;
                        n--;
                    }
                }
            });
            if (n > 0) {
                $platform.showTips("已获得所有皮肤碎片，转化为" + String(200 * n) + "金币");
                $commonData.default.goldNum += 200 * n;
                $topView.default.instance.changeGoldNum();
            }
            $battleManager.default.instance.setArrData("piece");
        }
    };
    t.prototype.closeGetRewardPnl = function () {
        this.getRewardPnl.active = !1;
    };
    t.instance = null;
    __decorate([w(cc.Node)], t.prototype, "bg", void 0);
    __decorate([w(cc.Label)], t.prototype, "rankLabel", void 0);
    __decorate([w(cc.Node)], t.prototype, "reward1", void 0);
    __decorate([w(cc.Node)], t.prototype, "reward2", void 0);
    __decorate([w(cc.Node)], t.prototype, "inviteBtn", void 0);
    __decorate([w(cc.Node)], t.prototype, "rewardBtn", void 0);
    __decorate([w(cc.Sprite)], t.prototype, "progress", void 0);
    __decorate([w(cc.Label)], t.prototype, "progressLabel", void 0);
    __decorate([w(cc.Label)], t.prototype, "targetLabel", void 0);
    __decorate([w(cc.Node)], t.prototype, "getRewardPnl", void 0);
    __decorate(
        [
            w({
                type: cc.SpriteFrame,
                displayName: "角色皮肤图"
            })
        ],
        t.prototype,
        "skinSF",
        void 0
    );
    __decorate(
        [
            w({
                type: cc.SpriteFrame,
                displayName: "板子碎片图"
            })
        ],
        t.prototype,
        "steelPieceSF",
        void 0
    );
    __decorate(
        [
            w({
                type: cc.SpriteFrame,
                displayName: "广告跳过图"
            })
        ],
        t.prototype,
        "videoSkipSF",
        void 0
    );
    return (n = __decorate([v], t));
})(cc.Component);
exports.default = y;
