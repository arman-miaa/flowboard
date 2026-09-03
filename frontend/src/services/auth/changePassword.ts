import { serverFetch } from "@/lib/server-fetch";
import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

export const changePassword = async (data: Omit<ChangePasswordData, "confirmPassword">, token: string) => {
  const response = await serverFetch.patch("/auth/change-password", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to change password");
  }
  
  return response.json();
};
