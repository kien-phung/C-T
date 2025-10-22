import mongoose, { Schema, Document } from "mongoose";

export interface IAdminDocument extends Document {
    email: string;
    password: string;
    full_name?: string;
    is_active: boolean;
    last_login?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const schema: Schema<IAdminDocument> = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        full_name: {
            type: String,
            default: 'Administrator'
        },
        is_active: {
            type: Boolean,
            default: true
        },
        last_login: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

// Don't return password in JSON
schema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const Admin = mongoose.models.Admin || mongoose.model<IAdminDocument>("Admin", schema);
