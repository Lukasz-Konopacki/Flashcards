
class Question {
    constructor(description) {
        this.description = description;
    }
}

class OpenQuestion extends Question {
    constructor(description, correctAnswer) {
        super(description)
        this.correctAnswer = correctAnswer;
    }

    check(answer) {
        if (this.correctAnswer.toLowerCase() === String(answer).toLowerCase())
            return true;
        else
            return false
    }

    set correctAnswer(correctAnswer){
        this.correctAnswerClean = correctAnswer.trim().toLowerCase();
    }

    get correctAnswer(){
        return this.correctAnswerClean;
    }
}

class OneChoiceQuestion extends Question {
    constructor(description, answers, correctAnswerNumber) {
        super(description)
        this.answers = answers;
        this.correctAnswerNumber = correctAnswerNumber

        if (correctAnswerNumber < 0 || this.answers.length <= correctAnswerNumber)
            throw new Error("Wrong answer number");
    }

    check(answerNumber) {
        if (answerNumber < 0 || this.answers.length <= answerNumber)
            throw new Error("Wrong answer number");
        else if (answerNumber === this.correctAnswerNumber) {
            return true;
        }
        else
            return false
    }

    get PrintCorrectAnswer(){
        return console.log(this.answers[this.correctAnswerNumber]);
    }
}

class MultipleAnswerQuestions extends Question {
    constructor(description, answers, correctAnswersNumbers) {
        super(description)
        this.answers = answers;
        this.correctAnswersNumbers = correctAnswersNumbers

        for (const answerNumber of correctAnswersNumbers) {
            if (answerNumber < 0 || this.answers.length <= answerNumber)
                throw new Error("Wrong answer number");
        }
    }

    check(answersNumbers) {
        if (answersNumbers.length !== this.correctAnswersNumbers.length) {
            return false;
        }

        const an = answersNumbers.slice().sort();
        const can = this.correctAnswersNumbers.slice().sort();

        for (let i = 0; i < an.length; i++) {
            if (can[i] !== an[i]) {
                return false;
            }
        }

        return true;
    }
}

//Pierwsza pytanie otwarte
let firstQuestion = new OpenQuestion("Jak po hiszpańsku jest ręka?", 'El Mano');
console.log(`Pierwsze pytanie: ${firstQuestion.description}`)
console.log(firstQuestion.check('el manu'));
console.log(firstQuestion.check('el mano'));

//Drugie pytanie jednokrotnego Wyboru
let secondQuestion = new OneChoiceQuestion("Jak po hiszpańsku jest głowa?", ["La Cabeza", "La Pierna", "La Boca", "El Pelo"], 0);
console.log(`Drugie pytanie: ${secondQuestion.description}`)
console.log(secondQuestion.check(3));
console.log(secondQuestion.check(0));
secondQuestion.PrintCorrectAnswer;

//Drugie pytanie wielokrotnego Wyboru
let ThirdQuestion = new MultipleAnswerQuestions("Które ze słów opisują częsci ciała?", ["La Cabeza", "La Pierna", "El Perro", "El Gato"], [0, 1]);
console.log(`Trzecie pytanie: ${ThirdQuestion.description}`)
console.log(ThirdQuestion.check([0,3]));
console.log(ThirdQuestion.check([0,1,3]));
console.log(ThirdQuestion.check([1,0]));
