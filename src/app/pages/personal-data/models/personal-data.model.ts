export class PersonalDataModel {

    name: string;
    surename: string;
    age: number;
    // country: CountryModel;
    phone: string;

    constructor(name, surename, age, phone) {
        this.name = name;
        this.surename = surename;
        this.age = age;
        // this.country = country;
        this.phone = phone;
    }
}


export class CountryModel {

    tag: string;
    name: any;
    flag: string;
    prefix: string;

    constructor() {
    }

    public static createFromObject(d: any): CountryModel {
        const data = new CountryModel();
        data.tag = d.tag;
        data.name = d.name;
        data.flag = 'assets/icon/flags/' + d.flag;
        data.prefix = d.prefix;
        return data;
    }

    public static createFromObjectCollection(objects: any): CountryModel[] {
        const array: CountryModel [] = [];

        for (const obj of objects) {
            array.push(this.createFromObject(obj));
        }
        return array;
    }
}
