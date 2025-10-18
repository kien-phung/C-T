import mongoose, { Schema, Document } from "mongoose";

interface IProductDocument extends Document {
    name_vn?: string;
    name_en?: string;
    description?: string;
    certificate_number?: number;
    issue_year?: number;
}

const schema: Schema<IProductDocument> = new Schema(
    {
        name_vn: String,
        name_en: String,
        description: String,
        certificate_number: Number,
        issue_year: Number,
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.models.Product || mongoose.model<IProductDocument>("Product", schema);