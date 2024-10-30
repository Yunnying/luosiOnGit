var o;
var r = cc._decorator;
var a = r.ccclass;
var c = r.property;
var $commonData = require("../../scripts/commonData");
var $eliminateManager = require("./EliminateManager");
var $eliminateGamelevel = require("./EliminateGamelevel");
var $game = require("../../scripts/Game");
var $eliminateProgressManager = require("./EliminateProgressManager");

var $steelData = require("./SteelData");
var $elinimateBox = require("./ElinimateBox");
var v = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.gameNode = null;
        t.screwPre = null;
        t.steelPre = null;
        t.holeTargetPre = null;
        t.publicScrewNode = null;
        t.screwImg = [];
        t.loadArray = [];
        t.steelColorMap = new Map();
        t.boxMap = new Map();
        t.colorArr = [0, 1, 2, 3, 4, 5, 6];
        t.screwArr = [];
        t.steelArr = [];
        t.boxArr = [];
        t.screwArr_hasColor = [];
        t.screw_hasColor_colorArr = [0, 0, 0, 0, 0, 0, 0];
        t.randomlyScrewNum = 0;
        t.fixScrewArray = [];
        t.noFixScrewArray = [];
        t._steelColorGrey = cc.color(47, 61, 77);
        t._steelOpacity = 100;
        t._steelColor = [
            cc.color(243, 229, 134),
            cc.color(121, 213, 122),
            cc.color(188, 158, 246),
            cc.color(118, 175, 230),
            cc.color(241, 150, 223),
            cc.color(10, 38, 88),
            cc.color(254, 176, 108),
            cc.color(255, 255, 255)
        ];
        y.instance = t;
        return t;
    }
    var y;
    __extends(t, e);
    y = t;
    t.prototype.onLoad = function () {};
    t.prototype.init = function (e) {
        console.error("初始化数据",e,JSON.stringify(e));
        this.gameNode = this.node.children[0];
        this.publicScrewNode = this.node.children[1];
        this.screwArr = [];
        this.steelArr = [];
        this.boxArr = [];
        this.screwArr_hasColor = [];
        this.screw_hasColor_colorArr = [0, 0, 0, 0, 0, 0, 0];
        this.loadArray = [];
        this.boxMap.clear();
        $eliminateManager.default.instance.normalLayerNum =
            e.length - $eliminateManager.default.instance.specialLayerNum;
        console.log("正常图形层数----->", $eliminateManager.default.instance.normalLayerNum);
        this.levelGenerate(e);
        this.createScrew();
    };
    t.prototype.levelGenerate = function (e) {
        console.error("生成关卡数据",e)
        var t = this;
        this.steelColorMap.clear();
        if (e) {
            e.forEach(function (e, y) {
                var x = new cc.Node(e.name);
                x.setParent(t.gameNode);
                x.group = e.group;
                x.setPosition(e.pos);
                var o = new cc.Node("steelNode");
                o.setParent(x);
                o.group = e.group;
                var i = 0;
                var n = cc.color(0, 0, 0);
                var r = 0;
                if (y + 1 > $eliminateManager.default.instance.normalLayerNum) {
                    t.steelColorMap.set(x.name, 7);
                    i = 255;
                    n = t._steelColor[7];
                    r = 0;
                } else {
                    t.steelColorMap.set(x.name, y % 7);
                    i = 210;
                    n = t._steelColor[y % 7];
                    r = 1;
                }
                e.steelList.forEach(function (y) {
                    var x = cc.instantiate(t.steelPre);
                    x.setParent(o);
                    x.getComponent(cc.RigidBody).gravityScale = r;
                    x.group = e.group;
                    t.setCollider(x, $steelData.steelDataAll[y.type].collider);
                    x.opacity = i;
                    x.color = n;
                    x.angle = y.angle;
                    x.setPosition(y.pos);
                    t.loadArray.push(
                        t.loadImg(y.type, !0).then(function (e) {
                            x.getComponent(cc.Sprite).spriteFrame = e;
                        })
                    );
                    var a = new cc.Node("whiteEdge");
                    t.loadArray.push(
                        t.loadImg(y.type, !1).then(function (e) {
                            a.addComponent(cc.Sprite).spriteFrame = e;
                        })
                    );
                    a.setParent(x);
                    y.elementList.forEach(function (y) {
                        var o = cc.instantiate(t.holeTargetPre);
                        if ("holeTarget" === y.type) {
                            o.setParent(x);
                            o.group = e.group;
                            o.setPosition(y.pos);
                        } else {
                            {
                                o.setParent(x);
                                o.name = "hole";
                                o.group = e.group;
                                o.setPosition(y.pos);
                                var i = cc.instantiate(t.screwPre);
                                i.setParent(x);
                                i.group = e.group;
                                i.getComponent(cc.Sprite).spriteFrame = t.screwImg[y.type];
                                i.setPosition(y.pos);
                            }
                        }
                    });
                });
            });
        } else {
            console.error("关卡数据加载失败");
        }
    };
    t.prototype.setCollider = function (e, t) {
        e.getComponent(cc.PhysicsPolygonCollider).points.length = t.length;
        for (var y = 0; y < t.length; y++) {
            e.getComponent(cc.PhysicsPolygonCollider).points[y] = cc.v2(t[y].x, t[y].y);
        }
        e.getComponent(cc.PhysicsPolygonCollider).apply();
    };
    t.prototype.loadImg = function (e, t) {
        if (t) {
            return $game.default.resManager.loadBundleRes("steelImg", e, cc.SpriteFrame);
        } else {
            return $game.default.resManager.loadBundleRes("edgeImg", e + "_1", cc.SpriteFrame);
        }
    };
    t.prototype.createScrew = function () {
        var e = this;
        var t = function (t) {
            var x = y.gameNode.children[t].children[0];
            var o = new cc.Node("screwNode");
            o.setParent(y.gameNode.children[t]);
            for (
                var i = function (t) {
                        var i = x.children[t];
                        y.steelArr.push(i);
                        var n = [];
                        i.children.forEach(function (t) {
                            var y = e.setScrewByHole(t, o, i);
                            if (y) {
                                n.push(y);
                            }
                        });
                        n.forEach(function (t) {
                            t.setParent(o);
                            t.angle = 0;
                            var y = parseInt(t.getComponent(cc.Sprite).spriteFrame.name.slice(-1));
                            t.name = "screw_" + String(y - 1);
                            e.screw_hasColor_colorArr[y - 1]++;
                        });
                    },
                    n = 0;
                n < x.children.length;
                n++
            )
                i(n);
        };
        var y = this;
        for (var x = 0; x < this.gameNode.children.length; x++) {
            t(x);
        }
        this.publicScrewNode.children.forEach(function (t) {
            e.screwArr.push(t);
        });
        this.randomlyScrewNum = this.screwArr.length;
        console.log("数量===》", this.screwArr.length);
        $commonData.default.eliminateScrewNum = this.screwArr.length + this.screwArr_hasColor.length;
        $commonData.default.eliminateWholeScrewNum = $commonData.default.eliminateScrewNum;
        $eliminateProgressManager.default.instance.screwTotal = $commonData.default.eliminateScrewNum;
        $eliminateProgressManager.default.instance.screwRest = $commonData.default.eliminateScrewNum;
        console.warn("总螺丝个数:", $commonData.default.eliminateScrewNum);
        this.changeScrewColor();
        if ($commonData.default.windowHeight / $commonData.default.windowWidth < 1.8) {
            this.gameAdapter();
        }
    };
    t.prototype.setScrewByHole = function (e, t, y) {
        var x;
        var o = e.convertToWorldSpaceAR(cc.v2(0, 0));
        var i = t.convertToNodeSpaceAR(o);
        if ("holeTarget" == e.name) {
            (x = cc.instantiate(this.screwPre)).group = "default";
            x.setParent(t);
            x.setPosition(i);
            this.screwArr.push(x);
        } else {
            if ("screw" == e.name) {
                (x = e).group = "default";
                this.screwArr_hasColor.push(x);
            }
        }
        if (!x) {
            return null;
        }
        var n = y.addComponent(cc.RevoluteJoint);
        n.anchor.x = e.x;
        n.anchor.y = e.y;
        n.connectedBody = x.getComponent(cc.RigidBody);
        return "screw" == e.name ? x : void 0;
    };
    t.prototype.changeScrewColor = function () {
        console.log("本关的难度配置表----》", $eliminateGamelevel.default.instance.strategyData);
        if(window["gm"] ){$commonData.default.currLevel=gm.currLevel}
        if(window["gm"]&&gm.strategyData)  $eliminateGamelevel.default.instance.strategyData=gm.strategyData;
        if (
           // 1 != $commonData.default.currLevel &&
            $eliminateGamelevel.default.instance.strategyData.layer &&
            $eliminateGamelevel.default.instance.strategyData.colorNum &&
            $eliminateGamelevel.default.instance.strategyData.layer <= this.gameNode.childrenCount
        ) {
            this.changeScrewColorWithSet(
                $eliminateGamelevel.default.instance.strategyData.layer,
                $eliminateGamelevel.default.instance.strategyData.colorNum
            );
        } else {
            this.changeScrewColorWithNoSet();
        }
    };
    t.prototype.changeScrewColorWithNoSet = function () {
        console.error("使用原有方式生产颜色");
        var e;
        var t;
        var y = this.randomlyScrewNum / 3;
        var x = this.randomlyScrewNum % 3;
        var o = this.screwImg.length;
        e = this.getArrRandomly(this.colorArr);
        t = this.getRandomArr(e, 7);
        console.log("------------arrList", t);
        if (0 === x) {
            var i = 0;
            for (var n = 0; n < this.randomlyScrewNum / 3; n++) {
                i = n % o;
                this.changeScrewImg(this.screwArr[n], t[i]);
                this.changeScrewImg(this.screwArr[n + y], t[i]);
                this.changeScrewImg(this.screwArr[n + 2 * y], t[i]);
                this.addBoxColor(t[i], n);
            }
        }
        for (var n = 0; n < this.screwArr_hasColor.length; n++) {
            this.screwArr.push(this.screwArr_hasColor[n]);
        }
        var r = this.randomlyScrewNum / 3;
        for (var n = 0; n < this.screw_hasColor_colorArr.length; n++) {
            for (var a = this.screw_hasColor_colorArr[n]; a > 0; ) {
                a -= 3;
                this.addBoxColor(n, r);
                r++;
            }
        }
        this.screwArr_hasColor = [];
        for (var n = 0; n < this.screwArr.length; n++) {
            this.screwArr[n].width = 65;
            this.screwArr[n].height = 65;
        }
    };
    t.prototype.changeScrewColorWithSet = function (e, t) {
        console.error("使用自定义方式生成颜色");
        this.fixScrewArray = [];
        this.noFixScrewArray = [];
        var y = parseInt(e);
        var x = parseInt(t);
        this.findScrewArray(y);
        this.screwArr = [];
        this.screwArr = this.fixScrewArray.concat(this.noFixScrewArray);
        console.log("fixScrewArray----->", this.fixScrewArray.length);
        console.log("noFixScrewArray---->", this.noFixScrewArray.length);
        if (x > this.fixScrewArray.length) {
            console.error(
                "前" + y + "层的螺丝数量" + this.fixScrewArray.length + "小于需要的颜色数量" + x + ",改用原本方式生成"
            );
            return void this.changeScrewColorWithNoSet();
        }
        var o = [];
        var i = (this.fixScrewArray.length + this.noFixScrewArray.length) / 3;
        if(i<6){
            var arr=JSON.parse(JSON.stringify(this.colorArr))
            arr= arr.sort(()=>{
               return Math.random()-0.5;
            })
            for (var n = 0; n < i; n++) {
                var r = arr[n]
                o.push(this.colorArr[r]);
                o.push(this.colorArr[r]);
                o.push(this.colorArr[r]);
                this.addBoxColor(r, n);
            }
        }else{
            for (var n = 0; n < i; n++) {
                var r = Math.floor(Math.random() * this.colorArr.length);
                o.push(this.colorArr[r]);
                o.push(this.colorArr[r]);
                o.push(this.colorArr[r]);
                this.addBoxColor(r, n);
            }
        }
     
        o = this.getArrRandomly(o);
        console.log("======>", o.length);
        console.log("======>", o);
        var a = [];
        var c = new Map();
        var l = [];
        for (var n = 0; n < o.length; n++) {
            if (!c.has(o[n])) {
                if (c.size >= x) {
                    continue;
                }
                c.set(o[n], 0);
            }
            a.push(o[n]);
            l.push(n);
            if (a.length >= this.fixScrewArray.length) {
                break;
            }
        }
        console.log("固定上色--->", this.fixScrewArray.length, a.length);
        console.log("非固定上色--->", this.noFixScrewArray.length, o.length - l.length);
        if (this.fixScrewArray.length != a.length) {
            console.error("给前" + y + "层上色出了问题,请检查数据是否正常");
        }
        if (this.noFixScrewArray.length != o.length - l.length) {
            console.error("给后面层上色出了问题,请检查数据是否正常");
        }
        for (var n = 0; n < this.fixScrewArray.length; n++) {
            this.changeScrewImg(this.fixScrewArray[n], a[n]);
        }
        n = 0;
        for (var s = 0; n < o.length; n++) {
            if (-1 == l.indexOf(n)) {
                this.changeScrewImg(this.noFixScrewArray[s], o[n]);
                s++;
            }
        }
    };
    t.prototype.findColorArray = function (e, t) {
        var y = e.slice();
        var x = [];
        for (var o = 0; o < t; o++) {
            var i = Math.floor(Math.random() * y.length);
            x.push(y.splice(i, 1)[0]);
        }
        return x;
    };
    t.prototype.findScrewArray = function (e) {
        var t = this;
        for (var y = 0; y < this.gameNode.children.length; y++) {
            if (y >= this.gameNode.childrenCount - e) {
                this.gameNode.children[y].children[1].children.forEach(function (e) {
                    return t.fixScrewArray.push(e);
                });
            } else {
                this.gameNode.children[y].children[1].children.forEach(function (e) {
                    return t.noFixScrewArray.push(e);
                });
            }
        }
    };
    t.prototype.changeConfigToArr = function (e) {
        var t = [];
        for (var y = 0; y < e.length; y++) {
            for (var x = e[y]; 0 != x; ) {
                x--;
                t.push(y);
            }
        }
        return this.getArrRandomly(t);
    };
    t.prototype.changeScrewImg = function (e, t) {
        e.getComponent(cc.Sprite).spriteFrame = this.screwImg[t];
        e.name = "screw_" + t;
    };
    t.prototype.addBoxColor = function (e, t) {
        $eliminateGamelevel.default.instance.BoxColorList.push(e);
        if (t == $commonData.default.eliminateScrewNum / 3 - 1) {
            this.getEveryBoxColorNum();
        }
    };
    t.prototype.getEveryBoxColorNum = function () {
        var e = this;
        var t = [0, 0, 0, 0, 0, 0, 0];
        $eliminateGamelevel.default.instance.BoxColorList.forEach(function (e) {
            t[e] += 1;
        });
        this.getTopThreeIndices(t);
        $eliminateGamelevel.default.instance.BoxColorList.forEach(function (t, y) {
            e.setBox(t, y);
        });
    };
    t.prototype.setBox = function (e, t) {
        if(!$eliminateGamelevel.default.instance.boxPre) return
        var y = cc.instantiate($eliminateGamelevel.default.instance.boxPre);
        y.setPosition(-1e3, -90);
        y.setParent($eliminateGamelevel.default.instance.boxNode);
        y.name = "box_" + e;
        $eliminateGamelevel.default.instance.BoxColorList.push(e);
        this.boxArr.push(y);
        this.boxMap.set(y, y.getComponent($elinimateBox.default));
        this.loadArray.push(
            $game.default.resManager
                .loadBundleRes("Eliminatemode", "texture/gameItem/box/box_0" + String(e + 1), cc.SpriteFrame)
                .catch(function () {
                    console.log("加载/box_0" + String(e + 1) + "失败");
                })
                .then(function (e) {
                    y.getComponent(cc.Sprite).spriteFrame = e;
                    y.setPosition(-770, -90);
                    y.opacity = 0;
                    if (t == $commonData.default.eliminateScrewNum / 3 - 1) {
                        $eliminateManager.default.instance.startGame();
                    }
                })
        );
        var x = y.getChildByName("boxCap");
        this.loadArray.push(
            $game.default.resManager
                .loadBundleRes("Eliminatemode", "texture/gameItem/cap/cap_0" + String(e + 1), cc.SpriteFrame)
                .catch(function () {
                    console.log("加载/cap_0" + String(e + 1) + "失败");
                })
                .then(function (e) {
                    x.getComponent(cc.Sprite).spriteFrame = e;
                })
        );
    };
    t.prototype.findScrew = function (e) {
        var t = null;
        for (var y = 0; y < this.screwArr.length; y++) {
            var x = this.screwArr[y];
            var o = x.getBoundingBox();
            var i = x.parent.convertToNodeSpaceAR(e);
            if (o.contains(i)) {
                t = x;
                break;
            }
        }
        return t;
    };
    t.prototype.gameAdapter = function () {
        cc.find("Canvas/topPnl").getComponent(cc.Widget).top = 50;
        cc.find("Canvas/gamePnl/levelbg").getComponent(cc.Widget).top = 24.73;
        cc.find("Canvas/gamePnl/timeLabel").getComponent(cc.Widget).top = 87.85;
        cc.find("Canvas/gamePnl/gameNode").setPosition(0, -114);
        cc.find("Canvas/gamePnl/gameNode/holeNode").getComponent(cc.Widget).top = 358.37;
        cc.find("Canvas/gamePnl/gameNode/boxNode").getComponent(cc.Widget).top = 222.41;
        cc.find("Canvas/gamePnl/gameNode/boxUnlockNode").getComponent(cc.Widget).top = 222.41;
        cc.find("Canvas/gamePnl/propBtnNode").getComponent(cc.Widget).bottom = -27.69;
    };
    t.prototype.getTopThreeIndices = function (e) {
        var t = [];
        for (var y = 0; y < e.length; y++) {
            t.push(y);
        }
        t.sort(function (t, y) {
            return e[y] - e[t];
        });
        return t.slice(0, 3);
    };
    t.prototype.getArrRandomly = function (e) {
        for (var t = e.length - 1; t >= 0; t--) {
            var y = Math.floor(Math.random() * (t + 1));
            var x = e[y];
            e[y] = e[t];
            e[t] = x;
        }
        return e;
    };
    t.prototype.getRandomArr = function (e, t) {
        var y = this.getArrRandomly(e);
        var x = [];
        for (var o = 0; o < t; o++) {
            x.push(y[o]);
        }
        return x;
    };
    t.instance = null;
    __decorate([c(cc.Node)], t.prototype, "gameNode", void 0);
    __decorate(
        [
            c({
                type: cc.Prefab,
                displayName: "螺丝预制体"
            })
        ],
        t.prototype,
        "screwPre",
        void 0
    );
    __decorate(
        [
            c({
                type: cc.Prefab,
                displayName: "板子预制体"
            })
        ],
        t.prototype,
        "steelPre",
        void 0
    );
    __decorate(
        [
            c({
                type: cc.Prefab,
                displayName: "孔预制体"
            })
        ],
        t.prototype,
        "holeTargetPre",
        void 0
    );
    __decorate([c(cc.SpriteFrame)], t.prototype, "screwImg", void 0);
    return (y = __decorate([a], t));
})(cc.Component);
exports.default = v;
