var o;
var r = cc._decorator;
var a = r.ccclass;
var c =
    (r.property,
    (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        __extends(t, e);
        t.prototype.start = function () {
            this.readArrayData();
        };
        t.prototype.readArrayData = function () {
            var e = this.node.getComponent(cc.PhysicsPolygonCollider).points;
            var t = "";
            e.forEach(function (e) {
                var y = "{x:" + e.x + ",y:" + e.y + "},";
                t += y;
            });
            var y = this.node.getComponent(cc.Sprite).spriteFrame.name;
            t = t.substring(0, t.length - 1);
            console.log('"' + y + '":{collider:[' + t + "] },");
        };
        return __decorate([a], t);
    })(cc.Component));
exports.default = c;
