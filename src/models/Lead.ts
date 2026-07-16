import { Schema, model, models, type InferSchemaType } from "mongoose";

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    source: { type: String, default: "Website" },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
      default: "New",
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export type LeadDoc = InferSchemaType<typeof leadSchema>;
export const Lead = models.Lead ?? model("Lead", leadSchema);
