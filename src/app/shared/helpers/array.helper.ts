export class ArrayHelper {

    static objectArrayToPropertyValueArray(objectArray: any[], property: string): any[] {
        return Object.keys(objectArray).map(i => objectArray[i][property]);
    }

    static sortAsc(list: any[], sortFieldName: string, language): any[] {
        return list.sort((a, b) => a[sortFieldName][language].toLowerCase() < b[sortFieldName][language].toLowerCase() ? -1 :  a[sortFieldName][language].toLowerCase() >  b[sortFieldName][language].toLowerCase() ? 1 : 0);
    }
}
