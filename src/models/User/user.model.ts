import { model, Model, Schema } from 'mongoose';
import { IUser } from './user.interface';

/* tslint:disable:variable-name */
const UserSchema: Schema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [{
                validator: isEmail(value),
                msg: 'Invalid email.',
            }],
        },
        password: {
            type: String,
            required: true,
            validate: [{
                validator: isPassword(value),
                msg: 'Invalid password.',
            }],
        },
        avatar: {
            type: String,
        },
        phone: {
            type: String,
        },
        city: {
            type: String,
        },
        address: {
            type: String,
        },
        postCode: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    });

export const User: Model<IUser> = model<IUser>('User', UserSchema);
/* tslint:enable:variable-name */
