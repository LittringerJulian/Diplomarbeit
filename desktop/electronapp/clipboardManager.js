const { pseudoRandomBytes } = require('crypto')
const { clipboard, ipcMain } = require('electron')
const shell = require('node-powershell');

let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
});

let imagepath = './clipboardimage.jpg'

module.exports = class ClipboardManager {



    copyText(text) {
        clipboard.writeText(text, 'selection')

    }

    copyImage(img) {

        ps.addCommand('$b64 = "' + img + '"')
        ps.addCommand('$filename = "' + imagepath + '"')
        ps.addCommand('./imagesave.ps1')
        ps.addCommand('$filename = "' + imagepath + '"')
        ps.addCommand('./imagecopy.ps1')
        ps.invoke()
            .then(output => {
                console.log(output);
            })
            .catch(err => {
                console.log(err);
                ps.dispose();
            });
    }

}