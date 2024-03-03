//
// @brief: cases list 
//

import { _decorator, Button, Component, EventGamepad, EventTouch, Input, input, instantiate, Node, Prefab, ScrollView, Sprite, UITransform, Vec2, Vec3 } from 'cc';
import { CaseListItem, EListItemType } from './CaseListItem';


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
    @property({type: ScrollView})
    uiScrollView: ScrollView = null;
    @property({type: Node})
    uiListContainer: Node = null;
    @property({type: Prefab})
    listItemPrefab: Prefab | null = null;

    private _listItems: Node[] = [];
    private _updateTimer = 0;
    private _updateInterval = 0.2;
    private _lastContentPosY = 0;

    private _itemTemplateUITrans!: UITransform;
    private _contentUITrans!: UITransform;
    private _spacing = 10;
    private _spawnCount = 10;
    private _reserveSize = 16;
    private _displayHeight = 0;
    private _displayItems: DisplayItems[] = [];
    private lastFocusIndex: number = -1;
    

    //////////////////////////////////////////////////
    onLoad() {
        this._itemTemplateUITrans = this.listItemPrefab!.data.getComponent(UITransform);
        this._contentUITrans = this.uiScrollView.content!.getComponent(UITransform);

        this.makeSceneItems();
    }

    start() {

    }

    onDestroy() {
        input.off(Input.EventType.GAMEPAD_INPUT, this.onGamepadInput, this);
    }

    update(deltaTime: number) {
        this._updateTimer += deltaTime;
        if (this._updateTimer < this._updateInterval) return; //we don't need to do the math every frame
        this._updateTimer = 0;
        let items = this._listItems;
        let isDown = this.uiScrollView.content!.position.y < this._lastContentPosY; //scrolling direction
        let offset = (this._itemTemplateUITrans.height + this._spacing) * this._spawnCount;

        for (let i = 0; i < this._spawnCount; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            items[i].getPosition(_temp_vec3);
            let isChange = false;
            if (isDown) {
                //if away from buffer zone and not reaching top of content
                if (viewPos.y < -this._displayHeight && _temp_vec3.y + offset <= 0) {
                    _temp_vec3.y += offset;
                    items[i].setPosition(_temp_vec3);
                    isChange = true;
                }
            } else {
                //if away from buffer zone and not reaching bottom of content
                if (viewPos.y > this._displayHeight && _temp_vec3.y - offset > -this._contentUITrans.height) {
                    let n = Math.floor((viewPos.y - this._displayHeight) / (offset));
                    _temp_vec3.y -= offset * (n + 1);
                    items[i].setPosition(_temp_vec3);
                    isChange = true;
                }
            }
            let yPos = _temp_vec3.y > 0 ? _temp_vec3.y : -1 * _temp_vec3.y;
            //Does not need to be refreshed every frame, only calculated when it changes
            if (isChange || yPos < offset) {
                //Quickly locate the corresponding index for returning from a specific scene
                let idx = Math.floor(yPos / offset) * this._spawnCount + i;
                if (idx >= 0 && idx < this._displayItems.length) {
                    let type = this._displayItems[idx].type;
                    let index = this._displayItems[idx].index;
                    let name = this.getItemName(this._displayItems[idx]);
                    items[i].getComponent(CaseListItem)?.updateItem(type, index, name);
                }
            }

        }
        //update lastContentPosY
        this._lastContentPosY = this.uiScrollView.content!.position.y;

        if (BackButton.isControllerMode) {
            this.highlightFocusNode();
        }
    }

    makeSceneItems() {
        SceneList.foldCount = 0;
        if (!this.listItemPrefab)
            return;

        this._displayItems.length = 0;
        this._listItems.length = 0;
        this.uiListContainer.removeAllChildren();

        let sceneFold = new DisplayItems;
        sceneFold.index = 0;
        sceneFold.type = EListItemType.Fold;
        this._displayItems.push(sceneFold)
        for (let i = 0; i < SceneList.sceneArray.length; i++) {
            let sceneItem = new DisplayItems;
            sceneItem.index = i;
            sceneItem.type = EListItemType.Item;
            this._displayItems.push(sceneItem)
            if (i + 1 < SceneList.sceneFold.length && SceneList.sceneFold[i] !== SceneList.sceneFold[i + 1]) {
                let sceneFlod = new DisplayItems;
                sceneFlod.index = i + 1;
                sceneFlod.type = EListItemType.Fold;
                this._displayItems.push(sceneFlod);
            }
        }
    
        this._contentUITrans.height = this._displayItems.length * (this._itemTemplateUITrans.height + this._spacing) + this._spacing; //get total content height
        this._displayHeight = this.uiListContainer.parent!.getComponent(UITransform)!.height;
        this._spawnCount = Math.ceil(this._displayHeight / (this._itemTemplateUITrans.height + this._spacing)) + this._reserveSize;
        if(this._spawnCount > this._displayItems.length) { 
            this._spawnCount = this._displayItems.length;
        }
    
        for (let j = 0; j < this._spawnCount; j++) {
            let item = instantiate(this.listItemPrefab);
            let type = this._displayItems[j].type;
            let index = this._displayItems[j].index;
            let name = this.getItemName(this._displayItems[j]);
            item.getComponent(CaseListItem)!.updateItem(type, index, name);
            this.node.addChild(item);
            let itemUITrans = item.getComponent(UITransform)!;
            item.setPosition(0, -itemUITrans.height * (0.1 + j) - this._spacing * (j + 1), 0);
            this._listItems.push(item);
        }

        input.on(Input.EventType.GAMEPAD_INPUT, this.onGamepadInput, this);
        this.uiScrollView.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.update(this._updateInterval);
    }

    getPositionInView(item: Node) {
        // get item position in scrollview's node space
        let worldPos = item.parent!.getComponent(UITransform)!.convertToWorldSpaceAR(item.position);
        let viewPos = this.uiScrollView.node.getComponent(UITransform)!.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    getItemName(item: DisplayItems) : string {
        if(item.type == EListItemType.Item) {
            return SceneList.sceneArray[item.index];
        } 
        return SceneList.sceneFold[item.index];
    }

    onTouchStart(event: EventTouch) {
        if(!this.uiScrollView.verticalScrollBar!.node.active)
            this.uiScrollView.verticalScrollBar!.node.active = true;
    }

    onGamepadInput(event: EventGamepad) {
        if(this.uiScrollView.verticalScrollBar!.node.active)
            this.uiScrollView.verticalScrollBar!.node.active = false;

        const gp = event.gamepad;
        const axisPrecision = 0.03;

        BackButton.isControllerMode = true;
        
        const ls = gp.leftStick.getValue();
        const isUp = this.isControllerButtonPress(gp.dpad.up.getValue()) || ls.y > axisPrecision;
        const isDown = this.isControllerButtonPress(gp.dpad.down.getValue()) || (ls.y < -axisPrecision);
        const isEnter = this.isControllerButtonPress(gp.buttonSouth.getValue());
        if (isEnter) {
            if (!this.isCurrentFocusNodeFold()) {
                this.getCurrentFoucusNode().getComponent(ListItem)?.loadScene();
            }
            return;
        }

        //reached top or bottom
        if (isUp) {
            if (this.isCurrentFocusOnBegin()) {
                return;
            }
        } else {
            if (this.isCurrentFocusOnEnd()) {
                return;
            }
        }

        if (isUp) {
            this.decFocusIndex();
        } else if (isDown) {
            this.addFocusIndex();
        } else {
            return;
        }

        //skip fold
        while (this.isCurrentFocusNodeFold()) {
            if (isUp) {
                this.decFocusIndex();
            } else {
                this.addFocusIndex();
            }
        }

        //hight light
        this.highlightFocusNode();

        let viewHeightCenter = (this.uiScrollView.view!.getComponent(UITransform)!.height - this.getCurrentFoucusNode().getComponent(UITransform)!.height) / 2;
        //let viewCenter = this.scrollView.getComponent(UITransform)._contentSize.height / 2;

        this.uiScrollView.scrollToOffset(new Vec2(0, -this.getCurrentFoucusNode().getPosition().y - viewHeightCenter), 0.4);
    }

    addFocusIndex() {
        BackButton.focusButtonIndex++;
        if (BackButton.focusButtonIndex >= this.node.children.length) {
            BackButton.focusButtonIndex = 0;
        }
    }

    decFocusIndex() {
        BackButton.focusButtonIndex--;
        if (BackButton.focusButtonIndex < 0) {
            BackButton.focusButtonIndex = this.node.children.length - 1;
        }
    }

    highlightFocusNode() {
        if (this.lastFocusIndex >= 0) {
            this.node.children[this.lastFocusIndex].getComponent(Sprite)!.color = this.node.children[this.lastFocusIndex].getComponent(Button)!.normalColor;
        }
        if (!this.isCurrentFocusNodeFold()) {
            this.getCurrentFoucusNode().getComponent(Sprite)!.color = this.getCurrentFoucusNode().getComponent(Button)!.hoverColor;
            this.lastFocusIndex = BackButton.focusButtonIndex;
        }
    }

    getCurrentFoucusNode(): Node {
        return this.node.children[BackButton.focusButtonIndex];
    }

    isCurrentFocusNodeFold(): boolean {
        return !!(this.getCurrentFoucusNode().getComponent(CaseListItem)?.type == EListItemType.Fold);
    }

    isControllerButtonPress(val: number): boolean {
        let ret = !!(val > 0);
        return ret;
    }

    isCurrentFocusOnEnd(): boolean {
        return (this.getCurrentFoucusNode().getComponent(CaseListItem)?.index == SceneList.sceneArray.length - 1);
    }

    isCurrentFocusOnBegin(): boolean {
        return (this.getCurrentFoucusNode().getComponent(CaseListItem)?.index == 0);
    }
}


