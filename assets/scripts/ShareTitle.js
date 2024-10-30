var $commonData = require("./commonData");
var a = (function () {
    function e() {}
    e.getShareIdInfo = function () {
        return "title=" + this.lastShareIdInfo.title + "&img=" + this.lastShareIdInfo.img;
    };
    e.init = function () {
        var e = cc.assetManager.getBundle(this.shareBundle);
        var t = function (t) {
            var o = n.shareInfo[t].url;
            var a = n;
            e.load(o, cc.Asset, function (e, n) {
                if (!e) {
                    var o = n.nativeUrl;
                    a.shareInfo[t].url = o;
                }
            });
        };
        var n = this;
        for (var o = 0; o < this.shareInfo.length; o += 1) {
            t(o);
        }
    };
    e.getRandomTitle = function () {
        this.shareNum = Math.floor(Math.random() * this.shareInfo.length);
        var e = this.shareInfo[this.shareNum].title;
        this.lastShareIdInfo.title = this.shareInfo[this.shareNum].id;
        return e;
    };
    e.getRandomTitle2 = function (e) {
        console.log("-------------------num", e);
        console.log("commonData.passLevel===>", $commonData.default.passLevel);
        console.log("commonData.currLevel===>", $commonData.default.currLevel);
        switch (e) {
            case 1:
                if (0 == $commonData.default.currLevel) {
                    return "上厕所玩这个，腿都麻了！";
                } else {
                    return (
                        (this.shareNum = Math.floor(Math.random() * this.shareInfo1.length)),
                        this.shareInfo1[this.shareNum]
                    );
                }
            case 2:
                if (0 == $commonData.default.currLevel) {
                    return (
                        (this.shareNum = Math.floor(Math.random() * this.shareInfo2.length)),
                        this.shareInfo2[this.shareNum]
                    );
                } else {
                    return Math.random() < 0.33
                        ? "第" + $commonData.default.currLevel + "关，我已经过关啦，你呢？"
                        : Math.random() < 0.66
                        ? "已通过" + $commonData.default.currLevel + "关，你敢来挑战我的记录吗？"
                        : "第" + String($commonData.default.currLevel + 1) + "关也太难啦！不信你能过！";
                }
            case 3:
            case "3":
                console.log("--------------------------3");
                console.log;
                return Math.random() < 0.5
                    ? "第" + $commonData.default.currLevel + "关，成功攻克难关！"
                    : "据说第" + $commonData.default.currLevel + "关无人能过，除了我！";
            case 4:
            case "4":
                this.shareNum = Math.floor(Math.random() * this.shareInfo4.length);
                return this.shareInfo4[this.shareNum];
            case 5:
                this.shareNum = Math.floor(Math.random() * this.shareInfo5.length);
                return this.shareInfo5[this.shareNum];
            case 0:
            default:
                console.log("------------------default", e);
                return this.getRandomTitle();
        }
    };
    e.getRandomImageUrl = function () {
        this.shareNum = Math.floor(Math.random() * this.shareImg.length);
        var e = this.shareImg[this.shareNum].url;
        this.lastShareIdInfo.img = this.shareImg[this.shareNum].id;
        console.log("url", e);
        return e;
    };
    e.shareBundle = "subPackage1";
    e.shareInfo = [
        {
            id: 0,
            title: "难度好高啊，玩个锤子！",
            url: "https://mmocgame.qpic.cn/wechatgame/E3ZoxTJGu5wFrZjpx0icsdgEcebpAiaicSHicSyWwg4xqBv39GtHCia90RKw8LzskogvO/0"
        },
        {
            id: 1,
            title: "你过得了吗？我玩得贼6",
            url: "https://mmocgame.qpic.cn/wechatgame/TOaHnNtRUyjzXLBcIkujA9sxXOVFb4MtHzUibJuvrQeRtUDHl6AGibLQYibwliaEQj8k/0"
        },
        {
            id: 2,
            title: "这关我过不去了，快来帮帮我！",
            url: "https://mmocgame.qpic.cn/wechatgame/h08jWsljIib5JnCU950Biarkmns9F4bAADBbADWAhnQLSxwZVs6GYW6nKcyjQ1YpZK/0"
        },
        {
            id: 3,
            title: "只有0.1%的人能通关，玻璃心慎入",
            url: "https://mmocgame.qpic.cn/wechatgame/LY1QzVuowKYNU7m0icph1dRtLDnEKU5dKwrNicyzuH9vIibbWvp0rFAlaXUONRWQZqk/0"
        },
        {
            id: 4,
            title: "这么多年智商有没有涨，有没有认真学习",
            url: "https://mmocgame.qpic.cn/wechatgame/aC8WlIw6574BwEgggiaObCsTY7dGxqwEVdRedcr3yeiaqRqWic0tfTicjPc1IiavYSFJh/0"
        },
        {
            id: 5,
            title: "难度没调！有时候自己原因好吧",
            url: "https://mmocgame.qpic.cn/wechatgame/E3ZoxTJGu5wFrZjpx0icsdgEcebpAiaicSHicSyWwg4xqBv39GtHCia90RKw8LzskogvO/0"
        },
        {
            id: 6,
            title: "超解压打螺丝游戏，不来试试吗？",
            url: "https://mmocgame.qpic.cn/wechatgame/h08jWsljIib5JnCU950Biarkmns9F4bAADBbADWAhnQLSxwZVs6GYW6nKcyjQ1YpZK/0"
        },
        {
            id: 7,
            title: "这个螺丝怎么就拧进不去呢？",
            url: "https://mmocgame.qpic.cn/wechatgame/aC8WlIw6574BwEgggiaObCsTY7dGxqwEVdRedcr3yeiaqRqWic0tfTicjPc1IiavYSFJh/0"
        }
    ];
    e.shareImg = [
        {
            id: 6,
            url: "https://mmocgame.qpic.cn/wechatgame/T0Q3sTU5dpmYr02oFpJ7EFiaQxLSTNWGzAeZrOagMYia6LhqibjMRVnJqoHoM5Y3sl8/0"
        },
        {
            id: 7,
            url: "https://mmocgame.qpic.cn/wechatgame/D2t9X5RxjOTiatKHIG4rP8xTicoT4a5PAdenyicQhINrnFYSyxUQAUEYp9phkmVzZp5/0"
        },
        {
            id: 8,
            url: "https://mmocgame.qpic.cn/wechatgame/edAxxVGlqsuG7vGxlzR07nGyI7C5scCAVckC6GBVbaPic2jKtE7Or0zfkIictCy4ic5/0"
        },
        {
            id: 12,
            url: "https://mmocgame.qpic.cn/wechatgame/r6J49jhXnuqJX818WxZsViayicpCP65rQKpJjVqZo039jT16Lc1Nva1u8DVSoJib0RA/0"
        },
        {
            id: 13,
            url: "https://mmocgame.qpic.cn/wechatgame/2Ay8LR9JgI32g5oOwwLm8IRFuHpK5R9KhR9HcPgU6Wg0DKIAMDAhVX0iaFmpq0OEZ/0"
        },
        {
            id: 15,
            url: "https://mmocgame.qpic.cn/wechatgame/60741QOedsRQAnW6mkGqJUhmfwxu7srrtduAGx3maR1hKLdRcGtia1fMzXMD1lEsu/0"
        },
        {
            id: 17,
            url: "https://mmocgame.qpic.cn/wechatgame/w8tjwU4MHbibQX8AQCTUXUKdMx6Sk6bic1Pu1q6DADyGMUgKCfNcSaRGjzRkMo82Qu/0"
        },
        {
            id: 18,
            url: "https://mmocgame.qpic.cn/wechatgame/jiauNNGYzHKibQqrCvzsCHfcIwDCm7XVV3ehia0jbltMwCDicrSiayF2P4PzrsmaaWicld/0"
        },
        {
            id: 19,
            url: "https://mmocgame.qpic.cn/wechatgame/C0qdFbnctwPyAdJZEFibBgqrc9mUicHMYU07dZbuLLuQib4Iz8YktwpEZcwQe5FwLNH/0"
        },
        {
            id: 23,
            url: "https://mmocgame.qpic.cn/wechatgame/INcic1xia3dwt25TBBmdRceGMsn4L56vVewGXIibVic9H5eGab65gEyuIFfPNdLKURSd/0"
        },
        {
            id: 27,
            url: "https://mmocgame.qpic.cn/wechatgame/IxwhJjvhuia7rEFX5fuGQUGwmos4nhzJnoPWRF2bopxTViaVGm7icSibriaSaCjTmRqvJ/0"
        },
        {
            id: 28,
            url: "https://mmocgame.qpic.cn/wechatgame/lmmcSn9G5SEhtkM7PXKKibzSae3huIaJGcuZGuxRgSuNAtm29EoRKIaqsicSJ8KdKC/0"
        },
        {
            id: 30,
            url: "https://mmocgame.qpic.cn/wechatgame/zwsPS9EIqEC7Hd4H366XxEUvVxOqqpicD0HiaxporpDw8pQWNyhvDv0uEiaSU21pEVL/0"
        },
        {
            id: 33,
            url: "https://mmocgame.qpic.cn/wechatgame/SQz9k5aCP5ibK0ibNS5LtXr8O8uPWjBdiaibONwialaT8a758sKlOcic5gicGtbOudZDKdR/0"
        },
        {
            id: 34,
            url: "https://mmocgame.qpic.cn/wechatgame/9TdbTHe9uLmxrpiap7sNfV7yncLpoan7CRicVCXm1iaI3NVUhPI1QRYptq8l08K2XyP/0"
        },
        {
            id: 35,
            url: "https://mmocgame.qpic.cn/wechatgame/dsXOdWiaeQdMFLDsRRU1cln3H2lTiaUsdicpZ6O0SygcPziapl4T9IPJvoLIPIx5QMEP/0"
        },
        {
            id: 36,
            url: "https://mmocgame.qpic.cn/wechatgame/74DsBMicNx7R1axiaRia3lBvjXaBsaZGXRfBcnR1HS2sZCrQh3VF2iaAqiaakG3mhkFLM/0"
        },
        {
            id: 37,
            url: "https://mmocgame.qpic.cn/wechatgame/uZXCpl7nCiaPK6alHLxhW13vNDdgaBsn2IyHHtMJInPVWdt567kHc9XkqK2r0b6vm/0"
        },
        {
            id: 38,
            url: "https://mmocgame.qpic.cn/wechatgame/Gndl0L5ZM2U3jaWKtGr5sPAtMIsCl1lHEkKMHf02KUf4lwcN1FzVYkmxCtkDBmfn/0"
        },
        {
            id: 39,
            url: "https://mmocgame.qpic.cn/wechatgame/pLPcqfxe0ryRfvqxfGfRHRsSXuP5UG9gG0AKegMSYIRiaZiaCnSLTduyrbqzLgxAU5/0"
        },
        {
            id: 40,
            url: "https://mmocgame.qpic.cn/wechatgame/yySfaOOLMIXtDZTB3hbWhKhiacANpC4E5bacd5wqkA2Zz6GWwIhFyoXrWmdWMuP9v/0"
        },
        {
            id: 41,
            url: "https://mmocgame.qpic.cn/wechatgame/NyU1YskrtKvYOIhFUgMRTHeBqAgkiaaibGZcXntcRIllFXLvreLIpr6QWrr7o3ZuTs/0"
        },
        {
            id: 42,
            url: "https://mmocgame.qpic.cn/wechatgame/s8nG7ibib4XXKSgdmFC5h3NA7ficqiaxobQshYZbxUj27V3lwSRcSnDh4F8uApvedK39/0"
        },
        {
            id: 43,
            url: "https://mmocgame.qpic.cn/wechatgame/CiaxU05j9g9QLPXQibcc8YGGHoDEufvVk7iahOoZPibRuR49fupdyt5whoTsnVZDACX8/0"
        }
    ];
    e.shareInfo1 = [
        "可算是把螺丝打完了，看看我的名次吧！",
        "又敲掉了几块木板，来比比看谁敲的多！",
        "我名次又提升了，来围观围观！",
        "哈哈哈哈哈，我上榜啦！"
    ];
    e.shareInfo2 = [
        "真以为随便瞎点点就能过关啊",
        "这游戏巨难，能全通关就服你！",
        "这个打螺丝的游戏很解压，快来玩！",
        "小丑竟是我自己！快帮帮我过关吧！"
    ];
    e.shareInfo3 = [
        "第" + $commonData.default.passLevel + "关，成功攻克难关！",
        "据说第" + $commonData.default.passLevel + "关无人能过，除了我！"
    ];
    e.shareInfo4 = ["太可惜了，再给我一分钟一定能过！", "木板都叠到一起啦，这玩个锤子？！"];
    e.shareInfo5 = [
        "通关时间不足了，快来帮帮我！",
        "通关步数不足了，快来帮帮我！",
        "这游戏玩了一下午了，根本停不下来！",
        "老婆晚上不睡觉，居然是在玩锤子？！",
        "据说只有智商190以上的人才能通关",
        "这个游戏有毒，1分钟上手，3分钟上头！",
        "你还过不了关？有时候是自己的原因好吧",
        "一个人手速不够，你也一起来吧！",
        "死了啦！都怪你不帮我！",
        "我不行了，你行你上！",
        "等过了这一关，我就去睡觉！",
        "10年老司机都过不了，不信你来试试",
        "好玩上头还解压的游戏，不来试试吗",
        "看着不难，怎么我就是过不了关呢？",
        "难度没调！有时候是自己的原因好吧",
        "只有0.1%的人能通关，玻璃心慎入",
        "这么多年智商有没有涨，有没有认真学习",
        "超解压打螺丝游戏，不来试试吗？",
        "这个螺丝怎么就拧进不去呢？",
        "这关我过不去了，快来帮帮我！"
    ];
    e.lastShareIdInfo = {
        title: 0,
        img: 0
    };
    e.shareNum = -1;
    return e;
})();
exports.default = a;
