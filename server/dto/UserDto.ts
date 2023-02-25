import { Document } from 'mongoose';
import UserModel from '../models/User';

export default class UserDto {
    email: string;
    id: string;
    isActivated: boolean;
    constructor(model: Document<typeof UserModel>) {
        this.email = model.get('email');
        this.id = model.get('_id');
        this.isActivated = model.get('isActivated');
    }
}