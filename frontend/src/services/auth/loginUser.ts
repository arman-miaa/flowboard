import { serverFetch } from "@/lib/server-fetch";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const loginUser = async (data: LoginData) => {
  const response = await serverFetch.post("/auth/login", {
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to login");
  }
  
  return response.json();
};
