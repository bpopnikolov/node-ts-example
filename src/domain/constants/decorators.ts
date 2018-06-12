import { inject } from 'inversify';
import { TYPES } from './types';

export const injectDbClient = inject(TYPES.DbClient);
export const injectUserRepository = inject(TYPES.UserRepository);
export const injectInvestmentRepository = inject(TYPES.InvestmentRepository);
export const injectUserService = inject(TYPES.UserService);
export const injectInvestmentService = inject(TYPES.InvestmentService);
export const injectJWTService = inject(TYPES.JWTService);
