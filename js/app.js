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

setTimeout(() => {

    this.checkSession();

}, 2200);

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
 * ==========================================
 * Resume Previous Assessment
 * ==========================================
 */
resumeAssessment() {

    const session = storage.loadSession();

    if (!session) {

        return false;

    }

    quiz.candidate = session.candidate;

    quiz.employeeId = session.employeeId;

    quiz.answers = session.answers || {};

    quiz.currentQuestion =
        session.currentQuestion || 0;

    timer.setRemaining(session.remainingTime);

    return true;

}

/**
 * ==========================================
 * Check Existing Session
 * ==========================================
 */
checkSession() {

    if (
        typeof storage === "undefined" ||
        !storage.hasSession()
    ) {

        return;

    }

    const resume = confirm(

        "Resume your previous assessment?"

    );

    if (!resume) {

        storage.clearSession();

        return;

    }

    if (this.resumeAssessment()) {

        this.startAssessment(true);

    }

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
    async startAssessment(resume = false) {

        this.showScreen("loading");

        try {

            // Load Questions
            await quiz.initialize();
            this.showAssessment();
            const assessmentScreen =
    document.getElementById("assessment-screen");

if (assessmentScreen) {

    assessmentScreen.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}
// Start Timer
if (typeof timer !== "undefined") {

    timer.start();

}
          if (resume) {

    quiz.renderQuestion();

            document.getElementById("displayCandidate").textContent =
    quiz.candidate;

document.getElementById("displayMode").textContent =
    this.assessmentMode;

          }

        

            // Show Question Palette
            const palette =
                document.getElementById("paletteSection");

            if (palette) {

                palette.classList.remove("hidden");

            }

            // Save Initial Session
if (!resume && typeof storage !== "undefined") {

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

    console.error("Start Assessment Error:", error);

    alert(
        "Unable to start assessment.\n\n" +
        error.name + "\n\n" +
        error.message
    );

    this.showScreen("login-screen");

}

    }
/**
 * ==========================================
 * Show Assessment Screen
 * ==========================================
 */
showAssessment() {

    this.showScreen("assessment-screen");

    const palette =
        document.getElementById("paletteSection");

    if (palette) {

        palette.classList.remove("hidden");

    }

}

/**
 * ==========================================
 * Show Result Screen
 * ==========================================
 */
showResult(result) {

    this.result = result;

    // Stop timer if still running
    if (
        typeof timer !== "undefined" &&
        timer.isRunning()
    ) {

        timer.stop();

    }

    this.showScreen("result-screen");

    document.getElementById("resultCandidate").textContent =
        result.candidate;

    document.getElementById("finalScore").textContent =
        `${result.score} / ${result.total}`;

    document.getElementById("percentage").textContent =
        `${result.percentage}%`;

    document.getElementById("status").textContent =
        result.percentage >= 80 ? "PASS" : "FAIL";

    document.getElementById("status").style.color =
        result.percentage >= 80
            ? "#0a8f08"
            : "#d32f2f";

    // Save result
    if (typeof storage !== "undefined") {

        storage.saveHistory(result);

        storage.clearSession();

    }

}

/**
 * ==========================================
 * Restart Assessment
 * ==========================================
 */
restart() {

    if (typeof timer !== "undefined") {

        timer.reset();

    }

    if (typeof storage !== "undefined") {

        storage.clearSession();

    }

    location.reload();

}

/**
 * ==========================================
 * Logout
 * ==========================================
 */
logout() {

    if (confirm("Exit Assessment?")) {

        if (typeof timer !== "undefined") {

            timer.stop();

        }

        location.reload();

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
    showReview() {

    this.showScreen("review-screen");

    if (
        typeof review !== "undefined" &&
        typeof review.render === "function"
    ) {

        review.render(this.result);

    }

    }
}
const APP = new AppController();

document.addEventListener("DOMContentLoaded", () => {

    APP.init();

});
