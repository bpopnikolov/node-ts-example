import { User } from '../../models';

export interface UserService {
    getUserById(id: string): Promise<User>;
    getUser(cond: {}): Promise<User>;
    getUsers(cond: {}): Promise<User[]>;
    createUser(user: User): Promise<User>;
}
