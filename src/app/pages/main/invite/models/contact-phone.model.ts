export class ContactPhoneModel {

    public name: string;
    public phone_number: string;

    constructor() {}

    public static createFromObject(d: any): ContactPhoneModel {
        const data = new ContactPhoneModel();
        data.name = d.displayName;
        data.phone_number = d.phoneNumbers[0].value.toString();
        return data;
    }

    public static createFromObjectCollection(objects: any): ContactPhoneModel[] {
        const array: ContactPhoneModel [] = [];

        for (const obj of objects) {
            array.push(this.createFromObject(obj));
        }
        return array;
    }
}
