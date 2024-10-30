var a;
exports.ENUM_SCREW_TYPE = void 0;
var r;
var l = cc._decorator;
var s = l.ccclass;
var u = l.property;
var $nut = require("./nut");
var $commonData = require("./commonData");
var $game = require("./Game");
var $startView = require("./startView");
var $gameManager = require("./GameManager");
var $platform = require("./platform");
!(function (e) {
    e.IDLE = "idle";
    e.MOVE = "move";
    e.ANI = "ani";
    e.BAKCANI = "backAni";
})((r = exports.ENUM_SCREW_TYPE || (exports.ENUM_SCREW_TYPE = {})));
var v = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.connectNode = null;
        t.screwNode = null;
        t.connectPre = null;
        t.screwPre = [];
        t.nutPre = null;
        t.screw_type = r.IDLE;
        t.moveScrew = null;
        t.screwNum = 0;
        t.levelConfig = null;
        t.isLoadData = !1;
        t.nutNodeArr = [];
        n.instance = t;
        return t;
    }
    var n;
    __extends(t, e);
    n = t;
    t.prototype.onLoad = function () {
        this.init();
    };
    t.prototype.init = function () {
        cc.director.getCollisionManager().enabled = !1;
        this.initData();
        this.createLevel();
    };
    t.prototype.initData = function () {
        this.nutNodeArr = [];
        this.levelConfig = $commonData.default.unscrewLevelConfig[$commonData.default.currLevel];
        this.screwNum = this.levelConfig.screw.length;
        $commonData.default.LevelSteel = this.screwNum;
        $commonData.default.TotalSteel = this.screwNum;
        this.isLoadData = !1;
        $commonData.default.isgameing = !0;
        $commonData.default.Unscrew_isUnlock = !1;
    };
    t.prototype.createLevel = function () {
        this.node.scale = this.levelConfig.scale;
        for (var e = 0; e < this.levelConfig.connect.length; e++) {
            var t = this.levelConfig.connect[e];
            var n = cc.instantiate(this.connectPre);
            n.setPosition(t.position.x, t.position.y);
            n.opacity = 0;
            n.setParent(this.connectNode);
        }
        for (e = 0; e < this.screwNum; e++) {
            var o = this.levelConfig.screw[e];
            var a = cc.instantiate(this.screwPre[o.direction]);
            a.setPosition(o.position.x, o.position.y);
            var i = "screw/" + o.color + "/" + o.color + "_" + o.size;
            this.loadTexture(i, a);
            this.setCollision(a, o.size);
            a.opacity = 0;
            a.setParent(this.screwNode);
            for (var c = 0; c < o.nutArr.length; c++) {
                var r = o.nutArr[c];
                var l = cc.instantiate(this.nutPre);
                var s = "nut/" + o.color;
                this.loadTexture(s, l);
                l.setPosition(r.position.x, r.position.y);
                l.setParent(a);
                l.opacity = 0;
                this.nutNodeArr.push(l);
            }
        }
        $startView.default.instance.loadImg.active = !1;
        this.ScrewAni();
    };
    t.prototype.ScrewAni = function () {
        var e = this;
        var t = function (t) {
            var o = n.screwNode.children[t];
            var a = n.levelConfig.screw[t];
            var i = cc.v2(o.position);
            switch (a.direction) {
                case 0:
                    o.setPosition(2e3, i.y);
                    break;
                case 1:
                    o.setPosition(i.x, -2e3);
                    break;
                case 2:
                    o.setPosition(-2e3, i.y);
                    break;
                case 3:
                    o.setPosition(i.x, 2e3);
            }
            var c = cc.moveTo(0.5, i);
            o.opacity = 255;
            n.scheduleOnce(function () {
                cc.tween(o)
                    .then(c)
                    .call(function () {
                        if (t == e.levelConfig.screw.length - 1) {
                            e.nutAni();
                        }
                    })
                    .start();
            }, 0.1 * t);
        };
        var n = this;
        for (var o = 0; o < this.screwNum; o++) {
            t(o);
        }
    };
    t.prototype.nutAni = function () {
        var e = this;
        var t = function (t) {
            var o = n.nutNodeArr[t];
            var a = o.position;
            if ("nut_v" == o.name) {
                o.setPosition(o.parent.width / 2 + 20, 0);
            } else {
                o.setPosition(0, -o.parent.height / 2 - 20);
            }
            cc.tween(o)
                .to(0.3, {
                    opacity: 255
                })
                .to(0.5, {
                    position: a
                })
                .call(function () {
                    if (t == e.nutNodeArr.length - 1) {
                        e.connectAni();
                    }
                })
                .start();
        };
        var n = this;
        for (var o = 0; o < this.nutNodeArr.length; o++) {
            t(o);
        }
    };
    t.prototype.connectAni = function () {
        var e = this;
        var t = function (t) {
            var o = n.connectNode.children[t];
            o.scale = 1.1;
            cc.tween(o)
                .delay(0.2)
                .to(0.2, {
                    opacity: 255
                })
                .to(0.3, {
                    scale: 0.8
                })
                .call(function () {
                    if (t == e.connectNode.children.length - 1) {
                        e.startGame();
                    }
                })
                .start();
        };
        var n = this;
        for (var o = 0; o < this.connectNode.children.length; o++) {
            t(o);
        }
    };
    t.prototype.startGame = function () {
        this.isLoadData = !0;
        $gameManager.default.instance.hideMask();
        cc.director.getCollisionManager().enabled = !0;
        $commonData.default.isPause = !1;
    };
    t.prototype.clickScrew = function (e) {
        if (this.screw_type == r.IDLE) {
            this.moveScrew = e;
            this.moveScrewType = this.moveScrew.name.slice(6);
            this.originPosition = cc.v3(this.moveScrew.x, this.moveScrew.y, 0);
            this.screwRect = this.moveScrew.getBoundingBox();
            if (this.moveScrew.children.length <= 0) {
                this.screw_type = r.MOVE;
            } else {
                {
                    for (var t = 0; t < this.moveScrew.children.length; t++) {
                        this.moveScrew.children[t].getComponent($nut.default).nutState =
                            $nut.ENUM_NUT_STATES.PARENT_MOVE;
                    }
                    this.playMove_backAni();
                }
            }
        }
    };
    t.prototype.ReturnToOriginalPosition = function () {
        var e = this;
        cc.Tween.stopAllByTarget(this.moveScrew);
        cc.tween(this.moveScrew)
            .to(
                0.2,
                {
                    position: this.originPosition
                },
                {
                    easing: "sineOutIn"
                }
            )
            .call(function () {
                e.screw_type = r.IDLE;
                e.moveScrew = null;
                e.moveScrewType = "";
            })
            .start();
    };
    t.prototype.playMove_backAni = function () {
        var e = this;
        if (n.instance.screw_type != r.BAKCANI) {
            var t;
            n.instance.screw_type = r.BAKCANI;
            console.log("play back ani");
            switch (this.moveScrewType) {
                case "left":
                    t = cc.moveBy(0.2, cc.v2(-50, 0));
                    break;
                case "right":
                    t = cc.moveBy(0.2, cc.v2(50, 0));
                    break;
                case "up":
                    t = cc.moveBy(0.2, cc.v2(0, 50));
                    break;
                case "down":
                    t = cc.moveBy(0.2, cc.v2(0, -50));
            }
            cc.tween(this.moveScrew)
                .then(t)
                .call(function () {
                    e.ReturnToOriginalPosition();
                })
                .start();
        }
    };
    t.prototype.deleteScrew = function () {
        this.screw_type = r.IDLE;
        var e = function (e) {
            var n = t.connectNode.children[e];
            var o = n.getBoundingBox();
            var a = n.position;
            if (cc.Intersection.rectRect(t.screwRect, o)) {
                cc.tween(n)
                    .to(0.3, {
                        scale: 1.3,
                        position: new cc.Vec3(a.x, a.y + 150, 0)
                    })
                    .to(0.2, {
                        y: -500,
                        opacity: 0
                    })
                    .call(function () {
                        n.destroy();
                    })
                    .start();
            }
        };
        var t = this;
        for (var n = 0; n < this.connectNode.children.length; n++) {
            e(n);
        }
        this.moveScrew.destroy();
        this.moveScrew = null;
        this.moveScrewType = "";
        this.screwNum--;
        $commonData.default.TotalSteel--;
        this.checkSuccess();
    };
    t.prototype.checkSuccess = function () {
        var e = this;
        if (this.screwNum <= 0) {
            $platform.reportLevel($commonData.default.currLevel, "passLevel", $commonData.default.GameMode);
            var t = cc.sys.localStorage.getItem("currLvUnscrew");
            if (parseInt(t) >= $commonData.default.unscrewMaxLv) {
                if (t == $commonData.default.unscrewMaxLv) {
                    cc.sys.localStorage.setItem("currLvUnscrew", $commonData.default.currLevel + 1);
                }
                for (
                    var n = Math.ceil(Math.random() * $commonData.default.unscrewMaxLv);
                    n == $commonData.default.currLevel;

                ) {
                    n = Math.ceil(Math.random() * $commonData.default.unscrewMaxLv);
                }
                $commonData.default.currLevel = n;
                console.warn("-------已经通关了，进入随机关卡", n);
                this.scheduleOnce(function () {
                    $gameManager.default.instance.showGameoverPnl(1);
                }, 0.5);
            } else {
                if ($commonData.default.currLevel == $commonData.default.unscrewMaxLv) {
                    cc.sys.localStorage.setItem("currLvUnscrew", $commonData.default.currLevel);
                    return void this.checkSuccess();
                }
                $commonData.default.currLevel++;
                cc.sys.localStorage.setItem("currLvUnscrew", $commonData.default.currLevel);
                if ($commonData.default.currLevel % 2 == 0) {
                    this.scheduleOnce(function () {
                        $gameManager.default.instance.init();
                        e.reset();
                    });
                    $platform.reportGameOver(
                        $commonData.default.currLevel - 1 + "",
                        $commonData.default.GameMode,
                        $commonData.default.gamingtime,
                        1
                    );
                } else {
                    this.scheduleOnce(function () {
                        $gameManager.default.instance.showGameoverPnl(1);
                    }, 0.5);
                }
            }
        }
    };
    t.prototype.reset = function () {
        this.node.children[0].removeAllChildren();
        this.node.children[1].removeAllChildren();
        this.init();
    };
    t.prototype.update = function () {
        if (this.screw_type == r.MOVE) {
            switch (this.moveScrewType) {
                case "left":
                    this.moveScrew.x -= 15;
                    break;
                case "right":
                    this.moveScrew.x += 15;
                    break;
                case "up":
                    this.moveScrew.y += 15;
                    break;
                case "down":
                    this.moveScrew.y -= 15;
            }
        }
    };
    t.prototype.loadTexture = function (e, t) {
        $game.default.resManager
            .loadBundleRes("UnscrewMode", "texture/" + e, cc.SpriteFrame)
            .catch(function () {
                console.error("加载" + e + "失败!");
            })
            .then(function (e) {
                t.getComponent(cc.Sprite).spriteFrame = e;
            });
    };
    t.prototype.setCollision = function (e, t) {
        var n = e.getComponent(cc.BoxCollider);
        n.size.width = e.width - 30;
        switch (t) {
            case 1:
                n.size.height = 436;
                break;
            case 2:
                n.size.height = 519;
                break;
            case 3:
                n.size.height = 642;
                break;
            case 4:
                n.size.height = 758;
        }
    };
    t.instance = null;
    __decorate([u(cc.Node)], t.prototype, "connectNode", void 0);
    __decorate([u(cc.Node)], t.prototype, "screwNode", void 0);
    __decorate([u(cc.Prefab)], t.prototype, "connectPre", void 0);
    __decorate(
        [
            u({
                type: cc.Prefab,
                tooltip: "0:left 1:up 2:right 3:down"
            })
        ],
        t.prototype,
        "screwPre",
        void 0
    );
    __decorate([u(cc.Prefab)], t.prototype, "nutPre", void 0);
    return (n = __decorate([s], t));
})(cc.Component);
exports.default = v;
