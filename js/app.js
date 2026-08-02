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
    /**
     * ============================================================
     * Candidate Login
     * ============================================================
     */
    login() {

        const candidate =
            document.getElementById("candidateName").value.trim();

        const employee =
            document.getElementById("employeeId").value.trim();

        const mode =
            document.getElementById("assessmentMode").value;

        if (candidate === "") {

            alert("Please enter Candidate Name.");

            document.getElementById("candidateName").focus();

            return;

        }

        // Save Candidate Details
        this.candidate = candidate;
        this.employeeId = employee;
        this.assessmentMode = mode;

        // Update Assessment Header
        document.getElementById("displayCandidate").textContent =
            candidate;

        document.getElementById("displayMode").textContent =
            mode;

        // Pass details to Quiz Engine
        if (typeof quiz !== "undefined") {

            quiz.candidate = candidate;
            quiz.employeeId = employee;

        }

        // Show Instructions
        this.showScreen("instruction-screen");

    }

    /**
     * ============================================================
     * Start Assessment
     * ============================================================
     */
    async startAssessment() {

        this.showScreen("loading");

        try {

            // Load Questions
            await quiz.initialize();

            // Start Timer
            if (typeof timer !== "undefined") {

                timer.start();

            }

            // Show Assessment
            this.showScreen("assessment-screen");

            // Show Question Palette
            const palette =
                document.getElementById("paletteSection");

            if (palette) {

                palette.classList.remove("hidden");

            }

            // Save Initial Session
            if (typeof storage !== "undefined") {

                storage.saveSession({

                    candidate: this.candidate,

                    employeeId: this.employeeId,

                    mode: this.assessmentMode,

                    currentQuestion: 0,

                    answers: {},

                    remainingTime: 25 * 60

                });

            }

        }

        catch (error) {

            console.error(error);

            alert("Unable to start assessment.");

            this.showScreen("login-screen");

        }

    }

    /**
     * ============================================================
     * Show Loading
     * ============================================================
     */
    showLoading() {

        this.showScreen("loading");

    }

    /**
     * ============================================================
     * Hide Loading
     * ============================================================
     */
    hideLoading() {

        if (this.currentScreen === "loading") {

            this.showScreen("assessment-screen");

        }

    }
}
const APP = new AppController();

document.addEventListener("DOMContentLoaded", () => {

    APP.init();

});
