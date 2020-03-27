export class ContactModel {

    public name: string;
    public phone_number: string;

    constructor() {}

    public static createFromObject(d: any): ContactModel {
        const data = new ContactModel();
        data.name = d.displayName;
        data.phone_number = d.phoneNumbers[0].value.toString();
        return data;
    }

    public static createFromObjectCollection(objects: any): ContactModel[] {
        const array: ContactModel [] = [];

        for (const obj of objects) {
            array.push(this.createFromObject(obj));
        }
        return array;
    }
}
