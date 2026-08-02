/**
 * ============================================================
 * MedPlus Pharmacist Assessment Simulator
 * App Controller v3.1
 * Part 1 - Core Application Controller
 * ============================================================
 */

class AppController {

    constructor() {

        // Application State
        this.currentScreen = "splash";
        this.candidate = "";
        this.employeeId = "";
        this.assessmentMode = "Mock Assessment";
        this.result = null;

        // Screen IDs (must match index.html)
        this.screens = [
            "splash-screen",
            "login-screen",
            "instruction-screen",
            "assessment-screen",
            "paletteSection",
            "result-screen",
            "review-screen",
            "trainer-screen",
            "loading"
        ];

    }

    /**
     * Initialize Application
     */
    init() {

        console.log("=================================");
        console.log("MedPlus Assessment Simulator v3.1");
        console.log("Application Started");
        console.log("=================================");

        this.bindEvents();

        this.showSplash();

    }

    /**
     * Bind Application Events
     */
    bindEvents() {

        // Login
        document
            .getElementById("startButton")
            ?.addEventListener("click", () => this.login());

        // Begin Assessment
        document
            .getElementById("beginExam")
            ?.addEventListener("click", () => this.startAssessment());

        // Restart
        document
            .getElementById("restartButton")
            ?.addEventListener("click", () => this.restart());

        // Review
        document
            .getElementById("reviewButton")
            ?.addEventListener("click", () => this.showReview());

        // Back From Review
        document
            .getElementById("backResult")
            ?.addEventListener("click", () => this.showResult(this.result));

    }

    /**
     * Hide Every Screen
     */
    hideAllScreens() {

        this.screens.forEach(id => {

            const element = document.getElementById(id);

            if (element) {

                element.classList.add("hidden");

            }

        });

    }

    /**
     * Show One Screen
     */
    showScreen(screenId) {

        this.hideAllScreens();

        const screen = document.getElementById(screenId);

        if (!screen) {

            console.error(`Screen '${screenId}' not found`);

            return;

        }

        screen.classList.remove("hidden");

        this.currentScreen = screenId;

    }

    /**
     * Splash Screen
     */
    showSplash() {

        this.showScreen("splash-screen");

        setTimeout(() => {

            this.showScreen("login-screen");

        }, 2000);

    }

}
const APP = new AppController();

document.addEventListener("DOMContentLoaded", () => {

    APP.init();

});
