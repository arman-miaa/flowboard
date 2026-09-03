import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Users, Target, ShieldCheck, Zap, Globe, Heart } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About | FlowBoard",
  description: "Learn more about FlowBoard, our mission, and the team behind the tool.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 relative pt-32 pb-20">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-70 pointer-events-none" />
        <div className="absolute top-40 -right-40 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] opacity-50 pointer-events-none" />
        <div className="absolute top-60 -left-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-32 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Redefining Collaboration
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground">
              We build tools for teams that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">move fast.</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Managing projects shouldn't be a project in itself. Our mission is to provide a clean, intuitive, and lightning-fast way for agile teams to collaborate, ship, and grow together.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {[
              { label: "Active Users", value: "50k+" },
              { label: "Tasks Completed", value: "10M+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Global Teams", value: "1,200+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-8 rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors">
                <h4 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-2">
                  {stat.value}
                </h4>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Story / Bento Grid Section */}
          <div className="grid md:grid-cols-12 gap-6 mb-32">
            <div className="md:col-span-8 bg-card border border-border rounded-3xl p-10 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Our Story</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  FlowBoard started in 2024 with a simple observation: modern teams were drowning in complex project management tools that felt more like databases than workspaces. 
                  We set out to build a platform that strips away the noise, focusing entirely on speed, visual clarity, and real-time collaboration.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we power thousands of teams around the world—from fast-growing startups to enterprise product squads—helping them turn chaos into beautifully organized boards.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 bg-muted/50 border border-border rounded-3xl overflow-hidden relative group min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center relative bg-background shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Image src="/logo.png" alt="FlowBoard" fill className="object-cover" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Designed in California</h4>
                <p className="text-muted-foreground mt-2">Built for the world.</p>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we design, build, and ship.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-yellow-500" />,
                  title: "Relentlessly Fast",
                  desc: "We believe software should feel instant. Every interaction in FlowBoard is optimized to save you precious seconds."
                },
                {
                  icon: <Target className="w-6 h-6 text-primary" />,
                  title: "Uncompromising Simplicity",
                  desc: "Complexity is easy; simplicity is hard. We carefully consider every feature to ensure the interface remains uncluttered."
                },
                {
                  icon: <Users className="w-6 h-6 text-green-500" />,
                  title: "Team First",
                  desc: "Work happens together. We build features that foster transparency, alignment, and joy among team members."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
                  title: "Secure by Design",
                  desc: "Trust is our foundation. Your data is protected by enterprise-grade security, ensuring your ideas stay yours."
                },
                {
                  icon: <Globe className="w-6 h-6 text-indigo-500" />,
                  title: "Work from Anywhere",
                  desc: "Whether you're in an office or a coffee shop across the globe, FlowBoard keeps you connected to your team."
                },
                {
                  icon: <Heart className="w-6 h-6 text-red-500" />,
                  title: "Built with Passion",
                  desc: "We are deeply passionate about the future of work and pour that energy into every pixel of FlowBoard."
                }
              ].map((value, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-card border border-border hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center mb-6 group-hover:bg-background group-hover:scale-110 transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
