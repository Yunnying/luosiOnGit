exports.ENUM_GAME_STATES = exports.ENUM_SCREW_STATES = exports.ENUM_PROP_STATES = void 0;
var o = cc._decorator;
o.ccclass;
o.property;
(function (e) {
    e.NONE = "none";
    e.ADD_HOLE = "addHole";
    e.CHANGE_BOX = "changeBox";
    e.CLEAR_HOLE = "clearHole";
    e.CRESH_STEEL_PRE = "crashSteelpre";
    e.CRESH_STEEL = "crashSteel";
    e.ADD_BOX = "addBox";
})(exports.ENUM_PROP_STATES || (exports.ENUM_PROP_STATES = {}));
(function (e) {
    e.IDLE = "idle";
    e.MOVETOHOLE = "moveToHole";
    e.MOVETOBOX = "moveToBox";
    e.BOXANI = "boxani";
    e.PROPANI = "propani";
})(exports.ENUM_SCREW_STATES || (exports.ENUM_SCREW_STATES = {}));
(function (e) {
    e.WIN = "Win";
    e.LOSE = "Lose";
    e.NORMAL = "noarmal";
})(exports.ENUM_GAME_STATES || (exports.ENUM_GAME_STATES = {}));
