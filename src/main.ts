import 'reflect-metadata';
import { getApp } from './app';
import { referenceDataIoCModule } from './ioc/inversify.config';
import { container } from './ioc/ioc.container';

export const runApp = async () => {
    const app = await getApp(
        container,
        Number(process.env.PORT) || 3001,
        referenceDataIoCModule
    );

    return app;
};

(async () => {
    try {
        await runApp();
    } catch (e) {
        console.log(e);
    }
})();
