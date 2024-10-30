var o;
var $commonData = require("../../scripts/commonData");
var $game = require("../../scripts/Game");
const { default: UIMgrClass } = require("../../ts/UIMgr");
var $bezierAni = require("./BezierAni");
var l = cc._decorator;
var s = l.ccclass;
var d = l.property;
var p = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.collectNode2 = null;
        t.mask = null;
        t.imgWhite = null;
        t.imgBlack = null;
        t.progressLabel = null;
        t.progressImg = null;
        t.starPre = null;
        t.starSound1 = null;
        t.starSound2 = null;
        t.test = [];
        t.msakY = 387;
        t.imgY = -387;
        t.screwTotal = 0;
        t.screwRest = 0;
        t.progress = 0;
        t.starPool = null;
        t.vaule = [-150, -100, -200];
        t.RtimeValue = [1, 1.5, 2];
        t.MtimeValue = [0.4, 0.5, 0.6];
        y.instance = t;
        return t;
    }
    var y;
    __extends(t, e);
    y = t;
    t.prototype.onLoad = function () {
        var e = this;
        this.collectNode2.on(
            "touchmove",
            function (t) {
                e.moveHouse(t);
            },
            this.collectNode2,
            !1
        );
        this.collectNode2.on(
            "touchstart",
            function (t) {
                e.moveStart(t);
            },
            this.collectNode2,
            !1
        );
        this.collectNode2.on(
            "touchend",
            function (t) {
                e.moveEnd(t);
            },
            this.collectNode2,
            !1
        );
        this.initPos = this.collectNode2.getPosition();
        this.starPool = new cc.NodePool();
        this.initCoinPool();
    };
    t.prototype.initCoinPool = function (e) {
        if (void 0 === e) {
            e = 9;
        }
        for (var t = 0; t < e; t++) {
            var y = cc.instantiate(this.starPre);
            y.active = !1;
            y.children[0].active = !1;
            this.starPool.put(y);
        }
    };
    t.prototype.getStarNode = function () {
        var e = null;
        (e = this.starPool.size() > 0 ? this.starPool.get() : cc.instantiate(this.starPre)).active = !0;
        e.children[0].active = !1;
        return e;
    };
    t.prototype.putStarNode = function (e) {
        e.active = !1;
        e.children[0].active = !1;
        this.starPool.put(e);
    };
    t.prototype.initNodePos = function () {
        this.collectNode2.setPosition(0, 0);
        this.collectNode2.active = $commonData.default.isOpen;
    };
    t.prototype.progressInit = function () {
        var e = this;
        this.screwTotal = 0;
        this.screwRest = 0;
        this.progress = 0;
        this.collectNode2.active = $commonData.default.isOpen;
        console.error(
            "通关的关卡数",
            $commonData.default.eliminatePasslevel,
            " 最大关卡数",
            $commonData.default.eliminateMaxLv,
            $commonData.default.currLevel
        );
        if ($commonData.default.currLevel > 180 || $commonData.default.eliminatePasslevel > 180) {
            this.collectNode2.active = !1;
        } else {
            {
                this.mask.setPosition(0, this.msakY);
                this.imgWhite.setPosition(0, this.imgY);
                var t = "EliminateShop-" + Math.floor(($commonData.default.currLevel - 1) / 5);
                $game.default.resManager
                    .loadBundleRes(
                        t,
                        $commonData.default.collectNameConfig[$commonData.default.currLevel - 1],
                        cc.SpriteFrame
                    )
                    .then(function (t) {
                        e.imgWhite.getComponent(cc.Sprite).spriteFrame = t;
                        e.imgBlack.getComponent(cc.Sprite).spriteFrame = t;
                    });
                this.progress = 0;
                this.showProgress(this.progress);
            }
        }
    };
    t.prototype.onRemoveBox = function (e) {
        var t = this;
        var y = 0;
        if (
            !$commonData.default.isOpen ||
            $commonData.default.eliminatePasslevel > 180 ||
            $commonData.default.currLevel > 180
        ) {
            console.log("没有星星");
        } else {
            this.playThreeStarsAni(e);
            y = 0.5;
        }
        this.scheduleOnce(function () {
            var e = ((t.screwTotal - t.screwRest) / t.screwTotal) * t.msakY;
            var y = t.msakY - e;
            var x = t.imgY + e;
            t.updateImgProgress(y, x);
            var o = Math.floor(((t.screwTotal - t.screwRest) / t.screwTotal) * 100);
            t.updateProgress(o);
        }, y);
    };
    t.prototype.updateImgProgress = function (e, t) {
        cc.tween(this.imgWhite)
            .to(0.2, {
                position: cc.v3(0, t)
            })
            .start();
        cc.tween(this.mask)
            .to(0.2, {
                position: cc.v3(0, e)
            })
            .start();
    };
    t.prototype.updateProgress = function (e) {
        var t = this;
        if (this.progress < e) {
            this.progress++;
            this.showProgress(this.progress);
            this.scheduleOnce(function () {
                t.updateProgress(e);
            }, 0.01);
        }
    };
    t.prototype.showProgress = function () {
        this.progressLabel.string = this.progress + "%";
        this.progressImg.fillRange = this.progress / 100;
    };
    t.prototype.onCLickShow = function () {
        UIMgrClass.I.open("shopCollectPnlNew",{progress:this.progress/100,type:1});
       // cc.find("Canvas/shopCollectPnl").getComponent("shopCollectView").show();
    };
    t.prototype.getRestProgress = function () {
        return (this.screwRest / this.screwTotal) * 100;
    };
    t.prototype.moveStart = function (e) {
        this.tempPos = e.getLocation();
    };
    t.prototype.moveEnd = function (e) {
        if (Math.abs(this.tempPos.x - e.getLocation().x) <= 1) {
            this.onCLickShow();
        }
    };
    t.prototype.moveHouse = function (e) {
        if (Math.abs(this.tempPos.x - e.getLocation().x) >= 3) {
            this.collectNode2.setPosition(this.collectNode2.parent.convertToNodeSpaceAR(e.getLocation()));
        }
    };
    t.prototype.playThreeStarsAni = function (e) {
        var t = this;
        var y = cc.instantiate(this.starPre);
        var x = cc.instantiate(this.starPre);
        var o = cc.instantiate(this.starPre);
        var i = this.collectNode2.convertToNodeSpaceAR(e);
        i = cc.v2(i.x, i.y + 100);
        this.scheduleOnce(function () {
            t.playCloseBoxStarSound();
        }, 0.5);
        [y, x, o].forEach(function (e, y) {
            t.playStarAni(e, i, t.vaule[y], t.RtimeValue[y], t.MtimeValue[y]);
        });
    };
    t.prototype.playCloseBoxStarSound = function () {
        if ($commonData.default.soundOn) {
            this.starSound1.play();
            this.starSound2.play();
        }
    };
    t.prototype.playStarAni = function (e, t, y, x, o) {
        var i = this;
        var n = cc.v2(0.75 * t.x - y, 0.75 * t.y + y);
        var a = cc.v2(0.5 * t.x - y, 0.5 * t.y + y);
        e.setParent(this.collectNode2);
        e.setPosition(t);
        e.children[0].active = !0;
        var l = new $bezierAni.BezierData();
        l.startPos = t;
        l.c1 = n;
        l.c2 = a;
        l.endPos = cc.v2(0);
        cc.tween(e)
            .by(x, {
                angle: 360
            })
            .repeatForever()
            .start();
        $bezierAni.default.runUniformBezierAct(e, o, [l], function () {
            e.active = !1;
            if ($commonData.default.soundOn) {
                e.children[1].getComponent(cc.AudioSource).play();
            }
            i.scheduleOnce(function () {
                e.destroy();
            }, 0.5);
        });
    };
    t.instance = null;
    __decorate([d(cc.Node)], t.prototype, "collectNode2", void 0);
    __decorate(
        [
            d({
                type: cc.Node,
                displayName: "遮罩"
            })
        ],
        t.prototype,
        "mask",
        void 0
    );
    __decorate(
        [
            d({
                type: cc.Node,
                displayName: "店铺白色"
            })
        ],
        t.prototype,
        "imgWhite",
        void 0
    );
    __decorate(
        [
            d({
                type: cc.Node,
                displayName: "店铺黑色"
            })
        ],
        t.prototype,
        "imgBlack",
        void 0
    );
    __decorate(
        [
            d({
                type: cc.Label,
                displayName: "完成进度文本"
            })
        ],
        t.prototype,
        "progressLabel",
        void 0
    );
    __decorate(
        [
            d({
                type: cc.Sprite,
                displayName: "完成进度图片"
            })
        ],
        t.prototype,
        "progressImg",
        void 0
    );
    __decorate(
        [
            d({
                type: cc.Prefab,
                displayName: "星星"
            })
        ],
        t.prototype,
        "starPre",
        void 0
    );
    __decorate(
        [
            d({
                type: cc.AudioSource,
                tooltip: "星星播放1"
            })
        ],
        t.prototype,
        "starSound1",
        void 0
    );
    __decorate(
        [
            d({
                type: cc.AudioSource,
                tooltip: "星星播放2"
            })
        ],
        t.prototype,
        "starSound2",
        void 0
    );
    __decorate([d(cc.Node)], t.prototype, "test", void 0);
    return (y = __decorate([s], t));
})(cc.Component);
exports.default = p;
