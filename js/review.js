"use strict";

class ReviewEngine{

    constructor(){

        this.review=[];

    }

    generate(questions,answers){

        this.review=[];

        questions.forEach((q,index)=>{

            const selected=answers[index];

            this.review.push({

                question:q.question,

                correct:q.answer,

                selected:selected,

                options:q.options,

                explanation:q.explanation,

                topic:q.topic,

                isCorrect:selected===q.answer

            });

        });

        return this.review;

    }

}
ReviewEngine.prototype.getWrongAnswers=function(){

    return this.review.filter(

        item=>!item.isCorrect

    );

};

ReviewEngine.prototype.getCorrectAnswers=function(){

    return this.review.filter(

        item=>item.isCorrect

    );

};
ReviewEngine.prototype.calculateScore=function(){

    return this.review.filter(

        item=>item.isCorrect

    ).length;

};
