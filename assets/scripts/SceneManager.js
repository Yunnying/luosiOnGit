var o = (function () {
    function e() {}
    e.preLoadScene = function (e) {
        return new Promise(function (t) {
            cc.director.preloadScene(e, function (e) {
                if (e) {
                    console.error("[scene.load]:" + e);
                }
                t("场景预加载");
            });
        });
    };
    e.loadScene = function (e, t) {
        if (void 0 === t) {
            t = function () {};
        }
        return new Promise(function (n) {
            cc.director.loadScene(e, function () {
                t();
                n("场景加载");
            });
        });
    };
    e.SCENE_LOADING = "Loading";
    e.SCENE_MAIN = "";
    e.SCENE_BATTLE = "Game";
    return e;
})();
exports.default = o;
