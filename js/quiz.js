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

    /* ========================================================
       Save Selected Answer
       ======================================================== */

    saveAnswer() {

        const question = this.getQuestion();

        if (!question) return;

        const selected =
            document.querySelector(
                'input[name="answer"]:checked'
            );

        if (!selected) return;

        this.answers[question.id] =
            selected.value;

        // Auto Save Session
        if (typeof storage !== "undefined") {

            storage.saveSession({

                candidate: this.candidate,

                employeeId: this.employeeId,

                currentQuestion:
                    this.currentQuestion,

                answers: this.answers,

                remainingTime:

                    typeof timer !== "undefined"

                        ? timer.getRemaining()

                        : 0

            });

        }

    }

    /* ========================================================
       Next Question
       ======================================================== */

    nextQuestion() {

        this.saveAnswer();

        if (
            this.currentQuestion <
            this.questions.length - 1
        ) {

            this.currentQuestion++;

            this.renderQuestion();

        }

    }

    /* ========================================================
       Previous Question
       ======================================================== */

    previousQuestion() {

        this.saveAnswer();

        if (this.currentQuestion > 0) {

            this.currentQuestion--;

            this.renderQuestion();

        }

    }

    /* ========================================================
       Jump To Question
       ======================================================== */

    gotoQuestion(index) {

        this.saveAnswer();

        if (

            index >= 0 &&

            index < this.questions.length

        ) {

            this.currentQuestion = index;

            this.renderQuestion();

        }

    }

    /* ========================================================
       Question Status
       ======================================================== */

    isAnswered(questionId) {

        return this.answers.hasOwnProperty(
            questionId
        );

    }

    /* ========================================================
       Attempt Statistics
       ======================================================== */

    getStatistics() {

        const attempted =
            Object.keys(this.answers).length;

        return {

            total:
                this.questions.length,

            attempted:

                attempted,

            skipped:

                this.questions.length -

                attempted

        };

    }

    /* ========================================================
       End of Part 3
       ======================================================== */

       /* ========================================================
       Attach Button Events
       ======================================================== */

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

            submitButton.onclick = () => {

                if (
                    confirm(
                        "Are you sure you want to submit the assessment?"
                    )
                ) {

                    this.submitAssessment();

                }

            };

        }

    }

    /* ========================================================
       Calculate Score
       ======================================================== */

    calculateScore() {

        let score = 0;

        this.questions.forEach(question => {

            const selected =
                this.answers[question.id];

            if (
                selected ===
                question.options[question.answer]
            ) {

                score++;

            }

        });

        return score;

    }

    /* ========================================================
       Submit Assessment
       ======================================================== */

    submitAssessment() {

        this.saveAnswer();

        const result =
            this.getAssessmentResult();

        // Stop Timer
        if (

            typeof timer !== "undefined" &&

            timer.isRunning()

        ) {

            timer.stop();

        }

        // Save Result
        if (
            typeof storage !== "undefined"
        ) {

            storage.saveHistory(result);

            storage.clearSession();

        }

        // Pass Result to App Controller
        if (

            typeof APP !== "undefined" &&

            typeof APP.showResult === "function"

        ) {

            APP.showResult(result);

        }
        else {

            console.error(
                "APP Controller not found."
            );

        }

    }

    /* ========================================================
       Build Result Object
       ======================================================== */

    getAssessmentResult() {

        const score =
            this.calculateScore();

        const attempted =
            Object.keys(this.answers).length;

        return {

            candidate:
                this.candidate,

            employeeId:
                this.employeeId,

            questions:
                this.questions,

            answers:
                this.answers,

            score:
                score,

            total:
                this.questions.length,

            percentage:
                Math.round(
                    (score /
                        this.questions.length)
                    * 100
                ),

            attempted:
                attempted,

            correct:
                score,

            wrong:
                attempted - score,

            skipped:
                this.questions.length -
                attempted,

            submittedAt:
                new Date().toISOString(),

            remainingTime:

                typeof timer !== "undefined"

                    ? timer.getRemaining()

                    : 0

        };

    }

    /* ========================================================
       End of Part 4
       ======================================================== */

   
        /* ========================================================
       Reset Assessment
       ======================================================== */

    reset() {

        this.questionBank = [];

        this.questions = [];

        this.answers = {};

        this.currentQuestion = 0;

        this.initialized = false;

        this.candidate = "";

        this.employeeId = "";

    }

    /* ========================================================
       Destroy Assessment
       ======================================================== */

    destroy() {

        this.reset();

        const container =
            document.getElementById("optionsContainer");

        if (container) {

            container.innerHTML = "";

        }

        const palette =
            document.getElementById("questionPalette");

        if (palette) {

            palette.innerHTML = "";

        }

        const question =
            document.getElementById("questionText");

        if (question) {

            question.textContent = "";

        }

        const progress =
            document.getElementById("progressFill");

        if (progress) {

            progress.style.width = "0%";

        }

    }

    /* ========================================================
       Get Question By ID
       ======================================================== */

    getQuestionById(id) {

        return this.questions.find(

            question => question.id === id

        );

    }

    /* ========================================================
       Check Initialization
       ======================================================== */

    isInitialized() {

        return this.initialized;

    }

} // ===== End of QuizEngine Class =====


/* ============================================================
   Global Quiz Instance
   ============================================================ */

const quiz = new QuizEngine();

console.log(
    "✅ Quiz Engine Version 3.1 Loaded Successfully"
);
