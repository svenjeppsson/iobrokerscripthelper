




class PTM216ZState {
    constructor() {
        this.down = false;
        this.up = false;
        this.count = 0;

    }
    click() { }
    hold() { }
    tick() {
        this.count++;
        if (this.down) {
            if (this.count >= 3) {
                if (this.hold) this.hold();
                this.up = false;
                
                clearSchedule(this.scheduler)

            }
        }
        if (this.up) {
            if (this.count < 3 && this.click) { this.click(); }
            this.up = false;
            clearSchedule(this.scheduler)
        }
    }
    press() {

        this.down = true;
        this.up = false;
        this.count = 0;
        clearSchedule(this.scheduler)
        this.scheduler = schedule("* * * * * *", this.tick.bind(this));
    }
    release() {
        this.down = false;
        this.up = true;


    }
}
class PTM216Z {
    constructor(id) {
        this.id = id;
        this.states = Array.from({ length: 6 }, u => (new PTM216ZState()));
        var self = this;
        on({ id: id + ".action", change: "ne" }, function (obj) {
            var value = obj.state.val;
            var oldValue = obj.oldState.val;
            switch (value) {
                case "recall_scene_0": self.press(0); break;
                case 'recall_scene_1': self.press(1); break;
                case 'recall_scene_2': self.press(2); break;
                case 'recall_scene_3': self.press(3); break;
                case 'press_2_of_2': self.press(4); break;
                case 'press_1_of_2': self.press(5); break;
                case "recall_scene_4": self.release(0); break;
                case 'recall_scene_5': self.release(1); break;
                case 'recall_scene_6': self.release(2); break;
                case 'recall_scene_7': self.release(3); break;
                case 'release_2_of_2': self.release(4); break;
                case 'release_1_of_2': self.release(5); break;
                default: console.warn("Unbekannte Zeichenkette"); break;
            }

        });

    }
    press(index) {
        this.states[index].press();
    }
    release(index) {
        this.states[index].release();
    }
}
