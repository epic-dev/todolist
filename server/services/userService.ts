import UserModel from "../models/User";
import MailService from "./mailService";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import TokenService from './tokenService';
import UserDto from "../dto/UserDto";
import { ApiError } from "../exceptions/apiError";

class UserService {
    // TODO: return interface/type
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({ email });
        if(candidate !== null) {
            throw ApiError.BadRequest('Email already exists');
        }

        const hashPwd = await bcrypt.hash(password, 2);
        const activationLink = v4();
        const user = await UserModel.create({ email, password: hashPwd, activationLink });

        await MailService.sendActivationEmail(email, `${process.env.API_URL}/activate/${activationLink}`); // FIXME activationLink is not link

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }
    async activate(activationLink: string): Promise<void> {
        const user = await UserModel.findOne({ activationLink });
        if(!user) {
            throw ApiError.BadRequest('Such user is not found!');
        }
        user.isActivated = true;
        await user.save();
    }
}

export default new UserService();