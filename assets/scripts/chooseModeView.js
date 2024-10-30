var a;
var $battleManager = require("./BattleManager");
var $commonData = require("./commonData");
var $startView = require("./startView");
var u = cc._decorator;
var d = u.ccclass;
var f = u.property;
var p = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.chooseModeItem = null;
        t.chooseModeSp = [];
        t.content = null;
        t.skinVideoNode = [];
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onEnable = function () {
        this.init();
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
    };
    t.prototype.init = function () {
        var e = this;
        $battleManager.default.instance.initWatchVideoArr();
        this.content.removeAllChildren();
        this.skinVideoNode = [];
        this.chooseModeSp.forEach(function (t, n) {
            var o = cc.instantiate(e.chooseModeItem);
            o.setParent(e.content);
            o.getComponent(cc.Sprite).spriteFrame = t;
            o.name = n + "";
            e.skinVideoNode.push(o.children[1].children[0]);
            if (1 == $commonData.default.watchModeVideo[n]) {
                o.children[1].active = !1;
            }
        });
        this.initSkipVideoNode();
    };
    t.prototype.closeChooseModePnl = function () {
        var e = this;
        this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.node.active = !1;
            $startView.default.instance.showGameClubBtn(!0);
        }, 0.2);
    };
    t.instance = null;
    __decorate(
        [
            f({
                type: cc.Prefab,
                tooltip: "选择模式的预制体"
            })
        ],
        t.prototype,
        "chooseModeItem",
        void 0
    );
    __decorate(
        [
            f({
                type: cc.SpriteFrame,
                tooltip: "0拆图 1打个螺丝儿 2解螺丝 3竞赛 4铁片 5解环 6分类"
            })
        ],
        t.prototype,
        "chooseModeSp",
        void 0
    );
    __decorate(
        [
            f({
                type: cc.Node,
                tooltip: "放预制体的节点"
            })
        ],
        t.prototype,
        "content",
        void 0
    );
    return (n = __decorate([d], t));
})(cc.Component);
exports.default = p;
