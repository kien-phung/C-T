import mongoose, { Schema, Document } from "mongoose";

interface IContactDocument extends Document {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  message?: string;
  submit_type?: string;
}

const schema: Schema<IContactDocument> = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    message: String,
    submit_type: String,
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.models.Contact || mongoose.model<IContactDocument>("Contact", schema);