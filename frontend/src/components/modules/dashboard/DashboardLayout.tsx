"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { logoutUser } from '@/services/auth/logoutUser';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user');
    if (!userData || userData === 'undefined') {
      logoutUser();
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  if (!user) return null; // or a loader

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar user={user} handleLogout={handleLogout} />
      <div className="flex-1 flex flex-col h-screen">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
