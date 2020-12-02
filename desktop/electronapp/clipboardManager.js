const { clipboard, ipcMain } = require('electron')

module.exports = class ClipboardManager {



    copyText(text) {
        clipboard.writeText(text, 'selection')

    }

    copyImage(img) {


        //console.log(img);
        //clipboard.writeText(img)
        //copyImg(Buffer.from(img, 'base64'));
        //console.log(l);
        // navigator.clipboard.write
    }

}