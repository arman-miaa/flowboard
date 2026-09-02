import Link from "next/link";
import { ArrowRight, Layout, Zap, Users, Shield, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-sans selection:bg-indigo-500/30">
      <nav className="fixed w-full z-50 top-0 border-b border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-neutral-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Layout className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">FlowBoard</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/login" 
              className="cursor-pointer text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="cursor-pointer text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 mb-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>FlowBoard v1.0 is now live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
            The intuitive way to manage your work and team.
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-12">
            Organize tasks, collaborate in real-time, and streamline your workflow with our powerful yet beautifully simple kanban boards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link 
              href="/register" 
              className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/login" 
              className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-200 dark:hover:bg-white/10 transition-all duration-300"
            >
              View live demo
            </Link>
          </div>
          
          {/* Dashboard Preview */}
          <div className="mt-20 w-full max-w-5xl rounded-2xl border border-white/10 bg-neutral-900/50 p-2 md:p-4 backdrop-blur-sm shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="aspect-[16/9] w-full bg-neutral-950 rounded-xl overflow-hidden border border-white/5 relative flex flex-col">
              {/* Mock App Header */}
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1" />
                <div className="w-64 h-6 bg-white/5 rounded-full" />
                <div className="flex-1" />
              </div>
              {/* Mock App Body */}
              <div className="flex-1 p-6 flex gap-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950">
                {/* Mock Columns */}
                {[
                  { title: "To Do", tasks: 3, color: "bg-blue-500" },
                  { title: "In Progress", tasks: 2, color: "bg-yellow-500" },
                  { title: "Done", tasks: 4, color: "bg-green-500" }
                ].map((col, i) => (
                  <div key={i} className="flex-1 min-w-[280px] flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${col.color}`} />
                      <span className="font-medium text-sm text-neutral-300">{col.title}</span>
                      <span className="text-xs text-neutral-500 ml-auto">{col.tasks}</span>
                    </div>
                    {Array.from({ length: col.tasks }).map((_, j) => (
                      <div key={j} className="bg-white/5 border border-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors">
                        <div className="w-3/4 h-3 bg-white/10 rounded mb-3" />
                        <div className="w-1/2 h-3 bg-white/5 rounded mb-4" />
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 border border-neutral-900" />
                          </div>
                          <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
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
      <section className="py-24 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to ship faster</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              FlowBoard comes packed with all the tools your team needs to stay organized, focused, and productive.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Layout className="w-6 h-6 text-indigo-400" />,
                title: "Flexible Workspaces",
                desc: "Create multiple boards for different projects or teams, and customize columns to match your exact workflow."
              },
              {
                icon: <Users className="w-6 h-6 text-purple-400" />,
                title: "Real-time Collaboration",
                desc: "Work together with your team seamlessly. See updates instantly as tasks are moved and edited."
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-400" />,
                title: "Role-based Access",
                desc: "Control who can view or edit boards with granular permission settings and user roles."
              }
            ].map((feature, i) => (
              <div key={i} className="cursor-pointer p-6 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-neutral-100 dark:border-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-sm text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            <span className="font-semibold text-neutral-300">FlowBoard</span>
          </div>
          <p>© {new Date().getFullYear()} FlowBoard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
