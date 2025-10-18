import mongoose, { Schema, Document } from "mongoose";

interface IUserDocument extends Document {
    full_name?: string;
    position_vn?: string;
    position_en?: string;
    avatar?: string;
    facebook_url?: string;
    linkedin_url?: string;
    display_order?: number;
    is_active?: boolean;
}

const schema: Schema<IUserDocument> = new Schema(
    {
        full_name: String,
        position_vn: String,
        position_en: String,
        avatar: String,
        facebook_url: String,
        linkedin_url: String,
        display_order: Number,
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.models.User || mongoose.model<IUserDocument>("User", schema);