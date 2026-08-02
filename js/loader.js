/**
 * ==========================================
 * MedPlus Pharmacist Assessment Simulator
 * Loader Engine v1.0
 * ==========================================
 */

class Loader {

    constructor() {

        this.questions = [];

        this.loaded = false;

    }

    async loadQuestions() {

        if (this.loaded) {

            return this.questions;

        }

        try {

            const response = await fetch("data/questions.json");

            if (!response.ok) {

                throw new Error("Unable to load question bank.");

            }

            const data = await response.json();

            if (!Array.isArray(data)) {

                throw new Error("Invalid question bank format.");

            }

            this.questions = data;

            this.loaded = true;

            console.log(`✅ ${this.questions.length} questions loaded.`);

            return this.questions;

        } catch (error) {

            console.error("Loader Error:", error);

            alert(
                "Unable to load the Question Bank.\nPlease check data/questions.json"
            );

            return [];

        }

    }

    getQuestions() {

        return this.questions;

    }

    isLoaded() {

        return this.loaded;

    }

    clear() {

        this.questions = [];

        this.loaded = false;

    }

}

const loader = new Loader();
