var $game = require("./Game");
var a = "https://api.flysheeep.com/api/tapaway/get_geng_config?appid=";
var i = (function () {
    function e() {}
    e.readStrategyData = function () {
        var e = this;
        return new Promise(function (t) {
            if ("" == e.setUrl()) {
                t(null);
            }
            t(null);
            return
            $game.default.apiPlatform.request(
                "https://dd.darknight.games/tongqu/wx/shenhe/config.json",
                null,
                function (e) {
                    if (e) {
                        var n = JSON.parse(e.data);
                        if (n && n.data) {
                            t(n.data);
                        }
                    } else {
                        t(null);
                    }
                },
                function () {
                    t(null);
                },
                "GET"
            );
        });
    };
    e.readLevelData = function () {
        return new Promise(function (e) {
            e(null);
            return
            $game.default.apiPlatform.request(
                "https://dd.darknight.games/tongqu/wx/shenhe/eliminateLevelData.json",
                null,
                function (t) {
                    if (t) {
                        var n = JSON.parse(t.data);
                        if (n && n.data) {
                            e(n.data);
                        }
                    } else {
                        e(null);
                    }
                },
                function () {
                    e(null);
                },
                "GET"
            );
        });
    };
    e.setUrl = function () {
        switch ($game.default.config.currentPlatform) {
            case $game.default.config.platformEnum.wechat:
                return a + "wxf49b0a26d9405058";
            case $game.default.config.platformEnum.toutiao:
                return a + "tt677b11c6f84a401f02";
            default:
                console.log("未定义平台值");
                return "";
        }
    };
    return e;
})();
exports.default = i;
