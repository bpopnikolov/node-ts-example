import { injectable, unmanaged } from 'inversify';
import { Document, Model, Schema } from 'mongoose';
import { injectDbClient } from '../../../domain/constants';
import { Repository } from '../../../domain/interfaces';
import { DbClient } from '../../db-client';

@injectable()
export abstract class BaseRepository<T extends Document> implements Repository<T> {

    private _name: string;
    protected model: Model<T>;

    constructor(
        @injectDbClient dbClient: DbClient,
        @unmanaged() name: string,
        @unmanaged() schema: Schema) {

        this._name = name;
        this.model = dbClient.model<T>(this._name, schema);
    }

    getById(id: string, fields?: {}, options?: {}, populateFields?: string[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.model.findById(id, fields, options)
                .populate(populateFields || '')
                .exec((err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
        });
    }
    getOne(cond: {}, fields?: {}, options?: {}, populateFields?: string[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.model.findOne(cond, fields, options)
                .populate(populateFields || '')
                .exec((err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
        });
    }
    getAll(cond: {}, fields?: {}, options?: {}, populateFields?: string[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this.model.find(cond, fields, options)
                .populate(populateFields || '')
                .exec((err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
        });
    }
    create(item: T): Promise<T> {
        return this.model.create(item);
    }
    update(id: string, cond: {}, populateFields?: string[]): Promise<T> {
        throw new Error('Method not implemented.');
    }
    delete(cond: {}): Promise<T> {
        throw new Error('Method not implemented.');
    }
    save(doc: T): Promise<T> {
        throw new Error('Method not implemented.');
    }

}
