export class ContactModel {

    public name: string;
    public inviteId: string;
    public fromUserPhoneNumber: string;
    public fromUserId: string;
    public fromUserName: string;

    public dateAdded: Date;
    public status: string;
    public letters: string;

    public phoneNumber: string;
    public pending: boolean;

    constructor() {}

    public static createFromObject(d: any): ContactModel {
        const data = new ContactModel();
        data.name = d.from_user_name;
        data.inviteId = d.invite_id;
        data.fromUserPhoneNumber = d.from_user_phone_number;
        data.fromUserId = d.from_user_id;
        data.fromUserName = d.from_user_name;
        data.phoneNumber = d.phone_number;
        data.dateAdded = d.date_added ? new Date(d.date_added) : new Date();
        // data.status = d.status;
        data.pending = d.pending;
        data.letters = (data.name.split(' ').map(x => x[0])).join().toUpperCase();
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
        }
    }


}
