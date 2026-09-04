'use client';
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
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
    <main className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Refined Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 blur-[100px] mix-blend-screen" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Subtle Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 border border-border/50 text-sm font-medium text-foreground mb-10 backdrop-blur-md shadow-sm">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="w-3 h-3 text-primary" />
          </span>
          Introducing FlowBoard Pro
          <span className="h-4 w-px bg-border mx-1" />
          <Link href="/register" className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            Read the announcement <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight mb-8 leading-[1.05] max-w-5xl text-foreground">
          Project management that feels like <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">magic.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12 leading-relaxed">
          FlowBoard brings your team's work together in one beautifully designed workspace. Plan, track, and collaborate without the friction.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link 
            href={user ? "/dashboard" : "/register"}
            className="cursor-pointer group flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-[0_0_40px_8px_rgba(var(--primary),0.2)] transition-all duration-300"
          >
            {user ? "Go to Dashboard" : "Start Building Free"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          {!user && (
            <Link 
              href="/login" 
              className="cursor-pointer flex items-center justify-center w-full sm:w-auto bg-card hover:bg-accent border border-border text-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
        
        <p className="mt-6 text-sm text-muted-foreground">No credit card required. Free forever plan available.</p>
        
        {/* OLD Dashboard Preview that user prefers */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl border border-border bg-card/50 p-2 md:p-4 backdrop-blur-sm shadow-md relative group">
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
