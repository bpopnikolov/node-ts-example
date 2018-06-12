import { interfaces } from 'inversify-express-utils';
import { User } from '../../domain/models';

export class AuthPrincipal implements interfaces.Principal {

    constructor(private _user: User) { }

    isAuthenticated(): Promise<boolean> {
        return this._user ? Promise.resolve(true) : Promise.resolve(false);
    }
    isResourceOwner(resourceId: string): Promise<boolean> {
        return Promise.resolve(resourceId === 'someid123123');
    }
    isInRole(role: string): Promise<boolean> {
        return Promise.resolve(role === 'admin');
    }

    get details(): User {
        return this._user;
    }
}
