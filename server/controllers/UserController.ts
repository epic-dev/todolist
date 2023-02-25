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

    async login(req: any, res: any, next: any) {
        try {
            res.send('test route')
        } catch(e) {
            console.log(e)
        }
    }
    async logout(req: any, res: any, next: any) {
        try {
            res.send('test route')
        } catch(e) {
            console.log(e)
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
    async refresh(req: any, res: any, next: any) {
        try {
            res.send('test route')
        } catch(e) {
            console.log(e)
        }
    }
    async getUsers(req: any, res: any, next: any) {
        try {
            res.json(['Server is alive!'])
        } catch(e) {
            console.log(e)
        }
    }
}

const uc = new UserController();

export default uc;