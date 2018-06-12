import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class RequireTokenMiddleware extends BaseMiddleware {

    constructor() {
        super();
    }

    async handler(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        if (!(await this.httpContext.user.isAuthenticated())) {
            return res.status(403).json({ message: 'authentication token is required' });
        }

        return next();
    }
}
