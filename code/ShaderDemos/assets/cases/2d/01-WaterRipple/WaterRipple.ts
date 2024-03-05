//
// @brief: water ripple
//

import { _decorator, Component, EventTouch, Material, Node, Sprite, UITransform, Vec2 } from 'cc';


const { ccclass, property } = _decorator;

@ccclass('WaterRipple')
export class WaterRipple extends Component {
    @property({type: Node})
    uiBg: Node = null;

    private _bgWidth: number = 0;
    private _bgHeight: number = 0;
    private _material: Material = null;
    private _waveOffset: number = 0;


    //////////////////////////////////////////////////
    onLoad() {
        this._bgWidth = this.uiBg.getComponent(UITransform)!.contentSize.width;
        this._bgHeight = this.uiBg.getComponent(UITransform)!.contentSize.height;
        this._material = this.uiBg.getComponent(Sprite)!.getSharedMaterial(0);

        this.uiBg.on(Node.EventType.TOUCH_END, this.onTouchEvent, this);
    }

    start() {

    }

    update(deltaTime: number) {
        if (this._waveOffset > 2.0)
            return;

        this._waveOffset += deltaTime;
        this._material.setProperty('waveOffset', this._waveOffset);
    }

    onTouchEvent(evt: EventTouch) {
        let pos = evt.getUILocation();
        this._material.setProperty('centerPoint', new Vec2(pos.x / this._bgWidth, (this._bgHeight - pos.y) / this._bgHeight))
        this._waveOffset = 0;
    }
}


