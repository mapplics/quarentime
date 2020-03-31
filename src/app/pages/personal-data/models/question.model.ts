export class QuestionModel {

    question: { en: string, es: string};
    type: string;
    comment: string;
    answer: boolean; // true if yes, false if no
    yesQuestion: QuestionModel;
    noQuestion: QuestionModel;
    first: boolean;
    options: [{text: { en: string, es: string}, value: string, selected: boolean, disabled: boolean}];

    constructor() {}

    get selectedYes(): boolean {
        return this.answer === true;
    }

    get selectedNo(): boolean {
        return this.answer === false;
    }

    get simpleAnswer(): boolean {
        return this.type === 'simple';
    }

    get checkboxAnswer(): boolean {
        return this.type === 'multiple';
    }

    public static createFromObject(d: any): QuestionModel {
        const data = new QuestionModel();
        data.question = d.question;
        data.type = d.type;
        data.comment = d.comment;
        data.first = d.first ? d.first : false;
        if (d.yesQuestion) {
            data.yesQuestion = QuestionModel.createFromObject(d.yesQuestion);
        }
        if (d.noQuestion) {
            data.noQuestion = QuestionModel.createFromObject(d.noQuestion);
        }
        data.options = d.options;
        return data;
    }

    public static createFromObjectCollection(objects: any): QuestionModel[] {
        const array: QuestionModel [] = [];

        for (const obj of objects) {
            array.push(this.createFromObject(obj));
        }
        return array;
    }
}
