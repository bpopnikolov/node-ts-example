export const TYPES = {
    App: Symbol('App'),
    DbClient: Symbol('DbClient'),
    InvestmentService: Symbol.for('InvestmentService'),
    UserService: Symbol.for('UserService'),
    JWTService: Symbol.for('JWTService'),
    UserRepository: Symbol.for('UserRepository'),
    InvestmentRepository: Symbol.for('InvestmentRepository'),
    RequireTokenMiddleware: Symbol.for('RequireTokenMiddleware')
};
