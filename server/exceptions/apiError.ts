import { ValidationError } from "express-validator";

export class ApiError extends Error {
    status;
    errors;
    constructor(status: number, message: string, errors: ValidationError[] = []) {
        super(message)
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Not Authorized');
    }
    static BadRequest(message: string, errors: ValidationError[] = []) {
        return new ApiError(400, message, errors);
    }
    static UnhandledException(message: string) {
        return new ApiError(500, message);
    }
}