'use client';
import { useRouter } from 'next/navigation';
import { loginUser, loginSchema, LoginData } from '@/services/auth/loginUser';
import { setCookie } from '@/services/auth/tokenHandlers';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await loginUser(data);
      // set access token in cookies for server-fetch compatibility
      await setCookie('accessToken', res.data.accessToken);
      // save user in localStorage (as before)
      localStorage.setItem('flowboard_user', JSON.stringify(res.data.user));
      localStorage.setItem('flowboard_token', res.data.accessToken);
      toast.success('Login successful! Welcome back.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E2E8F0] w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A]">Welcome to FlowBoard</h1>
          <p className="text-[#64748B] mt-2">Log in to manage your tasks</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Email</label>
            <input 
              type="email" 
              {...register('email')}
              className="w-full p-2 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Password</label>
            <input 
              type="password" 
              {...register('password')}
              className="w-full p-2 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full bg-[#4F46E5] text-white py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#64748B]">
          Don't have an account? <Link href="/register" className="text-[#4F46E5] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
