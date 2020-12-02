var robot = require("robotjs")

module.exports = class Gyropointer {

    constructor() {

    }

    oldgyro = null
    moveMouse(gyro) {

        if (this.oldgyro != null) {
            let newx, newy, sens

            if (this.difference(gyro.alpha, this.oldgyro.alpha) < 180) {
                // x-
                if (gyro.alpha > this.oldgyro.alpha) {
                    newx = -1 * this.normalize(this.distance(gyro.alpha, this.oldgyro.alpha))
                }
                // x+
                else {
                    newx = this.normalize(this.distance(gyro.alpha, this.oldgyro.alpha))
                }

            } else {

                // x+
                if (gyro.alpha > this.oldgyro.alpha) {
                    newx = this.normalize(this.distance(gyro.alpha, this.oldgyro.alpha))
                }
                // x-
                else {
                    newx = -1 * this.normalize(this.distance(gyro.alpha, this.oldgyro.alpha))
                }
            }

            newy = this.normalize(this.difference(gyro.beta, this.oldgyro.beta))
            if (gyro.beta > this.oldgyro.beta) newy *= -1

            gyro.gamma = this.normalize(gyro.gamma)
                //sens = Math.round((gyro.gamma >= 0) ? (1 + this.normalize(gyro.gamma)) : ((1 - this.normalize(gyro.gamma)) * 30))


            sens = (90 + gyro.gamma) / 2


            console.log(gyro.gamma)

            //if (newx <= -1 || 1 <= newx) newx += newx * sens
            //if (newy <= -1 || 1 <= newy) newy += newy * sens

            newx = newx * sens
            newy = newy * sens

            robot.moveMouse(robot.getMousePos().x + newx, robot.getMousePos().y + newy)
        }

        this.oldgyro = gyro
    }

    // calculates smallest distance between two angles
    distance(a, b) {
        var phi = Math.abs(a - b) % 360
        var distance = phi > 180 ? 360 - phi : phi
        return distance
    }

    // calculates difference between two angles
    difference(a, b) {
        return Math.abs(a - b) % 360
    }

    normalize(val) {
        return Math.floor(val * 100) / 100
    }

    /*sens = 100
    realsens


    // gamma --> left & right
    // alpha --> up & down
    // beta --> tilt

    moveMouse(gyro) {

        this.sens += gyro.beta * 3

        if (this.sens <= 0) {
            this.realsens = 0.1
        } else if (this.sens >= 200) {
            this.realsens = 200
        } else {
            this.realsens = this.sens
        }

        gyro.gamma = gyro.gamma < 0.2 ? 0 : gyro.gamma
        gyro.alpha = gyro.alpha < 0.2 ? 0 : gyro.alpha

        robot.moveMouse(
            robot.getMousePos().x - this.normalize(gyro.gamma) * this.realsens,
            robot.getMousePos().y - this.normalize(gyro.alpha) * this.realsens
        )

    }

    normalize(val) {
        return Math.floor(val * 100) / 100
    }*/
}