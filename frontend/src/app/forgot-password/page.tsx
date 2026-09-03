'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Reset link sent!");
    }, 1500);
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
        
        <div className="text-center mb-8 mt-2">
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
