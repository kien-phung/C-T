import mongoose, { Schema, Document } from "mongoose";

interface IProductDocument extends Document {
    name_vn?: string;
    name_en?: string;
    description?: string;
    image?: string;
    price?: string;
    pdf_url?: string;
    pdf_urls?: string[];
    // Legacy single-language features
    features?: string[];
    // Bilingual features support
    features_vn?: string[];
    features_en?: string[];
    category?: 'hardware' | 'software';
    is_published?: boolean;
    certificate_number?: number; // legacy
    issue_year?: number;         // legacy
}

const schema: Schema<IProductDocument> = new Schema(
    {
        name_vn: { type: String },
        name_en: { type: String },
        description: { type: String },
        image: { type: String },
        price: { type: String },
        pdf_url: { type: String },
        pdf_urls: { type: [String], default: [] },
        // Keep legacy features for backward compatibility
        features: { type: [String], default: [] },
        // New bilingual feature fields
        features_vn: { type: [String], default: [] },
        features_en: { type: [String], default: [] },
        category: { type: String, enum: ['hardware', 'software'], index: true },
        is_published: { type: Boolean, default: true },
        // legacy fields kept for compatibility
        certificate_number: { type: Number },
        issue_year: { type: Number },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.models.Product || mongoose.model<IProductDocument>("Product", schema);
