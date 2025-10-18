import mongoose, { Schema, Document } from "mongoose";

interface ICertificateDocument extends Document {
    name_vn?: string;
    name_en?: string;
    description?: string;
    certificate_number?: number;
    issue_year?: number;
}

const schema: Schema<ICertificateDocument> = new Schema(
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

export const Certificate = mongoose.models.Certificate || mongoose.model<ICertificateDocument>("Certificate", schema);