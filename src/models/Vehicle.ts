import { Schema, model, models, type InferSchemaType } from "mongoose";

const vehicleSchema = new Schema(
  {
    vehicleNumber: { type: String, required: true, uppercase: true, trim: true, index: true },
    type: { type: String, required: true },
    fuel: { type: String, required: true },
    ownerName: { type: String, required: true, trim: true },
    ownerPhone: { type: String, required: true, trim: true },
    ownerEmail: { type: String, trim: true, lowercase: true },
    photoUrl: { type: String },
  },
  { timestamps: true },
);

export type VehicleDoc = InferSchemaType<typeof vehicleSchema>;
export const Vehicle = models.Vehicle ?? model("Vehicle", vehicleSchema);
