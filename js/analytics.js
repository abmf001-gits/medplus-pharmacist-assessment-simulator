"use strict";

class AnalyticsEngine{

    constructor(){

        this.summary={};

    }

}
AnalyticsEngine.prototype.generate=function(review){

    const topics={};

    review.forEach(item=>{

        if(!topics[item.topic]){

            topics[item.topic]={

                total:0,

                correct:0

            };

        }

        topics[item.topic].total++;

        if(item.isCorrect)

            topics[item.topic].correct++;

    });

    this.summary=topics;

    return topics;

};
AnalyticsEngine.prototype.getWeakTopics=function(){

    const weak=[];

    Object.keys(this.summary)

    .forEach(topic=>{

        const data=this.summary[topic];

        const percent=

        (data.correct/data.total)*100;

        if(percent<70){

            weak.push(topic);

        }

    });

    return weak;

};
AnalyticsEngine.prototype.getStrongTopics=function(){

    const strong=[];

    Object.keys(this.summary)

    .forEach(topic=>{

        const data=this.summary[topic];

        const percent=

        (data.correct/data.total)*100;

        if(percent>=90){

            strong.push(topic);

        }

    });

    return strong;

};
