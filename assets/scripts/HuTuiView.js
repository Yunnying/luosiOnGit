var a;
var $commonData = require("./commonData");
var l = cc._decorator;
var s = l.ccclass;
var u = l.property;
var d = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.content = null;
        t.HuTuiItem = null;
        return t;
    }
    __extends(t, e);
    t.prototype.onLoad = function () {
        this.initHuTui();
    };
    t.prototype.start = function () {};
    t.prototype.initHuTui = function () {
        if ($commonData.default.HuTuiData) {
            for (var e = 0; e < $commonData.default.HuTuiData.length; e++) {
                var t = cc.instantiate(this.HuTuiItem);
                this.loadRemoteImg(
                    $commonData.default.HuTuiData[e].gameUrl,
                    t.getChildByName("img").getComponent(cc.Sprite)
                );
                t.getChildByName("tittle").getComponent(cc.Label).string = $commonData.default.HuTuiData[e].gameName;
                t.getComponent("HuTuiitemView").APPID = $commonData.default.HuTuiData[e].gameElect;
                t.getComponent("HuTuiitemView").PATH = $commonData.default.HuTuiData[e].gamePath;
                t.setParent(this.content);
            }
        }
    };
    t.prototype.loadRemoteImg = function (e, t) {
        cc.loader.load(e, function (e, n) {
            if (!e) {
                var o = new cc.SpriteFrame(n);
                t.spriteFrame = o;
            }
        });
    };
    t.prototype.close = function () {
        this.node.active = !1;
    };
    __decorate([u(cc.Node)], t.prototype, "content", void 0);
    __decorate([u(cc.Prefab)], t.prototype, "HuTuiItem", void 0);
    return __decorate([s], t);
})(cc.Component);
exports.default = d;
