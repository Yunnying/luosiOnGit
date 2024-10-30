exports.getrankList =
    exports.getMatchData =
    exports.postRecord =
    exports.postPoint =
    exports.getUserInformation =
    exports.postAllUserData =
    exports.seletPostUserData =
        void 0;
require("./BattleManager");
var $commonData = require("./commonData");
var $load = require("./Load");
require("./config");
exports.seletPostUserData = function () {};
exports.postAllUserData = function () {};
exports.getUserInformation = function (e) {
    if (void 0 === e) {
        e = 0;
    }
    $load.default.instance.loadLocalData();
};
exports.postPoint = function () {
    $commonData.default.openId;
    $commonData.default.pointNum;
};
exports.postRecord = function () {};
exports.getMatchData = function () {};
exports.getrankList = function () {};
