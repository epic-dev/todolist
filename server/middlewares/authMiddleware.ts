import tokenService from "../services/tokenService";
import { ApiError } from "../exceptions/apiError";
import { Request, Response, NextFunction } from "express";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) {
            return next(ApiError.UnauthorizedError());    
        }

        const token = authorization.split(' ')[1];
        const userData = tokenService.validateAccessToken(token);

        if(!userData) {
            return next(ApiError.UnauthorizedError());    
        }

        next();
    } catch(e) {
        return next(ApiError.UnauthorizedError());
    }
}