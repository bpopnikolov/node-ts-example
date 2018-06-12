import { User } from '../../models';
import { AuthCredentials } from '../credentials.interface';

export interface AuthService {
    login(credentials: AuthCredentials): Promise<string | null>;
    register(user: User): Promise<User>;
}
