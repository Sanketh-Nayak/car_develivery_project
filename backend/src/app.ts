import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config";
import authRoutes from "./routes/authRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";

const app = express();
app.use(helmet());
app.use(cors({ origin: config.frontendUrl }));
app.use(express.json({ limit: "1mb" }));

app.use((req, _res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});

app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", service: "autovault-backend" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (
    err &&
    typeof err === "object" &&
    "code" in err &&
    (err as { code?: number }).code === 11000
  ) {
    return res
      .status(409)
      .json({ message: "A record with that unique value already exists" });
  }
  if (config.nodeEnv !== "test") console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});

export default app;
