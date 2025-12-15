import mongoose, { Schema, Document } from 'mongoose';

interface IPolicyDocument extends Document {
  slug?: string; // e.g. warranty | return | shipping | payment
  title_vn?: string;
  title_en?: string;
  description_vn?: string;
  description_en?: string;
  points_vn?: string[];
  points_en?: string[];
  is_published?: boolean;
  display_order?: number;
}

const schema: Schema<IPolicyDocument> = new Schema(
  {
    slug: String,
    title_vn: String,
    title_en: String,
    description_vn: String,
    description_en: String,
    points_vn: [String],
    points_en: [String],
    is_published: Boolean,
    display_order: Number,
  },
  { timestamps: true }
);

export const Policy = mongoose.models.Policy || mongoose.model<IPolicyDocument>('Policy', schema);