import { Document, Types } from 'mongoose';
import { Investment } from '../investment';

export interface User extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    address: string;
    postCode: string;
    role: string;
    avatar?: string;
    investments: Types.ObjectId[] | Investment[];
    comparePassword(candidatePassword: string): Promise<boolean>;
}
