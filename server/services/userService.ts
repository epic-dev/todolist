import UserModel from "../models/User";
import MailService from "./mailService";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import TokenService from './tokenService';
import UserDto from "../dto/UserDto";
import { ApiError } from "../exceptions/apiError";
import tokenService from "./tokenService";

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
    async login(email: string, password: string) {
        const user = await UserModel.findOne({ email });
        if(!user) {
            throw ApiError.BadRequest('No such user');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw ApiError.BadRequest('Password is not correct');
        }
        // DRY
        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }
    async logout(refreshToken: string) {
        await tokenService.removeToken(refreshToken);
    }
    async refresh(refreshToken: string) {
        if(!refreshToken) {
            //TODO logger
            console.log('refresh token is not provided')
            throw ApiError.UnauthorizedError();
        }

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) {
            //TODO logger
            console.log('no user data or token in the database', userData, tokenFromDb);
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        // DRY
        if(!user) {
            // shoouldn't be the case but typescript error
            throw ApiError.UnhandledException('Cannot find user' + userData.id);
        }
        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
        };
    }
    async getUsers() {
        const users = await UserModel.find();
        return users;
    }
}

export default new UserService();