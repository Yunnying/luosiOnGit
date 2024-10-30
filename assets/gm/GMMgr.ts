// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class gmClass extends cc.Component {

    @property(cc.Prefab)
    epf: cc.Prefab = null;

    @property(cc.JsonAsset)
    eLevelCfg: cc.JsonAsset = null;
    @property(cc.JsonAsset)
    eLevelCfg2: cc.JsonAsset = null;

    @property(cc.EditBox)
    lvE: cc.EditBox = null;


    lvNode: cc.Node = null;
    lvc;
    data;
    strategyData;
    onLoad() {
        window["gm"] = this;
        this.loadBundle()
        
    }

    init() {

        this.lvNode = cc.instantiate(this.epf);
        this.node.addChild(this.lvNode);
        this.lvc = this.lvNode.getComponent(cc.Component);
        this.lvE.string="1";
        this.btnLV();

    }

    loadLv(num) {
       this.lvinit();
    }

    lvinit() {
        this.lvc.init(this.data);
    }

    start() {
        
    }


    currLevel=1;
    btnLV(){
        
        let num=Number(this.lvE.string)||0;
        this.currLevel=num+1;
        num-=1;
        this.data=this.eLevelCfg.json[this.eLevelCfg2.json.eliminateLevelData[num]];
        this.strategyData={"level":6,"layer":2,"colorNum":4,"easyThreshold1":[[[0,71],[20,30,25,25]]],"easyThreshold2":[[[0,68],[20,30,25,25]]],"easyThreshold3":[[[0,66],[20,30,25,25]]],"easyThreshold4":[[[0,63],[20,30,25,25]]],"easyThreshold5":[[[0,61],[20,30,25,25]]]}  //this.eLevelCfg2.json.data[num]
        this.lvNode.children[0].destroyAllChildren();
        this.lvinit();
    }
    
    packs=[
        "loadingUI",
        "texture",
        "levels",
        "audio",
        "font",
        "view",
        "levelBundle",
        "sceneBundle",
        "edgeImg",
        "Eliminatemode",
        "steelImg"
    ];
 
   loadBundle(){
           this.pass();

    }

    bunNum=0;
    pass(){
    
        if(this.bunNum==this.packs.length){
           this.goStart();
        }else{
            this.loadb(this.packs[this.bunNum],()=>{});
            this.bunNum++;
        }

    }

    loadb(name,fun){
        
        cc.assetManager.loadBundle(name,(err)=>{
            if(err){
               this.loadb(name,fun);
            }else{
                fun();
                console.log("分包加载成功:"+name);
                this.pass();
            }
        });
    }
    

    goStart(){
        console.log("下载完成，加载游戏")
        this.init();
        
    }
    // update (dt) {}
}
