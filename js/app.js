/**
 * ==========================================
 * MedPlus Pharmacist Assessment Simulator
 * App Controller Version 3.0
 * ==========================================
 */

class AppController {

    constructor() {

        this.currentScreen = "login";

        this.candidate = "";

        this.employeeId = "";

        this.result = null;

    }

    /**
     * Initialize Application
     */
    init() {

        console.log("MedPlus Assessment Simulator Started");

        this.bindEvents();

        this.showScreen("login-screen");

    }

    /**
     * Bind Button Events
     */
    bindEvents() {

        // Login Button
        const loginButton = document.getElementById("loginButton");

        if (loginButton) {

            loginButton.addEventListener("click", () => {

                this.login();

            });

        }

        // Start Assessment Button
        const startButton = document.getElementById("startAssessmentButton");

        if (startButton) {

            startButton.addEventListener("click", () => {

                this.startAssessment();

            });

        }

        // Restart Button
        const restartButton = document.getElementById("restartButton");

        if (restartButton) {

            restartButton.addEventListener("click", () => {

                this.restart();

            });

        }

    }

    /**
     * Hide All Screens
     */
    hideAllScreens() {

        document
            .querySelectorAll(".screen")
            .forEach(screen => {

                screen.classList.add("hidden");

            });

    }

    /**
     * Show Screen
     */
    showScreen(screenId) {

        this.hideAllScreens();

        const screen = document.getElementById(screenId);

        if (screen) {

            screen.classList.remove("hidden");

            this.currentScreen = screenId;

        }

    }

    /**
     * Login
     */
    login() {

        const candidate =
            document.getElementById("candidateName").value.trim();

        const employee =
            document.getElementById("employeeId").value.trim();

        if (!candidate || !employee) {

            alert("Please enter Candidate Name and Employee ID.");

            return;

        }

        this.candidate = candidate;

        this.employeeId = employee;

        quiz.candidate = candidate;

        quiz.employeeId = employee;

        this.showScreen("instructions-screen");

    }

    /**
     * Start Assessment
     */
    async startAssessment() {

        this.showScreen("assessment-screen");

        await quiz.initialize();

    }

    /**
     * Display Result
     */
    showResult(result) {

        this.result = result;

        this.showScreen("result-screen");

        document.getElementById("finalScore").textContent =
            `${result.score} / ${result.total}`;

        document.getElementById("percentage").textContent =
            result.percentage + "%";

        document.getElementById("resultCandidate").textContent =
            result.candidate;

        const status =
            document.getElementById("status");

        if (result.percentage >= 80) {

            status.textContent = "PASS";

            status.style.color = "green";

        } else {

            status.textContent = "FAIL";

            status.style.color = "red";

        }

    }

    /**
     * Restart Application
     */
    restart() {

        location.reload();

    }

}

const APP = new AppController();

window.onload = () => {

    APP.init();

};
