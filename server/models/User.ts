import { ModelOptions, getModelForClass, Prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
class User {
    @Prop({ required: true, unique: true })
    public email: string;

    @Prop({ required: true })
    public password: string;

    @Prop({ default: false })
    public isActivated: boolean;

    @Prop()
    public activationLink: string;
}

const UserModel = getModelForClass(User);

export default UserModel;