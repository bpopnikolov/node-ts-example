import { Document } from 'mongoose';

export interface IInvestment extends Document {
    amount: number;
    orderNumber: number;
    iban: string;
}
