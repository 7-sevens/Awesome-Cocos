//
// @brief: cases list 
//

import { _decorator, Button, Component, EventGamepad, EventTouch, Input, input, instantiate, Node, Prefab, ScrollView, Sprite, UI, UITransform, Vec2, Vec3 } from 'cc';
import { DemoListItem, EListItemType } from './DemoListItem';
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

@ccclass('DemoList')
export class DemoList extends Component {
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
        let demoItemComp: any = item.getComponent('DemoListItem');
        demoItemComp.setData(arrData[idx]);
    }

   
}


