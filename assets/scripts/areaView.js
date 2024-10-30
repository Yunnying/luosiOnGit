var a;
var r = cc._decorator;
var l = r.ccclass;
var s = r.property;
var $commonData = require("./commonData");
var $postUserData = require("./PostUserData");
var f = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.provincePrefab = null;
        t.content = null;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.start = function () {
        this.initProvinceItem();
    };
    t.prototype.initProvinceItem = function () {
        for (var e = 0; e < $commonData.default.provinceArr.length; e++) {
            var t = cc.instantiate(this.provincePrefab);
            t.getChildByName("label").getComponent(cc.Label).string = $commonData.default.provinceArr[e];
            t.name = "" + e;
            t.setParent(this.content);
        }
    };
    t.prototype.chooseProvince = function (e) {
        $commonData.default.myProvinceIndex = e;
        cc.sys.localStorage.setItem("myProvinceIndex", e);
        $postUserData.seletPostUserData(["area"]);
        this.closeAreaView();
    };
    t.prototype.closeAreaView = function () {
        var e = this;
        this.node.getChildByName("bg").getComponent(cc.Animation).play("disappear");
        this.scheduleOnce(function () {
            e.node.active = !1;
        }, 0.2);
    };
    t.instance = null;
    __decorate([s(cc.Prefab)], t.prototype, "provincePrefab", void 0);
    __decorate([s(cc.Node)], t.prototype, "content", void 0);
    return (n = __decorate([l], t));
})(cc.Component);
exports.default = f;
