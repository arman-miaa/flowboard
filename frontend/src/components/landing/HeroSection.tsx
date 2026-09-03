'use client';
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user');
    if (userData && userData !== 'undefined') {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <main className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-sm text-muted-foreground mb-8 backdrop-blur-sm hover:bg-muted/80 transition-colors">
          <Zap className="w-4 h-4 text-primary" />
          <span>FlowBoard v1.0 is now live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
          The intuitive way to manage your work and team.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
          Organize tasks, collaborate in real-time, and streamline your workflow with our powerful yet beautifully simple kanban boards.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link 
            href={user ? "/dashboard" : "/register"}
            className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
          >
            {user ? "Go to Dashboard" : "Start for free"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {!user && (
            <Link 
              href="/login" 
              className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto bg-secondary border border-border text-secondary-foreground px-8 py-4 rounded-full font-medium hover:bg-secondary/80 transition-all duration-300"
            >
              View live demo
            </Link>
          )}
        </div>
        
        {/* Dashboard Preview */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl border border-border bg-card/50 p-2 md:p-4 backdrop-blur-sm shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          <div className="aspect-[16/9] w-full bg-background rounded-xl overflow-hidden border border-border relative flex flex-col">
            {/* Mock App Header */}
            <div className="h-12 border-b border-border flex items-center px-4 gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1" />
              <div className="w-64 h-6 bg-muted rounded-full" />
              <div className="flex-1" />
            </div>
            {/* Mock App Body */}
            <div className="flex-1 p-6 flex gap-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-card to-background">
              {/* Mock Columns */}
              {[
                { title: "To Do", tasks: 3, color: "bg-blue-500" },
                { title: "In Progress", tasks: 2, color: "bg-yellow-500" },
                { title: "Done", tasks: 4, color: "bg-green-500" }
              ].map((col, i) => (
                <div key={i} className="flex-1 min-w-[280px] flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.color}`} />
                    <span className="font-medium text-sm text-muted-foreground">{col.title}</span>
                    <span className="text-xs text-muted-foreground/60 ml-auto">{col.tasks}</span>
                  </div>
                  {Array.from({ length: col.tasks }).map((_, j) => (
                    <div key={j} className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
                      <div className="w-3/4 h-3 bg-muted rounded mb-3" />
                      <div className="w-1/2 h-3 bg-muted/50 rounded mb-4" />
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20 border border-border" />
                        </div>
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${col.color} opacity-50 w-${j % 2 === 0 ? 'full' : '1/2'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
