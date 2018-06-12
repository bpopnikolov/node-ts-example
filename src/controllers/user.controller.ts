import { NextFunction, Request, Response } from 'express';
import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { injectUserService, TYPES } from '../domain/constants';
import { UserService } from '../domain/interfaces';

const { RequireTokenMiddleware } = TYPES;
@controller('/api/users')
export class UserController extends BaseHttpController {

    constructor(
        @injectUserService
        private _userService: UserService) {
        super();
    }

    @httpGet('/',
        RequireTokenMiddleware
    )
    async get(req: Request, res: Response, next: NextFunction) {
        console.log(this.httpContext.user);
        console.log((await this.httpContext.user.isAuthenticated()));
        return res.status(200).json('It WORKS');
    }

    @httpGet('/:id')
    async getById(req: Request, res: Response, next: NextFunction) { }
}
