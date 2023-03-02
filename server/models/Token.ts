import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import UserModel from "./User";
@modelOptions({ schemaOptions: { collection: 'tokens', timestamps: true } })
class Token {
    @prop({ required: true })
    public refreshToken: string;

    @prop({ ref: UserModel })
    public user: ObjectId;
}

const TokenModel = getModelForClass(Token);

export default TokenModel;