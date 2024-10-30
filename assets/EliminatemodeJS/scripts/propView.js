var o;
var r = cc._decorator;
var a = r.ccclass;
var c = r.property;
var $enum = require("../../scripts/Enum");
var $eliminateManager = require("./EliminateManager");
var $commonData = require("../../scripts/commonData");
var $game = require("../../scripts/Game");
var $platform = require("../../scripts/platform");
var $eliminateGamelevel = require("./EliminateGamelevel");
var $eliminateManager = require("./EliminateManager");
var $localStorage = require("../../scripts/localStorage");
var $eliminateGamelevel = require("./EliminateGamelevel");
var $eliminateBoxManager = require("./EliminateBoxManager");
var _ = (function (e) {
    function t() {
        var t = e.call(this) || this;
        t.propIconImgArr = [];
        t.describeLabel = null;
        t.usetimesLabel = null;
        t.reviveLabel = null;
        t.title = null;
        t.iconSprite = null;
        t.closeBtnSP = null;
        t.closeBtnImg = [];
        t.useBtn = null;
        t.isReviveMode = !1;
        t.PropDescription = [
            "增加一个新格放螺丝",
            "当前盒子直接移走(不需要装满)",
            "清空格子上的所有螺丝",
            "敲碎关卡中的一个玻璃板"
        ];
        t.PropreviveDes = ["复活并增加1个格子", "复活并清空格子", "复活并开启一个盒子"];
        t.titleArray = ["增加孔位", "移走螺丝", "敲碎玻璃", "增加盒子"];
        t.propName = ["加格", "换箱", "清格", "碎板"];
        t.mode = null;
        y.instance = t;
        return t;
    }
    var y;
    __extends(t, e);
    y = t;
    t.prototype.initProp = function (e) {
        if (void 0 === e) {
            e = !1;
        }
        $commonData.default.isPause = !0;
        console.error("===================>", $eliminateManager.default.instance.propState);
        var t = 0;
        switch ($eliminateManager.default.instance.propState) {
            case $enum.ENUM_PROP_STATES.ADD_HOLE:
                this.reviveLabel.string = this.PropreviveDes[0];
                this.title.string = this.titleArray[0];
                t = 0;
                break;
            case $enum.ENUM_PROP_STATES.CLEAR_HOLE:
                this.reviveLabel.string = this.PropreviveDes[1];
                this.title.string = this.titleArray[1];
                t = 2;
                break;
            case $enum.ENUM_PROP_STATES.CRESH_STEEL_PRE:
                this.title.string = this.titleArray[2];
                t = 3;
                break;
            case $enum.ENUM_PROP_STATES.ADD_BOX:
                this.reviveLabel.string = this.PropreviveDes[2];
                this.title.string = this.titleArray[3];
                t = 4;
        }
        if (this.isReviveMode) {
            console.log("复活弹出");
            this.describeLabel.node.active = !1;
            this.reviveLabel.node.active = !0;
            this.closeBtnSP.spriteFrame = this.closeBtnImg[1];
            this.title.string = "复活";
        } else {
            console.error("主动弹出");
            this.describeLabel.node.active = !0;
            this.reviveLabel.node.active = !1;
            this.closeBtnSP.spriteFrame = this.closeBtnImg[0];
        }
        if ($commonData.default.eliminatePropUseNum[t] >= 2) {
            this.useBtn.interactable = !1;
        } else {
            this.useBtn.interactable = !0;
        }
        this.iconSprite.spriteFrame = this.propIconImgArr[t];
        this.describeLabel.string = this.PropDescription[t];
        this.usetimesLabel.string = "道具已使用: " + $commonData.default.eliminatePropUseNum[t] + "/2";
        if ($commonData.default.eliminte_game_mode != $commonData.Eliminate_Mode.AIPLAY) {
            e ? $eliminateManager.default.instance.showUI(this.node) : this.checkNeedShowPln();
        } else {
            this.clickGet();
        }
    };
    t.prototype.checkNeedShowPln = function () {
        switch ($eliminateManager.default.instance.propState) {
            case $enum.ENUM_PROP_STATES.ADD_HOLE:
                if ($localStorage.default.getLocalItem("addHoleHave", !1)) {
                    this.clickGet();
                } else {
                    $eliminateManager.default.instance.showUI(this.node);
                    $localStorage.default.setLocalItem("addHoleHave", !0);
                    $eliminateManager.default.instance.propBtnVideImg[0].active = !0;
                }
                break;
            case $enum.ENUM_PROP_STATES.CLEAR_HOLE:
                if ($localStorage.default.getLocalItem("clearHoleHave", !1)) {
                    this.clickGet();
                } else {
                    $eliminateManager.default.instance.showUI(this.node);
                    $localStorage.default.setLocalItem("clearHoleHave", !0);
                    $eliminateManager.default.instance.propBtnVideImg[1].active = !0;
                }
                break;
            case $enum.ENUM_PROP_STATES.CRESH_STEEL_PRE:
                if ($localStorage.default.getLocalItem("creshSteelPreHave", !1)) {
                    this.clickGet();
                } else {
                    $eliminateManager.default.instance.showUI(this.node);
                    $localStorage.default.setLocalItem("creshSteelPreHave", !0);
                    $eliminateManager.default.instance.propBtnVideImg[2].active = !0;
                }
        }
    };
    t.prototype.clickGet = function () {
        $commonData.default.isPause = !1;
        if ($eliminateGamelevel.default.instance.screwState == $enum.ENUM_SCREW_STATES.IDLE) {
            this.checkPermission();
        } else {
            this.clickClose();
        }
    };
    t.prototype.checkPermission = function () {
        var e = this;
        if (null != this.mode) {
            $eliminateManager.default.instance.propState = this.mode;
        }
        switch ($eliminateManager.default.instance.propState) {
            case $enum.ENUM_PROP_STATES.ADD_HOLE:
                if (
                    $eliminateGamelevel.default.instance.screwHoleUnlockNum >=
                    $eliminateGamelevel.default.instance.screwHoleMaxNum
                ) {
                    return void this.clickClose();
                }
                $platform.reportButton("GamePage", "addCellBtn_video", $commonData.default.currLevel, 1, 1);
                if (this.isReviveMode) {
                    $platform.videoTrack("Revive", "addCellBtn_video", $commonData.default.currLevel, 1);
                } else {
                    $platform.videoTrack("game", "addCellBtn_video", $commonData.default.currLevel, 1);
                }
                break;
            case $enum.ENUM_PROP_STATES.CLEAR_HOLE:
                if ($eliminateGamelevel.default.instance.holeNode.children.length <= 0) {
                    console.error("1===>", $eliminateManager.default.instance.propState);
                    if (!this.node.active) {
                        this.clickClose();
                        console.error("2===>", $eliminateManager.default.instance.propState);
                    }
                    return void console.error("3===>", $eliminateManager.default.instance.propState);
                }
                $platform.reportButton("GamePage", "cleanCellBtn_video", $commonData.default.currLevel, 1, 1);
                if (this.isReviveMode) {
                    $platform.videoTrack("Revive", "cleanCellBtn_video", $commonData.default.currLevel, 1);
                } else {
                    $platform.videoTrack("game", "cleanCellBtn_video", $commonData.default.currLevel, 1);
                }
                break;
            case $enum.ENUM_PROP_STATES.CRESH_STEEL_PRE:
                $platform.reportButton("GamePage", "breakBoardBtn_video", $commonData.default.currLevel, 1, 1);
                if (this.isReviveMode) {
                    $platform.videoTrack("Revive", "breakBoardBtn_video", $commonData.default.currLevel, 1);
                } else {
                    $platform.videoTrack("game", "breakBoardBtn_video", $commonData.default.currLevel, 1);
                }
                break;
            case $enum.ENUM_PROP_STATES.ADD_BOX:
                $platform.reportButton("GamePage", "addBox_video", $commonData.default.currLevel, 1, 1);
                if (this.isReviveMode) {
                    $platform.videoTrack("Revive", "addBox_video", $commonData.default.currLevel, 1);
                } else {
                    $platform.videoTrack("game", "addBox_video", $commonData.default.currLevel, 1);
                }
        }
        this.mode = $eliminateManager.default.instance.propState;
        $eliminateManager.default.instance.propState = $enum.ENUM_PROP_STATES.NONE;
        $game.default.apiPlatform.showRewardAD(function () {
            (function () {
                $eliminateManager.default.instance.showUI(e.node, !1);
                switch (e.mode) {
                    case $enum.ENUM_PROP_STATES.ADD_HOLE:
                        $platform.reportButton(
                            "GamePage",
                            "addCellBtn_video_success",
                            $commonData.default.currLevel,
                            1,
                            2
                        );
                        if (e.isReviveMode) {
                            $platform.videoTrack(
                                "Revive",
                                "addCellBtn_video_success",
                                $commonData.default.currLevel,
                                2
                            );
                        } else {
                            $platform.videoTrack("game", "addCellBtn_video_success", $commonData.default.currLevel, 2);
                        }
                        $eliminateGamelevel.default.instance.clickAddHole();
                        break;
                    case $enum.ENUM_PROP_STATES.CLEAR_HOLE:
                        $platform.reportButton(
                            "GamePage",
                            "cleanCellBtn_video_success",
                            $commonData.default.currLevel,
                            1,
                            2
                        );
                        if (e.isReviveMode) {
                            $platform.videoTrack(
                                "Revive",
                                "cleanCellBtn_video_success",
                                $commonData.default.currLevel,
                                2
                            );
                        } else {
                            $platform.videoTrack(
                                "game",
                                "cleanCellBtn_video_success",
                                $commonData.default.currLevel,
                                2
                            );
                        }
                        $eliminateGamelevel.default.instance.clickClearHole();
                        break;
                    case $enum.ENUM_PROP_STATES.CRESH_STEEL_PRE:
                        $eliminateManager.default.instance.showCrushGuide();
                        $platform.reportButton(
                            "GamePage",
                            "breakBoardBtn_video_success",
                            $commonData.default.currLevel,
                            1,
                            2
                        );
                        if (e.isReviveMode) {
                            $platform.videoTrack(
                                "Revive",
                                "breakBoardBtn_video_success",
                                $commonData.default.currLevel,
                                2
                            );
                        } else {
                            $platform.videoTrack(
                                "game",
                                "breakBoardBtn_video_success",
                                $commonData.default.currLevel,
                                2
                            );
                        }
                        $eliminateManager.default.instance.propState = $enum.ENUM_PROP_STATES.CRESH_STEEL;
                        break;
                    case $enum.ENUM_PROP_STATES.ADD_BOX:
                        $platform.reportButton("GamePage", "addBox_video_success", $commonData.default.currLevel, 1, 2);
                        if (e.isReviveMode) {
                            $platform.videoTrack("Revive", "addBox_video_success", $commonData.default.currLevel, 2);
                        } else {
                            $platform.videoTrack("game", "addBox_video_success", $commonData.default.currLevel, 2);
                        }
                        $eliminateGamelevel.default.instance.unlockBox();
                        $eliminateManager.default.instance.propState = $enum.ENUM_PROP_STATES.ADD_BOX;
                }
                e.mode = null;
                $eliminateBoxManager.default.instance.easyBoxNum = 3;
            })();
            $eliminateManager.default.instance.InitFlag();
        });
    };
    t.prototype.clickClose = function () {
        $commonData.default.isPause = !1;
        $eliminateManager.default.instance.propState = $enum.ENUM_PROP_STATES.NONE;
        if (this.isReviveMode) {
            console.log("-------结束游戏");
            $eliminateManager.default.instance.endGame(!1);
        }
        $eliminateManager.default.instance.showUI(this.node, !1);
        $eliminateGamelevel.default.instance.closeClearPropWindow();
        $eliminateGamelevel.default.instance.closeBreakPropWindow();
        $eliminateGamelevel.default.instance.setTipHoleAni(!1);
    };
    t.prototype.onDisable = function () {
        this.isReviveMode = !1;
    };
    t.instance = null;
    __decorate([c(cc.SpriteFrame)], t.prototype, "propIconImgArr", void 0);
    __decorate([c(cc.Label)], t.prototype, "describeLabel", void 0);
    __decorate([c(cc.Label)], t.prototype, "usetimesLabel", void 0);
    __decorate([c(cc.Label)], t.prototype, "reviveLabel", void 0);
    __decorate([c(cc.Label)], t.prototype, "title", void 0);
    __decorate([c(cc.Sprite)], t.prototype, "iconSprite", void 0);
    __decorate([c(cc.Sprite)], t.prototype, "closeBtnSP", void 0);
    __decorate([c(cc.SpriteFrame)], t.prototype, "closeBtnImg", void 0);
    __decorate([c(cc.Button)], t.prototype, "useBtn", void 0);
    return (y = __decorate([a], t));
})(cc.Component);
exports.default = _;
