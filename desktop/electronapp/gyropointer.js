var robot = require("robotjs")

module.exports = class Gyropointer {

    constructor() {

    }

    sens = 100
    realsens


    // gamma --> left & right
    // alpha --> up & down
    // beta --> tilt

    moveMouse(gyroval) {

        this.sens += gyroval.beta * 3

        if (this.sens <= 0) {
            this.realsens = 0.1
        } else if (this.sens >= 200) {
            this.realsens = 200
        } else {
            this.realsens = this.sens
        }

        robot.moveMouse(
            robot.getMousePos().x - this.normalize(gyroval.gamma) * this.realsens,
            robot.getMousePos().y - this.normalize(gyroval.alpha) * this.realsens
        )

    }

    normalize(val) {
        return Math.floor(val * 100) / 100
    }
}