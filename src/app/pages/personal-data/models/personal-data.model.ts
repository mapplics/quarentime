export class PersonalDataModel {

    name: string;
    surename: string;
    age: number;
    country: CountryModel;
    phone: string;

    constructor(name, surename, age, country, phone) {
        this.name = name;
        this.surename = surename;
        this.age = age;
        this.country = country;
        this.phone = phone;
    }
}


export class CountryModel {

    tag: string;
    name: string;
    flag: string;
    prefix: string;

    constructor(tag, name, flag, prefix) {
        this.tag = tag;
        this.name = name;
        this.flag = 'assets/icon/flags/' + flag;
        this.prefix = prefix;
    }
}
