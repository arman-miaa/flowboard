'use client';
import { Layout, Users, Shield } from "lucide-react";

export function FeaturesSection() {
  return (
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
  );
}
