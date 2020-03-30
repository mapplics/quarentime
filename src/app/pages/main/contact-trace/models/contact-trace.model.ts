import {Serializable} from '../../../../core/models/serializable.model';

export class ContactTraceModel extends Serializable {
    public name: string;
    public initials: string;
    public status: string;
    public color: string;
    public contacts: ContactTraceModel[];

    newModel(data: any): ContactTraceModel {
        const dataParsed = new ContactTraceModel(data);

        dataParsed.status = data.final_status;
        dataParsed.color = data.color_hex;
        dataParsed.initials = data.initials;
        if (data.contacts) {
            dataParsed.contacts = ContactTraceModel.createArray(data.contacts, new ContactTraceModel());
        }
        return dataParsed;
    }

    // get nameInitialWord() {
    //     const nameArray = this.name.split(' ');
    //     const len = nameArray.length <= 2 ? nameArray.length : 2;
    //     let text = '';
    //     for (let i = 0; i < len; i++) {
    //         text += nameArray[i].substr(0, 1).toUpperCase();
    //     }
    //     return text; // this.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    // }

}
