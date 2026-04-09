import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import UploadPage from "./components/UploadPage";
import ResultsPage from "./components/ResultsPage";
import { extractTextFromFile, downloadSummary } from "./lib/document";
import { generateSummary, SummaryFormat } from "./lib/gemini";

type Page = "landing" | "upload" | "results";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [summary, setSummary] = useState("");
  const [filename, setFilename] = useState("");

  const handleProcess = async (file: File, format: SummaryFormat) => {
    setIsProcessing(true);
    setFilename(file.name);
    
    try {
      // 1. Extract text
      const text = await extractTextFromFile(file);
      setOriginalText(text);
      
      // 2. Generate summary
      const generatedSummary = await generateSummary(text, format);
      setSummary(generatedSummary);
      
      // 3. Move to results
      setCurrentPage("results");
    } catch (error) {
      console.error("Processing error:", error);
      alert(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (text: string, format: 'pdf' | 'docx' | 'txt') => {
    downloadSummary(text, format, filename);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {currentPage === "landing" && (
          <LandingPage onStart={() => setCurrentPage("upload")} />
        )}
        
        {currentPage === "upload" && (
          <UploadPage 
            onProcess={handleProcess} 
            isProcessing={isProcessing} 
          />
        )}
        
        {currentPage === "results" && (
          <ResultsPage 
            originalText={originalText}
            summary={summary}
            filename={filename}
            onBack={() => setCurrentPage("upload")}
            onDownload={handleDownload}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

