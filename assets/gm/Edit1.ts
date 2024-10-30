// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { steelDataAll } from "../EliminatemodeJS/scripts/SteelData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class edit1Class extends cc.Component {

    @property(cc.Node)
    lvn: cc.Node = null;

    @property(cc.Node)
    lcontent: cc.Node = null;

    @property(cc.Node)
    pngContent: cc.Node = null;

    @property(cc.JsonAsset)
    eJson:cc.JsonAsset=null;

    @property(cc.JsonAsset)
    eJson1:cc.JsonAsset=null;
  
    gameNode:cc.Node=null;//  steelNode screwNode


    @property(cc.Sprite)
    spPng:cc.Sprite=null;

    @property(cc.EditBox)
    saveEditBox:cc.EditBox;

    
    @property(cc.EditBox)
    xEditBox:cc.EditBox;

    
    @property(cc.EditBox)
    yEditBox:cc.EditBox;

    @property(cc.Toggle)
    isReadSave:cc.Toggle=null;

        
    @property(cc.EditBox)
    scaleEditBox:cc.EditBox;

    
    @property(cc.EditBox)
    angleEditBox:cc.EditBox;

    @property(cc.Toggle)
    isPhysics:cc.Toggle=null;

    @property(cc.Toggle)
    isMoveSteel:cc.Toggle=null;

    cfg={};

    // LIFE-CYCLE CALLBACKS:

    green:cc.Color;
    red:cc.Color;

    nowSteel:cc.Node=null;

    chooseItem:cc.Node=null;

    localData={
        levelData:{}
    }
     onLoad () {
        window["edit1"]=this;
        
        this.green=cc.color(0,255,0);
        this.red=cc.color(255,0,0);

        this.localData=JSON.parse(localStorage.getItem("edit1_data")||JSON.stringify(this.localData));
        this.setEditEvent();
       
     }

    start () {

    }

    setLevel(){
        this.lcontent.destroyAllChildren();
        setTimeout(() => {
            for(let i=0;i<this.gameNode.children.length;i++){
                let n=this.gameNode.children[i];
                if(i>=this.lcontent.children.length){
                    this.lcontent.addChild(cc.instantiate(this.lcontent.parent.children[1]));
                    let m=this.lcontent.children[i];
                    m.active=true;
                    let l=m.children[0].children[0].getComponent(cc.Label);
                    l.string=i+1+"";
                    l.node.color=this.green;
                    m.name=n.name;
                    m.on(cc.Node.EventType.TOUCH_END,()=>{
                        this.showLevel(null,i,l);
                     //   l.node.c
                        
                    })
                }
            } 
        }, 30);
       
    }


    touchMove(node:cc.Node){
        node.targetOff(cc.Node.EventType.TOUCH_MOVE)
        node.targetOff(cc.Node.EventType.TOUCH_END)
        node.targetOff(cc.Node.EventType.TOUCH_START)
        node.targetOff(cc.Node.EventType.TOUCH_CANCEL)
    
        cc.Tween.stopAllByTarget(node);
        
     
        node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{
            let delta = event.getDelta(); 
            if(this.isOnlyMoveStell&&node.name!="steel"||(!this.isOnlyMoveStell&&node.name=="steel")) return;
            if(node.name=="steel") this.nowSteel=node;
            this.chooseItem=node;
            
            node.x += delta.x;
            node.y += delta.y;
            this.xEditBox.string=node.x.toFixed(3);
            this.yEditBox.string=node.y.toFixed(3);
        },this)
    }

    setGameNodeEvent(){
        for(let i=0;i<this.gameNode.children.length;i++){
            let steelNode=this.gameNode.children[i].getChildByName("steelNode");
            let screwNode=this.gameNode.children[i].getChildByName("screwNode");
            for(let j=0;j<steelNode.children.length;j++){
                let steel=steelNode.children[j];
                steel.targetOff(cc.Node.EventType.TOUCH_END)
                this.touchMove(steel);
                for(let k=0;k<steel.children.length;k++){
                    let holeTarget=steel.children[k];
                    if(holeTarget.name!="holeTarget"&&holeTarget.name!="hole") continue;
                    this.touchMove(holeTarget);
                }

            }

            for(let j=0;j<screwNode.children.length;j++){
                let screw=screwNode.children[j];
                screw.targetOff(cc.Node.EventType.TOUCH_END)
                this.touchMove(screw)
            }
        }
    }

    setEditEvent(){
           
        let keys=Object.keys(steelDataAll);
        for(let i=0;i<keys.length;i++){
            let item=this.pngContent.getChildByName(keys[i])
            item.active=true;
            item.on(cc.Node.EventType.TOUCH_START,()=>{
                this.spPng.spriteFrame=item.getComponent(cc.Sprite).spriteFrame
            },this)
        }
          
    }

    isHideAllLevel=false;

    hideAllLevel(){
        this.isHideAllLevel=!this.isHideAllLevel;
        for(let i=0;i<this.gameNode.children.length;i++){

            this.gameNode.children[i].scale=this.isHideAllLevel?0:1;
           
        }
        
    }

    isHideAllScrew=false;

    hideAllScrew(){
        this.isHideAllScrew=!this.isHideAllScrew;
        for(let i=0;i<this.gameNode.children.length;i++){

            this.gameNode.children[i].getChildByName("screwNode").scale=this.isHideAllScrew?0:1;
            
        }
       
    }

    isOnlyMoveStell=true;

    onlyMoveStell(){

        this.isOnlyMoveStell=!this.isOnlyMoveStell;
        this.isMoveSteel.isChecked=this.isOnlyMoveStell;

    }

    showLevel(e,index:number,l:cc.Label){

        if(this.gameNode.children[index].scale==1){

            this.gameNode.children[index].scale=0;

            l.node.color=this.red;
        }else{

            this.gameNode.children[index].scale=1;
            l.node.color=this.green;
        }
         
    }

    levelBtn(){

    }

    readBtn(){
        this.gameNode=this.lvn.children[0].children[0];
       this.setLevel();
       this.setGameNodeEvent();
       this.nowSteel=null;
       this.chooseItem=null;
    }

    levelData=[{"name":"level1","group":"steel1","pos":{"x":0,"y":0},
        "steelList":[{"type":"popsicle1","opacity":210,"angle":0,"scale":1,"pos":{"x":0,"y":-137.35},"elementList":[{"type":5,"pos":{"x":0,"y":0}},{"type":5,"pos":{"x":0,"y":-160}},{"type":5,"pos":{"x":0,"y":160}}]}]},{"name":"level2","group":"steel2","pos":{"x":0,"y":0},"steelList":[{"type":"popsicle2","opacity":210,"angle":0,"scale":1,"pos":{"x":0,"y":68.01},"elementList":[{"type":1,"pos":{"x":0,"y":-185.83}},{"type":1,"pos":{"x":123.99,"y":-185.83}},{"type":1,"pos":{"x":-123.99,"y":-185.83}},{"type":1,"pos":{"x":0,"y":-14.99}},{"type":1,"pos":{"x":123.99,"y":-14.99}},{"type":1,"pos":{"x":-123.99,"y":-14.99}},{"type":0,"pos":{"x":0,"y":131.44}}]}]},{"name":"level3","group":"steel3","pos":{"x":0,"y":0},"steelList":[{"type":"popsicle3","opacity":210,"angle":0,"scale":1,"pos":{"x":0,"y":161.69},"elementList":[{"type":0,"pos":{"x":-111.42,"y":39.37}},{"type":0,"pos":{"x":111.42,"y":39.37}}]}]}]
    
    
    saveGame(){
        
       
        let dataArr=[];
        for(let i=0;i<this.gameNode.children.length;i++){
            let level=this.gameNode.children[i];
            let data={name:"",
                group:"",
                pos:{"x":0,"y":0},
                steelList:[]}
            data.name="level"+(i+1);
            data.group="steel"+(i+1);
            data.pos.x=level.x;
            data.pos.y=level.y;
            let steel=level.getChildByName("steelNode");
           
           
            for(let j=0;j<steel.children.length;j++){
                let steelData={"type":"","opacity":0,"angle":0,"scale":1,"pos":{"x":0,"y":0},
 
                "elementList":[]}
              
    
                let could=steel.children[j];
                steelData.opacity=could.opacity;
                steelData.angle=could.angle;
                steelData.scale=could.scale;
                steelData.pos.x=could.x;
                steelData.pos.y=could.y;
                steelData.type=could.getComponent(cc.Sprite).spriteFrame.name;

                for(let k=0;k<could.children.length;k++){
                     let holeTarget=could.children[k];
                     let holeData= {"type":"","pos":{"x":0,"y":0}}
                     if(holeTarget.name=="holeTarget"){
                        holeData.type="holeTarget";
                     }else if(holeTarget.name=="hole"){
                        holeData.type="5";
                     }
                   
                     
                     holeData.pos.x=holeTarget.x;
                     holeData.pos.y=holeTarget.y;
                     if(holeData.type) steelData.elementList.push(holeData);
                }

                data.steelList.push(steelData)

            }

            dataArr.push(data)




        }



       if(this.levelNum>=0){
        this.localData.levelData[this.levelNum]=dataArr;
        this.save();
       }  

        console.log(dataArr);


    }

    save(){
        localStorage.setItem("edit1_data",JSON.stringify(this.localData))
    }

    levelNum=-1;
    public setGameLevel(levelNum:number,showLevel:number){
        console.log("显示的关卡",showLevel)
        this.levelNum=levelNum;
        this.saveEditBox.string=levelNum.toString();
        if(this.localData.levelData[levelNum]&&this.isReadSave.isChecked){
            return this.localData.levelData[levelNum]
        }else{
            return this.eJson.json[levelNum]
        }
    }

    writeFile(str, suggestedName) {
        
         str=JSON.stringify(this.eJson.json);
         let j=JSON.parse(str);
         let keys=Object.keys(this.localData.levelData);
         for(let i=0;i<keys.length;i++){
            j[keys[i]]=this.localData.levelData[keys[i]];
         }

         str=JSON.stringify(j);
        const opts = {
            excludeAcceptAllOption: true,
            suggestedName: suggestedName,
            types: [
                {
                description: "json file",
                accept: { "application/json": [] },
                },
            ],
        };
        // this.savingUI.active = true;
        let self = this;
        window["showSaveFilePicker"](opts).then(function(handle) {
            
                
            handle.createWritable().then(function(writer) {
                writer.write(str).then(function() {
                    cc.log('文件写入成功');
                    writer.close();
                }).catch(function(error) {
                    cc.error('文件写入失败:', error);
                });
            });
        });
    }

    

    onClosePhysics(){
        cc.director.getPhysicsManager().enabled=!cc.director.getPhysicsManager().enabled;
        this.isPhysics.isChecked=cc.director.getPhysicsManager().enabled
       
      
    }
    
    onChangePng(){
        if(this.nowSteel){
            this.nowSteel.getComponent(cc.Sprite).spriteFrame=this.spPng.spriteFrame;
            this.nowSteel.getChildByName("whiteEdge").active=false;
        }
    }

    onAddHole(){
        if(this.nowSteel){
            let item= this.nowSteel.getChildByName("hole")||this.nowSteel.getChildByName("holeTarget");
            let newItem=cc.instantiate(item)
            this.nowSteel.addChild(newItem)
            item.x=0;
            item.y=0;
            this.readBtn()
        }
    }

    onDelHole(){
        if(this.nowSteel&&this.nowSteel.children.length>2){
            let item= this.nowSteel.getChildByName("hole")||this.nowSteel.getChildByName("holeTarget");
            item.destroy();
        }
    }

    addStell(){
        if(this.nowSteel){
            let  newItem=cc.instantiate(this.nowSteel);
            this.nowSteel.parent.addChild(newItem);
            this.readBtn()
        }
    }

    delStell(){
        if(this.nowSteel&&this.nowSteel.parent.children.length>1){
            this.nowSteel.destroy();
        }
    }

    addLevel(){
        if(this.nowSteel){
            let levelNew=cc.instantiate(this.nowSteel.parent.parent);
            levelNew.name="level"+(this.nowSteel.parent.parent.children.length+1);
            this.nowSteel.parent.parent.parent.addChild(cc.instantiate(this.nowSteel.parent.parent))
            this.readBtn()
        }

    }
    delLevel(){
        if(this.nowSteel&&this.nowSteel.parent.parent.parent.children.length>1){
            this.nowSteel.parent.parent.destroy();
        }

    }

    onSetPos(){
         if(this.chooseItem){
            if(typeof Number(this.xEditBox.string)=="number") this.chooseItem.x=Number(this.xEditBox.string);
            if(typeof Number(this.yEditBox.string)=="number") this.chooseItem.y=Number(this.yEditBox.string);
         }
    }

    setAngle(){
        if(this.nowSteel){
            if(typeof Number(this.angleEditBox.string)=="number") this.nowSteel.angle=Number(this.angleEditBox.string);
           
         }
    }

    setScale(){
        if(this.nowSteel){
            if(typeof Number(this.scaleEditBox.string)=="number") this.nowSteel.scale=Number(this.scaleEditBox.string);
           
         }
    }
    

    
    // update (dt) {}
}
