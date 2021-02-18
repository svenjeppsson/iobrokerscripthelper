
class AqaraButton {
    isHold = false;
    holdCount = 0;
    click() { }
    holdStart() { }
    innerTick() {
        this.holdCount++;
        this.holdTick(this.holdCount);
    }
    holdTick(holdCount) { }
    holdEnde(holdCount) { }
    doubeClick() { }

    handleClickEvent(event) {
        if (event.oldState.val !== event.newState.val && event.newState.val === true) {
            this.click();
        };
    }
    handleHoldEvent(event) {

        if (event.oldState.val !== event.newState.val) {
            if (event.newState.val === true) {
                this.holdStart();
                this.holdCount = 0;
                this.scheduler = schedule("* * * * * *", this.innerTick.bind(this));


            } else {
                clearSchedule(this.scheduler);
                this.holdEnde(this.holdCount);

            }
            this.isHold = event.newState.val;

        };

    }
    handleDoubleClickEvent(event) {

        if (event.oldState.val !== event.newState.val && event.newState.val === true) {
            this.doubeClick();
        };
    }
    constructor(id) {
        $('channel[state.id=' + id + '.click]').on(this.handleClickEvent.bind(this));
        $('channel[state.id=' + id + '.double_click]').on(this.handleDoubleClickEvent.bind(this));
        $('channel[state.id=' + id + '.hold]').on(this.handleHoldEvent.bind(this));

    }
}
