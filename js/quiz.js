"use strict";

/* ============================================================
   MedPlus Pharmacist Assessment Simulator
   Quiz Engine Version 3.1
   ============================================================ */

class QuizEngine {

    constructor() {

        /* Question Data */
        this.questionBank = [];
        this.questions = [];

        /* Candidate */
        this.candidate = "";
        this.employeeId = "";

        /* Assessment */
        this.totalQuestions = 50;
        this.currentQuestion = 0;
        this.answers = {};

        /* State */
        this.initialized = false;

    }

    /* ========================================================
       Initialize Assessment
       ======================================================== */

    async initialize() {

        if (this.initialized) {

            return;

        }

        // Load Question Bank
        const bank = await loader.loadQuestions();

        if (!bank || bank.length === 0) {

            throw new Error("Question bank is empty.");

        }

        this.questionBank = bank;

        // Generate Random Assessment
        randomizer.setQuestionBank(bank);

        this.questions =
            randomizer.generateAssessment(
                this.totalQuestions
            );

        if (!this.questions.length) {

            throw new Error(
                "Unable to generate assessment."
            );

        }

        this.currentQuestion = 0;

        this.answers = {};

        this.initialized = true;

        this.attachEvents();

        this.renderQuestion();

    }

    /* ========================================================
       Resume Assessment
       ======================================================== */

    restoreSession(session) {

        if (!session) return;

        this.answers =
            session.answers || {};

        this.currentQuestion =
            session.currentQuestion || 0;

    }

    /* ========================================================
       Get Current Question
       ======================================================== */

    getQuestion() {

        return this.questions[
            this.currentQuestion
        ];

    }

    /* ========================================================
       Total Questions
       ======================================================== */

    getTotalQuestions() {

        return this.questions.length;

    }

    /* ========================================================
       Current Question Index
       ======================================================== */

    getCurrentIndex() {

        return this.currentQuestion;

    }

    /* ========================================================
       End of Part 1
       ======================================================== */

       /* ========================================================
       Render Current Question
       ======================================================== */

    renderQuestion() {

        const question = this.getQuestion();

        if (!question) return;

        // Question Number
        const questionNumber =
            document.getElementById("currentQuestion");

        if (questionNumber) {

            questionNumber.textContent =
                this.currentQuestion + 1;

        }

        // Question Text
        const questionText =
            document.getElementById("questionText");

        if (questionText) {

            questionText.textContent =
                question.question;

        }

        // Options Container
        const container =
            document.getElementById("optionsContainer");

        if (!container) return;

        container.innerHTML = "";

        // Shuffle options every assessment
        const options =
            [...question.options];

        options.forEach(option => {

            const label =
                document.createElement("label");

            label.className = "option";

            const input =
                document.createElement("input");

            input.type = "radio";

            input.name = "answer";

            input.value = option;

            // Restore Answer
            if (
                this.answers[question.id] === option
            ) {

                input.checked = true;

            }

            input.addEventListener(
                "change",
                () => {

                    this.saveAnswer();

                    this.updatePalette();

                }
            );

            const span =
                document.createElement("span");

            span.textContent = option;

            label.appendChild(input);

            label.appendChild(span);

            container.appendChild(label);

        });

        this.updateProgress();

        this.updatePalette();

    }

    /* ========================================================
       Update Progress Bar
       ======================================================== */

    updateProgress() {

        const progress =
            document.getElementById(
                "progressFill"
            );

        if (!progress) return;

        const percentage =

            ((this.currentQuestion + 1)

                / this.questions.length)

                * 100;

        progress.style.width =
            percentage + "%";

    }

    /* ========================================================
       Build Question Palette
       ======================================================== */

    updatePalette() {

        const palette =
            document.getElementById(
                "questionPalette"
            );

        if (!palette) return;

        palette.innerHTML = "";

        this.questions.forEach(

            (question, index) => {

                const button =
                    document.createElement("button");

                button.textContent =
                    index + 1;

                button.className =
                    "palette-button";

                if (
                    index ===
                    this.currentQuestion
                ) {

                    button.classList.add(
                        "active"
                    );

                }

                if (
                    this.answers[question.id]
                ) {

                    button.classList.add(
                        "answered"
                    );

                }

                button.addEventListener(

                    "click",

                    () => {

                        this.saveAnswer();

                        this.currentQuestion =
                            index;

                        this.renderQuestion();

                    }

                );

                palette.appendChild(button);

            }

        );

    }

    /* ========================================================
       End of Part 2
       ======================================================== */

   ,
    
