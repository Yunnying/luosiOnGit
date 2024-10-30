// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import UIMgr from "./UIMgr";
import { wxSDK } from "./wxSDK";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankPnlClass extends cc.Component {



    gray = cc.color(133, 133, 133);
    blue = cc.color(25, 100, 180);

    tabs: cc.Node = null;
    views: cc.Node = null;
    onLoad() {

        this.tabs = this.node.getChildByName("anim").getChildByName("tabs");
        this.views = this.node.getChildByName("anim").getChildByName("tabView");
        this.onTab(null, 0)
    }

    protected onEnable(): void {
        wxSDK.getRankFriend();
    }
    start() {
       
    }

    close() {
        UIMgr.I.close("rankPnl");
    }


    onTab(e, index) {
        for (let i = 0; i < 3; i++) {

            this.tabs.children[i].getChildByName("titleBg2").active = i == index;

            this.tabs.children[i].getChildByName("title").color = i == index ? this.blue : this.gray;

            this.views.children[i].active = i == index;

        }


        if(index==0){
            wxSDK.getRankFriend();
        }
        if (index == 1 ) {

            this.getAreaRank();

        }

        if (index == 2) {

            this.getAllRank();

        }

    }


    areaList: Array<{ id: string, areaName: string, score: number, type: number }>;
    //获取省份排行
    getAreaRank() {
        let areaData={1: '上海', 5: '河北', 6: '江苏', 7: '山西', 8: '辽宁', 9: '黑龙江', 10: '浙江', 11: '江西', 12: '山东', 13: '河南', 14: '安徽', 15: '福建', 16: '吉林', 17: '湖北', 18: '海南', 19: '四川', 20: '贵州', 21: '湖南', 22: '广东', 23: '云南', 24: '甘肃', 25: '青海', 26: '北京', 27: '陕西', 28: '天津', 30: '重庆', 31: '西藏', 32: '广西', 33: '内蒙古', 34: '宁夏', 35: '新疆'}
        let content = this.views.children[1].getChildByName("view").getChildByName("content");
        for (let i = 0; i < content.children.length; i++) {
            content.children[i].active = false;
        }

        let city= localStorage.getItem("City");

        let selfItem=this.views.children[1].getChildByName("selfItem");
        selfItem.active=false;
       if(!city){
        wxSDK.getCity(()=>{
            this.getAreaRank();
        });
      
       }

        wxSDK.autoFetch("/api/getAreaRank", { body: { type: wxSDK.type } }).then((res: any) => {

            if (res.data && res.data.length > 0) {

                this.areaList = res.data;


                for (let i = 0; i < this.areaList.length; i++) {

                    if (i >= content.children.length) {

                        content.addChild(cc.instantiate(content.children[3]))
                    }

                    let data = this.areaList[i];

                    let item = content.children[i];

                    item.active = true;

                    if(!areaData[data.id]){
                        item.active=false;
                        console.error("地区不存在",data)
                    }
                    item.getChildByName("name").getComponent(cc.Label).string =areaData[data.id] ;

                    item.getChildByName("score").getComponent(cc.Label).string = data.score + "关";

                    if (i >= 4) {

                        item.getChildByName("index").getComponent(cc.Label).string = (i +1)+ "";

                        
                    }

                    if(city&&  city.indexOf(areaData[data.id])>=0){
                        selfItem.getChildByName("name").getComponent(cc.Label).string = areaData[data.id];

                        selfItem.getChildByName("score").getComponent(cc.Label).string = data.score + "关";

                        selfItem.getChildByName("index").getComponent(cc.Label).string = (i +1) + "";

                        selfItem.active=true;
                    }
                }
            }

        })
    }


    allList: Array<{ id: string, userinfo: string, score: number }>;
    getAllRank() {
        let content = this.views.children[2].getChildByName("view").getChildByName("content");
        for (let i = 0; i < content.children.length; i++) {
            content.children[i].active = false;
        };
        wxSDK.autoFetch("/api/getRank", { body: { type: wxSDK.type, page: 1, pageSize: 20 } }).then((res: any) => {
            if (res.data && res.data.rows.length > 0){
                this.allList=res.data.rows;
                this.allList.sort((a,b)=>{
                   if(a.score==b.score){
                     let userinfo1 = JSON.parse(a.userinfo||JSON.stringify({}));
                     let userinfo2 = JSON.parse(b.userinfo||JSON.stringify({}));
                     return userinfo1.nickName.localeCompare(userinfo2.nickName)
                   }else{
                    return b.score-a.score
                   }
                })
                this.setAllItem();
            }
                
        }, () => { })
    }

    setAllItem() {
        let content = this.views.children[2].getChildByName("view").getChildByName("content");

        for (let i = 0; i < this.allList.length; i++) {

            if (i >= content.children.length) {

                content.addChild(cc.instantiate(content.children[3]))
            }

            let data = this.allList[i];

            let item = content.children[i];

            let userinfo = JSON.parse(data.userinfo||JSON.stringify({}));

            if(!userinfo.nickName){

                console.error("userinfo异常");

                return;
            }

            item.active = true;


            item.getChildByName("name").getComponent(cc.Label).string = userinfo.nickName;

            item.getChildByName("score").getComponent(cc.Label).string = data.score + "关";

            if (i >= 4) {

                item.getChildByName("index").getComponent(cc.Label).string = i + "";

            }

            let head = item.getChildByName("head");

            head.active = false;

            cc.loader.load({url: userinfo.avatarUrl, type: 'png'},(err, texture)=>{
                if(err){
                   console.error("图片加载失败")
                }else{
                    head.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);

                    head.active = true;
                }
               
            })
          



        }

        //设置自己的

       
        
        let selfItem=this.views.children[2].getChildByName("selfItem");
        selfItem.active=false;

       
            wxSDK.autoFetch("/api/getRankById", { body: { type: wxSDK.type, id:wxSDK.openid } }).then((res:{data:{rank:number,user:Array<{userinfo:string,score:number}>}}) => {
                
                if(!res.data||!res.data.user||res.data.user.length<=0) return;
                let userinfo=JSON.parse(res.data.user[0].userinfo)
                selfItem.getChildByName("name").getComponent(cc.Label).string = userinfo.nickName;

                selfItem.getChildByName("score").getComponent(cc.Label).string =res.data.user[0].score + "关";

                selfItem.getChildByName("index").getComponent(cc.Label).string = res.data.rank + "";
                let head = selfItem.getChildByName("head");
                cc.loader.load({url: userinfo.avatarUrl, type: 'png'},(err, texture)=>{
                    if(err){
                       console.error("图片加载失败")
                    }else{
                        head.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
    
                        head.active = true;
                    }
                   
                })

                selfItem.active=true;
            })
        
    }


    onShare(){
       wxSDK.share();
    }


    
    // update (dt) {}
}

