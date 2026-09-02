'use client';
import { useRouter } from 'next/navigation';
import { registerUser, registerSchema, RegisterData } from '@/services/auth/registerUser';
import { setCookie } from '@/services/auth/tokenHandlers';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const RegisterForm = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await registerUser(data);
      await setCookie('accessToken', res.data.accessToken);
      localStorage.setItem('flowboard_user', JSON.stringify(res.data.user));
      localStorage.setItem('flowboard_token', res.data.accessToken);
      toast.success('Registration successful! Welcome to FlowBoard.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Join FlowBoard</h1>
          <p className="text-slate-500 mt-2">Create an account to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              type="text" 
              {...register('name')}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              {...register('email')}
              placeholder="m@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password" 
              {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4F46E5] hover:bg-indigo-700 text-white"
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-[#4F46E5] hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};
