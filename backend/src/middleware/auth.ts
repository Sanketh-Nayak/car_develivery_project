import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { User, UserRole } from "../models/User";

export interface AuthRequest extends Request {
  auth?: { userId: string; role: UserRole; email: string };
}

type TokenPayload = { userId: string; role: UserRole; email: string };

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) return res.status(401).json({ message: "Authentication required" });

  try {
    const payload = jwt.verify(token, config.jwtSecret) as TokenPayload;
    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: "User no longer exists" });
    req.auth = { userId: String(user._id), role: user.role, email: user.email };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.auth) return res.status(401).json({ message: "Authentication required" });
  if (req.auth.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  return next();
}