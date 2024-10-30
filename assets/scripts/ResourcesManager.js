var $game = require("./Game");
var l = cc._decorator;
var s = l.ccclass;
var u =
    (l.property,
    (function () {
        function e() {}
        e.init = function () {
            return Promise.all([this.loadAnimationClip(), this.loadPrefabs()]);
        };
        e.loadRes = function (e) {
            var t = this;
            return new Promise(function (n) {
                var o = t.res[e];
                if (o) {
                    n(o);
                    return o;
                }
                cc.resources.load("" + e, function (o, a) {
                    if (o) {
                        cc.log("[加载失败] " + e);
                        n(null);
                    } else {
                        t.res[e] = a;
                        n(a);
                    }
                });
            });
        };
        e.loadResDir = function (e, t) {
            var n = this;
            return new Promise(function (o) {
                if (n.res[e]) {
                    console.log("[加载成功-缓存] " + e);
                    o(n.res[e]);
                    return n.res[e];
                }
                cc.resources.loadDir(e, t, function (t, a) {
                    if (t) {
                        console.log("[加载失败] " + e);
                        o([]);
                    } else {
                        n.res[e] = a;
                        console.log("[加载成功] ");
                        o(a);
                    }
                });
            });
        };
        e.loadYunBundle = function (e, t, n, o) {
            var a = this;
            $game.default.loadLvBundle(e, function () {
                console.warn("------------->>", e);
                a.loadBundleRes(e, t, n)
                    .catch(function () {
                        console.error("加载关卡失败!");
                        $game.default.apiPlatform.showTips("加载关卡失败!");
                    })
                    .then(function (e) {
                        if (o) {
                            o(e);
                        }
                    });
            });
        };
        e.loadBundleRes = function (e, t, n) {
            var o = this;
            return new Promise(function (a, i) {
                var c = $game.default.bundleMap[e];
                if (!c) {
                    a(
                        new Promise(function (o, a) {
                            cc.assetManager.loadBundle(e, function (i, c) {
                                if (i) {
                                    a(null);
                                } else {
                                    $game.default.bundleMap[e] = c;
                                    o($game.default.resManager.loadBundleRes(e, t, n));
                                }
                            });
                        })
                    );
                }
                if (o.bundleMapRes[e]) {
                    if (o.bundleMapRes[e][t]) {
                        a(o.bundleMapRes[e][t]);
                        return o.bundleMapRes[e][t];
                    }
                } else {
                    o.bundleMapRes[e] = {};
                }
                c.load(t, n, function (n, c) {
                    if (n) {
                        console.log("[加载失败] " + t, n);
                        i(null);
                    } else {
                        o.bundleMapRes[e][t] = c;
                        a(c);
                    }
                });
            });
        };
        e.loadAudioClips = function () {
            var e = this;
            return new Promise(function (t, n) {
                cc.resources.loadDir("audio", cc.AudioClip, function (o, a) {
                    if (o) {
                        cc.log("[加载失败] 音乐");
                        n();
                    }
                    a.forEach(function (t) {
                        e.AudioClips[t.name] = t;
                    });
                    cc.log("[加载成功] 音乐");
                    t(a);
                });
            });
        };
        e.loadAnimationClip = function () {
            var e = this;
            return new Promise(function (t, n) {
                cc.resources.loadDir("animation", cc.AnimationClip, function (o, a) {
                    if (o) {
                        cc.log("[加载失败]", "animation");
                        n();
                    }
                    a.forEach(function (t) {
                        e.AnimationClips[t.name] = t;
                    });
                    t(a);
                    cc.log("[加载成功]");
                });
            });
        };
        e.loadPrefabs = function () {
            var e = this;
            return new Promise(function (t, n) {
                cc.resources.loadDir("prefab", cc.Prefab, function (o, a) {
                    if (o) {
                        cc.log("[加载失败]", "prefab");
                        n();
                    }
                    a.forEach(function (t) {
                        e.Prefabs[t.name] = t;
                    });
                    t(a);
                    cc.log("[加载成功]");
                });
            });
        };
        e.showAnimation = function (e, t, n, o) {
            var a = this;
            if (void 0 === t) {
                t = this.AnimationClips.scale_small_big;
            }
            if (void 0 === n) {
                n = !0;
            }
            if (void 0 === o) {
                o = !1;
            }
            return new Promise(function (r) {
                return __awaiter(a, void 0, void 0, function () {
                    var a;
                    var i;
                    var l;
                    var s;
                    return __generator(this, function () {
                        if (null !== e && cc.isValid(e, !0)) {
                            return (
                                (e.active = !0),
                                (a = e.getChildByName("mask_top")) && (a.active = !0),
                                n &&
                                ((i = e.getChildByName("mask")),
                                (l = e.getChildByName("content")),
                                i && i.getComponent(cc.BlockInputEvents))
                                    ? (o
                                          ? this.showAnimation(i, this.AnimationClips.opacity_fade_out, !1, !0)
                                          : this.showAnimation(i, this.AnimationClips.opacity_fade_in),
                                      this.showAnimation(l, t, !1, o),
                                      setTimeout(function () {
                                          if (o) {
                                              e.active = !1;
                                              e.opacity = 255;
                                              e.scale = 1;
                                          }
                                          if (a) {
                                              a.active = !1;
                                          }
                                          r();
                                      }, 1e3 * t.duration + 200),
                                      r(),
                                      [2])
                                    : ((s = e.getComponent(cc.Animation)) || (s = e.addComponent(cc.Animation)),
                                      s.addClip(t),
                                      s.play(t.name),
                                      s.setCurrentTime(0),
                                      setTimeout(function () {
                                          if (o) {
                                              e.active = !1;
                                              e.opacity = 255;
                                              e.scale = 1;
                                              if ("content" === e.name) {
                                                  e.position = cc.v3(0, 0, 0);
                                              }
                                          }
                                          if (a) {
                                              a.active = !1;
                                          }
                                          r();
                                      }, 1e3 * t.duration + 200),
                                      [2])
                            );
                        } else {
                            return console.log("[Res.show] 节点不存在或已销毁"), r(), [2];
                        }
                    });
                });
            });
        };
        e.hideAnimation = function (e, t) {
            var n = this;
            if (void 0 === t) {
                t = this.AnimationClips.scale_left_right;
            }
            return new Promise(function (o) {
                if (null !== e && cc.isValid(e, !0)) {
                    if (!n.isMaskInLayer(e)) {
                        var a = e.addComponent(cc.Animation);
                        a.addClip(t);
                        a.getAnimationState(t.name).speed = -a.getAnimationState(t.name).speed;
                        a.setCurrentTime(t.duration);
                        a.play(t.name);
                        return void o(0);
                    }
                    var i = 0;
                    for (var c = e.children; i < c.length; i++) {
                        var r = c[i];
                        if (!r.getComponent(cc.BlockInputEvents)) {
                            n.hideAnimation(r, t);
                        }
                    }
                    o(0);
                } else {
                    o(0);
                }
            });
        };
        e.isMaskInLayer = function (e) {
            var t = 0;
            for (var n = e.children; t < n.length; t++) {
                if (n[t].getComponent(cc.BlockInputEvents)) {
                    return !0;
                }
            }
            return !1;
        };
        e.playEffect = function (e) {
            if (void 0 === e) {
                e = this.AudioClips.button;
            }
            return this.isAudioEffect
                ? e
                    ? cc.audioEngine.playEffect(e, !1)
                    : (cc.log("播放失败的音乐 -> ", e.name), null)
                : null;
        };
        e.playMusic = function (e, t) {
            if (void 0 === e) {
                e = this.AudioClips.bg_main;
            }
            if (void 0 === t) {
                t = !1;
            }
            return this.isAudioBGM
                ? !t && cc.audioEngine.isMusicPlaying()
                    ? null
                    : void (e ? cc.audioEngine.playMusic(e, !0) : cc.log("播放失败的音乐 -> ", e.name))
                : null;
        };
        e.setMusicVolume = function (e) {
            cc.audioEngine.setMusicVolume(e);
        };
        e.setEffectVolume = function (e) {
            cc.audioEngine.setEffectsVolume(e);
        };
        e.addMusicVolume = function (e) {
            e = cc.misc.clamp01(cc.audioEngine.getMusicVolume() + e);
            cc.audioEngine.setMusicVolume(e);
        };
        e.loadRandomAvatar = function (e, t) {
            $game.default.resManager
                .loadBundleRes("levels", "randomAvatar/" + e, cc.SpriteFrame)
                .catch(function () {
                    console.error("加载levels/randomAvatar/" + e + "失败!");
                })
                .then(function (e) {
                    t.getComponent(cc.Sprite).spriteFrame = e;
                });
        };
        e.isAudioEffect = !0;
        e.isAudioBGM = !0;
        e.res = {};
        e.bundleMapRes = {};
        e.AudioClips = {
            button: new cc.AudioClip(),
            bg_main: new cc.AudioClip(),
            compose: new cc.AudioClip(),
            game_over: new cc.AudioClip()
        };
        e.AnimationClips = {
            move_left_out: new cc.AnimationClip(),
            move_left_in: new cc.AnimationClip(),
            opacity_fade_in: new cc.AnimationClip(),
            opacity_fade_out: new cc.AnimationClip(),
            rotate_shake: new cc.AnimationClip(),
            scale_down_up: new cc.AnimationClip(),
            scale_left_right: new cc.AnimationClip(),
            scale_small_big: new cc.AnimationClip(),
            left_to_right: new cc.AnimationClip(),
            small_to_big: new cc.AnimationClip(),
            big_to_small: new cc.AnimationClip(),
            close_scale: new cc.AnimationClip()
        };
        e.Prefabs = {
            Right: new cc.Prefab(),
            wrong: new cc.Prefab()
        };
        return __decorate([s], e);
    })());
exports.default = u;
