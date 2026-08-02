"use strict";

/* ==========================================
   MedPlus Pharmacist Assessment Simulator
   Storage Engine v2.0
========================================== */

class StorageEngine {

    constructor() {

        this.keys = {

            SESSION: "medplus_session",

            HISTORY: "medplus_history",

            SETTINGS: "medplus_settings"

        };

    }

}
/* ==========================================
   Save Current Assessment
========================================== */

StorageEngine.prototype.saveSession =
function(data){

    try{

        localStorage.setItem(

            this.keys.SESSION,

            JSON.stringify(data)

        );

    }

    catch(error){

        console.error(

            "Unable to save session",

            error

        );

    }

};
/* ==========================================
   Restore Assessment
========================================== */

/*StorageEngine.prototype.loadSession =
function(){

    const data =

        localStorage.getItem(

            this.keys.SESSION

        );

    if(!data)

        return null;

    return JSON.parse(data);

};*/
StorageEngine.prototype.hasSession =
function () {

    return localStorage.getItem(
        this.keys.SESSION
    ) !== null;

};
/* ==========================================
   Clear Session
========================================== */

StorageEngine.prototype.clearSession =
function(){

    localStorage.removeItem(

        this.keys.SESSION

    );

};
/* ==========================================
   Save History
========================================== */

StorageEngine.prototype.saveHistory =
function(result){

    let history =

        JSON.parse(

            localStorage.getItem(

                this.keys.HISTORY

            )

        ) || [];

    history.push(result);

    localStorage.setItem(

        this.keys.HISTORY,

        JSON.stringify(history)

    );

};
/* ==========================================
   Read History
========================================== */

StorageEngine.prototype.getHistory =
function(){

    return JSON.parse(

        localStorage.getItem(

            this.keys.HISTORY

        )

    ) || [];

};
StorageEngine.prototype.clearHistory =
function () {

    localStorage.removeItem(
        this.keys.HISTORY
    );

};
/* ==========================================
   Best Score
========================================== */

StorageEngine.prototype.getBestScore =
function(){

    const history =

        this.getHistory();

    if(history.length===0)

        return null;

    history.sort(

        (a,b)=>b.score-a.score

    );

    return history[0];

};
/* ==========================================
   Save Settings
========================================== */

StorageEngine.prototype.saveSettings =
function(settings){

    localStorage.setItem(

        this.keys.SETTINGS,

        JSON.stringify(settings)

    );

};

/* ==========================================
   Load Settings
========================================== */

StorageEngine.prototype.loadSession =
function () {

    try {

        const data =
            localStorage.getItem(this.keys.SESSION);

        if (!data) {

            return null;

        }

        return JSON.parse(data);

    }

    catch (error) {

        console.error("Unable to load session.", error);

        return null;

    }

};
const storage = new StorageEngine();
