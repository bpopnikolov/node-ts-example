import { ExpressApplication } from '../../app';

export interface IBaseRoute {
    init(app: ExpressApplication): void;
}
