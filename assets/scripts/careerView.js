var a;
var $commonData = require("./commonData");
var $config = require("./config");
var s = cc._decorator;
var u = s.ccclass;
var d = s.property;
var f = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.dataLabel = [];
        t.userAvatar = null;
        t.userName = null;
        return t;
    }
    __extends(t, e);
    t.prototype.onEnable = function () {
        this.init();
    };
    t.prototype.init = function () {
        this.dataLabel[0].string = $commonData.default.passLevel + "";
        this.dataLabel[1].string = $commonData.default.AchievementData.TotalRemoveSteel + "";
        var e = $commonData.default.boardSkinData.skinData.filter(function (e) {
            return 1 == e;
        });
        this.dataLabel[2].string = e.length + "";
        var t = $commonData.default.screwSkinData.skinData.filter(function (e) {
            return 1 == e;
        });
        this.dataLabel[3].string = t.length + "";
        var n = 0;
        for (var o = 0; o < $commonData.default.boardSkinData.piece.length; o++) {
            n += $commonData.default.boardSkinData.piece[o];
        }
        if (isNaN(n)) {
            n = 0;
        }
        this.dataLabel[4].string = n + "";
        if ($config.currentPlatform == $config.platformEnum.toutiao && window.tt) {
            if (0 == $commonData.default.getTTUserInfo) {
                this.userName.string = "匿名用户";
            } else {
                {
                    this.userName.string = $commonData.default.UserNickName;
                    var a = tt.createImage();
                    this.createUserAvatar(a);
                }
            }
        } else {
            if ($config.currentPlatform == $config.platformEnum.wechat && window.wx) {
                0 == $commonData.default.getWxUserInfo
                    ? (this.userName.string = "匿名用户")
                    : ((this.userName.string = $commonData.default.UserNickName),
                      (a = wx.createImage()),
                      this.createUserAvatar(a));
            }
        }
    };
    t.prototype.createUserAvatar = function (e) {
        var t = this;
        e.src = $commonData.default.UserAvatarUrl;
        e.width = 105;
        e.height = 105;
        e.onload = function () {
            console.log("用户头像加载成功");
            var n = new cc.SpriteFrame();
            var o = new cc.Texture2D();
            o.initWithElement(e);
            n.setTexture(o);
            t.userAvatar.spriteFrame = n;
        };
    };
    t.prototype.clickclose = function () {
        var e = this;
        this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.node.active = !1;
        }, 0.2);
    };
    __decorate(
        [
            d({
                type: [cc.Label],
                tooltip: "数据展示label\n 0关卡进度 1累计消除 2长板条纹 3角色服装 4皮肤碎片"
            })
        ],
        t.prototype,
        "dataLabel",
        void 0
    );
    __decorate([d(cc.Sprite)], t.prototype, "userAvatar", void 0);
    __decorate([d(cc.Label)], t.prototype, "userName", void 0);
    return __decorate([u], t);
})(cc.Component);
exports.default = f;
