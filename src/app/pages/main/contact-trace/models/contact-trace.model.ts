import {Serializable} from '../../../../core/models/serializable.model';

export class ContactTraceModel extends Serializable {
    public name: string;
    public phone_number: string;
    public date_added: string;
    public status: string;
    public pending: boolean;

    newModel(data: any): ContactTraceModel {
        const dataParsed = new ContactTraceModel(data);
        return dataParsed;
    }

    get nameInitialWord() {
        const nameArray = this.name.split(' ');
        const len = nameArray.length <= 2 ? nameArray.length : 2;
        let text = '';
        for (let i = 0; i < len; i++) {
            text += nameArray[i].substr(0, 1).toUpperCase();
        }
        return text; // this.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    }

}
