import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Download, Edit3, Check, FileText, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ResultsPageProps {
  originalText: string;
  summary: string;
  filename: string;
  onBack: () => void;
  onDownload: (text: string, format: 'pdf' | 'docx' | 'txt') => void;
}

export default function ResultsPage({ originalText, summary, filename, onBack, onDownload }: ResultsPageProps) {
  const [editableSummary, setEditableSummary] = useState(summary);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = editableSummary.trim().split(/\s+/).length;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex items-center justify-between mb-12">
        <Button variant="ghost" onClick={onBack} className="rounded-xl gap-2 text-slate-400 hover:text-white hover:bg-white/5">
          <ArrowLeft size={18} /> Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <div className="micro-label">Source File</div>
            <span className="text-sm font-medium truncate max-w-[200px] text-slate-300">{filename}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <FileText size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)] min-h-[600px]">
        {/* Left Side: Original Preview */}
        <div className="glass-card flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <h3 className="font-bold text-lg font-display">Original</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded text-slate-400">Preview</span>
          </div>
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            <div className="prose prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-slate-400 leading-relaxed text-sm">
                {originalText || "No preview available."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Generated Summary */}
        <div className="glass-card flex flex-col overflow-hidden border-primary/20 shadow-[0_0_40px_rgba(99,102,241,0.1)]">
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-lg font-display">Summary</h3>
              <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-1 rounded uppercase tracking-widest">
                {wordCount} Words
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
                className={`rounded-lg gap-2 h-9 px-3 ${isEditing ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {isEditing ? <><Save size={16} /> Save</> : <><Edit3 size={16} /> Edit</>}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="rounded-lg h-9 w-9 text-slate-400 hover:text-white hover:bg-white/5">
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
            {isEditing ? (
              <Textarea
                value={editableSummary}
                onChange={(e) => setEditableSummary(e.target.value)}
                className="min-h-full w-full resize-none border-none focus-visible:ring-0 p-0 text-lg leading-relaxed text-slate-200 bg-transparent"
                placeholder="Edit your summary here..."
              />
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-xl leading-relaxed text-slate-100 font-medium font-outfit">
                  {editableSummary}
                </p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/5 bg-white/5">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <span className="micro-label">Export As</span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button onClick={() => onDownload(editableSummary, 'pdf')} variant="outline" className="flex-1 sm:flex-none rounded-xl border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20">
                  PDF
                </Button>
                <Button onClick={() => onDownload(editableSummary, 'docx')} variant="outline" className="flex-1 sm:flex-none rounded-xl border-white/10 hover:bg-indigo-500/10 hover:text-indigo-400 hover:border-indigo-500/20">
                  DOCX
                </Button>
                <Button onClick={() => onDownload(editableSummary, 'txt')} variant="outline" className="flex-1 sm:flex-none rounded-xl border-white/10 hover:bg-white/10">
                  TXT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
