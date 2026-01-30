import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Initialize client with environment variable safely
if (process.env.API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[]) => {
  if (!aiClient) {
    throw new Error("API Key not found. Please check your environment configuration.");
  }

  // Convert internal history format to Gemini Chat format if needed, 
  // but for simple text generation with context, we can just use generateContent with system instruction
  // OR use the chat API. Let's use the Chat API for better context management.
  
  const chatHistory = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  const chat = aiClient.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
    history: chatHistory
  });

  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
