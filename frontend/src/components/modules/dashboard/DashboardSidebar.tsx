"use client"
import { LayoutDashboard, Users, LogOut, User, Key, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export const DashboardSidebar = ({ user, handleLogout }: { user: any; handleLogout: () => void }) => {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
      isActive 
        ? 'text-foreground bg-accent' 
        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
    }`;
  };

  return (
    <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center relative bg-primary/10">
            <Image src="/logo.png" alt="FlowBoard Logo" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">FlowBoard</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <Link href="/dashboard" className={getLinkClasses('/dashboard')}>
          <LayoutDashboard className={`w-5 h-5 ${pathname === '/dashboard' ? 'text-primary' : ''}`} /> Dashboard
        </Link>
        <Link href="/dashboard/shared" className={getLinkClasses('/dashboard/shared')}>
          <Users className={`w-5 h-5 ${pathname === '/dashboard/shared' ? 'text-primary' : ''}`} /> Shared with me
        </Link>
        
        <div className="pt-4 mt-4 border-t border-border">
          <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
          <Link href="/dashboard/profile" className={getLinkClasses('/dashboard/profile')}>
            <User className={`w-5 h-5 ${pathname === '/dashboard/profile' ? 'text-primary' : ''}`} /> Profile
          </Link>
          <Link href="/dashboard/change-password" className={getLinkClasses('/dashboard/change-password')}>
            <Key className={`w-5 h-5 ${pathname === '/dashboard/change-password' ? 'text-primary' : ''}`} /> Change Password
          </Link>
        </div>
      </nav>
      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="cursor-pointer mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-md transition-all">
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>
    </aside>
  );
};
