import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey || typeof apiKey !== "string") {
  throw new Error(
    "Missing or invalid NEXT_PUBLIC_GEMINI_API_KEY environment variable"
  );
}

const ai = new GoogleGenerativeAI(apiKey);

export const generativeText = async (prompt: string): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",            // <== required property
          parts: [{ text: prompt }],
        },
      ],
    });

    console.log("Full API Response:", result);

    const candidates = result?.response?.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No response from the model");
    }

    return candidates[0]?.content?.parts[0]?.text || "No response available";
  } catch (error) {
    console.error("Error generating text:", error);
    return "Error occurred while generating text";
  }
};
