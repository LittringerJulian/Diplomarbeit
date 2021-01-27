const { clipboard } = require('electron')
const getPixels = require("get-pixels")
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

    copyColor(img) {

        let b64
        if (JSON.stringify(img).charAt(0) == "{") {
            b64 = JSON.parse(JSON.stringify(img)).value
        } else {
            b64 = img
        }

        ps.addCommand('$b64 = "' + b64 + '"')
        ps.addCommand('$filename = "' + imagepath + '"')
        ps.addCommand('./imagesave.ps1')
        ps.invoke()
            .then(() => {

                getPixels("./clipboardimage.jpg", function(err, pixels) {
                    if (err) {
                        console.log("Bad image path")
                        return
                    }

                    let r = []
                    let g = []
                    let b = []
                    let x, y
                    let radius = 20

                    for (let i = 0; i < radius; i++) {
                        for (let j = 0; j < radius; j++) {

                            x = Math.floor(pixels.shape[0] / 2) - radius / 2 + i
                            y = Math.floor(pixels.shape[1] / 2) - radius / 2 + j
                            r.push(pixels.get(x, y, 0))
                            g.push(pixels.get(x, y, 1))
                            b.push(pixels.get(x, y, 2))
                        }
                    }

                    r = Math.round(r.reduce((acc, cur) => acc + cur) / r.length)
                    g = Math.round(g.reduce((acc, cur) => acc + cur) / g.length)
                    b = Math.round(b.reduce((acc, cur) => acc + cur) / b.length)

                    let res = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
                    clipboard.writeText(res, 'selection')
                })
            })
            .catch(err => {
                console.log(err);
                ps.dispose();
                clipboard.writeText("Something went wrong.", 'selection')
            });
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    copyImage(img) {

        let b64
        if (JSON.stringify(img).charAt(0) == "{") {
            b64 = JSON.parse(JSON.stringify(img)).value
        } else {
            b64 = img
        }


        ps.addCommand('$b64 = "' + b64 + '"')
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