// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class EGameClass extends cc.Component {




    protected onLoad(): void {
       
        cc.director.on("set_screw_touch",this.setScrewTouch,this)
    }
    start() {

    }

    setScrewTouch(is = true) {
        let gameNode = this.node.children[0].children[0];
        for (let i = 0; i < gameNode.children.length; i++) {
            let sNode = gameNode.children[i].children[1];
            for (let j = 0; j < sNode.children.length; j++) {
                let screw = sNode.children[j];
                screw.getComponent(cc.Button).interactable = is;
                screw.children[0].getComponent(cc.Button).interactable = is;
            }
        }
    }
    // update (dt) {}
}
