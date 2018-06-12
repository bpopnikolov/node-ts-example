import { ContainerModule } from 'inversify';
import { AuthController, InvestmentController, UserController } from '../controllers';
import { InvestmentRepository } from '../data/repositories/investment';
import { UserRepository } from '../data/repositories/user/user.repository';
import { TYPES } from '../domain/constants/types';
import { InvestmentService, Repository, UserService } from '../domain/interfaces';
import { Investment, User } from '../domain/models';
import { InvestmentServiceDefault, JWTService, UserServiceDefault } from '../services';
import { RequireTokenMiddleware } from './middlewares';

// used just so that vs code doesnt remove empty import statements
// needed for inversify-express-utils to register controllers
const controllers = {
    user: UserController,
    auth: AuthController,
    investment: InvestmentController
};

export const referenceDataIoCModule = new ContainerModule((bind) => {

    // Repositories
    bind<Repository<User>>(TYPES.UserRepository)
        .to(UserRepository).inSingletonScope();

    bind<Repository<Investment>>(TYPES.InvestmentRepository)
        .to(InvestmentRepository).inSingletonScope();

    // Services

    bind<UserService>(TYPES.UserService)
        .to(UserServiceDefault).inSingletonScope();

    bind<InvestmentService>(TYPES.InvestmentService)
        .to(InvestmentServiceDefault).inSingletonScope();

    bind<JWTService>(TYPES.JWTService)
        .to(JWTService).inSingletonScope();

    // Middlewarees
    bind<RequireTokenMiddleware>(TYPES.RequireTokenMiddleware)
        .to(RequireTokenMiddleware);

});
