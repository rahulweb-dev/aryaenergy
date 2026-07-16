import { Schema, model, models, type InferSchemaType } from "mongoose";

const inquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    topic: { type: String, default: "General" },
    relatedService: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["New", "In Review", "Resolved"], default: "New" },
  },
  { timestamps: true },
);

export type InquiryDoc = InferSchemaType<typeof inquirySchema>;
export const Inquiry = models.Inquiry ?? model("Inquiry", inquirySchema);
