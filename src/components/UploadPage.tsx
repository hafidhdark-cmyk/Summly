import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryFormat } from "@/src/lib/gemini";

interface UploadPageProps {
  onProcess: (file: File, format: SummaryFormat) => void;
  isProcessing: boolean;
}

export default function UploadPage({ onProcess, isProcessing }: UploadPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<SummaryFormat>("standard");
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) {
        setError("File size exceeds 20MB limit.");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false
  } as any);

  const handleRemove = () => {
    setFile(null);
    setError(null);
  };

  const handleGenerate = () => {
    if (file) {
      onProcess(file, format);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card p-8 md:p-12 overflow-hidden relative">
          <div className="mb-12">
            <div className="micro-label mb-2">Step 01</div>
            <h2 className="text-3xl font-bold tracking-tight font-display">Upload Document</h2>
            <p className="text-slate-400 text-sm mt-1">PDF, DOCX, or TXT (Max 20MB)</p>
          </div>

          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300
                  ${isDragActive ? "border-primary bg-primary/10 scale-[1.02]" : "border-white/10 hover:border-primary/50 hover:bg-white/5"}
                `}
              >
                <input {...getInputProps()} />
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className={isDragActive ? "text-primary" : "text-slate-500"} size={28} />
                </div>
                <p className="text-lg font-medium mb-1">
                  {isDragActive ? "Release to upload" : "Drop your file here"}
                </p>
                <p className="text-slate-500 text-sm">or click to browse files</p>
              </motion.div>
            ) : (
              <motion.div
                key="file-preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/5 rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <File size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg truncate max-w-[200px] md:max-w-md">{file.name}</h3>
                      <p className="text-slate-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleRemove} className="rounded-full hover:bg-red-500/10 hover:text-red-400">
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="micro-label mb-4">Summary Format</div>
                    <Tabs value={format} onValueChange={(v) => setFormat(v as SummaryFormat)} className="w-full">
                      <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-black/40 rounded-xl border border-white/5">
                        <TabsTrigger value="short" className="rounded-lg py-2 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">Short</TabsTrigger>
                        <TabsTrigger value="standard" className="rounded-lg py-2 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">Standard</TabsTrigger>
                        <TabsTrigger value="detailed" className="rounded-lg py-2 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">Detailed</TabsTrigger>
                        <TabsTrigger value="bullets" className="rounded-lg py-2 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">Bullets</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <Button 
                    onClick={handleGenerate}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={20} />
                        Analyzing...
                      </>
                    ) : (
                      "Generate Summary"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
            >
              <AlertCircle size={18} />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {isProcessing && (
            <div className="mt-10 space-y-3">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">AI is processing your document...</span>
                <span className="text-primary animate-pulse">Please wait</span>
              </div>
              <Progress value={undefined} className="h-1 rounded-full bg-white/5" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
