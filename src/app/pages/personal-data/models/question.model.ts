export class QuestionModel {

    question: string;
    answer: boolean; // true if yes, false if no

    constructor(question) {
        this.question = question;
        this.answer = null;
    }

    get selectedYes(): boolean {
        return this.answer === true;
    }

    get selectedNo(): boolean {
        return this.answer === false;
    }
}
