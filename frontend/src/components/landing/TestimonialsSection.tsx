import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Product Manager at TechNova",
      content: "FlowBoard completely transformed how our engineering team ships features. The interface is ridiculously fast, and we finally ditched our clunky old legacy tools.",
      avatar: "SJ"
    },
    {
      name: "David Chen",
      role: "Founder, StartupX",
      content: "I've tried every kanban tool on the market. FlowBoard is the only one that feels like it gets out of your way and just lets you work. The UX is simply unmatched.",
      avatar: "DC"
    },
    {
      name: "Elena Rodriguez",
      role: "Design Lead",
      content: "As a designer, I'm extremely picky about the tools I use. FlowBoard is gorgeous. It actually makes me want to log in and organize my tasks every morning.",
      avatar: "ER"
    }
  ];

  return (
    <section className="py-24 bg-muted/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground tracking-tight">Loved by teams worldwide</h2>
          <p className="text-muted-foreground">Don't just take our word for it.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background rounded-2xl p-8 border border-border/60 shadow-sm relative">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">"{t.content}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
