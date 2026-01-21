
import { GoogleGenAI } from "@google/genai";
import { Prize } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPetTip(prize: Prize): Promise<string> {
  try {
    const prompt = `
      我們是「威笙寵物用品」，正在 2026 台中寵物用品展舉辦抽獎。
      使用者抽中了：${prize.label}。
      
      請根據這個獎項，給予使用者一段大約 50-80 字的溫馨寵物照護建議或專業美容小撇步。
      語氣要專業、親切，且與獎項內容有稍微的關聯（如果是折扣券就提到選購高品質產品，如果是美容用品就提到皮毛健康）。
      
      請直接回覆文字，不要標籤或額外格式。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "祝您的寵物健康快樂！歡迎隨時參觀威笙寵物用品攤位。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "恭喜獲獎！威笙寵物用品致力於提供最專業的寵物美容與生活用品。";
  }
}
