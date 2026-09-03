import { serverFetch } from "@/lib/server-fetch";
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export const updateProfile = async (data: UpdateProfileData) => {
  const response = await serverFetch.patch("/auth/profile", {
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update profile");
  }
  
  return response.json();
};
