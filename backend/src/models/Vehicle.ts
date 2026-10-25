import { Schema, model, HydratedDocument } from "mongoose";

export interface IVehicle {
  make: string;
  model: string;
  year: number;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
}

export type VehicleDocument = HydratedDocument<IVehicle>;

const vehicleSchema = new Schema<IVehicle>(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
