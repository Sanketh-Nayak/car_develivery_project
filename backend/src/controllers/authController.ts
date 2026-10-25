import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { config } from "../config";
import { registerSchema, loginSchema } from "../validation/schemas";
import { AuthRequest } from "../middleware/auth";

function makeToken(user: { _id: unknown; email: string; role: string }) {
  return jwt.sign({ userId: String(user._id), email: user.email, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn as jwt.SignOptions["expiresIn"] });
}

function publicUser(user: { _id: unknown; name: string; email: string; role: string }) {
  return { id: String(user._id), name: user.name, email: user.email, role: user.role };
}

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid registration details", errors: parsed.error.flatten() });
  const email = parsed.data.email.toLowerCase();
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "An account with this email already exists" });
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await User.create({ name: parsed.data.name, email, passwordHash, role: "user" });
  return res.status(201).json({ token: makeToken(user), user: publicUser(user) });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid login details" });
  const user = await User.findOne({ email: parsed.data.email.toLowerCase() }).select("+passwordHash");
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  return res.json({ token: makeToken(user), user: publicUser(user) });
}

export async function me(req: AuthRequest, res: Response) {
  const user = await User.findById(req.auth?.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user: publicUser(user) });
}