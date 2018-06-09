import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export class ExpressApplication {

    // set app to be of type express.Application
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    // application config
    public config(): void {

        // express middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true,
        }));
        this.app.use(cookieParser());
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());

        //     this.app.use(JWTServise.ensureToken,
        //         async (req: express.Request & {
        //             token: string,
        //             user: Object
        //         }, res: express.Response, next) => {
        //             if (req.token !== '' && req.token !== 'null') {
        //                 const verifyInfo = await JWTServise.jwtVerify(req.token);
        //                 console.log(verifyInfo);
        //             }

        //             next();
        //         });
    }

    public addRoute(router: Router): void {
        this.app.use(router);
    }
    // application routes
}

// export
export default new ExpressApplication().app;
