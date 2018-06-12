import { injectable } from 'inversify';
import { UserRepository } from '../data/repositories/user';
import { injectUserRepository } from '../domain/constants';
import { UserService } from '../domain/interfaces';
import { User } from '../domain/models';

@injectable()
export class UserServiceDefault implements UserService {
    constructor(
        @injectUserRepository
        private _userRepository: UserRepository) { }

    async getUserById(id: string): Promise<User> {
        return this._userRepository.getById(id);
    }

    async getUser(cond: {}): Promise<User> {
        return this._userRepository.getOne(cond);
    }

    async getUsers(cond: {}): Promise<User[]> {
        return this._userRepository.getAll(cond);
    }

    async createUser(user: User): Promise<User> {
        return this._userRepository.create(user);
    }
}
