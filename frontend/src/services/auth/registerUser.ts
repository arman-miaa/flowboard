import { serverFetch } from "@/lib/server-fetch";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterData = z.infer<typeof registerSchema>;

export const registerUser = async (data: RegisterData) => {
  const response = await serverFetch.post("/auth/register", {
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to register");
  }
  
  return response.json();
};
