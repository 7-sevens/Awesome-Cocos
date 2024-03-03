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

    _name: string = '';
    index: number = -1;
    xPos: number = -1;
    color: Color = null;
    type: EListItemType = EListItemType.Fold;


    //////////////////////////////////////////////////
    onLoad() {
        
    }

    start() {
        if (this.node) {
            this.uiLabel.string = this._name;
            if (this.color) this.uiLabel.color = this.color;
            //this.resetPosition(this.uiLabel);
        }
    }

    update(deltaTime: number) {
        
    }

    resetPosition(label: Label) {
        if (!label) 
            return;

        let position = label.node.getPosition();
        if (this.xPos == -1) {
            this.xPos = position.x;
        }

        if (this.type == EListItemType.Item && this.xPos != position.x) {
            label.node.setPosition(this.xPos, position.y, position.z);
        } else if (this.type == EListItemType.Fold && this.xPos == position.x) {
            label.node.setPosition(position.x - 20, position.y, position.z);
        }
    }

    public loadScene() {
        return new Promise<void>((resovle, reject) => {
            director.loadScene(this._name, (error: any) => {
                error ? reject(error) : resovle();
            });
        });
    }

    public updateItem(type: EListItemType, idx: number, name: string) {
        this.index = idx;
        this.type = type;
        this._name = name;

        let itemSprite = this.node.getComponent(Sprite);
        let itemBtn = this.node.getComponent(Button);

        if (type == EListItemType.Item) {
            itemBtn!.enabled = true;
            itemSprite!.enabled = true;
            this.color = new Color(0, 0, 255);
        } else if (type == EListItemType.Fold) {
            itemBtn!.enabled = false;
            itemSprite!.enabled = false;
            this.color = new Color(255, 255, 255, 255);
        }

        if (this.uiLabel) {
            this.uiLabel.color = this.color;
            this.uiLabel.string = this._name;

           // this.resetPosition(this.uiLabel);
        }
    }
}


