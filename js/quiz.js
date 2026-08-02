/**
 * ==========================================
 * MedPlus Pharmacist Assessment Simulator
 * Quiz Engine Version 3.0
 * Part 1 - Foundation
 * ==========================================
 */

class QuizEngine {

    constructor() {

        // Question Bank
        this.questionBank = [];
        this.questions = [];

        // Candidate Answers
        this.answers = {};

        // Navigation
        this.currentQuestion = 0;

        // Assessment Configuration
        this.totalQuestions = 50;

        // Current Candidate
        this.candidate = "";

        this.employeeId = "";

        // State
        this.initialized = false;

    }

    /**
     * Initialize Assessment
     */
    async initialize() {

        try {

            // Load Question Bank
            const bank = await loader.loadQuestions();

            if (!bank.length) {

                alert("Question Bank is empty.");

                return;

            }

            // Give Question Bank to Randomizer
            randomizer.setQuestionBank(bank);

            // Generate Random Assessment
            this.questions =
                randomizer.generateAssessment(this.totalQuestions);

            this.questionBank = bank;

            this.answers = {};

            this.currentQuestion = 0;

            this.initialized = true;

            console.log(
                "Assessment Loaded:",
                this.questions.length
            );

            // Load First Question
            this.attachEvents();


this.renderQuestion();;

        }

        catch (error) {

            console.error(error);

            alert("Unable to initialize assessment.");

        }

    }

    /**
     * Get Current Question
     */
    getQuestion() {

        return this.questions[this.currentQuestion];

    }

    /**
     * Get Total Questions
     */
    getTotalQuestions() {

        return this.questions.length;

    }

    /**
     * Get Current Index
     */
    getCurrentIndex() {

        return this.currentQuestion;

    }
    /**
     * Render Current Question
     */
    renderQuestion() {

        const question = this.getQuestion();

        if (!question) return;

        // Question Number
        document.getElementById("currentQuestion").textContent =
            this.currentQuestion + 1;

        // Question Text
        document.getElementById("questionText").textContent =
            question.question;

        // Options Container
        const container =
            document.getElementById("optionsContainer");

        container.innerHTML = "";

        question.options.forEach((option) => {

            const label = document.createElement("label");

            label.className = "option";

            const checked =
                this.answers[question.id] === option
                    ? "checked"
                    : "";

            label.innerHTML = `
                <input
                    type="radio"
                    name="answer"
                    value="${option}"
                    ${checked}
                >
                <span>${option}</span>
            `;

            container.appendChild(label);

        });

        // Update Progress
        this.updateProgress();

        // Update Palette
        this.updatePalette();

    }

    /**
     * Update Progress Bar
     */
    updateProgress() {

        const progress =
            document.getElementById("progressFill");

        if (!progress) return;

        const percentage =
            ((this.currentQuestion + 1) /
                this.questions.length) * 100;

        progress.style.width =
            percentage + "%";

    }

    /**
     * Build Question Palette
     */
    updatePalette() {

        const palette =
            document.getElementById("questionPalette");

        if (!palette) return;

        palette.innerHTML = "";

        this.questions.forEach((question, index) => {

            const button =
                document.createElement("button");

            button.textContent = index + 1;

            button.className = "palette-button";

            if (index === this.currentQuestion) {

                button.classList.add("active");

            }

            if (this.answers[question.id]) {

                button.classList.add("answered");

            }

            button.onclick = () => {

                this.saveAnswer();

                this.currentQuestion = index;

                this.renderQuestion();

            };

            palette.appendChild(button);

        });

    }
        /**
     * Save Selected Answer
     */
    saveAnswer() {

        const question = this.getQuestion();

        if (!question) return;

        const selected =
            document.querySelector('input[name="answer"]:checked');

        if (selected) {

            this.answers[question.id] = selected.value;

        }

    }

    /**
     * Next Question
     */
    nextQuestion() {

        this.saveAnswer();

        if (this.currentQuestion < this.questions.length - 1) {

            this.currentQuestion++;

            this.renderQuestion();

        }

    }

    /**
     * Previous Question
     */
    previousQuestion() {

        this.saveAnswer();

        if (this.currentQuestion > 0) {

            this.currentQuestion--;

            this.renderQuestion();

        }

    }

    /**
     * Attach Button Events
     */
    attachEvents() {

        const nextButton =
            document.getElementById("nextButton");

        if (nextButton) {

            nextButton.onclick = () => {

                this.nextQuestion();

            };

        }

        const previousButton =
            document.getElementById("previousButton");

        if (previousButton) {

            previousButton.onclick = () => {

                this.previousQuestion();

            };

        }

        const submitButton =
            document.getElementById("submitButton");

        if (submitButton) {

            submitButton.addEventListener(

    "click",

    () => this.submitAssessment()

);

        }

    }

        /**
     * Calculate Score
     */
    calculateScore() {

        let score = 0;

        this.questions.forEach(question => {

            const selected = this.answers[question.id];

            if (selected === question.correctAnswer) {

                score++;

            }

        });

        return score;

    }

   /**
 * ==========================================
 * Submit Assessment
 * ==========================================
 */
submitAssessment() {

    this.saveAnswer();

    const result = this.getAssessmentResult();
// Stop timer
if (
    typeof timer !== "undefined" &&
    timer.isRunning()
) {

    timer.stop();

}
    // Save result globally
    window.AssessmentResult = result;
// Save Result History

if (typeof storage !== "undefined") {

    storage.saveHistory(result);

    storage.clearSession();

}
    // Hand over control to App Controller
    if (typeof APP !== "undefined") {

        APP.showResult(result);

    } else {

        console.error("APP Controller not found.");

    }

}

/**
 * ==========================================
 * Calculate Assessment Result
 * ==========================================
 */
getAssessmentResult() {

    let score = 0;

    this.questions.forEach(question => {

        const selected = this.answers[question.id];

        if (selected === question.correctAnswer) {

            score++;

        }

    });

    return {

        candidate: this.candidate,

        employeeId: this.employeeId,

        questions: this.questions,

        answers: this.answers,

        score: score,

        total: this.questions.length,

        percentage:
            Math.round(
                (score / this.questions.length) * 100
            ),

        submittedAt: new Date()

    };
    
const quiz = new QuizEngine();
}
}

