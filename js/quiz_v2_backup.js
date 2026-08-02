"use strict";

/* ============================================
   MedPlus Pharmacist Assessment Simulator
   Quiz Engine v2.0
============================================= */

class QuizEngine {

    constructor() {

        this.questions = [];
        this.filteredQuestions = [];
        this.currentIndex = 0;
        this.answers = [];
        this.review = [];

        this.totalQuestions = 50;

    }

    async initialize() {

        await this.loadQuestionBank();

        this.generateAssessment();

        this.createPalette();

        this.loadQuestion(0);

    }

    async loadQuestionBank() {

        try {

            const response = await fetch("data/questions.json");

            this.questions = await response.json();

        } catch (error) {

            console.error(error);

            alert("Unable to load Question Bank.");

        }

    }

}
/* ============================================
   Generate Assessment
============================================= */

QuizEngine.prototype.generateAssessment = function () {

    const shuffled =
        [...this.questions]
        .sort(() => Math.random() - 0.5);

    this.filteredQuestions =
        shuffled.slice(0, this.totalQuestions);

};
/* ============================================
   Load Question
============================================= */

QuizEngine.prototype.loadQuestion = function (index) {

    this.currentIndex = index;

    const question =
        this.filteredQuestions[index];

    if (!question) return;

    document.getElementById(
        "currentQuestion"
    ).innerText = index + 1;

    document.getElementById(
        "questionText"
    ).innerHTML = question.question;

    const options =
        document.getElementById(
            "optionsContainer"
        );

    options.innerHTML = "";

    question.options.forEach((option, i) => {

        const label =
            document.createElement("label");

        label.className = "option";

        label.innerHTML = `

            <input
                type="radio"
                name="answer"
                value="${i}">

            <span>${option}</span>

        `;

        options.appendChild(label);

label.querySelector("input").addEventListener("change", () => {
    this.saveAnswer();
});
    });

    this.restoreAnswer();

    this.updateProgress();

};
/* ============================================
   Progress Bar
============================================= */

QuizEngine.prototype.updateProgress =
function () {

    const percentage =
        ((this.currentIndex + 1)
            / this.totalQuestions)
        * 100;

    document.getElementById(
        "progressFill"
    ).style.width =
        percentage + "%";
document.getElementById("progressText").innerText =
`${this.currentIndex + 1}/${this.totalQuestions}`;
};
/* ============================================
   Save Answer
============================================= */

QuizEngine.prototype.saveAnswer =
function () {

    const selected =
        document.querySelector(
            'input[name="answer"]:checked'
        );

    if (!selected) {

    this.answers[this.currentIndex] = null;

    return;

}

    this.answers[this.currentIndex] =
        Number(selected.value);

};
/* ============================================
   Restore Answer
============================================= */

QuizEngine.prototype.restoreAnswer =
function () {

    const answer =
        this.answers[this.currentIndex];

    if (answer == null) return;

    const radio =
        document.querySelector(
            `input[value="${answer}"]`
        );

    if (radio)
        radio.checked = true;

};
/* ============================================
   Create Palette
============================================= */

QuizEngine.prototype.createPalette =
function () {

    const palette =
        document.getElementById(
            "questionPalette"
        );

    palette.innerHTML = "";

    for (let i = 0; i < this.totalQuestions; i++) {

        const button =
            document.createElement("button");

        button.innerText = i + 1;
        button.id = `palette-${i}`;
        button.onclick = () => {

            this.saveAnswer();
            this.currentIndex = i;
            this.loadQuestion(i);

        };

        palette.appendChild(button);

    }

};
/* ==========================================
   Calculate Score
========================================== */

QuizEngine.prototype.calculateScore = function () {

    let score = 0;

    this.review = [];

    this.filteredQuestions.forEach((question, index) => {

        const selected = this.answers[index];

        const correct = question.answer;

        const isCorrect = selected === correct;

        if (isCorrect) {
            score++;
        }

        this.review.push({

            question: question.question,

            options: question.options,

            selectedAnswer: selected,

            correctAnswer: correct,

            explanation: question.explanation,

            topic: question.topic,

            difficulty: question.difficulty,

            isCorrect: isCorrect

        });

    });

    this.score = score;

    return score;

};
