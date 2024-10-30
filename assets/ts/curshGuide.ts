// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class curshGuideClass extends cc.Component {

  
    protected onEnable(): void {
        cc.director.emit("set_screw_touch",false)
    }

    protected onDisable(): void {
        cc.director.emit("set_screw_touch",true)
    }

    start () {

    }

    // update (dt) {}
}
