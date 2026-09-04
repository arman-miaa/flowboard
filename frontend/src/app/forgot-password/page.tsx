'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { forgotPassword } from "@/services/auth/forgotPassword";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setSubmitted(true);
        toast.success(res.message || "Reset link sent!");
      } else {
        toast.error(res.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-sm border border-border w-full max-w-md relative">
        <Link 
          href="/login" 
          className="absolute left-6 top-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        <div className="text-center mb-8 mt-2 flex flex-col items-center">
          <div className="w-16 h-16 mb-4 relative rounded-2xl overflow-hidden shadow-sm">
            <Image src="/flowboard.png" alt="FlowBoard Logo" fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-card-foreground">Reset Password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-6">
            <div className="bg-primary/10 text-primary p-4 rounded-lg">
              Check your email <strong>{email}</strong> for the reset link!
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSubmitted(false);
                setEmail("");
              }}
            >
              Try another email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            
            <Button 
              type="submit"
              disabled={loading || !email}
              className="w-full flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
