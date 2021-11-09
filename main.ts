controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    yscale += 0.05
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    offset += -1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    offset += 1
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    xscale += 4
    if (xscale >= bufsz) {
        xscale = bufsz
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    xscale += -1
    if (xscale <= 0) {
        xscale = 1
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    xscale += 1
    if (xscale >= bufsz) {
        xscale = bufsz
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    yscale += -0.05
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (simulate == true) {
        simulate = false
        timer.background(function () {
            while (true) {
                for (let index = 0; index <= bufsz; index++) {
                    buffer[index] = pins.P0.analogRead() * 0.0009765625
                }
            }
        })
    }
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    xscale += -4
    if (xscale <= 0) {
        xscale = 4
    }
})
let buffer: number[] = []
let xscale = 0
let simulate = false
let bufsz = 0
bufsz = 2048
simulate = true
let offset = 60
xscale = 256
let yscale = 1
let osc = image.create(160, 120)
let mySprite = sprites.create(osc, SpriteKind.Player)
buffer = [0, bufsz]
let twopi = 6.283185307179586
let read = 0
let curr = 0
let prev = 0
for (let index = 0; index <= bufsz; index++) {
    buffer[index] = Math.sin(twopi / bufsz * index)
}
game.onUpdate(function () {
    if (!(controller.A.isPressed() && controller.B.isPressed())) {
        osc.fill(15)
        for (let column = 0; column <= 160; column++) {
            prev = curr
            curr = buffer[read] * (yscale * 60) + offset
            curr = 120 - curr
            osc.drawLine(column - 1, prev, column, curr, 2)
            read += xscale
            if (read > bufsz) {
                read = 0
            }
        }
        osc.drawLine(0, 60, 160, 60, 5)
    }
})
