var $postUserData = require("./PostUserData");
var $commonData = require("./commonData");
var r = cc._decorator;
var l = r.ccclass;
var s =
    (r.property,
    (function () {
        function e() {}
        e.setArrData = function (e) {
            var t = [];
            switch (e) {
                case "skinData":
                    t = $commonData.default.boardSkinData.skinData;
                    $postUserData.seletPostUserData(["board_skin", "little_man_skin", "skin_debris"]);
                    break;
                case "piece":
                    t = $commonData.default.boardSkinData.piece;
                    $postUserData.seletPostUserData(["board_skin", "little_man_skin", "skin_debris"]);
                    break;
                case "screwSkinData":
                    t = $commonData.default.screwSkinData.skinData;
                    $postUserData.seletPostUserData(["board_skin", "little_man_skin", "skin_debris"]);
                    break;
                case "claimAchievementRewards":
                    t = $commonData.default.AchievementData.claimAchievementRewards;
                    console.log("============>>arrdata", t);
                    break;
                case "provincePoint":
                    t = $commonData.default.provincePoint;
                    break;
                case "nailSkinData":
                    $commonData.default.nailSkinData.forEach(function (e) {
                        if (e.isGot) {
                            t.push(1);
                        } else {
                            t.push(0);
                        }
                    });
                    break;
                case "bgSkinData":
                    $commonData.default.bgSkinData.forEach(function (e) {
                        if (e.isGot) {
                            t.push(1);
                        } else {
                            t.push(0);
                        }
                    });
                    break;
                case "recentRecord":
                    t = $commonData.default.recentGameRecord.recentRecord;
                    var n = JSON.stringify(t);
                    return void cc.sys.localStorage.setItem("recentRecord", n);
                case "showPropView":
                    t = $commonData.default.isShowPropView;
            }
            var o = "";
            for (var a = 0; a < t.length; a++) {
                o += t[a];
                a != t.length - 1 && (o += ",");
            }
            cc.sys.localStorage.setItem(e, o);
            console.log("----------save str", e, o);
        };
        e.onGetVideoReward = function () {
            console.log("commonData.watchNailSkinTimes---》", $commonData.default.watchNailSkinTimes);
            cc.sys.localStorage.setItem("watchNailSkinTimes", $commonData.default.watchNailSkinTimes);
            for (var e = 0; e < $commonData.default.nailSkinData.length; e++) {
                if (
                    "ad" == $commonData.default.nailSkinData[e].unlockType &&
                    $commonData.default.nailSkinData[e].unlockValue <= $commonData.default.watchNailSkinTimes &&
                    0 == $commonData.default.nailSkinData[e].isGot
                ) {
                    $commonData.default.nailSkinData[e].isGot = !0;
                }
            }
            for (e = 0; e < $commonData.default.screwSkinData.skinData.length; e++) {
                var t = $commonData.default.screwSkinData.describe;
                if (
                    "ad" == t[e].unlockType &&
                    t[e].unlockValue <= $commonData.default.watchNailSkinTimes &&
                    0 == $commonData.default.screwSkinData.skinData[e]
                ) {
                    $commonData.default.screwSkinData.skinData[e] = 1;
                }
            }
            this.setArrData("nailSkinData");
            this.setArrData("screwSkinData");
        };
        return __decorate([l], e);
    })());
exports.default = s;
