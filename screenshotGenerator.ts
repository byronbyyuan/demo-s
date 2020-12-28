// const screenshot = require('screenshot-desktop')
// const configuration = require('./Configuration').getInstance();

// const SCREENSHOT_INTERVAL = configuration.getConfig('monitor.screenshotInterval');
// const fs = require("fs");
// const path = require('path')
// const mineType = require("mime-types");
// function imgToBase64(url) {
// try {
// let imgurl = url;
// let imageData = fs.readFileSync(imgurl);
// if (!imageData) return "";
// let bufferData = Buffer.from(imageData).toString("base64");
// let base64 = "data:" + mineType.lookup(imgurl) + ";base64," + bufferData;
// return [base64, imageData];
// } catch (error) {
// return "";
// }
// }



// export const startScreenshotTimer = (callback): {} => {
//     return setInterval((): void => {
//         createScreenshot().then(([imgStr, img]): void => {
//             callback(['data:image/png;base64,' + imgStr, img]);
//         })
//     }, SCREENSHOT_INTERVAL)
// }

const screenshot = require('screenshot-desktop')
const configuration = require('./Configuration').getInstance();

const SCREENSHOT_INTERVAL = configuration.getConfig('monitor.screenshotInterval');

export const createScreenshot = (): Promise<[string, Buffer]> => {
    return screenshot({format: 'png'}).then((img): [string, Buffer] => {
        return [ img.toString('base64'), img];
    }).catch((err): {} => {
        console.log('截图失败', err);
        return err;
    })
}

export const startScreenshotTimer = (callback): {} => {
    return setInterval((): void => {
        createScreenshot().then(([imgStr, img]): void => {
            callback(['data:image/png;base64,' + imgStr, img]);
        })
    }, SCREENSHOT_INTERVAL)
}