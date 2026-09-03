'use client';
import { useRouter } from 'next/navigation';
import { loginUser, loginSchema, LoginData } from '@/services/auth/loginUser';
import { setCookie } from '@/services/auth/tokenHandlers';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

export const LoginForm = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('flowboard_token');
    if (token && token !== 'undefined') {
      router.replace('/dashboard');
    }
  }, [router]);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await loginUser(data);
      await setCookie('accessToken', res.data.accessToken);
      localStorage.setItem('flowboard_user', JSON.stringify(res.data.user));
      localStorage.setItem('flowboard_token', res.data.accessToken);
      toast.success('Login successful! Welcome back.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-sm border border-border w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-card-foreground">Welcome to FlowBoard</h1>
          <p className="text-muted-foreground mt-2">Log in to manage your tasks</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              {...register('email')}
              placeholder="m@example.com"
            />
            {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password" 
              {...register('password')}
            />
            {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
          </div>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account? <Link href="/register" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
