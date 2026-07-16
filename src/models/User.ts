import { Schema, model, models, type InferSchemaType } from "mongoose";
import { ROLES } from "@/constants/roles";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ROLES, default: "user" },
    phone: { type: String, trim: true },
    image: { type: String },
  },
  { timestamps: true },
);

export type UserDoc = InferSchemaType<typeof userSchema>;
export const User = models.User ?? model("User", userSchema);
