import Link from "next/link";
import { ArrowRight, Layout, Zap, Users, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <nav className="fixed w-full z-50 top-0 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Layout className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">FlowBoard</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
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
        </div>
      </nav>

      {/* Hero Section */}
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
              href="/register" 
              className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/login" 
              className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto bg-secondary border border-border text-secondary-foreground px-8 py-4 rounded-full font-medium hover:bg-secondary/80 transition-all duration-300"
            >
              View live demo
            </Link>
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

      {/* Features Section */}
      <section className="py-24 border-t border-border relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Everything you need to ship faster</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              FlowBoard comes packed with all the tools your team needs to stay organized, focused, and productive.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Layout className="w-6 h-6 text-primary" />,
                title: "Flexible Workspaces",
                desc: "Create multiple boards for different projects or teams, and customize columns to match your exact workflow."
              },
              {
                icon: <Users className="w-6 h-6 text-primary" />,
                title: "Real-time Collaboration",
                desc: "Work together with your team seamlessly. See updates instantly as tasks are moved and edited."
              },
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                title: "Role-based Access",
                desc: "Control who can view or edit boards with granular permission settings and user roles."
              }
            ].map((feature, i) => (
              <div key={i} className="cursor-pointer p-6 rounded-2xl bg-card border border-border hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-background shadow-sm border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-foreground">
            <Layout className="w-4 h-4" />
            <span className="font-semibold">FlowBoard</span>
          </div>
          <p>© {new Date().getFullYear()} FlowBoard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
