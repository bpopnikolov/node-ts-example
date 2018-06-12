import { Document } from 'mongoose';
import { User } from '../user';

export interface Investment extends Document {
    amount: number;
    orderNumber: number;
    iban: string;
    user: User;
}
