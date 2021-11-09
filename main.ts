controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    yscale += 0.05
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    offset += 1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    offset += -1
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    xscale += -1
    if (xscale <= 0) {
        xscale = 1
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    xscale += 1
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    yscale += -0.05
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    simulate = false
})
let xscale = 0
let simulate = false
simulate = true
let offset = 60
xscale = 50
let yscale = 1
let osc = image.create(160, 120)
let mySprite = sprites.create(osc, SpriteKind.Player)
let buffer = [0, 400]
let twopi = 6.283185307179586
let column = 0
let read = 0
let curr = 0
let prev = 0
for (let index = 0; index <= 400; index++) {
    buffer[index] = Math.sin(twopi / 400 * index)
}
game.onUpdate(function () {
    osc.fill(15)
    for (let index = 0; index < 160; index++) {
        osc.drawLine(column, 0, column, 120, 15)
        prev = curr
        curr = buffer[read] * (yscale * (yscale * 60)) + offset
        osc.drawLine(column - 1, prev, column, curr, 2)
        column += 1
        read += xscale
        if (column > 160) {
            column = 0
        }
        if (read > 400) {
            read = 0
        }
    }
    osc.drawLine(0, 60, 160, 60, 5)
})
game.onUpdateInterval(1, function () {
    if (!(simulate)) {
        for (let index = 0; index <= 400; index++) {
            buffer[index] = pins.P0.analogRead() * 0.0009765625
        }
    }
})
