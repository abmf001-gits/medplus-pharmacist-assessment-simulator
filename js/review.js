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
