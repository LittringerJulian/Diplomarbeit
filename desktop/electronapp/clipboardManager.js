const { clipboard } = require('electron')
const nativeImage = require('electron').nativeImage
const getPixels = require("get-pixels")
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
        // jpeg seems to be correct here, instead of just jpg.
        // both worked for getPixels(), but electron's nativeImage 
        // only seems to work with jpeg
        b64 = "data:image/jpeg;base64," + b64

        getPixels(b64, function(err, pixels) {
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
            console.log("color %s copied", res);
            clipboard.writeText(res, 'selection')
        })
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
        // only jpeg worked for nativeImage
        b64 = "data:image/jpeg;base64," + b64
        let nativeImg = nativeImage.createFromDataURL(b64)
        console.log(nativeImg);
        clipboard.writeImage(nativeImg)
    }

}