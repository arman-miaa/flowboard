'use client';
import { useRouter } from 'next/navigation';
import { registerUser, registerSchema, RegisterData } from '@/services/auth/registerUser';
import { setCookie } from '@/services/auth/tokenHandlers';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Register() {
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
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E2E8F0] w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A]">Join FlowBoard</h1>
          <p className="text-[#64748B] mt-2">Create an account to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Full Name</label>
            <input 
              type="text" 
              {...register('name')}
              className="w-full p-2 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
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
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#64748B]">
          Already have an account? <Link href="/login" className="text-[#4F46E5] hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
