import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, Download, ShieldCheck } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="micro-label mb-6">AI-Powered Intelligence</div>
            <h1 className="text-6xl font-bold tracking-tighter md:text-8xl lg:text-9xl mb-8 leading-[0.9]">
              Summarize <br />
              <span className="gradient-text italic">Everything.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl">
              Transform dense documents into clear, actionable insights in seconds. 
              The ultimate tool for modern researchers and students.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button 
                onClick={onStart}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white h-16 px-10 text-lg rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all active:scale-95"
              >
                Get Started <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button variant="ghost" size="lg" className="h-16 px-10 text-lg text-slate-400 hover:text-white transition-colors">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-30 blur-[120px] pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/40 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-emerald-600/30 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Zap className="text-indigo-400" />, title: "Instant Analysis", desc: "Get accurate summaries in seconds using state-of-the-art AI models." },
            { icon: <FileText className="text-emerald-400" />, title: "Format Agnostic", desc: "Seamless support for PDF, DOCX, and TXT. No conversion required." },
            { icon: <Download className="text-indigo-400" />, title: "Smart Export", desc: "Download your insights as PDF, Word, or Text documents instantly." },
            { icon: <ShieldCheck className="text-emerald-400" />, title: "Privacy First", desc: "Your data is processed securely and never stored on our servers." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div>
              <div className="micro-label mb-4">Workflow</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-display">How it Works</h2>
            </div>
            <p className="text-slate-400 max-w-md">
              We've streamlined the summarization process into three effortless steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Upload", desc: "Drag and drop your document into our secure interface." },
              { step: "02", title: "Analyze", desc: "Our AI extracts and summarizes the core concepts." },
              { step: "03", title: "Download", desc: "Review and export your summary in your preferred format." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-white/5 mb-6 font-display absolute -top-12 -left-4 select-none">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 font-display">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </section>
    </div>
  );
}
