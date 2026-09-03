import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">F</span>
        </div>
        <span className="text-xl font-bold text-foreground">FlowBoard</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Log in
        </Link>
        <Link href="/register">
          <Button>Sign up</Button>
        </Link>
      </div>
    </nav>
  );
};
