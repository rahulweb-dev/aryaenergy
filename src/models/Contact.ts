import { Schema, model, models, type InferSchemaType } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["New", "Responded"], default: "New" },
  },
  { timestamps: true },
);

export type ContactDoc = InferSchemaType<typeof contactSchema>;
export const Contact = models.Contact ?? model("Contact", contactSchema);
