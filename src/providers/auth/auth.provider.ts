import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { injectJWTService, injectUserService } from '../../domain/constants';
import { UserService } from '../../domain/interfaces';
import { JWTService } from '../../services';
import { AuthPrincipal } from './auth.principal';

@injectable()
export class CustomAuthProvider implements interfaces.AuthProvider {

    constructor(
        @injectUserService
        private readonly _userService: UserService,
        @injectJWTService
        private readonly _jwtService: JWTService
    ) { }

    async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<interfaces.Principal> {

        const token = req.headers.authorization;
        let user = null;

        if (token) {
            const decoded = await this._jwtService.verifyToken(token);
            user = await this._userService.getUserById(decoded._id);
        }

        const principal = new AuthPrincipal(user);

        return principal;
    }

}
