import mongoose, { Document, Schema } from 'mongoose';

import { IUserModel } from './user.model';

export interface ISessionModel extends Document {
    user: IUserModel['_id'];
    valid: boolean;
}

const sessionSchema = new Schema<ISessionModel>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        valid: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model<ISessionModel>('Session', sessionSchema);
