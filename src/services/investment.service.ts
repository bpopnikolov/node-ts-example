import { injectable } from 'inversify';
import { InvestmentRepository } from '../data/repositories/investment/investment.repository';
import { injectInvestmentRepository } from '../domain/constants';
import { InvestmentService } from '../domain/interfaces';
import { Investment } from '../domain/models';

@injectable()
export class InvestmentServiceDefault implements InvestmentService {
    constructor(
        @injectInvestmentRepository
        private _investmentRepository: InvestmentRepository) { }


    async createInvestment(user: Investment): Promise<Investment> {
        return this._investmentRepository.create(user);
    }
}
