import { injectable } from 'inversify';
import { injectDbClient } from '../../../domain/constants';
import { Repository } from '../../../domain/interfaces';
import { User, userSchema } from '../../../domain/models';
import { DbClient } from '../../db-client';
import { BaseRepository } from '../base';

@injectable()
export class UserRepository extends BaseRepository<User> implements Repository<User> {

    constructor(@injectDbClient dbClient: DbClient) {
        super(dbClient, 'Users', userSchema);
    }
}
