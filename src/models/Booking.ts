import { Schema, model, models, type InferSchemaType } from "mongoose";

const bookingSchema = new Schema(
  {
    reference: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    vehicleNumber: { type: String, required: true, uppercase: true, trim: true, index: true },
    vehicleType: { type: String, required: true },
    fuel: { type: String, required: true },
    date: { type: String, required: true, index: true },
    slot: { type: String, required: true },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed", "Failed"],
      default: "Scheduled",
    },
    result: { type: String, enum: ["Pending", "Passed", "Failed"], default: "Pending" },
    remarks: { type: String, trim: true },
  },
  { timestamps: true },
);

bookingSchema.index({ date: 1, slot: 1 });

export type BookingDoc = InferSchemaType<typeof bookingSchema>;
export const Booking = models.Booking ?? model("Booking", bookingSchema);
