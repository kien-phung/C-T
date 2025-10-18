import mongoose, { Schema, Document } from "mongoose";

interface IProjectDocument extends Document {
    title?: string;
    description_vn?: string;
    description_en?: string;
    thumbnail?: string;
    client_name?: string;
}

const schema: Schema<IProjectDocument> = new Schema(
    {
        title: String,
        description_vn: String,
        description_en: String,
        thumbnail: String,
        client_name: String,
    },
    {
        timestamps: true,
    }
);

export const Project = mongoose.models.Project || mongoose.model<IProjectDocument>("Project", schema);