import { Document } from 'mongoose';

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar: string;
    phone: string;
    city: string;
    address: string;
    postCode: string;
    role: string;
}
