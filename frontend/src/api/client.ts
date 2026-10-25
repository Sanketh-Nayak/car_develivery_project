const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/$/, "");
export type User = {
  id?: string;
  _id?: string;
  name?: string;
  email: string;
  role: "admin" | "user";
};
export type Vehicle = {
  _id?: string;
  id?: string;
  make: string;
  model: string;
  year: number;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
};
type AuthResponse = { token: string; user: User };
export function getId(vehicle: Vehicle): string {
  return vehicle._id || vehicle.id || "";
}
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(
      data.message || data.error || `Request failed: ${response.status}`,
    );
  return data as T;
}
function extractVehicles(data: unknown): Vehicle[] {
  if (Array.isArray(data)) return data as Vehicle[];
  if (data && typeof data === "object") {
    const result = data as Record<string, unknown>;
    if (Array.isArray(result.vehicles)) return result.vehicles as Vehicle[];
    if (Array.isArray(result.data)) return result.data as Vehicle[];
  }
  return [];
}
export const api = {
  register(input: { name: string; email: string; password: string }) {
    return request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  login(input: { email: string; password: string }) {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  async getVehicles() {
    return extractVehicles(await request<unknown>("/vehicles"));
  },
  createVehicle(vehicle: Omit<Vehicle, "id" | "_id">) {
    return request<Vehicle>("/vehicles", {
      method: "POST",
      body: JSON.stringify(vehicle),
    });
  },
  updateVehicle(id: string, vehicle: Partial<Vehicle>) {
    return request<Vehicle>(`/vehicles/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(vehicle),
    });
  },
  deleteVehicle(id: string) {
    return request<void>(`/vehicles/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },
  purchaseVehicle(id: string) {
    return request<unknown>(`/vehicles/${encodeURIComponent(id)}/purchase`, {
      method: "POST",
    });
  },
};
