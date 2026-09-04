import { Building2, Command, Aperture, Hexagon, Sparkles } from "lucide-react";

export function TrustedBySection() {
  return (
    <section className="py-12 border-b border-border/50 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
          Powering agile teams at innovative companies
        </p>
        
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-bold text-xl text-foreground">
            <Aperture className="w-6 h-6" /> Acme Corp
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-foreground">
            <Command className="w-6 h-6" /> Globex
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-foreground">
            <Hexagon className="w-6 h-6" /> Stark Ind.
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-foreground">
            <Building2 className="w-6 h-6" /> Massive Dynamic
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-foreground">
            <Sparkles className="w-6 h-6" /> Pied Piper
          </div>
        </div>
      </div>
    </section>
  );
}
