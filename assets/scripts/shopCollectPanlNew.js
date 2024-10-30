var $commonData = require("./commonData");
var $game = require("./Game");
var $startView = require("./startView");
const { default: UIMgrClass } = require("../ts/UIMgr");
const { userData,wxSDK } = require("../ts/wxSDK");

cc.Class({
    extends: cc.Component,
    name:"shopCollectPnlNew",
    properties: {
        
        progressLabel:cc.Label,
        content:cc.Node,
        rent:cc.Label,
        dlg:cc.Node,
        scroll:cc.ScrollView,
        building:cc.Node,
        worker:cc.Node,
       
    },

    // LIFE-CYCLE CALLBACKS:
    //level:0,
  
   
    initData(data={progress:0,page:0,type:1}){
        this.data={progress:0,page:0,isUnlock:false};
        this.data={progress:0,page:0,isUnlock:false};
        if(data.progress) this.data.progress=data.progress;
        if(typeof data.isUnlock!="undefined") this.data.isUnlock=data.isUnlock;
        if(data.type) this.data.type=data.type;
    },

    onLoad () {
        this.isTest=true;
        if(!this.data) this.data={isUnlock:false,type:1};
        this.level = cc.sys.localStorage.getItem("currentLevel");
        window["testShop"]=this;
        this.normalColor=cc.color(255,255,255)
        this.lockColor=cc.color(0,0,0)
        this.buldColor=cc.color(120,120,120);
        this.dlgArr={
            0:{txt:"天气不错~",time:0},
            1:{txt:"今天财源滚滚~",time:0},
            2:{txt:"店主瞌睡中zzz",time:0},
        };
        this.initEvet();
        this.dlg.active=false;
        this.node.getChildByName("view").getChildByName("collectNode").active=false;
        this.dlgIndex=0;
        this.building.active=false;
        this.page=Math.floor((this.level-1)/10);
        this.worker.on(cc.Node.EventType.TOUCH_START,this.onBuilding,this)
    },
    onEnable(){
        this.level = cc.sys.localStorage.getItem("currentLevel");
        
        if(this.data.isUnlock){
            this.level--;
            this.data.progress=1;
        }
        this.page=Math.floor((this.level-1)/10);
        if (this.level > 180) {
            this.level = 180;
        }
        this.worker.active=false;
        console.log("this.level=========>", this.level);
        this.progressLabel.string =
            "收集进度: " + (this.level - 1) + "/" + $commonData.default.collectNameConfig.length;
     
       // this.gouNode.active = !$commonData.default.isOpen;
       
       
       cc.tween(this.rent.node.parent).to(7,{x:700}).call(()=>{this.rent.node.parent.x=-650}).union().repeatForever().start();
       this.setShops(this.page||0,0);
     

       
    },

    initEvet(){
       for(let i=0;i<this.content.children.length;i++){
          for(let j=0;j<10;j++){
            let item=this.content.children[i].getChildByName(j+"")
            item.on(cc.Node.EventType.TOUCH_START,this.onClickShop,this);
                
          }
       }
    },
    
    onClickShop(e){
           if(this.dlg.active) return;
          
          //e.target
          if(e.target.color.toString()==this.normalColor.toString()){
            let len=Object.keys(this.dlgArr)
            let txt=""
            for(let i=0;i<len.length;i++){
                if(Date.now()-this.dlgArr[i].time>30000){
                 this.dlgArr[i].time=Date.now();
                 txt=this.dlgArr[i].txt;
                 break;
                }
            }
            if(!txt) {console.log("dlg cd"); return;}
               this.dlg.parent=e.target;
              
               this.dlg.x=0;
               this.dlg.y=100;
               this.dlg.opacity=255;
               this.dlg.getChildByName("txt").getComponent(cc.Label).string=txt;
               this.dlg.active=true;
               cc.tween(this.dlg).to(2.5,{}).to(0.5,{opacity:0}).call(()=>{
                this.dlg.active=false;
               }).start();

          }else if(e.target.color.toString()==this.lockColor.toString()){
             UIMgrClass.I.toast("该店铺未解锁，\n请先完成当前建造中的店铺");
          }
          else if(e.target.color.toString()==this.buldColor.toString()){
            this.onBuilding();
         }

    },

    start () {

    },

    setShops(page,type=0,isShow=false){
        console.log("第几页:",page);
       
        if(page<0){
            page=0;
            UIMgrClass.I.toast("无上一界面");
        }
        if(page>17){
            page=17;
            UIMgrClass.I.toast("敬请期待");
        }
        this.setRent();
        this.page=page;
        type=this.page;
        this.unLockItem=null;
        for(let i=0;i<this.content.children.length;i++){
            this.content.children[i].active=i==type;
        }
        if(this.page<=0){
            this.node.getChildByName("view").getChildByName("shopBtnLeft").getComponent(cc.Button).interactable=false;
         }else if(this.page>=17){
          this.node.getChildByName("view").getChildByName("shopBtnRight").getComponent(cc.Button).interactable=false;
         }else{
          this.node.getChildByName("view").getChildByName("shopBtnLeft").getComponent(cc.Button).interactable=true;
          this.node.getChildByName("view").getChildByName("shopBtnRight").getComponent(cc.Button).interactable=true;
         }

       let pageNode=this.content.children[type];
       let index=page*10;
       this.building.active=false;
      
       this.loadNum=0;
       for(let i=0;i<10;i++){
         this.setShopSP(pageNode.getChildByName(i+""),index+i,isShow);
       }

   

    },
    loadComplete(){
        if(this.data.isUnlock){
           
                this.unlockShopAnim();
            
          }
    },
    
    setShopSP(item,index,isShow=false){
        let that=this;
        item.active=isShow;
        $game.default.resManager.loadBundleRes(
            "EliminateShop-" + Math.floor(index / 5),
            $commonData.default.collectNameConfig[index],
            cc.SpriteFrame
        )
        .then(function (e) {
          
            item.getComponent(cc.Sprite).spriteFrame = e;
        
            
            item.active=true;

            if(index+1>that.level){
                item.color = that.lockColor;
                
            }
            else if(index+1==that.level){
                item.color = that.buldColor;
                that.unLockItem=item;
                that.setBulding();
            }
            else{
                item.color = that.normalColor;
            }
            if(item.width>350||item.height>350){
                item.scale=0.8
            }else{
                item.scale=1
            }

            that.loadNum++;
            if( that.loadNum>=10){
                that.loadComplete();
            }
        });
    },

    onClickLeft(e,index){
        
       if(index>0){
           this.setShops(this.page+1)
       }else{
        this.setShops(this.page-1)
       }
    
    },

    onClose(){
        UIMgrClass.I.close("shopCollectPnlNew",()=>{
        },true);
    },

    onShare(){

        if(wxSDK.checkDate(userData.shareTime)){
            UIMgrClass.I.toast("分享成功");
        }else{
            let gold=this.getRentMoney();
            $commonData.default.goldNum += gold;

            cc.director.emit("Gold_Change");
            userData.shareTime=Date.now();
            wxSDK.saveUser();
            UIMgrClass.I.toast("分享成功,获得"+gold+"金币");

        }
        if(!wx) return;
        this.setRent();
        wx.shareAppMessage({})
       
       
    },

    setBulding(){
        let progress=this.data&&this.data.progress?this.data.progress:0;
        if(this.unLockItem){
           this.building.parent=this.unLockItem;
           this.building.active=true;
           let mask=this.building.children[0];
           let shop=this.building.children[0].children[0];
           shop.getComponent(cc.Sprite).spriteFrame=this.unLockItem.getComponent(cc.Sprite).spriteFrame;
           mask.width=this.unLockItem.width;
           mask.height=this.unLockItem.height;
           shop.width=this.unLockItem.width;
           shop.height=this.unLockItem.height;
           this.building.width=this.unLockItem.width;
           this.building.height=this.unLockItem.height;
           this.building.x=0;
           this.building.y=0;
           mask.y=-this.building.height/2;
           mask.height=mask.height*progress;
           shop.y=this.building.height/2;
           let txt=  this.building.getChildByName("txt").getComponent(cc.Label);

           if(this.unLockItem&&!this.isMoveScroll){
            this.isMoveScroll=true;
            this.content.position=  cc.v2(0,-597 -(this.unLockItem.y/2583*614));
          }
       

        
              txt.node.active=true;
              txt.string= "建造中 "+progress*100+"%"
            
              if(!this.data.isUnlock){
                let workerNode= this.unLockItem.parent.getChildByName("worker"+this.unLockItem.name);
                if(workerNode){
                  this.worker.parent= this.unLockItem.parent.getChildByName("worker"+this.unLockItem.name);
                }else{
                  this.worker.parent=this.unLockItem;
                  
                  this.worker.scale=1;
                  if(this.worker.x>=0){
                      this.worker.x=-75
                      this.worker.y=-50;
                  }else if(item.x<=0){
                      this.worker.x=105
                      this.worker.y=-50;
                  } 
                  else{
                      this.worker.x=80
                      this.worker.y=-90;
                  }
                }
                this.worker.active=true;
              }
          
            
          
        }
    

    },

    
    unlockShopAnim(){
          if(this.unLockItem){
              let collect=this.node.getChildByName("view").getChildByName("collectNode");
              collect.getChildByName("shop").getComponent(cc.Sprite).spriteFrame=this.unLockItem.getComponent(cc.Sprite).spriteFrame;
              this.content.position=  cc.v2(0,-703 -(this.unLockItem.y/2583*400));
              collect.opacity=0;
              collect.active=true;
              let p1= this.unLockItem.convertToWorldSpaceAR(cc.v2(0,0));
              let view=this.node.getChildByName("view");
              let p2= view.convertToNodeSpaceAR(p1);
              this.scroll.vertical=false;
              cc.tween(collect).to(0.5,{opacity:255}).to(0.5,{}).to(1,{x:p2.x,y:p2.y}).call(()=>{
                this.unLockItem.color=this.normalColor;
                collect.active=false;
                this.level++;
                this.data.isUnlock=false;
                this.scroll.vertical=true;
                this.data.progress=0;
                this.setShops(this.page,0,true);
               
              }).start();
              cc.tween(collect.getChildByName("shop")).to(1,{}).to(1,{scale:this.unLockItem.scale*0.7}).start();
          }
    },

    getRentMoney(){
        return ((this.level-1)*5)+(this.level>1?95:0);
    },

    setRent(){
        this.rent.string=this.getRentMoney()+"/天";
        if(wxSDK.checkDate(userData.shareTime)){
            this.rent.node.parent.getChildByName("txt2").active=false;
        }
    },

    onBuilding(){
       
          
        if(this.data.type==2){
            this.openTips()
        }else{
            UIMgrClass.I.close("shopCollectPnlNew",null,true);
        }
    },

    openTips(){
         this.node.getChildByName("gotoGame").active=true;
    },

    cosleTips(){
        this.node.getChildByName("gotoGame").active=false;
    },

    onGotoGame(){
        cc.find("Canvas/startPnl").getComponent(cc.Component).clickEliminate();
    },
   
    // update (dt) {},
});
