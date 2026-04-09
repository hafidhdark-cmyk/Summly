export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black/40 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight font-display">
              Summly<span className="text-primary">.</span>
            </span>
          </div>
          
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Summly. Intelligence for the modern age.
          </p>
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
