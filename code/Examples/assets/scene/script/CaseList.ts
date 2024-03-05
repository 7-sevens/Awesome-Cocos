//
// @brief: cases list 
//

import { _decorator, Button, Component, EventGamepad, EventTouch, Input, input, instantiate, Node, Prefab, ScrollView, Sprite, UI, UITransform, Vec2, Vec3 } from 'cc';
import { CaseListItem, EListItemType } from './CaseListItem';
import UIList from './UIList';


const { ccclass, property } = _decorator;

export class SceneList {
    static sceneArray: string[] = [];
    static sceneFold: string[] = [];
    static foldCount: number = 0;

}

class DisplayItems {
    index: number = -1;
    type: number = -1;
}

const _temp_vec3 = new Vec3();

@ccclass('CaseList')
export class CaseList extends Component {
    @property({type: UIList})
    uiList: UIList = null;
    @property({type: Node})
    uiListContainer: Node = null;
    @property({type: Prefab})
    listItemPrefab: Prefab | null = null;
    

    //////////////////////////////////////////////////
    onLoad() {
       
    }

    start() {

    }

    onDestroy() {
        
    }

    update(deltaTime: number) {
    
    }

    loadCases() {
        // let arrMsg = gameMgr.AllBroadCastMsg.msgList;
        // this.uiList.numItems = arrMsg.length;
        // this.uiMsgList.scrollTo(arrMsg.length - 1);
        // this.uiNoDataTip.active = arrMsg.length > 0 ? false : true;
    }

    onCaseListRender(item: Node, idx: number) {
        let arrData = [];//gameMgr.AllBroadCastMsg.msgList;
        let caseItemComp: any = item.getComponent('CaseListItem');
        caseItemComp.setData(arrData[idx]);
    }

   
}


