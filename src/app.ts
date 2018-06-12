import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { Container, ContainerModule } from 'inversify';
import { interfaces, InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import 'reflect-metadata';
import { DbClient, getDatabaseClient } from './data/db-client';
import { TYPES } from './domain/constants';
import { CustomAuthProvider } from './providers/auth';
import { exceptionLoggerMiddleware } from './utils';

export const getApp = async (
    container: Container,
    appPort: number,
    ...modules: ContainerModule[]
) => {

    if (!container.isBound(TYPES.App)) {

        const dbClient = await getDatabaseClient();
        container.bind<DbClient>(TYPES.DbClient).toConstantValue(dbClient);
        container.load(...modules);

        //  There seems to be a bug in inversify-express-utils.
        //  keep customAuthProvider line ts-ignored or it wont build.
        // @ts-ignore
        const customAuthProvider: { new(): interfaces.AuthProvider } = CustomAuthProvider;

        const server = new InversifyExpressServer(container, null, null, null, customAuthProvider);

        server.setConfig((app) => {
            app.use(express.json());
            app.use(express.urlencoded({
                extended: true,
            }));
            app.use(cookieParser());
            app.use(morgan('dev'));
            app.use(compression());
            app.use(helmet());
            app.use(cors());
        });


        server.setErrorConfig((app) => {
            // Catch and log all exceptions
            app.use(exceptionLoggerMiddleware);
        });

        const app = server.build();

        // Run express server
        console.log(`Application listening on port ${appPort}...`);
        app.listen(appPort);

        container.bind<express.Application>(TYPES.App).toConstantValue(app);

        return app;
    }

    return container.get<Application>(TYPES.App);
};
