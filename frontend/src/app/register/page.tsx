'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('flowboard_token', res.data.data.accessToken);
      localStorage.setItem('flowboard_user', JSON.stringify(res.data.data.user));
      toast.success('Registration successful! Welcome to FlowBoard.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E2E8F0] w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A]">Join FlowBoard</h1>
          <p className="text-[#64748B] mt-2">Create an account to get started</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full p-2 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full p-2 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full p-2 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="cursor-pointer w-full bg-[#4F46E5] text-white py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#64748B]">
          Already have an account? <Link href="/login" className="text-[#4F46E5] hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
