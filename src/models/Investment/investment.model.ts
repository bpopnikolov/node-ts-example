import { model, Model, Schema } from 'mongoose';
import { IInvestment } from './investment.interface';

/* tslint:disable:variable-name */
const InvestmentSchema: Schema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        orderNumber: {
            type: Number,
        },
        iban: {
            type: String,
        },
    },
    {
        timestamps: true,
    });

export const Investment: Model<IInvestment> = model<IInvestment>('Investment', InvestmentSchema);
/* tslint:enable:variable-name */
