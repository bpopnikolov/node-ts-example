import { injectable } from 'inversify';
import * as autoIncrement from 'mongoose-auto-increment';
import { injectDbClient } from '../../../domain/constants';
import { Repository } from '../../../domain/interfaces';
import { Investment, investmentSchema } from '../../../domain/models';
import { DbClient } from '../../db-client';
import { BaseRepository } from '../base';


@injectable()
export class InvestmentRepository extends BaseRepository<Investment> implements Repository<Investment> {

    constructor(@injectDbClient dbClient: DbClient) {
        super(dbClient, 'Investments', investmentSchema);

        autoIncrement.initialize(dbClient.connection);
        investmentSchema.plugin(autoIncrement.plugin, {
            model: 'Investments',
            field: 'orderNumber',
            startAt: 1,
            incrementBy: 1
        });
    }
}
