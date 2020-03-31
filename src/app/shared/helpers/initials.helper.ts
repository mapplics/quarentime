export class InitialsHelper {

    static nameInitialWord(name) {
        const nameArray = name.split(' ');
        const len = nameArray.length <= 2 ? nameArray.length : 2;
        let text = '';
        for (let i = 0; i < len; i++) {
            text += nameArray[i].substr(0, 1).toUpperCase();
        }
        return text; // this.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    }
}
