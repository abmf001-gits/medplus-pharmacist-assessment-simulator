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
