import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Users, Target, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About | FlowBoard",
  description: "Learn more about FlowBoard, our mission, and the team behind the tool.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col">
      <Navbar />

      <main className="flex-1 relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
              Our Mission is to Streamline Your Work
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We built FlowBoard because we believe that managing projects shouldn't be a project in itself. Our goal is to provide a clean, intuitive, and fast way for teams to collaborate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-overlay z-10" />
              <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground flex-col gap-4">
                <Image src="/logo.png" alt="FlowBoard" width={120} height={120} className="drop-shadow-xl" />
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-3">
                  <Target className="text-primary w-6 h-6" /> Simple yet Powerful
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Agile teams need tools that get out of the way. FlowBoard is designed to be instantly familiar but powerful enough to handle complex workflows with real-time updates and seamless collaboration.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-3">
                  <Users className="text-primary w-6 h-6" /> Built for Teams
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Collaboration is at the heart of everything we do. Whether you're a team of two or two hundred, FlowBoard scales with you, ensuring everyone stays on the same page.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-3">
                  <ShieldCheck className="text-primary w-6 h-6" /> Secure & Reliable
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is your most important asset. We use industry-standard security practices to ensure your boards, tasks, and team information are always protected and available.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
