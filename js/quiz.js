/* ===========================================
   MedPlus Pharmacist Assessment Simulator
   Quiz Engine v2.0
=========================================== */

"use strict";

/* ===========================================
   Quiz Variables
=========================================== */

let quizQuestions = [];

let currentOptions = [];

let selectedAnswers = [];

let reviewQuestions = [];

let totalQuestions = 50;

/* ===========================================
   DOM Elements
=========================================== */

const questionText =
document.getElementById("questionText");

const optionsContainer =
document.getElementById("optionsContainer");

const progressFill =
document.getElementById("progressFill");

const currentQuestionText =
document.getElementById("currentQuestion");

const palette =
document.getElementById("questionPalette");
/* ===========================================
   Initialize Quiz
=========================================== */

async function initializeQuiz(){

    await loadQuestions();

    createPalette();

    loadQuestion(0);

}

/* ===========================================
   Load Questions
=========================================== */

async function loadQuestions(){

    try{

        const response =
        await fetch("data/questions.json");

        const data =
        await response.json();

        quizQuestions =
        shuffleArray(data);

        quizQuestions =
        quizQuestions.slice(0,totalQuestions);

    }

    catch(error){

        console.error(error);

        alert(
        "Unable to load questions."
        );

    }

}
/* ===========================================
   Load One Question
=========================================== */

function loadQuestion(index){

    APP.currentQuestion=index;

    currentQuestionText.innerText=index+1;

    progressFill.style.width=

    ((index+1)/totalQuestions*100)+"%";

    const q=
    quizQuestions[index];

    if(!q) return;

    questionText.innerHTML=q.question;

    optionsContainer.innerHTML="";

    q.options.forEach((option,i)=>{

        const label=
        document.createElement("label");

        label.className="option";

        label.innerHTML=`

        <input
        type="radio"
        name="answer"
        value="${i}">

        <span>${option}</span>

        `;

        optionsContainer.appendChild(label);

    });

}
/* ===========================================
   Shuffle
=========================================== */

function shuffleArray(array){

    return array.sort(()=>Math.random()-0.5);

}
/* ===========================================
   Create Palette
=========================================== */

function createPalette(){

    palette.innerHTML="";

    for(let i=0;

        i<totalQuestions;

        i++){

        const btn=
        document.createElement("button");

        btn.innerText=i+1;

        btn.onclick=()=>{

            loadQuestion(i);

        };

        palette.appendChild(btn);

    }

}
