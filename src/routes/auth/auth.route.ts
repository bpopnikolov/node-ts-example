import { Router } from 'express';
import { ExpressApplication } from '../../app';
import { IBaseRoute } from '../base';

export class AuthRoute implements IBaseRoute {

    private router: Router;
    private controller: any;

    constructor(controller: any) {
        this.controller = controller;
        this.router = Router();
        this.config();
    }

    public init(app: ExpressApplication): void {
        app.addRoute(this.router);
    }

    private config(): void {
        this.router
            .get('');
    }
}

export default new AuthRoute();
