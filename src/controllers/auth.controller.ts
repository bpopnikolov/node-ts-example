import { NextFunction, Request, Response } from 'express';
import { BaseHttpController, controller, httpPost } from 'inversify-express-utils';
import { injectInvestmentService, injectJWTService, injectUserService } from '../domain/constants';
import { AuthCredentials, InvestmentService, UserService } from '../domain/interfaces';
import { Investment, User } from '../domain/models';
import { JWTService } from '../services';


@controller('/api/auth')
export class AuthController extends BaseHttpController {

    constructor(
        @injectUserService private _userService: UserService,
        @injectInvestmentService private _investmentService: InvestmentService,
        @injectJWTService private _jwtService: JWTService) {
        super();
    }

    @httpPost('/login')
    async login(req: Request, res: Response, next: NextFunction) {
        const credentials: AuthCredentials = {
            email: req.body.email,
            password: req.body.password
        };

        const user = await this._userService.getUser({
            email: credentials.email
        });

        if (user && (await user.comparePassword(credentials.password))) {

            const token = await this._jwtService.signToken({
                _id: user._id,
                email: user.email,
                role: user.role
            });

            return res.status(200).json({
                token
            });
        }

        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    @httpPost('/register')
    async register(req: Request, res: Response, next: NextFunction) {
        const user: User = req.body;

        const savedUser = await this._userService.createUser(user);

        return savedUser ?
            res.status(200).json({
                message: 'User was created successfully.'
            }) :
            res.status(500).json({
                message: 'Registration failed.'
            });
    }

    @httpPost('/registerWithInvestment')
    async registerWithInvestment(req: Request, res: Response, next: NextFunction) {
        const user: User = req.body.user;
        const invetment: Investment = req.body.investment;

        const savedInvestment = await this._investmentService.createInvestment(invetment);
        user.investments = [savedInvestment];
        const savedUser = await this._userService.createUser(user);

        return savedUser ?
            res.status(200).json({
                message: 'User was created successfully.'
            }) :
            res.status(500).json({
                message: 'Registration failed.'
            });
    }
}
