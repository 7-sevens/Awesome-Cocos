//
// @brief: flow light
//

import { _decorator, CCFloat, Component, Material, Node, Sprite, Vec2 } from 'cc';


const { ccclass, property } = _decorator;

@ccclass('FlowLight')
export class FlowLight extends Component {
    @property(Sprite)
    uiIcon!: Sprite;
    @property({type: CCFloat, tooltip: '光束宽度'})
    lightWidth = 0.2;
    @property({type: CCFloat, tooltip: '时间'})
    loopTime = 1.0;
    @property({type: CCFloat, tooltip: '时间间隔'})
    timeInterval = 3.0;

    private _material: Material = null;
    private _time: number = 0;  //记录时间
    private _startPos = 0;
    private _moveLength = 0;
    private _speed = 0;
    private _dtTime = 0;


    //////////////////////////////////////////////////
    onLoad() {
        this._material = this.uiIcon.getSharedMaterial(0);

        this._time = 0;
        this._dtTime = 0;

        this._startPos = -this.lightWidth / 2.0;
        this._moveLength = this.lightWidth + 2;
        this._speed = this._moveLength / this.loopTime;
        this._time = this._startPos;
    }

    start() {

    }

    update(deltaTime: number) {
        this._time += deltaTime * this._speed;
        this._dtTime += deltaTime;
        this._material.setProperty('lightCenterPoint', new Vec2(this._time, this._time));

        if (this._dtTime > this.loopTime + this.timeInterval) {
            this._time = this._startPos;
            this._dtTime = 0;
        }
    }
}


