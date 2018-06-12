import { injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserTokenPayload } from '../domain/interfaces';

@injectable()
export class JWTService {

    private _config: { [key: string]: string };

    constructor() {
        this._config = config.jwt;
    }

    async signToken(payload: UserTokenPayload): Promise<string> {
        return jwt.sign(payload, this._config.secret, {
            // expiresIn: '0'
            issuer: 'mining-api',
        });
    }

    verifyToken(token: string): Promise<UserTokenPayload> {
        const decoded = jwt.verify(token, this._config.secret);
        return Promise.resolve(decoded as UserTokenPayload);
    }
}
