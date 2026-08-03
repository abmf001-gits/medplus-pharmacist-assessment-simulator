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

    this.eventsBound = false;

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

if (!this.eventsBound) {

    this.attachEvents();

    this.eventsBound = true;

}

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

this.updateStatistics();

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
    /* ============================================================
       Previous Review Question
       ============================================================ */

    previousQuestion() {

        if (this.currentQuestion > 0) {

            this.currentQuestion--;

            this.renderQuestion();

            this.updatePalette();

        }

    }

    /* ============================================================
       Next Review Question
       ============================================================ */

    nextQuestion() {

        if (
            this.currentQuestion <
            this.filteredQuestions.length - 1
        ) {

            this.currentQuestion++;

            this.renderQuestion();

            this.updatePalette();

        }

    }

    /* ============================================================
       Jump To Question
       ============================================================ */

    gotoQuestion(index) {

        if (

            index >= 0 &&

            index < this.filteredQuestions.length

        ) {

            this.currentQuestion = index;

            this.renderQuestion();

            this.updatePalette();

        }

    }

    /* ============================================================
       Build Review Palette
       ============================================================ */

    updatePalette() {

        const palette =
            document.getElementById("reviewPalette");

        if (!palette) return;

        palette.innerHTML = "";

        this.filteredQuestions.forEach(

            (question, index) => {

                const button =
                    document.createElement("button");

                button.textContent =
                    index + 1;

                button.className =
                    "palette-button";

                const status =
                    this.getStatus(question);

                if (status === "CORRECT") {

                    button.classList.add("answered");

                }

                if (status === "WRONG") {

                    button.classList.add("wrong");

                }

                if (status === "SKIPPED") {

                    button.classList.add("skipped");

                }

                if (index === this.currentQuestion) {

                    button.classList.add("active");

                }

                button.onclick = () => {

                    this.gotoQuestion(index);

                };

                palette.appendChild(button);

            }

        );

    }

    /* ============================================================
       Attach Events
       ============================================================ */

    attachEvents() {

        document
            .getElementById("reviewPrevious")
            ?.addEventListener(

                "click",

                () => this.previousQuestion()

            );

        document
            .getElementById("reviewNext")
            ?.addEventListener(

                "click",

                () => this.nextQuestion()

            );
document
    .getElementById("filterAll")
    ?.addEventListener(
        "click",
        () => this.showAll()
    );

document
    .getElementById("filterCorrect")
    ?.addEventListener(
        "click",
        () => this.showCorrect()
    );

document
    .getElementById("filterWrong")
    ?.addEventListener(
        "click",
        () => this.showWrong()
    );

document
    .getElementById("filterSkipped")
    ?.addEventListener(
        "click",
        () => this.showSkipped()
    );
    }
    /* ============================================================
       Filter - All Questions
       ============================================================ */

    showAll() {

        this.filteredQuestions = [...this.questions];

        this.currentQuestion = 0;

        this.currentFilter = "ALL";

        this.render();

    }

    /* ============================================================
       Filter - Correct Questions
       ============================================================ */

    showCorrect() {

        this.filteredQuestions =

            this.questions.filter(

                question =>

                    this.getStatus(question) === "CORRECT"

            );

        if (this.filteredQuestions.length === 0) {

    alert("No correct questions found.");

    return;

}

this.currentQuestion = 0;

        this.currentFilter = "CORRECT";

        this.render();

    }

    /* ============================================================
       Filter - Wrong Questions
       ============================================================ */
showWrong() {

    this.filteredQuestions =

        this.questions.filter(

            question =>

                this.getStatus(question) === "WRONG"

        );

    if (this.filteredQuestions.length === 0) {

        alert("No wrong questions found.");

        return;

    }

    this.currentQuestion = 0;

    this.currentFilter = "WRONG";

    this.render();

}

    /* ============================================================
       Filter - Skipped Questions
       ============================================================ */

    showSkipped() {

        this.filteredQuestions =

            this.questions.filter(

                question =>

                    this.getStatus(question) === "SKIPPED"

            );

        if (this.filteredQuestions.length === 0) {

    alert("No skipped questions found.");

    return;

}

this.currentQuestion = 0;

        this.currentFilter = "SKIPPED";

        this.render();

    }

    /* ============================================================
       Review Statistics
       ============================================================ */

    getStatistics() {

        let correct = 0;

        let wrong = 0;

        let skipped = 0;

        this.questions.forEach(question => {

            const status =

                this.getStatus(question);

            if (status === "CORRECT") {

                correct++;

            }

            else if (status === "WRONG") {

                wrong++;

            }

            else {

                skipped++;

            }

        });

        return {

            total:

                this.questions.length,

            correct:

                correct,

            wrong:

                wrong,

            skipped:

                skipped

        };

    }

    /* ============================================================
       Update Statistics Card
       ============================================================ */

    updateStatistics() {

        const stats =

            this.getStatistics();

        document.getElementById("reviewCorrect")
            ?.textContent = stats.correct;

        document.getElementById("reviewWrong")
            ?.textContent = stats.wrong;

        document.getElementById("reviewSkipped")
            ?.textContent = stats.skipped;

        document.getElementById("reviewTotal")
            ?.textContent = stats.total;

    }
   
} // End of ReviewEngine

const review = new ReviewEngine();

console.log(
    "✅ Review Engine Version 1.0 Loaded"
);
