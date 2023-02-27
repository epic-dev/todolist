import { NextFunction, Request, Response } from 'express';
import UserService from '../services/userService';
import userService from '../services/userService';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/apiError';


class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await UserService.registration(email, password);

            // TODO: use https
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch(e) {
            next(e)
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.sendStatus(200);
        } catch(e) {
            next(e)
        }
    }
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL!);
        } catch(e) {
            //TODO: decorator? annotation for logging?
            console.log('[UserController] activate\n' + e)
            next(e);
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);

            // TODO: use https
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch(e) {
            next(e)
        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch(e) {
            next(e)
        }
    }
}

const uc = new UserController();

export default uc;