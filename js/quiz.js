/**
 * ==========================================
 * MedPlus Pharmacist Assessment Simulator
 * Quiz Engine Version 3.0
 * Part 1 - Core Engine
 * ==========================================
 */

class QuizEngine {

    constructor() {

        // Question Bank
        this.questionBank = [];
        this.questions = [];

        // Candidate Answers
        this.answers = {};

        // Current Question
        this.currentIndex = 0;

        // Assessment Configuration
        this.totalQuestions = 50;

        // Flags
        this.initialized = false;

    }

    /**
     * Initialize Quiz
     */
    async initialize() {

        try {

            // Load Question Bank
            const bank = await loader.loadQuestions();

            if (!bank || bank.length === 0) {

                alert("Question Bank is empty.");

                return;

            }

            // Give Question Bank to Randomizer
            randomizer.setQuestionBank(bank);

            // Generate Assessment
            this.questions = randomizer.generateAssessment(this.totalQuestions);

            this.questionBank = bank;

            this.currentIndex = 0;

            this.answers = {};

            this.initialized = true;

            console.log("Quiz Initialized");

            console.log(
                "Assessment Questions:",
                this.questions.length
            );

            // Load First Question
            this.loadQuestion(0);

        }

        catch (error) {

            console.error(error);

            alert("Unable to initialize assessment.");

        }

    }

    /**
     * Returns Current Question
     */
    getCurrentQuestion() {

        return this.questions[this.currentIndex];

    }

    /**
     * Returns Total Questions
     */
    getTotalQuestions() {

        return this.questions.length;

    }

    /**
     * Returns Current Index
     */
    getCurrentIndex() {

        return this.currentIndex;
 
    }

}
    /**
     * Load Question
     */
    loadQuestion(index) {

        if (index < 0 || index >= this.questions.length) {
            return;
        }

        this.currentIndex = index;

        const question = this.questions[index];

        // Question Number
        const questionNumber = document.getElementById("question-number");

        if (questionNumber) {
            questionNumber.textContent =
                `Question ${index + 1} of ${this.questions.length}`;
        }

        // Question Text
        const questionText = document.getElementById("question-text");

        if (questionText) {
            questionText.textContent = question.question;
        }

        // Options Container
        const optionsContainer = document.getElementById("options-container");

        if (!optionsContainer) {
            console.error("options-container not found.");
            return;
        }

        optionsContainer.innerHTML = "";

        question.options.forEach((option, optionIndex) => {

            const optionId = `option-${optionIndex}`;

            const wrapper = document.createElement("div");

            wrapper.className = "option-item";

            wrapper.innerHTML = `
                <label class="option-label">
                    <input
                        type="radio"
                        name="answer"
                        id="${optionId}"
                        value="${option}"
                    >
                    <span>${option}</span>
                </label>
            `;

            optionsContainer.appendChild(wrapper);

        });

        // Restore Saved Answer
        if (this.answers[question.id]) {

            const radios =
                document.querySelectorAll('input[name="answer"]');

            radios.forEach(radio => {

                if (radio.value === this.answers[question.id]) {

                    radio.checked = true;

                }

            });

        }

        // Update Progress
        this.updateProgress();

        // Update Palette
        this.updatePalette();

    }

    /**
     * Update Progress Bar
     */
    updateProgress() {

        const progressBar =
            document.getElementById("progress-bar");

        if (!progressBar) return;

        const percentage =
            ((this.currentIndex + 1) / this.questions.length) * 100;

        progressBar.style.width = percentage + "%";

    }

    /**
     * Build / Update Question Palette
     */
    updatePalette() {

        const palette =
            document.getElementById("question-palette");

        if (!palette) return;

        palette.innerHTML = "";

        this.questions.forEach((q, index) => {

            const button = document.createElement("button");

            button.className = "palette-btn";

            button.textContent = index + 1;

            if (index === this.currentIndex) {
                button.classList.add("active");
            }

            if (this.answers[q.id]) {
                button.classList.add("answered");
            }

            button.addEventListener("click", () => {

                this.saveAnswer();

                this.loadQuestion(index);

            });

            palette.appendChild(button);

        });

    }
