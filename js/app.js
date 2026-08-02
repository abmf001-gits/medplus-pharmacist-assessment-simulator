/* ============================================
   MedPlus Pharmacist Assessment Simulator
   app.js
   Version : 2.0
============================================= */

"use strict";

/*-------------------------------------------
  Application State
--------------------------------------------*/

const APP = {

    candidate: "",

    employeeId: "",

    mode: "Mock Assessment",

    currentQuestion: 0,

    totalQuestions: 50,

    score: 0,

    answers: [],

    review: [],

    quizStarted: false,

    quizFinished: false

};

/*-------------------------------------------
  Screen References
--------------------------------------------*/

const splashScreen =
document.getElementById("splash-screen");

const loginScreen =
document.getElementById("login-screen");

const instructionScreen =
document.getElementById("instruction-screen");

const assessmentScreen =
document.getElementById("assessment-screen");

const resultScreen =
document.getElementById("result-screen");

/*-------------------------------------------
  Button References
--------------------------------------------*/

const startButton =
document.getElementById("startButton");

const beginExam =
document.getElementById("beginExam");

const previousButton =
document.getElementById("previousButton");

const nextButton =
document.getElementById("nextButton");

const submitButton =
document.getElementById("submitButton");

/*-------------------------------------------
  Candidate Fields
--------------------------------------------*/

const candidateName =
document.getElementById("candidateName");

const employeeId =
document.getElementById("employeeId");

const assessmentMode =
document.getElementById("assessmentMode");
/*-------------------------------------------
  Splash Screen
--------------------------------------------*/

window.addEventListener("load", () => {

    setTimeout(() => {

        splashScreen.style.display = "none";

        loginScreen.style.display = "flex";

    }, 1800);

});

/*-------------------------------------------
  Start Button
--------------------------------------------*/

startButton.addEventListener("click", () => {

    if(candidateName.value.trim()===""){

        alert("Please enter Candidate Name");

        candidateName.focus();

        return;

    }

    APP.candidate =
    candidateName.value.trim();

    APP.employeeId =
    employeeId.value.trim();

    APP.mode =
    assessmentMode.value;

    loginScreen.style.display = "none";

    instructionScreen.style.display = "flex";

});

/*-------------------------------------------
  Begin Assessment
--------------------------------------------*/

beginExam.addEventListener("click", () => {

    instructionScreen.style.display="none";

    assessmentScreen.classList.remove("hidden");

    APP.quizStarted=true;

    document.getElementById(
        "displayCandidate"
    ).innerText=APP.candidate;

    document.getElementById(
        "displayMode"
    ).innerText=APP.mode;

    initializeQuiz();

const timer = new TimerEngine(25);

timer.start();

});
/*-------------------------------------------
  Navigation
--------------------------------------------*/

previousButton.addEventListener("click",()=>{

    if(APP.currentQuestion>0){

        APP.currentQuestion--;

        loadQuestion(APP.currentQuestion);

    }

});

nextButton.addEventListener("click",()=>{

    if(APP.currentQuestion<
        APP.totalQuestions-1){

        APP.currentQuestion++;

        loadQuestion(APP.currentQuestion);

    }

});

submitButton.addEventListener("click",()=>{

    const confirmSubmit=
    confirm(
        "Submit Assessment?"
    );

    if(!confirmSubmit)
    return;

    finishQuiz();

});

/*-------------------------------------------
  Temporary Functions
--------------------------------------------*/

function initializeQuiz(){

    console.log(
        "Quiz Initialized"
    );

}

function loadQuestion(index){

    console.log(
        "Loading Question",
        index
    );

}

function finishQuiz(){

    console.log(
        "Assessment Completed"
    );

}
