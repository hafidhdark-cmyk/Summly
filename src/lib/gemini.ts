import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export type SummaryFormat = "short" | "standard" | "detailed" | "bullets";

export async function generateSummary(text: string, format: SummaryFormat): Promise<string> {
  const model = "gemini-3-flash-preview";
  
  let formatInstruction = "";
  switch (format) {
    case "short":
      formatInstruction = "Provide a very brief, high-level overview of the document in 2-3 sentences.";
      break;
    case "standard":
      formatInstruction = "Provide a balanced summary covering the main points and key arguments of the document.";
      break;
    case "detailed":
      formatInstruction = "Provide a comprehensive breakdown of the document, including all significant details, arguments, and conclusions.";
      break;
    case "bullets":
      formatInstruction = "Summarize the document using clear, concise bullet points highlighting the most important information.";
      break;
  }

  const prompt = `
    You are an expert academic summarizer. Your goal is to help students understand complex documents quickly and accurately.
    
    Document Text:
    ${text}
    
    Instruction:
    ${formatInstruction}
    
    The summary must be accurate, clear, and easy for students to understand. Maintain the key ideas of the original document.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Failed to generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to process document with AI. Please try again.");
  }
}
