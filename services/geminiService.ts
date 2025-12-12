import { GoogleGenAI } from "@google/genai";
import { GuestbookRequest } from "../types";

// Initialize the Gemini API client
// Note: process.env.API_KEY is assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a wedding guestbook message using the advanced thinking capabilities
 * of the Gemini 3 Pro model.
 */
export const generateGuestMessage = async (request: GuestbookRequest): Promise<string> => {
  try {
    const prompt = `
      You are a world-class poet and wedding speech writer. 
      Your task is to write a deeply personal and touching wedding guestbook message based on the user's input.
      
      User Input:
      - Relationship to couple: ${request.relationship}
      - Key Memory/Thought: ${request.memory}
      - Desired Tone: ${request.tone}

      Think deeply about the nuances of the relationship and the emotion behind the memory. 
      Draft a message that is eloquent, flows beautifully, and perfectly captures the requested tone.
      The message should be in Vietnamese (as the context is a Vietnamese wedding), but if the input is English, output English.
      Do not include explanations, just the message text.
    `;

    // Using gemini-3-pro-preview with high thinking budget for creative writing
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 32768, // Max budget for deep creative consideration
        },
      },
    });

    return response.text || "Xin lỗi, tôi chưa thể nghĩ ra lời chúc lúc này. Hãy thử lại nhé.";
  } catch (error) {
    console.error("Error generating guest message:", error);
    throw error;
  }
};
