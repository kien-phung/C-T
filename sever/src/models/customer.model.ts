import mongoose, { Schema, Document } from "mongoose";

interface ICustomerDocument extends Document {
    name?: string;
    logo?: string;
    website_url?: string;
    display_order?: number;
}

const schema: Schema<ICustomerDocument> = new Schema(
    {
        name: String,
        logo: String,
        website_url: String,
        display_order: Number,
    },
    {
        timestamps: true,
    }
);

export const Customer = mongoose.models.Customer || mongoose.model<ICustomerDocument>("Customer", schema);