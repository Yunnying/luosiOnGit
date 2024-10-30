var i;
var c = cc._decorator;
var r = c.ccclass;
var l =
    (c.property,
    (function () {
        function t() {}
        var n;
        n = t;
        t.setLocalItems = function (e) {
            e.forEach(function (e) {
                var t = e.key;
                var o = e.value;
                n.setLocalItem(t, o);
            });
        };
        t.setLocalItem = function (t, n) {
            var o = "";
            switch (!0) {
                case null == n:
                    o = new s(i.None, null).toString();
                    break;
                case "number" == typeof n:
                    o = new s(i.Number, n).toString();
                    break;
                case "string" == typeof n:
                    o = new s(i.String, n).toString();
                    break;
                case "boolean" == typeof n:
                    o = new s(i.Boolean, n).toString();
                    break;
                case n instanceof Array:
                    o = new s(i.Array, n).toString();
                    break;
                case n instanceof Date:
                    o = new s(i.Date, n).toString();
                    break;
                case n instanceof Set:
                    o = new s(i.Set, Array.from(n)).toString();
                    break;
                case n instanceof Map:
                    o = new s(i.Map, Array.from(n)).toString();
                    break;
                case "object" == typeof n:
                    o = new s(i.Object, n).toString();
                    break;
                default:
                    return void new Error("暂不支持的数据类型，请转换后再使用");
            }
            cc.sys.localStorage.setItem(this.PROJECT_NAME + t, o);
        };
        t.getLocalItems = function (e) {
            var t = [];
            e.forEach(function (e) {
                var o = e.key;
                var a = e.defaultValue;
                t.push(n.getLocalItem(o, a));
            });
            return t;
        };
        t.getLocalItem = function (e, t) {
            var n = cc.sys.localStorage.getItem(this.PROJECT_NAME + e);
            if (n && "" !== n) {
                var o = JSON.parse(n);
                switch (i[o.type]) {
                    case i.None:
                        n = null;
                        break;
                    case i.Number:
                    case i.String:
                    case i.Boolean:
                    case i.Array:
                        n = o.value;
                        break;
                    case i.Date:
                        n = new Date(o.value);
                        break;
                    case i.Set:
                        n = new Set(o.value);
                        break;
                    case i.Map:
                        n = new Map(o.value);
                        break;
                    case i.Object:
                    default:
                        n = o.value;
                }
            } else {
                n = t;
            }
            return n;
        };
        t.removeLocalItems = function (e) {
            e.forEach(function (e) {
                return n.removeLocalItem(e);
            });
        };
        t.removeLocalItem = function (e) {
            cc.sys.localStorage.removeItem(this.PROJECT_NAME + e);
        };
        t.VERSION = "1.0.0";
        t.PROJECT_NAME = "";
        return (n = __decorate([r], t));
    })());
exports.default = l;
(function (e) {
    e[(e.None = -1)] = "None";
    e[(e.String = 0)] = "String";
    e[(e.Number = 1)] = "Number";
    e[(e.Boolean = 2)] = "Boolean";
    e[(e.Array = 3)] = "Array";
    e[(e.Object = 4)] = "Object";
    e[(e.Date = 5)] = "Date";
    e[(e.Set = 6)] = "Set";
    e[(e.Map = 7)] = "Map";
})(i || (i = {}));
var s = (function () {
    function e(e, t) {
        this.type = i[i.None];
        this.value = "";
        this.type = i[e];
        this.value = t;
        return this;
    }
    e.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return e;
})();
