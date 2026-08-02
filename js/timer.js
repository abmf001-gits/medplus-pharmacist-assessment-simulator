"use strict";

/* ==========================================
   MedPlus Pharmacist Assessment Simulator
   Timer Engine v2.0
========================================== */

class TimerEngine {

    constructor(durationMinutes = 25) {

        this.duration = durationMinutes * 60;

        this.remaining = this.duration;

        this.interval = null;

        this.running = false;

        this.display =
            document.getElementById("timer");

    }

    start() {

        if (this.running) return;

        this.running = true;

        this.updateDisplay();

        this.interval = setInterval(() => {

            this.tick();

        }, 1000);
if (!this.display) {

    console.error("Timer display not found.");

    return;

}
    }

    stop() {

        clearInterval(this.interval);

        this.running = false;

    }

    reset() {

        this.stop();

        this.remaining = this.duration;

        this.updateDisplay();

    }
setRemaining(seconds) {

    this.remaining = seconds;

    this.updateDisplay();

}
   
formatTime() {

    const minutes = Math.floor(this.remaining / 60);

    const seconds = this.remaining % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}
}
/* ==========================================
   Countdown Logic
========================================== */

TimerEngine.prototype.tick = function () {

    if (this.remaining <= 0) {

        this.stop();

        alert("Time is over!\nAssessment will be submitted.");

        if (typeof quiz !== "undefined") {

    quiz.submitAssessment();

        }

        return;

    }

    this.remaining--;

    this.updateDisplay();

};
/* ==========================================
   Display Timer
========================================== */

TimerEngine.prototype.updateDisplay =
function () {

    this.display.textContent = this.formatTime();

    this.updateColor();

};
/* ==========================================
   Warning Colors
========================================== */

TimerEngine.prototype.updateColor =
function () {

    if (this.remaining <= 60) {

        this.display.style.color = "#E53935";

        this.display.style.animation =
            "pulse 1s infinite";

    }

    else if (this.remaining <= 300) {

        this.display.style.color = "#FB8C00";

    }

    else if (this.remaining <= 600) {

        this.display.style.color = "#1E88E5";

    }

    else {

        this.display.style.color = "#FFFFFF";

    }

};
/* ==========================================
   Public Helper Methods
========================================== */

TimerEngine.prototype.getRemaining =
function () {

    return this.remaining;

};

TimerEngine.prototype.isRunning =
function () {

    return this.running;

};
const timer = new TimerEngine(25);

