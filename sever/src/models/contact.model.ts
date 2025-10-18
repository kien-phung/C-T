import mongoose, { Schema, Document } from "mongoose";

interface IContactDocument extends Document {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  program?: string;
}

const schema: Schema<IContactDocument> = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
    program: String,
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.models.Contact || mongoose.model<IContactDocument>("Contact", schema);