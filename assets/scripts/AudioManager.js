var a;
var r = cc._decorator;
var l = r.ccclass;
var s = r.property;
var $commonData = require("./commonData");
var d = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.groundMusic = null;
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.playGroundMusice = function () {
        if ($commonData.default.musicOn) {
            this.groundMusic.play();
        }
    };
    t.prototype.stopGroundMusice = function () {
        this.groundMusic.stop();
    };
    t.instance = null;
    __decorate(
        [
            s({
                type: cc.AudioSource,
                tooltip: "背景音乐"
            })
        ],
        t.prototype,
        "groundMusic",
        void 0
    );
    return (n = __decorate([l], t));
})(cc.Component);
exports.default = d;
