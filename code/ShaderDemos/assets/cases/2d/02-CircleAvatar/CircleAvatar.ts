//
// @brief: circle avatar
//

import { _decorator, Component, Material, Sprite, UITransform } from 'cc';


const { ccclass, property } = _decorator;

@ccclass('CircleAvatar')
export class CircleAvatar extends Component {
    @property({type: Sprite})
    uiCircleAvatar1!: Sprite;
    @property({type: Sprite})
    uiCircleAvatar2!: Sprite;
    @property({type: Sprite})
    uiCircleAvatar3!: Sprite;

    private _material: Material = null;


    //////////////////////////////////////////////////
    onLoad() {
       
    }

    start() {
        let contentSize1 = this.uiCircleAvatar1.node.getComponent(UITransform)!.contentSize;
        let ratio1 = contentSize1.width / contentSize1.height;
        this.uiCircleAvatar1.getSharedMaterial(0).setProperty('whRatio', ratio1);

        let contentSize2 = this.uiCircleAvatar2.node.getComponent(UITransform)!.contentSize;
        let ratio2 = contentSize2.width / contentSize2.height;
        this.uiCircleAvatar2.getSharedMaterial(0).setProperty('whRatio', ratio2);

        let contentSize3 = this.uiCircleAvatar3.node.getComponent(UITransform)!.contentSize;
        let ratio3 = contentSize3.width / contentSize3.height;
        this.uiCircleAvatar3.getSharedMaterial(0).setProperty('whRatio', ratio3);
    }

    update(deltaTime: number) {
       
    }

}


