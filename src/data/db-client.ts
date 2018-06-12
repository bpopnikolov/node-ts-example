import mongoose from 'mongoose';
import { config } from '../config';

export type DbClient = mongoose.Mongoose;

export async function getDatabaseClient() {
    return new Promise<DbClient>((resolve, reject) => {
        const connString = `mongodb://${config.db.mongo.user}:${encodeURIComponent(config.db.mongo.password)}@${config.db.mongo.hostString}`;

        mongoose.connect(connString);

        const db = mongoose.connection;
        db.on('error', (e: Error) => {
            console.error('Db conenction error:', e);
            reject(e);
        });
        db.once('open', () => {
            console.log('Db conenction success:', connString);
            resolve(mongoose);
        });
    });
}
