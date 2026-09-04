import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          Ready to transform your workflow?
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Join thousands of teams who have already upgraded their project management experience. Get started in seconds.
        </p>
        <Link 
          href="/register" 
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(var(--primary),0.3)] transition-all duration-300 group"
        >
          Start your free workspace
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="mt-6 text-sm text-muted-foreground">
          Free forever. No credit card required.
        </p>
      </div>
    </section>
  );
}
