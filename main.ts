input.onButtonPressed(Button.A, function () {
    handleRaining(0, 800)
})
function handleRaining (direction: number, pulse: number) {
    pins.digitalWritePin(DigitalPin.P15, 0)
    while (true) {
        endStop = pins.analogReadPin(AnalogPin.P1)
        if (endStop <= 50) {
            break;
        }
        pins.digitalWritePin(DigitalPin.P13, direction)
        for (let index = 0; index < pulse; index++) {
            pins.digitalWritePin(DigitalPin.P14, 1)
            control.waitMicros(100)
            pins.digitalWritePin(DigitalPin.P14, 0)
            control.waitMicros(100)
        }
    }
    pins.digitalWritePin(DigitalPin.P13, switchDirection(direction))
    for (let index = 0; index < 4 * pulse; index++) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        control.waitMicros(100)
        pins.digitalWritePin(DigitalPin.P14, 0)
        control.waitMicros(100)
    }
}
input.onButtonPressed(Button.AB, function () {
    pins.digitalWritePin(DigitalPin.P15, 1)
})
input.onButtonPressed(Button.B, function () {
    handleRaining(1, 800)
})
function switchDirection (direction: number) {
    if (direction == 0) {
        return 1
    } else {
        return 0
    }
}
let endStop = 0
let rainSensorSignal = 0
basic.forever(function () {
    endStop = pins.analogReadPin(AnalogPin.P1)
    rainSensorSignal = pins.analogReadPin(AnalogPin.P2)
    if (rainSensorSignal > 400) {
        basic.showIcon(IconNames.Chessboard)
        handleRaining(0, 800)
    } else {
        basic.showIcon(IconNames.Umbrella)
        handleRaining(1, 800)
    }
})
