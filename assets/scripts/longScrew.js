var a;
var r = cc._decorator;
var l = r.ccclass;
var s = (r.property, require("./commonData"));
var $unscrew = require("./unscrew");
var d = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.isDelete = !1;
        return t;
    }
    __extends(t, e);
    t.prototype.clickLongScrew = function () {
        $unscrew.default.instance.clickScrew(this.node);
    };
    t.prototype.onCollisionEnter = function (e, t) {
        if ($unscrew.default.instance.screw_type == $unscrew.ENUM_SCREW_TYPE.BAKCANI) {
            cc.Tween.stopAllByTarget($unscrew.default.instance.moveScrew);
            $unscrew.default.instance.ReturnToOriginalPosition();
        }
        if ($unscrew.default.instance.screw_type == $unscrew.ENUM_SCREW_TYPE.MOVE) {
            console.log("---------on collision enter");
            $unscrew.default.instance.screw_type = $unscrew.ENUM_SCREW_TYPE.ANI;
            "nut" == e.name.slice(0, 3) ? this.playAni(e.node.parent) : this.playAni(e.node);
            this.playAni(t.node);
        }
    };
    t.prototype.playAni = function (e) {
        if ("left" == e.name.slice(6) || "right" == e.name.slice(6)) {
            this.playAniHorizontal(e);
        } else {
            if (!("up" != e.name.slice(6) && "down" != e.name.slice(6))) {
                this.playAniVertical(e);
            }
        }
    };
    t.prototype.playAniVertical = function (e) {
        var t = e.getPosition();
        cc.tween(e)
            .to(
                0.1,
                {
                    position: new cc.Vec3(t.x + 5, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.1,
                {
                    position: new cc.Vec3(t.x - 5, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.05,
                {
                    position: new cc.Vec3(t.x + 8, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.05,
                {
                    position: new cc.Vec3(t.x - 8, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.02,
                {
                    position: new cc.Vec3(t.x, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .call(function () {
                $unscrew.default.instance.ReturnToOriginalPosition();
            })
            .start();
    };
    t.prototype.playAniHorizontal = function (e) {
        var t = e.getPosition();
        cc.tween(e)
            .to(
                0.1,
                {
                    position: new cc.Vec3(t.x, t.y + 5, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.1,
                {
                    position: new cc.Vec3(t.x, t.y - 5, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.05,
                {
                    position: new cc.Vec3(t.x, t.y + 8, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.05,
                {
                    position: new cc.Vec3(t.x, t.y - 8, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .to(
                0.02,
                {
                    position: new cc.Vec3(t.x, t.y, 0)
                },
                {
                    easing: "quadInOut"
                }
            )
            .call(function () {
                $unscrew.default.instance.ReturnToOriginalPosition();
            })
            .start();
    };
    t.prototype.update = function () {
        if (
            !this.isDelete &&
            $unscrew.default.instance.isLoadData &&
            (Math.abs(this.node.x) > s.default.windowWidth / 2 + 200 ||
                Math.abs(this.node.y) > s.default.windowHeight / 2)
        ) {
            console.log("---------删除节点");
            this.isDelete = !0;
            cc.tween(this.node)
                .to(0.2, {
                    opacity: 0
                })
                .call(function () {
                    $unscrew.default.instance.deleteScrew();
                })
                .start();
        }
    };
    return __decorate([l], t);
})(cc.Component);
exports.default = d;
