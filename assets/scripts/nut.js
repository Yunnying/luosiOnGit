var a;
exports.ENUM_NUT_STATES = void 0;
var r;
var l = cc._decorator;
var s = l.ccclass;
var u = (l.property, require("./commonData"));
var $gameManager = require("./GameManager");
var $unscrew = require("./unscrew");
!(function (e) {
    e.IDLE = "idle";
    e.MOVE = "move";
    e.PARENT_MOVE = "parent_move";
    e.ANI = "ani";
})((r = exports.ENUM_NUT_STATES || (exports.ENUM_NUT_STATES = {})));
var p = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.nutState = r.IDLE;
        return t;
    }
    __extends(t, e);
    t.prototype.clickNut = function () {
        if ($unscrew.default.instance.screw_type == $unscrew.ENUM_SCREW_TYPE.IDLE) {
            u.default.Unscrew_isUnlock ? this.deleteNut() : (this.nutState = r.MOVE);
        }
    };
    t.prototype.deleteNut = function () {
        var e = this;
        $unscrew.default.instance.screw_type = $unscrew.ENUM_SCREW_TYPE.ANI;
        this.nutState = r.ANI;
        var t = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        var n = $gameManager.default.instance.node.convertToNodeSpaceAR(t);
        $gameManager.default.instance.setAniNodePosition(n, 1);
        cc.tween(this.node)
            .to(0.2, {
                scale: 1.2
            })
            .call(function () {
                $gameManager.default.instance.playPullOutAni();
            })
            .to(0.2, {
                scale: 1.3,
                opacity: 0
            })
            .call(function () {
                $unscrew.default.instance.screw_type = $unscrew.ENUM_SCREW_TYPE.IDLE;
                u.default.Unscrew_isUnlock = !1;
                e.node.destroy();
            })
            .start();
    };
    t.prototype.update = function () {
        var e = this;
        if (
            this.nutState == r.MOVE &&
            (($unscrew.default.instance.screw_type = $unscrew.ENUM_SCREW_TYPE.ANI),
            (this.node.y -= 8),
            Math.abs(this.node.x) >= this.node.parent.width / 2 + 20 ||
                Math.abs(this.node.y) >= this.node.parent.height / 2 + 20)
        ) {
            var t = cc.v3(this.node.x, -500);
            this.node.getComponent(cc.BoxCollider).enabled = !1;
            switch (this.node.parent.name.slice(6)) {
                case "left":
                case "right":
                    t = cc.v3(-500, this.node.y);
                    break;
                case "up":
                    t = cc.v3(this.node.x, -500);
                    break;
                case "down":
                    t = cc.v3(this.node.x, 500);
            }
            this.nutState = r.IDLE;
            cc.tween(this.node)
                .to(0.3, {
                    opacity: 0,
                    position: t
                })
                .call(function () {
                    e.node.destroy();
                    $unscrew.default.instance.screw_type = $unscrew.ENUM_SCREW_TYPE.IDLE;
                })
                .start();
        }
    };
    t.prototype.onCollisionEnter = function () {
        var e;
        if (this.nutState == r.MOVE) {
            console.warn("-------自己移动撞到");
            this.nutState = r.IDLE;
            e = cc.moveBy(0.2, cc.v2(0, 20));
            cc.tween(this.node)
                .then(e)
                .call(function () {
                    $unscrew.default.instance.screw_type = $unscrew.ENUM_SCREW_TYPE.IDLE;
                })
                .start();
        } else {
            if (this.nutState == r.PARENT_MOVE) {
                this.nutState = r.IDLE;
                console.warn("--------父节点移动撞到");
                $unscrew.default.instance.screw_type = $unscrew.ENUM_SCREW_TYPE.ANI;
                $unscrew.default.instance.ReturnToOriginalPosition();
            }
        }
    };
    return __decorate([s], t);
})(cc.Component);
exports.default = p;
