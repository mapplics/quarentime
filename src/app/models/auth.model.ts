import {Serializable} from '../core/models/serializable.model';

export class AuthModel extends Serializable {
    public name: string;
    public email: string;
    public photoUrl: string;
    public refreshToken: string;
    public loginType: string;

    newModel(data: any): AuthModel {
        const dataParsed = new AuthModel(data);
        return dataParsed;
    }
}
