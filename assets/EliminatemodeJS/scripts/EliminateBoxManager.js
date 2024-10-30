var o;
var $commonData = require("../../scripts/commonData");
var a = cc._decorator;
var c = a.ccclass;
var l =
    (a.property,
    (function (e) {
        function t() {
            var t = e.call(this) || this;
            t.easyThreshold = [];
            t.weightArray = [10, 10, 10];
            t.easyBoxNum = 0;
            t.playNum = 0;
            y.instance = t;
            return t;
        }
        var y;
        __extends(t, e);
        y = t;
        t.prototype.applyStrategy = function (e, t, y, x, o) {
            if ($commonData.default.eliminte_game_mode == $commonData.Eliminate_Mode.AIPLAY) {
                return this.strategy_1(y, x, o);
            }
            if (this.easyBoxNum > 0) {
                this.easyBoxNum--;
                return this.strategy_1(y, x, o);
            }
            this.getEasyThreshold(t);
            if (this.getUserStrategy(e)) {
                return this.strategy_1(y, x, o);
            }
            switch (this.getWeightChoice(this.weightArray)) {
                case 0:
                    return this.strategy_1(y, x, o);
                case 1:
                    return this.strategy_2(y, x, o);
                case 2:
                    return this.strategy_3(x, o);
                case 3:
                    return this.strategy_6(y, x, o);
                default:
                    return this.strategy_1(y, x, o);
            }
        };
        t.prototype.getWeightChoice = function (e) {
            var t = 0;
            e.forEach(function (e) {
                return (t += e);
            });
            var y = Math.random() * t;
            var x = 0;
            for (var o = 0; o < e.length; o++) {
                if (y <= (x += e[o])) {
                    return o;
                }
            }
            return 0;
        };
        t.prototype.getEasyThreshold = function (e) {
            switch (this.playNum) {
                case 1:
                    this.easyThreshold = e.easyThreshold1;
                    break;
                case 2:
                    this.easyThreshold = e.easyThreshold2;
                    break;
                case 3:
                    this.easyThreshold = e.easyThreshold3;
                    break;
                case 4:
                    this.easyThreshold = e.easyThreshold4;
                    break;
                case 5:
                    this.easyThreshold = e.easyThreshold5;
                    break;
                default:
                    this.easyThreshold = e.easyThreshold1;
            }
        };
        t.prototype.getUserStrategy = function (e) {
            console.log("------->", e);
            for (var t = 0; t < this.easyThreshold.length; t++) {
                if (
                    (console.log("计算的区间---->", this.easyThreshold[t][0]),
                    this.easyThreshold[t][0][0] <= e && e <= this.easyThreshold[t][0][1])
                ) {
                    this.weightArray = this.easyThreshold[t][1];
                    console.error("在区间内，本次计算的权重数组------>", this.weightArray);
                    return !1;
                }
            }
            console.error("不在区间内");
            return !0;
        };
        t.prototype.strategy_1 = function (e, t, y) {
            var x = [];
            e.forEach(function (e) {
                if (e.name) {
                    e.getComponent("ElinimateScrew")
                        ? e.getComponent("ElinimateScrew").checkClickable() && x.push(e)
                        : "SetScrewNode" === e.parent.name && x.push(e);
                }
            });
            var o = this.getBoxIndex(x, t, y);
            return t.splice(o, 1)[0];
        };
        t.prototype.strategy_2 = function (e, t, y) {
            var x = [];
            e.forEach(function (e) {
                if (e.name) {
                    x.push(e);
                }
            });
            var o = this.getBoxIndex(x, t, y);
            return t.splice(o, 1)[0];
        };
        t.prototype.strategy_3 = function (e, t) {
            var y = this;
            var x = t.map(function (e) {
                return y.getType(e.name, "box_");
            });
            for (var o = 0; o < e.length; o++) {
                var i = this.getType(e[o].name, "box_");
                if (-1 == x.indexOf(i)) {
                    return e.splice(o, 1)[0];
                }
            }
            var n = Math.floor(Math.random() * e.length);
            return e.splice(n, 1)[0];
        };
        t.prototype.strategy_4 = function (e, t, y) {
            var x = [];
            e.forEach(function (e) {
                if (e.name) {
                    e.getComponent("ElinimateScrew")
                        ? e.getComponent("ElinimateScrew").checkClickable() && x.push(e)
                        : "SetScrewNode" === e.parent.name && x.push(e);
                }
            });
            var o = this.getBoxIndex(x, t, y, !1);
            return t.splice(o, 1)[0];
        };
        t.prototype.strategy_5 = function (e, t, y, x) {
            var o = this;
            var i = [];
            e.forEach(function (e) {
                return i.push(o.getType(e.name, "screw_"));
            });
            i = this.sortByFrequency(i);
            var n = y.map(function (e) {
                return o.getType(e.name, "box_");
            });
            for (var r = 0; r < i.length; r++) {
                if (-1 != n.indexOf(i[r])) {
                    return y.splice(n.indexOf(i[r]), 1)[0];
                }
            }
            console.log("没有盒子----》");
            return this.strategy_1(t, y, x);
        };
        t.prototype.strategy_6 = function (e, t, y) {
            var x = [];
            var o = [];
            e.forEach(function (e) {
                if (e.name) {
                    o.push(e);
                    e.getComponent("ElinimateScrew")
                        ? e.getComponent("ElinimateScrew").checkClickable() && x.push(e)
                        : "SetScrewNode" === e.parent.name && x.push(e);
                }
            });
            var i = this.getBoxIndexForStrategy_6(o, x, t, y);
            return t.splice(i, 1)[0];
        };
        t.prototype.sortByFrequency = function (e) {
            var t = new Map();
            e.forEach(function (e) {
                t.set(e, (t.get(e) || 0) + 1);
            });
            var y = [];
            t.forEach(function (e, t) {
                y.push({
                    value: t,
                    count: e
                });
            });
            y.sort(function (e, t) {
                return t.count - e.count || e.value - t.value;
            });
            return y.map(function (e) {
                return e.value;
            });
        };
        t.prototype.getBoxIndex = function (e, t, y, x) {
            if (void 0 === x) {
                x = !0;
            }
            var o = e.map(function (e) {
                return e.name;
            });
            var i = this.getFrequency(o);
            if (x) {
                return this.getMostIndex(i, t, y);
            } else {
                return this.getLeastIndex(i, t, y);
            }
        };
        t.prototype.getBoxIndexForStrategy_6 = function (e, t, y, x) {
            var o = e.map(function (e) {
                return e.name;
            });
            var i =
                (this.getFrequency(o),
                t.map(function (e) {
                    return e.name;
                }));
            var n = this.getFrequency(i);
            return this.getLeastIndex(n, y, x);
        };
        t.prototype.getMostIndex = function (e, t, y) {
            var x = this;
            var o = this.getMostFrequentOccur(e);
            if (!o) {
                return Math.floor(Math.random() * t.length);
            }
            var i = this.getType(o, "screw_");
            if (
                -1 ===
                y
                    .map(function (e) {
                        return x.getType(e.name, "box_");
                    })
                    .indexOf(i)
            ) {
                for (var n = 0; n < t.length; n++) {
                    if (this.getType(t[n].name, "box_") === i) {
                        return n;
                    }
                }
                delete e["screw_" + i];
                return this.getMostIndex(e, t, y);
            }
            delete e["screw_" + i];
            return this.getMostIndex(e, t, y);
        };
        t.prototype.getLeastIndex = function (e, t, y) {
            var x = this;
            var o = this.getLeastFrequentOccur(e);
            if (!o) {
                return Math.floor(Math.random() * t.length);
            }
            var i = this.getType(o, "screw_");
            if (
                -1 ===
                y
                    .map(function (e) {
                        return x.getType(e.name, "box_");
                    })
                    .indexOf(i)
            ) {
                for (var n = 0; n < t.length; n++) {
                    if (this.getType(t[n].name, "box_") === i) {
                        return n;
                    }
                }
                delete e["screw_" + i];
                return this.getLeastIndex(e, t, y);
            }
            delete e["screw_" + i];
            return this.getLeastIndex(e, t, y);
        };
        t.prototype.checkFrequency = function (e) {
            var t = "";
            for (var y = 0; y < 7; y++) {
                if (((t = "screw_" + y), console.log(e[t]), 0 != e[t])) {
                    return !1;
                }
            }
            return !0;
        };
        t.prototype.getFrequency = function (e) {
            var t = {};
            for (var y = 0; y < 7; y++) {
                t["screw_" + y] = 0;
            }
            e.forEach(function (e) {
                if (t[e]) {
                    t[e]++;
                } else {
                    t[e] = 1;
                }
            });
            return t;
        };
        t.prototype.getMostFrequentOccur = function (e) {
            var t = 0;
            var y = null;
            for (var x in e)
                if (e[x] > t) {
                    y = x;
                    t = e[x];
                }
            return y;
        };
        t.prototype.getLeastFrequentOccur = function (e) {
            var t = 99999;
            var y = null;
            for (var x in e)
                if (e[x] <= t) {
                    y = x;
                    t = e[x];
                }
            return y;
        };
        t.prototype.getType = function (e, t) {
            return parseInt(e.split(t)[1]);
        };
        t.prototype.getObjCopy = function (e) {
            var t = {};
            for (var y in e) t[y] = e[y];
            return t;
        };
        t.instance = null;
        return (y = __decorate([c], t));
    })(cc.Component));
exports.default = l;
