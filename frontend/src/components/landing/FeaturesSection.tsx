'use client';
import { Layout, Users, Shield, Zap, Workflow, Fingerprint } from "lucide-react";
import Image from "next/image";

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Build your best work, <span className="text-primary">faster.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            FlowBoard isn't just another kanban tool. It's a comprehensive workspace designed to reduce friction and amplify your team's velocity.
          </p>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Large Feature 1 */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-card border border-border/60 p-8 flex flex-col group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 relative z-10">
              <Layout className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-foreground relative z-10">Infinite Flexibility</h3>
            <p className="text-lg text-muted-foreground max-w-sm relative z-10">
              Create multiple boards, customize columns to match your exact workflow, and drag-and-drop tasks with zero latency. Your workspace adapts to you, not the other way around.
            </p>
            
            {/* Image visual for this box */}
            <div className="absolute -bottom-12 -right-20 md:-right-12 w-[400px] h-[300px] md:w-[450px] md:h-[320px] rounded-xl shadow-2xl rotate-[8deg] transform group-hover:rotate-[4deg] group-hover:-translate-y-4 transition-all duration-700 overflow-hidden border border-border bg-background z-0 opacity-80 md:opacity-100">
               <Image src="/kanban-mockup.png" alt="Kanban UI Mockup" fill className="object-cover object-left-top" />
            </div>
          </div>
          
          {/* Small Feature 1 */}
          <div className="rounded-3xl bg-card border border-border/60 p-8 flex flex-col group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Real-time Sync</h3>
            <p className="text-muted-foreground leading-relaxed">
              Work together seamlessly. See updates instantly as tasks are moved and edited by your teammates.
            </p>
          </div>
          
          {/* Small Feature 2 */}
          <div className="rounded-3xl bg-card border border-border/60 p-8 flex flex-col group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Optimized for speed. No loading spinners, no waiting. Everything happens exactly when you click.
            </p>
          </div>
          
          {/* Small Feature 3 */}
          <div className="rounded-3xl bg-card border border-border/60 p-8 flex flex-col group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Custom Workflows</h3>
            <p className="text-muted-foreground leading-relaxed">
              Don't force your team into rigid templates. Map out the exact stages your projects actually go through.
            </p>
          </div>

          {/* Large Feature 2 */}
          <div className="md:col-span-2 rounded-3xl bg-card border border-border/60 p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                  <Fingerprint className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Enterprise-grade Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Control exactly who sees what with granular role-based access. Keep your confidential projects safe while sharing public boards effortlessly.
                </p>
              </div>
              
              <div className="w-full md:w-1/3 flex flex-col gap-3 bg-background p-4 rounded-xl border border-border shadow-sm">
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/20" /><span className="text-sm font-medium">Alice</span></div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Owner</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-500/20" /><span className="text-sm font-medium">Bob</span></div>
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded">Editor</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
