import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import UserModel from "./User";

class Token {
    @prop({ required: true })
    public refreshToken: string;

    @prop({ ref: UserModel })
    public user: ObjectId;
}

const TokenModel = getModelForClass(Token);

export default TokenModel;