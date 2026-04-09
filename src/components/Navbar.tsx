import { FileText, Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <FileText size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight font-display">
            Summly<span className="text-primary">.</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Github size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}
