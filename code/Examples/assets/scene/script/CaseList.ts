//
// @brief: cases list 
//

import { _decorator, Component, Node, Prefab, ScrollView } from 'cc';


const { ccclass, property } = _decorator;

@ccclass('CaseList')
export class CaseList extends Component {
    @property({type: ScrollView})
    uiScrollView: ScrollView = null;
    @property({type: Node})
    uiListNode: Node = null;
    @property({type: Prefab})
    listItemPrefab: Prefab | null = null;

    private _listItems: Node[] = [];
    private _updateTimer = 0;
    private _updateInterval = 0.2;
    private _lastContentPosY = 0;
    


    //////////////////////////////////////////////////
    onLoad(): void {
        
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


