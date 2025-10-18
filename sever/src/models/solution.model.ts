import mongoose, { Schema, Document } from "mongoose";

interface ISolutionDocument extends Document {
    slug?: string;
    title_vn?: string;
    title_en?: string;
    description_vn?: string;
    description_en?: string;
    display_order?: number;
}

const schema: Schema<ISolutionDocument> = new Schema(
    {
        slug: String,
        title_vn: String,
        title_en: String,
        description_vn: String,
        description_en: String,
        display_order: Number,
    },
    {
        timestamps: true,
    }
);

export const Solution = mongoose.models.Solution || mongoose.model<ISolutionDocument>("Solution", schema);