//
// @brief: case list item
//

import { _decorator, Component, Node, Label, Color, director, Sprite, Button } from 'cc';


const { ccclass, property } = _decorator;

export enum EListItemType {
    Item = 0,
    Fold = 1
}


@ccclass('CaseListItem')
export class CaseListItem extends Component {
    @property({type: Label})
    uiLabel: Label = null;

    private _data: any = null;


    //////////////////////////////////////////////////
    onLoad() {
        
    }

    start() {
       
    }

    setData(data: any) {

    }

    render() {
        
    }
}


