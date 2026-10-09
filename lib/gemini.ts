import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function generateContentWithFallback(params: {
  contents: any;
  config?: any;
  preferredModel?: string;
}) {
  // Ordered fallback models
  const candidateModels = [
    params.preferredModel || "gemini-3.8-flash",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite",
  ];

  let lastError: any = null;

  for (const model of candidateModels) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });
        if (response?.text) {
          return response;
        }
      } catch (err: any) {
        lastError = err;
        const errStr = typeof err === "string" ? err : err?.message || JSON.stringify(err);
        const isTransient =
          errStr.includes("503") ||
          errStr.includes("UNAVAILABLE") ||
          errStr.includes("high demand") ||
          errStr.includes("429") ||
          errStr.includes("RESOURCE_EXHAUSTED");

        if (isTransient && attempt === 0) {
          // Wait 1.5s before retry
          await new Promise((res) => setTimeout(res, 1500));
          continue;
        }
        // Move to the next candidate model
        break;
      }
    }
  }

  throw lastError;
}
