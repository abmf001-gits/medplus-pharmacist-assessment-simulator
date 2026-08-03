"use strict";

/* ============================================================
   MedPlus Pharmacist Assessment Simulator
   Review Engine Version 1.0
   ============================================================ */

class ReviewEngine {

    constructor() {

        this.result = null;

        this.questions = [];

        this.answers = {};

        this.filteredQuestions = [];

        this.currentQuestion = 0;

        this.currentFilter = "ALL";

        this.initialized = false;

    }

    /* ============================================================
       Load Assessment Result
       ============================================================ */

    load(result) {

        if (!result) {

            console.error("ReviewEngine: No assessment result found.");

            return;

        }

        this.result = result;

        this.questions = result.questions || [];

        this.answers = result.answers || {};

        this.filteredQuestions = [...this.questions];

        this.currentQuestion = 0;

        this.currentFilter = "ALL";

        this.initialized = true;

        this.render();

    }

    /* ============================================================
       Render Review Screen
       ============================================================ */

    render() {

        if (!this.initialized) {

            return;

        }

        this.renderQuestion();

        this.updatePalette();

    }

    /* ============================================================
       Current Question
       ============================================================ */

    getQuestion() {

        return this.filteredQuestions[
            this.currentQuestion
        ];

    }

    /* ============================================================
       User Selected Answer
       ============================================================ */

    getUserAnswer(question) {

        return this.answers[question.id];

    }

    /* ============================================================
       Correct Answer
       ============================================================ */

    getCorrectAnswer(question) {

        return question.options[
            question.answer
        ];

    }

    /* ============================================================
       Review Status
       ============================================================ */

    getStatus(question) {

        const userAnswer =
            this.getUserAnswer(question);

        if (!userAnswer) {

            return "SKIPPED";

        }

        if (
            userAnswer ===
            this.getCorrectAnswer(question)
        ) {

            return "CORRECT";

        }

        return "WRONG";

    }

    /* ============================================================
       Total Questions
       ============================================================ */

    getTotalQuestions() {

        return this.filteredQuestions.length;

    }

    /* ============================================================
       Current Review Position
       ============================================================ */

    getCurrentIndex() {

        return this.currentQuestion;

    }

    /* ============================================================
       End of Part 1
       ============================================================ */
    /* ============================================================
       Render Current Review Question
       ============================================================ */

    renderQuestion() {

        const question = this.getQuestion();

        if (!question) return;

        // Question Number
        const number =
            document.getElementById("reviewQuestionNumber");

        if (number) {

            number.textContent =
                `${this.currentQuestion + 1} / ${this.filteredQuestions.length}`;

        }

        // Question Text
        const text =
            document.getElementById("reviewQuestionText");

        if (text) {

            text.textContent =
                question.question;

        }

        // Options Container
        const container =
            document.getElementById("reviewOptions");

        if (!container) return;

        container.innerHTML = "";

        const userAnswer =
            this.getUserAnswer(question);

        const correctAnswer =
            this.getCorrectAnswer(question);

        question.options.forEach(option => {

            const card =
                document.createElement("div");

            card.className =
                "review-option";

            // Correct Answer
            if (option === correctAnswer) {

                card.classList.add("correct");

            }

            // Wrong User Answer
            if (

                option === userAnswer &&

                option !== correctAnswer

            ) {

                card.classList.add("wrong");

            }

            // User Selected Correct Answer
            if (

                option === userAnswer &&

                option === correctAnswer

            ) {

                card.classList.add("selected");

            }

            card.innerHTML = `

                <span>${option}</span>

            `;

            container.appendChild(card);

        });

        this.renderExplanation(question);

    }

    /* ============================================================
       Render Explanation
       ============================================================ */

    renderExplanation(question) {

        const explanation =
            document.getElementById("reviewExplanation");

        if (!explanation) return;

        explanation.textContent =

            question.explanation ||

            "Explanation not available.";

        const reference =
            document.getElementById("reviewReference");

        if (reference) {

            reference.textContent =

                question.reference ||

                "";

        }

        const status =
            document.getElementById("reviewStatus");

        if (status) {

            const result =
                this.getStatus(question);

            status.textContent =
                result;

            status.className =
                result.toLowerCase();

        }

    }

    /* ============================================================
       End of Part 2
       ============================================================ */

