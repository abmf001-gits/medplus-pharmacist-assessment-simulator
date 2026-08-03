/**
 * ==========================================
 * MedPlus Pharmacist Assessment Simulator
 * Randomizer Engine v1.0
 * ==========================================
 */

class Randomizer {

    constructor(questions = []) {

        this.questionBank = questions;

    }

    setQuestionBank(questions) {

        this.questionBank = questions;

    }

    shuffle(array) {

        const arr = [...array];

        for (let i = arr.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [arr[i], arr[j]] = [arr[j], arr[i]];

        }

        return arr;

    }

    shuffleOptions(question) {

        const shuffledOptions = this.shuffle(question.options);

        return {

            ...question,

            options: shuffledOptions

        };

    }

    generateAssessment(totalQuestions = 50) {

        if (!this.questionBank.length) {

            console.error("Question Bank Empty");

            return [];

        }

        const shuffledQuestions = this.shuffle(this.questionBank);

        const selectedQuestions = shuffledQuestions.slice(

            0,

            Math.min(totalQuestions, shuffledQuestions.length)

        );

        return selectedQuestions;

    }

}

const randomizer = new Randomizer();
