import mongoose, { Schema, Document } from "mongoose";

interface ITeamMemberDocument extends Document {
    full_name?: string;
    position_vn?: string;
    position_en?: string;
    avatar?: string;
    social_urls?: string[];
}

const schema: Schema<ITeamMemberDocument> = new Schema(
    {
        full_name: String,
        position_vn: String,
        position_en: String,
        avatar: String,
        social_urls: [String],
    },
    {
        timestamps: true,
    }
);

export const TeamMember = mongoose.models.TeamMember || mongoose.model<ITeamMemberDocument>("TeamMember", schema);