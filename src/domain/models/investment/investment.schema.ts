import { Schema } from 'mongoose';
const mongooseDelete = require('mongoose-delete');


/* tslint:disable:variable-name */
export const investmentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    orderNumber: {
        type: Number,
    },
    iban: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }
}, {
        timestamps: true,
        collection: 'Investments'
    });


investmentSchema.plugin(mongooseDelete);
