import jwt, { JwtPayload } from 'jsonwebtoken';
import TokenModel from '../models/Token'

class TokenService {
    async generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: 300 });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ user: userId });

        // TODO: how to support the case when a user logs in from multiple devices
        // tokens should NOT be re-written
        // manage tokens for multiple devices
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({ user: userId, refreshToken });
        return token;
    }
    async removeToken(refreshToken: string) {
        await TokenModel.deleteOne({ refreshToken });
    }
    async refreshToken(refreshToken: string) {
        
    }
    async findToken(refreshToken: string) {
        const tokenModel = await TokenModel.findOne({ refreshToken });
        return tokenModel;
    }
    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
            return userData;
        } catch(e) {
            return null;
        }
    }
    validateRefreshToken(token: string): JwtPayload | null {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
            return userData as JwtPayload;
        } catch(e) {
            return null;
        }
    }
}
export default new TokenService();