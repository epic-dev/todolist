import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
class User {
    @prop({ required: true, unique: true })
    public email: string;

    @prop({ required: true })
    private password: string;

    @prop({ default: false })
    public isActivated: boolean;

    @prop()
    public activationLink: string;
}

const UserModel = getModelForClass(User);

export default UserModel;