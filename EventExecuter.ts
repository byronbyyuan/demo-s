
const robot = require('robot-js');
const robotjs = require('robotjs')
const configuration = require('./Configuration').getInstance();

const enableLog = configuration.getConfig('control.log');

interface MouseEvent {
    type: string;
    buttonType: string;
    x: number;
    y: number;
}

interface KeyboardEvent {
    type: string;
    keyCode: number;
    keyName: string;
}

export default class EventExecuter {
    public mouse;
    public keyboard;
    public constructor(){
        this.mouse = new robot.Mouse();
        this.keyboard = new robot.Keyboard();
    }

    public executeKeyboardEvent(event: KeyboardEvent): void {
        let keyCodel = event.keyName.toLocaleLowerCase();
        let keyCode = keyCodel === 'meta' ? 'command' : keyCodel
        switch(event.type) {
            case 'keydown':
                robotjs.keyToggle(keyCode, 'down')
                break;
            case 'keyup':
                robotjs.keyToggle(keyCode, 'up')
                break;
            case 'keypress':
                robotjs.keyTap(keyCode)
                break;
            default:break;
        }
    }

    public executeMouseEvent(event): void {
        robotjs.moveMouse(event.x, event.y)
        // robot.Mouse.setPos(new robot.Point(event.x, event.y));
        const button = event.buttonType === 'left' ? 0 : 2
        switch(event.type) {
            case 'mousedown':
                // this.mouse.press(button);
                robotjs.mouseToggle("down");
                break;
            case 'mousemove':
                break;
            case 'mouseup': 
                robotjs.mouseToggle("up");
                // this.mouse.release(button);
                break;
            case 'click': 
                // this.mouse.click(button);
                robotjs.mouseClick(button)
                break;
            case 'dblclick': 
                robotjs.mouseClick(true)
                // this.mouse.click(button);
                // this.mouse.click(button);
                break;
            default: break;
        }
    }

    public exectue(eventInfo): void {
        if (enableLog) {
            console.log(eventInfo);    
        }
        try{
            switch (eventInfo.type) {
                case 'keyboard':
                    this.executeKeyboardEvent(eventInfo.event);
                    break;
                case 'mouse':
                    this.executeMouseEvent(eventInfo.event);
                    break;
                default: break;
            }
        } catch(e) {
            console.log(e);
        }
    }
}
