var robot = require("robotjs")

module.exports = class AccelerometerMouse {

    constructor() {

    }

    sens = 100
    realsens

    velocityX = 0
    velocityZ = 0
    lasttimestamp = 0


    // gamma --> left & right
    // alpha --> up & down
    // beta --> tilt

    moveMouse(acceleration) {

        if (this.lasttimestamp != 0) {

            let time = 10 //acceleration.timestamp - this.lasttimestamp

            acceleration.x = this.normalize(acceleration.x)

            //console.log(this.normalize(acceleration.x), this.normalize(acceleration.z), time);
            if (acceleration.x < 0.11 && acceleration.x > -0.11) {
                acceleration.x = acceleration.x > 0 ? acceleration.x - 0.1 : acceleration.x + 0.1
            }


            this.velocityX += this.normalize(acceleration.x) * time

            console.log(this.normalize(acceleration.x), this.normalize(this.velocityX), this.normalize(this.velocityX * time));
            //this.velocityZ +=  this.normalize(acceleration.z) * time

            robot.moveMouse(
                robot.getMousePos().x + this.velocityX,
                400 //robot.getMousePos().y + this.velocityZ
            )

        }


        this.lasttimestamp = acceleration.timestamp



        /*robot.moveMouse(
            robot.getMousePos().x - this.normalize(gyroval.gamma) * this.realsens,
            robot.getMousePos().y - this.normalize(gyroval.alpha) * this.realsens
        )*/

    }

    normalize(val) {
        return Math.floor(val * 100) / 100
    }
}