//
// @brief: scene common
//

import { _decorator, CCBoolean, Component, director, EditBox, EventGamepad, Input, input, JsonAsset, Label, Node, ScrollView, Vec3 } from 'cc';


declare class AutoTestConfigJson extends JsonAsset {
    json: {
        enabled: boolean,
        server: string,
        port: number,
        timeout: number,
        maxRetryTimes: number,
        sceneList: string[],
    }
}


const { ccclass, property } = _decorator;

@ccclass('SceneCommon')
export class SceneCommon extends Component {
    @property(JsonAsset)
    public autoTestConfig: AutoTestConfigJson | null = null;
    @property(CCBoolean)
    public noAutoTest = false;

    private static _offset = new Vec3();
    public static _scrollNode : Node | null  = null;
    private static _scrollCom : ScrollView | null = null;

    private static _sceneIndex : number = -1;
    private static _blockInput : Node;
    private static _prevNode : Node;
    private static _nextNode : Node;
    private sceneName! : Label;

    public static focusButtonIndex: number = 0;
    public static isControllerMode: boolean = false;
    private lastPressTimestamp: number = 0;

    private searchBox?: EditBox | null;
    private searchButton?: Node;
    private sceneArray?: string[];
    private sceneFold?: string[];
    

    //////////////////////////////////////////////////
    onLoad() {
        input.on(Input.EventType.GAMEPAD_INPUT, this.onGamepadInput, this);
    }

    start() {
        director.addPersistRootNode(this.node);
    }

    update(deltaTime: number) {
        
    }

    onGamepadInput(event: EventGamepad) {
        const pressSensitiveTime = 250; //ms
        const axisPrecision = 0.03;

        let currentSence = director.getScene();
        if (currentSence?.name == "" || (currentSence?.name == "CaseList") || (currentSence?.name == "gamepad-event")) {
            return;
        }
        if ((this.lastPressTimestamp != 0) && ((Date.now() - this.lastPressTimestamp) < pressSensitiveTime)) {
            return;
        }
        this.lastPressTimestamp = Date.now();

        const gp = event.gamepad;
        const ls = gp.leftStick.getValue();

        // const isLeft = this.isControllerButtonPress(gp.dpad.left.getValue()) || ls.x < -axisPrecision;
        // const isRight = this.isControllerButtonPress(gp.dpad.right.getValue()) || (ls.x > axisPrecision);
        // const isBack = this.isControllerButtonPress(gp.buttonEast.getValue());
        // if (isBack) {
        //     this.backToList();
        // } else if (isLeft) {
        //     this.preScene();
        // } else if (isRight) {
        //     this.nextScene();
        // }
    }
}


