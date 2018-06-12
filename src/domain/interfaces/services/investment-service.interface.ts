import { Investment } from '../../models';

export interface InvestmentService {
    createInvestment(user: Investment): Promise<Investment>;
}
