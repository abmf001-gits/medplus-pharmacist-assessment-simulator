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

        const batches = [
            "batch01.json",
            "batch02.json",
            "batch03.json",
            "batch04.json",
            "batch05.json",
            "batch06.json",
            "batch07.json",
            "batch08.json",
            "batch09.json",
            "batch10.json",
            "batch11.json",
            "batch12.json"
        ];

        let allQuestions = [];

        for (const file of batches) {
const response = await fetch(`assets/Questions/${file}`);

console.log(file, response.status);

if (!response.ok) {
    console.error("Missing file:", file);
    continue;
}

            const data = await response.json();

            if (Array.isArray(data)) {
                allQuestions.push(...data);
            }

        }

        this.questions = allQuestions;
        this.loaded = true;

        console.log(`Loaded ${allQuestions.length} questions`);

        return this.questions;

    } catch (e) {

        console.error(e);

        alert("Unable to load Question Bank");

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
