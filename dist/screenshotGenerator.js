"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScreenshotTimer = void 0;
const screenshot = require('screenshot-desktop');
const configuration = require('./Configuration').getInstance();
const SCREENSHOT_INTERVAL = configuration.getConfig('monitor.screenshotInterval');
const fs = require("fs");
const path = require('path');
const mineType = require("mime-types");
function imgToBase64(url) {
    try {
        let imgurl = url;
        let imageData = fs.readFileSync(imgurl);
        if (!imageData)
            return "";
        let bufferData = Buffer.from(imageData).toString("base64");
        let base64 = "data:" + mineType.lookup(imgurl) + ";base64," + bufferData;
        return [base64, imageData];
    }
    catch (error) {
        return "";
    }
}
exports.startScreenshotTimer = (callback) => {
    return setInterval(() => {
        callback(imgToBase64(path.join(process.cwd(), './s.png')));
        // createScreenshot().then(([imgStr, img]): void => {
        //     callback(['data:image/png;base64,' + imgStr, img]);
        // })
    }, SCREENSHOT_INTERVAL);
};
//# sourceMappingURL=screenshotGenerator.js.map