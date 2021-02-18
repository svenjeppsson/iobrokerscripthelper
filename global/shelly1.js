class Shelly1 {

    constructor(id) {
        this.id = id + '.Relay0.Switch';

    }

    toggleSwitch() {
        setState(this.id, { val: !getState(this.id).val });
    }
    turnOff() {
        setState(this.id, { val: false });
    }
    turnOn() {
        setState(this.id, { val: true });
    }
}
