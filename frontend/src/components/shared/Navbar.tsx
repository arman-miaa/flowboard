'use client';
import Link from "next/link";
import Image from "next/image";
import { Layout, LogOut, User, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user');
    if (userData && userData !== 'undefined') {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center relative">
              <Image src="/flowboard.png" alt="FlowBoard Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">FlowBoard</span>
          </Link>
        </div>
        
        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className={`hover:text-foreground transition-colors ${pathname === '/' ? 'text-primary font-semibold' : ''}`}>Home</Link>
          <Link href="/about" className={`hover:text-foreground transition-colors ${pathname === '/about' ? 'text-primary font-semibold' : ''}`}>About</Link>
          <Link href="/contact" className={`hover:text-foreground transition-colors ${pathname === '/contact' ? 'text-primary font-semibold' : ''}`}>Contact</Link>
        </div>
        
        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-primary/50 transition-all">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard')}>
                  <Layout className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive bg-destructive/10 hover:bg-destructive/20 focus:bg-destructive/20 focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link 
                href="/login" 
                className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="cursor-pointer text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 shadow-xl">
          <Link href="/" className={`text-sm font-medium hover:text-primary transition-colors py-2 ${pathname === '/' ? 'text-primary' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className={`text-sm font-medium hover:text-primary transition-colors py-2 ${pathname === '/about' ? 'text-primary' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/contact" className={`text-sm font-medium hover:text-primary transition-colors py-2 ${pathname === '/contact' ? 'text-primary' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <div className="h-px bg-border my-2" />
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">Theme</span>
            <ThemeToggle />
          </div>
          {!user && (
            <div className="flex flex-col gap-3 mt-2">
              <Link 
                href="/login" 
                className="w-full text-center py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="w-full text-center py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
