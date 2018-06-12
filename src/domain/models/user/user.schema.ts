import { Schema } from 'mongoose';
import { User } from '.';
import { comparePassword, hashPassword, isEmail } from './user.methods';
const mongooseDelete = require('mongoose-delete');


export const userSchema = new Schema({
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
            validator: (value) => isEmail(value),
            msg: 'Invalid email',
        }],
    },
    password: {
        type: String,
        required: true,
        validate: [{
            validator: (value) => true,
            msg: 'Invalid password',
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
    investments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Investments'
        }
    ]
}, {
        timestamps: true,
        collection: 'Users'
    });

userSchema.pre('save', async function () {
    const user: User = this as User;

    const SALT_FACTOR = 10;

    if (!user.isModified('password')) {
        return;
    }
    user.password = await hashPassword(user.password, SALT_FACTOR);
});

userSchema.plugin(mongooseDelete);

userSchema.methods.comparePassword = comparePassword;
