exports.Eliminate_Mode = exports.GAME_MODE_ENUM = void 0;
var i;
var c;
var r = cc._decorator;
var l = r.ccclass;
r.property;
(function (e) {
    e.NORMAL = "normal";
    e.CHALLENGE = "challenge";
    e.COMPETITION = "competition";
    e.GARAPHICAL = "graphical";
    e.UNSCREW = "unscrew";
    e.ELIMINATE = "Eliminate";
    e.EDIT = "edit";
    e.NONE = "none";
})((i = exports.GAME_MODE_ENUM || (exports.GAME_MODE_ENUM = {})));
(function (e) {
    e.AIPLAY = "aiPlay";
    e.NORMALPLAY = "normalPlay";
})((c = exports.Eliminate_Mode || (exports.Eliminate_Mode = {})));
var s = (function () {
    function e() {}
    var t;
    t = e;
    e.getCompWholeSteel = function () {
        t.wholeSteelNum = 0;
        for (var e = 0; e < t.CompMaxLevel; e++) {
            switch (t.CompLevelType[e]) {
                case "simple":
                    t.wholeSteelNum += 24;
                    break;
                case "hard":
                    t.wholeSteelNum += 28;
                    break;
                case "difficult":
                    t.wholeSteelNum += 30;
            }
        }
    };
    e.randomlyGenerateMatchData = function (e) {
        var n = {
            nick_name: "真难取名字",
            pass_time: "220",
            del_board_num: "88",
            head_url: "",
            is_pass: "false",
            identity: "1"
        };
        for (
            var o = Math.floor(Math.random() * this.randomNickNameArr.length);
            -1 != this.randomAvatar.indexOf(String(o));

        ) {
            o = Math.floor(Math.random() * this.randomNickNameArr.length);
        }
        this.randomAvatar.push(String(o));
        n.nick_name = this.randomNickNameArr[o];
        for (var a = Math.floor(40 * Math.random()); -1 != this.randomAvatar.indexOf(a); ) {
            a = Math.floor(40 * Math.random());
        }
        this.randomAvatar.push(a);
        n.head_url = "local_" + a;
        if (Math.random() < 0.8) {
            n.is_pass = "false";
            n.del_board_num = String(Math.floor(0.33 * Math.random() * t.wholeSteelNum + 0.6 * t.wholeSteelNum));
            var i = Math.random();
            if (i < 0.15) {
                n.pass_time = "360";
            } else {
                n.pass_time = i < 0.3 ? "330" : i < 0.5 ? "300" : String(Math.floor(210 * Math.random() + 150));
            }
        } else {
            n.is_pass = "true";
            n.del_board_num = t.wholeSteelNum + "";
            n.pass_time = String(Math.floor(120 * Math.random() + 240));
        }
        this.Random_Rivals.rivals[e].nick_name = n.nick_name;
        this.Random_Rivals.rivals[e].head_url = n.head_url;
        this.Random_Rivals.rivals[e].del_board_num = n.del_board_num;
        this.Random_Rivals.rivals[e].is_pass = n.is_pass;
        this.Random_Rivals.rivals[e].pass_time = n.pass_time;
    };
    Object.defineProperty(e, "signDate", {
        get: function () {
            var e = cc.sys.localStorage.getItem("signDate");
            if (e) {
                return JSON.parse(e);
            } else {
                return null;
            }
        },
        set: function (e) {
            cc.sys.localStorage.setItem("signDate", JSON.stringify(e));
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e, "signIndex", {
        get: function () {
            var e = cc.sys.localStorage.getItem("signIndex");
            if (e) {
                return parseInt(e);
            } else {
                return 0;
            }
        },
        set: function (e) {
            cc.sys.localStorage.setItem("signIndex", e.toString());
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e, "signState", {
        get: function () {
            var e = cc.sys.localStorage.getItem("signState");
            if (e) {
                return parseInt(e);
            } else {
                return 0;
            }
        },
        set: function (e) {
            cc.sys.localStorage.setItem("signState", e.toString());
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e, "inviteRewardTimes", {
        get: function () {
            var e = cc.sys.localStorage.getItem("inviteRewardTimes");
            if (e) {
                return parseInt(e);
            } else {
                return 0;
            }
        },
        set: function (e) {
            cc.sys.localStorage.setItem("inviteRewardTimes", e.toString());
        },
        enumerable: !1,
        configurable: !0
    });
    e.canOpenAI = !1;
    e.eliminte_game_mode = c.NORMALPLAY;
    e.musicOn = !0;
    e.soundOn = !0;
    e.vibrateOn = !0;
    e.isgameing = !1;
    e.isPause = !1;
    e.isShare = !1;
    e.passedNovice = !1;
    e.isFirstGame = !1;
    e.windowWidth = 750;
    e.windowHeight = 1360;
    e.firstIntoElimateGame = !1;
    e.isCheck = !1;
    e.HuTuiData = null;
    e.skinVideoCoupon = 0;
    e.GameMode = i.NONE;
    e.goldNum = 0;
    e.maxLv = 10;
    e.currLevel = 1;
    e.levelConfig = {};
    e.currentLvConfig = {};
    e.passLevel = 0;
    e.gameTime = 300;
    e.gamingtime = 0;
    e.isAddTime = !1;
    e.isLoadLevelData = !1;
    e.upScrew = "";
    e.screwNum = 0;
    e.TotalSteel = 0;
    e.LevelSteel = 0;
    e.gamelevel = null;
    e.isUnLock = !1;
    e.isDig = !1;
    e.isPullOut = !1;
    e.isGetAnswer = !1;
    e.version = "1.4.2";
    e.useItemNum = [0, 0, 0, 0];
    e.challengePool = [6, 8, 10, 12, 16, 18, 20, 22, 32, 34, 36, 38, 40, 44, 48, 52, 54, 62];
    e.lastChallengeLv = [0, 0];
    e.watchModeVideo = [];
    e.UIPrefab = [];
    e.isGetSidebarCardGift = !1;
    e.formSidebarCard = !1;
    e.canUseSidebarCard = !1;
    e.isWatchScrewAd = !1;
    e.AchievementData = {
        TotalRemoveSteel: 0,
        achievementGoal: [10, 50, 100, 200],
        claimAchievementRewards: [0, 0, 0, 0]
    };
    e.isShowAchievement = !1;
    e.graphicalLevelConfig = {};
    e.graphicalMaxLv = 10;
    e.isWatchGraphicalAd = !1;
    e.graphycalCloneNode = null;
    e.chooseLevelConfig = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31,
        32, 33, 34, 35, 36, 37, 38, 39, 40, 42, 28, 41, 45, 46, 49, 50, 51, 52, 53, 54, 43, 44, 47, 48, 55, 56, 57, 58,
        59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
        87, 88
    ];
    e.graphicalLittleScrewLevel = [
        194, 217, 218, 219, 228, 238, 239, 252, 264, 265, 266, 268, 271, 272, 267, 290, 284, 286, 302, 321, 323, 324,
        328, 333, 336, 339, 347, 345, 346, 348, 355, 356, 365, 376, 377, 378, 357, 358, 359, 360, 361, 364, 369, 374,
        379, 380, 385, 386, 393, 394, 396, 397, 398, 400, 403, 404, 406, 407, 408, 409, 410, 411, 413, 417, 418, 419,
        429, 434, 435, 438, 439, 441, 442, 433, 457, 459, 460, 461, 446, 471, 449, 451, 452, 458, 495, 468, 476, 477,
        478, 488, 491, 493, 497, 498, 484, 485, 486, 487, 506
    ];
    e.graphicalRandomLevelList = [
        426, 152, 153, 97, 101, 64, 65, 117, 115, 142, 96, 127, 128, 154, 129, 130, 131, 132, 133, 150, 151, 280, 208,
        134, 144, 311, 312, 313, 322, 305, 62, 12, 295, 306, 296, 298, 119, 259, 121, 255, 264, 282, 254, 166, 179, 87,
        268, 238, 156, 82, 239, 271, 178, 182, 31, 256, 237, 270, 273, 88, 269, 276, 81, 281, 297, 250, 209, 251, 257,
        272, 253, 252, 286, 37, 287, 288, 160, 168, 163, 210, 172, 26, 71, 74, 75, 157, 162, 161, 212, 274, 245, 247,
        244, 246, 211, 249, 265, 266, 275, 226, 315, 292, 293, 290, 284, 301, 291, 138, 136, 137, 84, 258, 91, 92, 106,
        108, 109, 58, 76, 110, 66, 198, 83, 190, 228, 227, 164, 169, 139, 140, 79, 141, 113, 112, 111, 230, 159, 158,
        216, 114, 219, 217, 199, 90, 167, 263, 165, 262, 86, 236, 118, 218, 173, 116, 171, 78, 70, 63, 67, 279, 261,
        260, 170, 69, 145, 146, 147, 148, 149, 176, 325, 177, 183, 180, 186, 188, 191, 192, 189, 185, 175, 193, 194,
        174, 221, 225, 197, 267, 21, 11, 8, 277, 50, 73, 16, 41, 42, 43, 44, 45, 46, 184, 302, 316, 48, 122, 278, 57,
        52, 206, 207, 205, 203, 204, 202, 299, 317, 318, 319, 323, 324, 326, 327, 329, 332, 304, 320, 328, 330, 321,
        334, 335, 336, 337, 339, 340, 341, 342, 343, 347, 345, 346, 348, 349, 350, 351, 353, 355, 356, 363, 365, 370,
        376, 377, 378, 406, 408, 410, 333, 416, 354, 357, 358, 359, 360, 361, 364, 366, 369, 371, 374, 379, 380, 381,
        382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 393, 394, 396, 397, 398, 400, 367, 368, 362, 412, 338, 395,
        403, 404, 407, 409, 411, 413, 414, 415, 417, 418, 419, 420, 421, 422, 423, 424, 425, 427, 428, 429, 436, 437,
        430, 431, 432, 434, 435, 438, 439, 440, 441, 442, 433, 443, 456, 457, 459, 460, 461, 462, 465, 466, 444, 445,
        446, 447, 448, 464, 471, 479, 480, 481, 449, 450, 451, 452, 453, 454, 455, 458, 470, 482, 495, 496, 468, 469,
        472, 473, 474, 476, 477, 478, 483, 489, 475, 488, 490, 491, 493, 494, 497, 498, 503, 60, 484, 485, 486, 487, 506
    ];
    e.unscrewLevelConfig = {};
    e.unscrewMaxLv = 1;
    e.isWatchUnscrewAd = !1;
    e.Unscrew_isUnlock = !1;
    e.firstAdNumDay = 0;
    e.eliminateMaxLv = 273;
    e.isWatchEliminateAd = !1;
    e.eliminatePropUseNum = [0, 0, 0, 0, 0];
    e.eliminateScrewNum = 0;
    e.eliminateWholeScrewNum = 0;
    e.eliminatePasslevel = 1;
    e.eliminateScrewColor = {
        5: [2, 1, 0, 1, 1, 2, 1],
        9: [3, 2, 2, 3, 2, 1, 1],
        10: [3, 3, 2, 2, 1, 1, 0],
        11: [1, 2, 2, 2, 1, 1, 0],
        12: [1, 1, 0, 2, 2, 1, 2],
        13: [2, 2, 0, 1, 2, 1, 1],
        14: [4, 4, 3, 2, 1, 1, 1],
        16: [3, 2, 1, 2, 1, 1, 0],
        17: [2, 2, 1, 2, 1, 2, 0],
        18: [2, 2, 1, 2, 2, 0, 2],
        19: [2, 3, 0, 2, 1, 2, 2],
        20: [1, 3, 2, 1, 3, 1, 3],
        25: [1, 2, 2, 1, 0, 1, 2]
    };
    e.eliminateScrewFirstData = [];
    e.eliminateScrewFirstLevel = [];
    e.eliminateSpecialLevel = [192, 193, 194, 195, 196];
    e.eliminateSpeciallayer = [4, 5, 7, 6, 4];
    e.eliminateDfalutLevelData = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
        59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
        87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
        112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133,
        134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
        156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177,
        178, 179, 180
    ];
    e.strategyData = null;
    e.boardSkinData = {
        currentSkin: 0,
        skinData: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        skinProgressTarget: [0, 1, 3, 6, 10, 14, 20],
        skinProgress: 0,
        piece: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    e.skinImgArr = [];
    e.skinPieceImgArr = [];
    e.lastgetSkin = [];
    e.screwSkinData = {
        currentSkin: 0,
        skinData: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        skinProgressTarget: [0, 2, 8, 16, 24, 36, 40, 50],
        skinProgress: 0,
        describe: [
            {
                ID: 0,
                skinName: "小螺丝儿",
                unlockType: "default",
                unlockValue: 0,
                shopRefresh: 0,
                text: "一个小孔，一颗钉，我是小小螺丝钉儿~"
            },
            {
                ID: 1,
                skinName: "欢欢喜喜",
                unlockType: "level",
                unlockValue: 2,
                shopRefresh: 1,
                text: "恭喜发财，红包拿来~"
            },
            {
                ID: 2,
                skinName: "嘻哈王者",
                unlockType: "level",
                unlockValue: 8,
                shopRefresh: 1,
                text: "哟~哟~听过钉钉Freestyle嘛~"
            },
            {
                ID: 3,
                skinName: "红领先生",
                unlockType: "level",
                unlockValue: 16,
                shopRefresh: 1,
                text: "我就是最靓的钉崽~"
            },
            {
                ID: 4,
                skinName: "可爱喵喵",
                unlockType: "level",
                unlockValue: 24,
                shopRefresh: 1,
                text: "出现了!——是猫猫螺丝钉！"
            },
            {
                ID: 5,
                skinName: "大魔法师",
                unlockType: "level",
                unlockValue: 36,
                shopRefresh: 1,
                text: "巴啦啦魔法螺丝变身！——"
            },
            {
                ID: 6,
                skinName: "新鲜寿司",
                unlockType: "level",
                unlockValue: 40,
                shopRefresh: 1,
                text: "寿司螺丝，一口一个~"
            },
            {
                ID: 7,
                skinName: "泳池派对",
                unlockType: "level",
                unlockValue: 50,
                shopRefresh: 1,
                text: "门前大桥下，游过一群钉..."
            },
            {
                ID: 8,
                skinName: "小工程师",
                unlockType: "achv",
                unlockValue: 1,
                shopRefresh: 0,
                text: "太过松懈时，我会拧一拧自己..."
            },
            {
                ID: 9,
                skinName: "工地搬砖",
                unlockType: "achv",
                unlockValue: 2,
                shopRefresh: 0,
                text: "没什么是我搬不动的！"
            },
            {
                ID: 10,
                skinName: "大学毕业",
                unlockType: "achv",
                unlockValue: 3,
                shopRefresh: 0,
                text: "从今天开始变成社会钉啦！"
            },
            {
                ID: 11,
                skinName: "脑力天花板",
                unlockType: "achv",
                unlockValue: 4,
                shopRefresh: 0,
                text: "唔喔~又要长脑子了..."
            },
            {
                ID: 12,
                skinName: "名侦探螺",
                unlockType: "coin",
                unlockValue: 1e4,
                shopRefresh: 0,
                text: "真相往往只有一个！"
            },
            {
                ID: 13,
                skinName: "酷酷机长",
                unlockType: "share",
                unlockValue: 1,
                shopRefresh: 0,
                text: "本钉带你飞！"
            },
            {
                ID: 14,
                skinName: "螺螺骑手",
                unlockType: "sign",
                unlockValue: 2,
                shopRefresh: 0,
                text: "您的螺螺外卖已送达~给个好评亲~"
            },
            {
                ID: 15,
                skinName: "迷你螺螺",
                unlockType: "sign",
                unlockValue: 7,
                shopRefresh: 0,
                text: "超级迷你的小螺丝钉儿（幼儿园在读版）"
            },
            {
                ID: 16,
                skinName: "完美假期",
                unlockType: "ad",
                unlockValue: 10,
                shopRefresh: 0,
                text: "大海，沙滩，音乐，篝火...完美..."
            }
        ]
    };
    e.screwSkinName = [
        "a",
        "a3",
        "a2",
        "xizhuang",
        "heimao",
        "fashi",
        "tuzi",
        "yazi",
        "a7",
        "a4",
        "a5",
        "a6",
        "a8",
        "a9",
        "a10",
        "a11",
        "a12",
        "a13"
    ];
    e.bgSkinData = [
        {
            ID: 0,
            unlockType: "default",
            unlockValue: 0,
            isGot: !0,
            type: "img",
            imgIndex: 0
        },
        {
            ID: 1,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "color",
            color: [255, 255, 255]
        },
        {
            ID: 2,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "color",
            color: [195, 184, 165]
        },
        {
            ID: 3,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "color",
            color: [178, 178, 178]
        },
        {
            ID: 4,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "color",
            color: [137, 178, 178]
        },
        {
            ID: 5,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "color",
            color: [208, 203, 200]
        },
        {
            ID: 6,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "color",
            color: [190, 239, 247]
        },
        {
            ID: 7,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "color",
            color: [177, 166, 166]
        },
        {
            ID: 8,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "color",
            color: [169, 196, 249]
        },
        {
            ID: 9,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1,
            type: "img",
            imgIndex: 2
        }
    ];
    e.currentBgSkin = 0;
    e.nailSkinData = [
        {
            ID: 0,
            unlockType: "default",
            unlockValue: 0,
            isGot: !0
        },
        {
            ID: 1,
            unlockType: "coin",
            unlockValue: 500,
            isGot: !1
        },
        {
            ID: 2,
            unlockType: "coin",
            unlockValue: 1500,
            isGot: !1
        },
        {
            ID: 3,
            unlockType: "coin",
            unlockValue: 2e3,
            isGot: !1
        },
        {
            ID: 4,
            unlockType: "coin",
            unlockValue: 2e3,
            isGot: !1
        },
        {
            ID: 5,
            unlockType: "coin",
            unlockValue: 2e3,
            isGot: !1
        },
        {
            ID: 6,
            unlockType: "coin",
            unlockValue: 3e3,
            isGot: !1
        },
        {
            ID: 7,
            unlockType: "ad",
            unlockValue: 3,
            isGot: !1,
            adTimes: 0
        },
        {
            ID: 8,
            unlockType: "ad",
            unlockValue: 6,
            isGot: !1,
            adTimes: 0
        },
        {
            ID: 9,
            unlockType: "ad",
            unlockValue: 9,
            isGot: !1,
            adTimes: 0
        },
        {
            ID: 10,
            unlockType: "ad",
            unlockValue: 12,
            isGot: !1,
            adTimes: 0
        },
        {
            ID: 11,
            unlockType: "ad",
            unlockValue: 15,
            isGot: !1,
            adTimes: 0
        },
        {
            ID: 12,
            unlockType: "ad",
            unlockValue: 18,
            isGot: !1,
            adTimes: 0
        },
        {
            ID: 13,
            unlockType: "ad",
            unlockValue: 21,
            isGot: !1,
            adTimes: 0
        },
        {
            ID: 14,
            unlockType: "ad",
            unlockValue: 25,
            isGot: !1,
            adTimes: 0
        },
        {
            ID: 15,
            unlockType: "ad",
            unlockValue: 30,
            isGot: !1,
            adTimes: 0
        }
    ];
    e.currentNailSkin = 0;
    e.watchNailSkinTimes = 0;
    e.getWxUserInfo = !1;
    e.getWxFriendInfo = !1;
    e.getWxInfo = !1;
    e.shareUseProp = 0;
    e.isShareUseProp = !1;
    e.watchVideoTimes = 0;
    e.dailyVideoTimes = 0;
    e.getTTUserInfo = !1;
    e.ContinuousLoginDays = 0;
    e.loginDay = 0;
    e.UserAvatarUrl = "";
    e.UserNickName = "";
    e.openId = "";
    e.sceneId = "";
    e.subscribePassLevel = 0;
    e.isSubscribe = !1;
    e.provinceArr = [
        "安徽",
        "澳门",
        "北京",
        "重庆",
        "福建",
        "甘肃",
        "广东",
        "广西",
        "贵州",
        "海南",
        "河北",
        "河南",
        "黑龙江",
        "湖北",
        "湖南",
        "吉林",
        "江苏",
        "江西",
        "辽宁",
        "内蒙古",
        "宁夏",
        "青海",
        "山东",
        "山西",
        "陕西",
        "上海",
        "四川",
        "台湾",
        "天津",
        "西藏",
        "香港",
        "新疆",
        "云南",
        "浙江",
        "其他"
    ];
    e.myProvinceIndex = -1;
    e.provincePoint = [];
    e.priceCoefficient = [1, 1];
    e.refreshNum = 0;
    e.isBuyScrewSkin = !1;
    e.spSteelData = {
        0: {
            baseIndex: 0,
            width: 3,
            height: 3,
            angle: 0,
            hole: {
                0: {
                    x: -1,
                    y: 1
                },
                1: {
                    x: 1,
                    y: 1
                },
                2: {
                    x: -1,
                    y: -1
                },
                3: {
                    x: 1,
                    y: -1
                }
            }
        },
        1: {
            baseIndex: 1,
            radius: 3,
            hole: {
                0: {
                    x: 0,
                    y: 0
                }
            }
        },
        2: {
            baseIndex: 1,
            radius: 2,
            hole: {
                0: {
                    x: 0,
                    y: 0
                }
            }
        },
        3: {
            baseIndex: 1,
            radius: 3,
            hole: {
                0: {
                    x: 0,
                    y: 1
                },
                1: {
                    x: 0,
                    y: -1
                },
                2: {
                    x: -1,
                    y: 0
                },
                3: {
                    x: 1,
                    y: 0
                }
            }
        },
        4: {
            baseIndex: 0,
            width: 3,
            height: 3,
            angle: 0,
            hole: {
                0: {
                    x: 0,
                    y: 1
                },
                1: {
                    x: 0,
                    y: -1
                },
                2: {
                    x: -1,
                    y: 0
                },
                3: {
                    x: 1,
                    y: 0
                }
            }
        },
        5: {
            baseIndex: 1,
            radius: 4,
            hole: {
                0: {
                    x: -1.5,
                    y: 0
                },
                1: {
                    x: 0,
                    y: 0
                },
                2: {
                    x: 1.5,
                    y: 0
                }
            }
        }
    };
    e.WhippingNum_gra = 0;
    e.WhippingNum_eli = 0;
    e.rankData = {
        20: {
            name: "螺丝王者",
            points: 1e4,
            reward: 10,
            rewardType: "skinPecie",
            frame: 7
        },
        19: {
            name: "至尊总工Ⅰ",
            points: 8e3,
            reward: 9,
            rewardType: "skinPecie",
            frame: 6
        },
        18: {
            name: "至尊总工Ⅱ",
            points: 7e3,
            reward: 8,
            rewardType: "skinPecie",
            frame: 6
        },
        17: {
            name: "至尊总工Ⅲ",
            points: 6e3,
            reward: 7,
            rewardType: "skinPecie",
            frame: 6
        },
        16: {
            name: "大师傅Ⅰ",
            points: 4600,
            reward: 6,
            rewardType: "skinPecie",
            frame: 5
        },
        15: {
            name: "大师傅Ⅱ",
            points: 1e3,
            reward: 5,
            rewardType: "skinPecie",
            frame: 5
        },
        14: {
            name: "大师傅Ⅲ",
            points: 3600,
            reward: 4,
            rewardType: "skinPecie",
            frame: 5
        },
        13: {
            name: "荣耀大工Ⅰ",
            points: 3100,
            reward: 3,
            rewardType: "skinPecie",
            frame: 4
        },
        12: {
            name: "荣耀大工Ⅱ",
            points: 2700,
            reward: 2,
            rewardType: "skinPecie",
            frame: 4
        },
        11: {
            name: "荣耀大工Ⅲ",
            points: 2300,
            reward: 1,
            rewardType: "skinPecie",
            frame: 4
        },
        10: {
            name: "秩序中工Ⅰ",
            points: 1800,
            reward: 1e3,
            rewardType: "gold",
            frame: 3
        },
        9: {
            name: "秩序中工Ⅱ",
            points: 1500,
            reward: 800,
            rewardType: "gold",
            frame: 3
        },
        8: {
            name: "秩序中工Ⅲ",
            points: 1200,
            reward: 600,
            rewardType: "gold",
            frame: 3
        },
        7: {
            name: "倔强小工Ⅰ",
            points: 900,
            reward: 400,
            rewardType: "gold",
            frame: 2
        },
        6: {
            name: "倔强小工Ⅱ",
            points: 700,
            reward: 300,
            rewardType: "gold",
            frame: 2
        },
        5: {
            name: "倔强小工Ⅲ",
            points: 500,
            reward: 200,
            rewardType: "gold",
            frame: 2
        },
        4: {
            name: "学徒Ⅰ",
            points: 300,
            reward: 100,
            rewardType: "gold",
            frame: 1
        },
        3: {
            name: "学徒Ⅱ",
            points: 200,
            reward: 100,
            rewardType: "gold",
            frame: 1
        },
        2: {
            name: "学徒Ⅲ",
            points: 100,
            reward: 100,
            rewardType: "gold",
            frame: 1
        },
        1: {
            name: "实习工",
            points: 50,
            reward: 50,
            rewardType: "gold",
            frame: 0
        },
        0: {
            name: "临时工",
            points: 0,
            reward: 0,
            rewardType: "gold",
            frame: 0
        }
    };
    e.pointNum = 0;
    e.myRank = 0;
    e.CompLevelType = ["simple", "hard", "difficult"];
    e.CompMaxLevel = 3;
    e.CompLevelConfig = {};
    e.CompTypeLevelConfig = {};
    e.CompetitionLevel = [];
    e.clearSteelNum = 0;
    e.wholeSteelNum = 0;
    e.Single_Game_Rewards = {
        0: {
            points: 50,
            gold: 100
        },
        1: {
            points: 30,
            gold: 50
        },
        2: {
            points: 10,
            gold: 30
        },
        3: {
            points: 5,
            gold: 10
        }
    };
    e.Random_Rivals = {
        rivals: [
            {
                nick_name: "名字真难取",
                pass_time: "500",
                del_board_num: "166",
                head_url: "",
                is_pass: "true",
                identity: "1"
            },
            {
                nick_name: "取名字真难",
                pass_time: "480",
                del_board_num: "166",
                head_url: "",
                is_pass: "true",
                identity: "1"
            },
            {
                nick_name: "真难取名字",
                pass_time: "220",
                del_board_num: "88",
                head_url: "",
                is_pass: "false",
                identity: "1"
            }
        ]
    };
    e.playerData = {
        nick_name: "me",
        pass_time: "500",
        del_board_num: "166",
        head_url: "",
        is_pass: "true",
        identity: "0"
    };
    e.recentGameRecord = {
        recentRecord: []
    };
    e.compRankList = {
        users: {}
    };
    e.randomNickNameArr = [
        "柠檬小丸子",
        "来了老弟",
        "超能睡",
        "轉角遇到爱",
        "兜里全是可爱",
        "做个吃货",
        "骑猪上高速",
        "辣条爱上我",
        "贫道不吃素",
        "作业做不完",
        "著名奶茶鉴定师",
        "小熊玩气球",
        "鸭梨山大",
        "人美嘴又甜",
        "长得危险还没钱",
        "走路太狂易摔跤",
        "白日梦工厂厂长",
        "明人不说暗话",
        "带你狂奔带你飞",
        "可爱鬼格桑花",
        "元气少女郭德纲",
        "钢铁直男楚淑芝",
        "我的心上人呢",
        "此账号已停用",
        "月亮是我啃弯的",
        "唐氏表演法",
        "芽糖糖",
        "金刚芭比",
        "居家男人孙越越",
        "耍赖皮",
        "锦标赛金牌选手",
        "智慧女孩要秃头",
        "逗比升级成逗神",
        "一身正气结果漏气",
        "贫僧不禁女色",
        "捣莓熊加勒比海带",
        "亡梦人狱中猫",
        "敌敌畏都毒不死",
        "咬着棒棒糖",
        "如今哥很缺爱",
        "一小罐牛奶"
    ];
    e.randomAvatar = [];
    e.isOpen = !0;
    e.shopCollect = null;
    e.collectNameConfig = [
        "百货店",
        "办公楼",
        "便利店",
        "冰淇淋店",
        "玻璃餐厅",
        "茶餐厅",
        "厂房",
        "电话亭",
        "电影院",
        "动物医院",
        "独栋小院",
        "服装店",
        "汉堡店",
        "货仓",
        "家具厂",
        "教堂",
        "警察局",
        "酒吧",
        "咖啡茶餐馆",
        "咖啡店",
        "快餐店",
        "快闪店",
        "露天餐馆",
        "猫咖",
        "美式别墅",
        "面包店",
        "奶茶店",
        "披萨店",
        "热狗店",
        "日用品店",
        "商场",
        "商品房",
        "商务大厦",
        "商务楼",
        "社区中心",
        "水厂",
        "体育商店",
        "甜品屋",
        "停车场",
        "玩具店",
        "西餐厅",
        "消防厅",
        "小厂房",
        "小商铺",
        "小洋房",
        "小住宅",
        "鞋店",
        "牙科医院",
        "医院",
        "银行",
        "杂货铺",
        "炸鸡店",
        "展览馆",
        "自助店",
        "休闲餐厅",
        "小区餐厅",
        "小区咖啡",
        "街头咖啡",
        "老社区餐馆",
        "旧小区楼",
        "食品百货店",
        "新潮咖啡店",
        "蓝色百货店",
        "自然风住宅",
        "老社区百货",
        "蓝色小店铺",
        "自然风餐厅",
        "百年老铺",
        "清新餐厅",
        "快餐咖啡店",
        "社区医院",
        "三甲医院",
        "度假村百货",
        "玻璃商场",
        "橘子主题店",
        "度假村小铺",
        "城中小店铺",
        "高端咖啡厅",
        "卡布奇诺店",
        "绿色餐厅",
        "林中小店",
        "无人百货店",
        "露台咖啡厅",
        "闹区百货店",
        "大院别墅",
        "玻璃顶停车场",
        "玻璃顶洗车店",
        "双层洗车店",
        "洗车店",
        "美式汉堡店",
        "消防车站",
        "快餐咖啡",
        "甜筒店",
        "街边居民楼",
        "L形居民楼",
        "路边烧烤店",
        "自行车店",
        "精装早餐店",
        "香水体验店",
        "旧车库",
        "绿色食品店",
        "化工厂",
        "小面包店",
        "环形体育场",
        "高档面包店",
        "精装个体店",
        "奶酪顶商店",
        "日式小餐馆",
        "烤面包店",
        "迷你城堡",
        "双层别墅",
        "青色店铺",
        "橘色平房",
        "方形化工厂",
        "甜甜圈店",
        "路边百货",
        "双层居民楼",
        "绿色通道口",
        "橘白双层楼",
        "悠闲小平房",
        "梦幻甜品店",
        "黑白风咖啡",
        "玻璃橱窗店",
        "小聚餐厅",
        "天台咖啡",
        "室外咖啡",
        "披萨主题店",
        "市区医院",
        "橘色双层店",
        "温馨烧烤店",
        "废旧厂房",
        "平顶超市",
        "车库平房",
        "拉面主题店",
        "棕色咖啡厅",
        "橡木休闲吧",
        "蓝白快餐店",
        "精致食品店",
        "橘子专卖店",
        "石油化工厂",
        "日本街边摊",
        "和风住宅",
        "菠萝主题店",
        "灯泡主题店",
        "拉面店",
        "寿喜烧店",
        "方形博物馆",
        "方形汽修店",
        "方形百货店",
        "个体面包店",
        "平层百货店",
        "寿司店",
        "温馨咖啡店",
        "圆形披萨店",
        "紫色百货",
        "独栋小屋",
        "花店",
        "绿色茶餐厅",
        "奶油蛋糕店",
        "音乐小巷",
        "宠物医院",
        "公园面包店",
        "红白甜品店",
        "现代杂货店",
        "小型花店",
        "大礼堂",
        "蛋糕店",
        "简约餐厅",
        "梦幻音乐店",
        "柠檬主题店",
        "日式双层楼",
        "圆形花店",
        "圆形火锅店",
        "圆形甜品店",
        "方形面包店",
        "香肠面包店",
        "铜锣烧店",
        "现代绿植店",
        "烤煎饼店",
        "时钟咖啡店"
    ];
    e.addHoleHave = !1;
    e.clearHoleHave = !1;
    e.creshSteelPreHave = !1;
    e.inviteProgress = 0;
    
    return (t = __decorate([l], e));
})();
exports.default = s;
