import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center relative bg-primary/10">
                <Image src="/flowboard.png" alt="FlowBoard Logo" fill className="object-cover" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">FlowBoard</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              The intuitive way to manage your work, collaborate with your team, and ship faster. Built for modern agile teams.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Integrations</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Changelog</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FlowBoard Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
