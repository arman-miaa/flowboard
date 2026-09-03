import { LayoutDashboard, Users, LogOut, User, Key, Settings } from 'lucide-react';

export const DashboardSidebar = ({ user, handleLogout }: { user: any; handleLogout: () => void }) => {
  return (
    <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" /> FlowBoard
        </h2>
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <a href="#" className="cursor-pointer flex items-center gap-3 px-3 py-2 text-foreground bg-accent rounded-md font-medium">
          <LayoutDashboard className="w-5 h-5 text-muted-foreground" /> Dashboard
        </a>
        <a href="#" className="cursor-pointer flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md font-medium transition-colors">
          <Users className="w-5 h-5" /> Shared with me
        </a>
        
        <div className="pt-4 mt-4 border-t border-border">
          <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
          <a href="#" className="cursor-pointer flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md font-medium transition-colors">
            <User className="w-5 h-5" /> Profile
          </a>
          <a href="#" className="cursor-pointer flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md font-medium transition-colors">
            <Key className="w-5 h-5" /> Change Password
          </a>
          <a href="#" className="cursor-pointer flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
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
        <button onClick={handleLogout} className="cursor-pointer mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors">
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>
    </aside>
  );
};
