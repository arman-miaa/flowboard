'use client';
import { useState, Suspense } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/auth/resetPassword";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword({ token, newPassword });
      if (res.success) {
        toast.success("Password reset successfully!");
        router.push("/login");
      } else {
        toast.error(res.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-destructive mb-2">Invalid Link</h1>
        <p className="text-muted-foreground">This password reset link is invalid or has expired.</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-card-foreground">Set New Password</h1>
        <p className="text-muted-foreground mt-2">
          Please enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="newPassword">New Password</Label>
          <PasswordInput 
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput 
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-destructive text-xs">Passwords do not match</p>
          )}
        </div>
        
        <Button 
          type="submit"
          disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
          className="w-full flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-sm border border-border w-full max-w-md">
        <Suspense fallback={<div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
