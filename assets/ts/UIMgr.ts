// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMgrClass extends cc.Component {

    @property(cc.Prefab)
    pfs: cc.Prefab[] = [];

    @property(cc.Prefab)
    toastPF: cc.Prefab = null;

    public static I:UIMgrClass=null;;

    
    
    // LIFE-CYCLE CALLBACKS:
    



    onLoad () {
        window["UIMgr"]=this;
        UIMgrClass.I=this;
    }

    start () {

    }

    open(name:string,data=null){
        let pnl=this.node.getChildByName(name);
        if(pnl){
            pnl.active=true;
            let anim=pnl.getChildByName("anim")
            if(anim){
                anim.scale=0;
                cc.tween(anim).to(0.2,{scale:1.05,}).to(0.05,{scale:1,}).start();
            }
        }else{
            for(let i=0;i<this.pfs.length;i++){
                let pf=this.pfs[i];
                if(pf&&pf.name==name){
                    pnl=cc.instantiate(pf)
                    pnl.height=this.node.height;
                    let com:any=pnl.getComponent(pnl.name);
                    if( data && com && com.initData) com.initData(data);
                    this.node.addChild(pnl);
                    let anim=pnl.getChildByName("anim")
                    if(anim){
                        anim.scale=0;
                        cc.tween(anim).to(0.2,{scale:1.05,}).to(0.05,{scale:1,}).start();
                    }
                    pnl.active=true;
                    return com;
                   
                }
            }
        }
       
       
    }

    close(name: string, call = () => { },isDestory=false) {
        let pnl = this.node.getChildByName(name)
        let anim = pnl.getChildByName("anim");

        if (anim) {
            cc.tween(anim).to(0.2, { scale: 0 }).call(() => {
                pnl.active = false;
                call();
                if(isDestory) pnl.destroy()
            }).start();
        }else{
            pnl.active = false;
            if(isDestory) pnl.destroy()
        }



    }

    toast(txt:string,time=1){
        let pnl=this.node.getChildByName("toast");
        if(pnl&&pnl.active) return;
        if(!pnl){
            pnl=cc.instantiate(this.toastPF);
            this.node.addChild(pnl);
        }
        pnl.y=0;
        pnl.opacity=255;
        pnl.active=true;
        pnl.getChildByName("txt").getComponent(cc.Label).string=txt;
        cc.tween(pnl).to(time,{}).to(0.5,{opacity:0,y:pnl.y+200}).call(()=>{
            pnl.active=false;
        }).start()
        
    
    }

    test(e,name){
       this.open(name)
      
      
       
    }

   

    // update (dt) {}
}

window["UIMgrClass"]=UIMgrClass;


