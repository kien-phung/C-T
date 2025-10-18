import mongoose, { Schema, Document } from "mongoose";

interface IBlogDocument extends Document {
  title_vn?: string;
  title_en?: string;
  description_vn?: string;
  description_en?: string;
  category_vn?: string;
  category_en?: string;
  thumbnail?: string;
  published_date?: Date;
  external_url?: string;
  is_external?: boolean;
  is_published?: boolean;
}

const schema: Schema<IBlogDocument> = new Schema(
  {
    title_vn: String,
    title_en: String,
    description_vn: String,
    description_en: String,
    category_vn: String,
    category_en: String,
    thumbnail: String,
    published_date: Date,
    external_url: String,
    is_external: {
      type: Boolean,
      default: false,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlogDocument>("Blog", schema);