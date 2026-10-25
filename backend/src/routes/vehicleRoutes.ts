import { Router } from "express";
import { createVehicle, deleteVehicle, getVehicle, listVehicles, purchaseVehicle, updateVehicle } from "../controllers/vehicleController";
import { requireAdmin, requireAuth } from "../middleware/auth";
import { asyncHandler } from "../errors/asyncHandler";

const router = Router();
router.get("/", asyncHandler(listVehicles));
router.get("/:id", asyncHandler(getVehicle));
router.post("/", requireAuth, requireAdmin, asyncHandler(createVehicle));
router.put("/:id", requireAuth, requireAdmin, asyncHandler(updateVehicle));
router.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteVehicle));
router.post("/:id/purchase", requireAuth, asyncHandler(purchaseVehicle));
export default router;