var $config = require("./config");
var $platform = require("./platform");
var $sceneManager = require("./SceneManager");
var $resourcesManager = require("./ResourcesManager");
var $localStorage = require("./localStorage");
var $commonData = require("./commonData");
var d = cc._decorator;
var f = d.ccclass;
var p =
    (d.property,
    (function () {
        function e() {}
        var t;
        t = e;
        e.loadModeBundle = function (e, n, o) {
            if (null == t.bundleMap[n]) {
                cc.assetManager.loadBundle(e, function (e, a) {
                    if (e) {
                        return console.error(e);
                    }
                    t.bundleMap[n] = a;
                    if (o) {
                        o();
                    }
                });
            } else {
                console.error("已经存在资源  " + n);
                o && o();
            }
        };
        e.loadLvBundle = function (e, n) {
            if (null == t.bundleMap[e]) {
                cc.assetManager.loadBundle(e, function (o, a) {
                    if (o) {
                        console.log("云关卡资源加载失败  " + e);
                        return console.error(o);
                    }
                    console.log("云关卡资源加载成功  " + e);
                    t.bundleMap[e] = a;
                    if (n) {
                        n();
                    }
                });
            } else {
                console.log("已经存在资源  " + e);
                n && n();
            }
        };
        e.loadBundleRes = function (e, n, o) {
            var a = this;
            return new Promise(function (i, c) {
                var r = t.bundleMap[e];
                if (!r) {
                    i(
                        new Promise(function (a, i) {
                            cc.assetManager.loadBundle(e, function (c, r) {
                                if (c) {
                                    i(null);
                                } else {
                                    t.bundleMap[e] = r;
                                    a(t.resManager.loadBundleRes(e, n, o));
                                }
                            });
                        })
                    );
                }
                if (a.bundleMapRes[e]) {
                    if (a.bundleMapRes[e][n]) {
                        i(a.bundleMapRes[e][n]);
                        return a.bundleMapRes[e][n];
                    }
                } else {
                    a.bundleMapRes[e] = {};
                }
                r.load(n, o, function (t, o) {
                    if (t) {
                        console.log("[加载失败] " + n, t);
                        c(null);
                    } else {
                        a.bundleMapRes[e][n] = o;
                        i(o);
                    }
                });
            });
        };
        e.config = $config;
        e.apiPlatform = $platform;
        e.storage = $localStorage.default;
        e.sceneManager = $sceneManager.default;
        e.resManager = $resourcesManager.default;
        e.com = $commonData;
        e.isCreateLv = !1;
        e.gameView = null;
        e.bundleMap = {
            texture: null,
            levels: null
        };
        e.bundleUrl = {
            texture: "texture",
            levels: "levels"
        };
        e.bundleMapRes = {};
        return (t = __decorate([f], e));
    })());
exports.default = p;
