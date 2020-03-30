import {InitialsHelper} from '../../../../shared/helpers/initials.helper';

export class ContactModel {

    public name: string;
    public phoneNumber: string;
    public userId: string;
    public dateAdded: Date;
    public status: string;
    public pending: boolean;
    public letters: string;

    // if is pending request
    public inviteId: string;
    public fromUserPhoneNumber: string;
    public fromUserId: string;
    public fromUserName: string;

    constructor() {}

    public static createFromObject(d: any): ContactModel {
        const data = new ContactModel();
        data.name = d.name;
        data.phoneNumber = d.phone_number ? d.phone_number : null;
        data.userId = d.user_id ? d.user_id : null;
        data.dateAdded = new Date(d.date_added);
        data.status  = d.status ? d.status : null;
        data.letters = d.letters ? d.letters : InitialsHelper.nameInitialWord(data.name);
        data.fromUserPhoneNumber = d.from_user_phone_number ? d.from_user_phone_number : null;
        data.fromUserId = d.from_user_id ? d.from_user_id : null;
        data.fromUserName = d.from_user_name ? d.from_user_name : null;
        data.pending = d.pending;
        data.inviteId = d.invite_id ? d.invite_id : null;
        return data;
    }

    public static createFromObjectCollection(objects: any): ContactModel[] {
        const array: ContactModel [] = [];

        for (const obj of objects) {
            array.push(this.createFromObject(obj));
        }
        return array;
    }

    get statusColor(): string {
        switch (this.status) {
            case 'healthy':
            case 'healty_social_distancing' :
            case 'flu_like':
                return '#61C1F7';
            case 'low_probability_suspected':
            case 'high_probability_suspected':
                return '#F7BA61';
            case 'recovered': return '#C18EBD';
            case 'positive': return '#F76161';
            default: return '#AFC5C9';
        }
    }

}
