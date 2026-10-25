import { Request, Response } from "express";
import mongoose from "mongoose";
import { Vehicle } from "../models/Vehicle";
import { vehicleSchema, vehicleUpdateSchema } from "../validation/schemas";
import { AuthRequest } from "../middleware/auth";

function validId(id: string) { return mongoose.isValidObjectId(id); }

export async function listVehicles(_req: Request, res: Response) {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean();
  return res.json({ vehicles });
}

export async function getVehicle(req: Request, res: Response) {
  if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid vehicle ID" });
  const vehicle = await Vehicle.findById(req.params.id).lean();
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  return res.json({ vehicle });
}

export async function createVehicle(req: Request, res: Response) {
  const parsed = vehicleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid vehicle details", errors: parsed.error.flatten() });
  const vehicle = await Vehicle.create(parsed.data);
  return res.status(201).json({ vehicle });
}

export async function updateVehicle(req: Request, res: Response) {
  if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid vehicle ID" });
  const parsed = vehicleUpdateSchema.safeParse(req.body);
  if (!parsed.success || Object.keys(parsed.data || {}).length === 0) {
    return res.status(400).json({ message: "Provide valid vehicle fields to update", errors: parsed.success ? undefined : parsed.error.flatten() });
  }
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  return res.json({ vehicle });
}

export async function deleteVehicle(req: Request, res: Response) {
  if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid vehicle ID" });
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  return res.json({ message: "Vehicle deleted successfully" });
}

export async function purchaseVehicle(req: AuthRequest, res: Response) {
  if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid vehicle ID" });
  // Atomic conditional update prevents purchasing when stock is zero.
  const vehicle = await Vehicle.findOneAndUpdate(
    { _id: req.params.id, quantity: { $gt: 0 } },
    { $inc: { quantity: -1 } },
    { new: true, runValidators: true }
  );
  if (!vehicle) {
    const exists = await Vehicle.exists({ _id: req.params.id });
    return exists
      ? res.status(409).json({ message: "Vehicle is out of stock" })
      : res.status(404).json({ message: "Vehicle not found" });
  }
  return res.json({ message: "Purchase completed successfully", vehicle });
}