exports.isShowNumberChange =
    exports.isShowNumberInit =
    exports.screwNumberRecord =
    exports.recordCurScrewNumber =
    exports.curScrewNumber =
    exports.isShowNumber =
        void 0;
var o = cc._decorator;
o.ccclass;
o.property;
exports.isShowNumber = !1;
exports.curScrewNumber = "0";
exports.recordCurScrewNumber = function (e) {
    console.log("====>记录当前点击的螺丝编号");
    exports.curScrewNumber = e.getChildByName("screwNumber").getComponent(cc.Label).string;
};
exports.screwNumberRecord = function (e, t) {
    console.log(exports.isShowNumber);
    e.getChildByName("screwNumber").active = exports.isShowNumber;
    e.getChildByName("screwNumber").getComponent(cc.Label).string = t;
};
exports.isShowNumberInit = function () {
    exports.isShowNumber = !1;
};
exports.isShowNumberChange = function () {
    exports.isShowNumber = !exports.isShowNumber;
};
