import { NextFunction, Request, Response } from 'express';
import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { injectInvestmentService } from '../domain/constants';
import { InvestmentService } from '../domain/interfaces';

@controller('/api/investments')
export class InvestmentController extends BaseHttpController {

    constructor(
        @injectInvestmentService
        private _investmentService: InvestmentService) {
        super();
    }

    @httpGet('/')
    async get(req: Request, res: Response, next: NextFunction) { }

    @httpGet('/:id')
    async getById(req: Request, res: Response, next: NextFunction) { }
}
