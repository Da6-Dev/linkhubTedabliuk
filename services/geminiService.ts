import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBio = async (keywords: string, tone: string): Promise<string> => {
  try {
    const prompt = `
      Crie uma biografia curta, engajadora e estética para um perfil de "Link in Bio".
      
      Detalhes:
      - Interesses/Tópicos: ${keywords}
      - Tom de voz: ${tone}
      - Limite: Máximo de 150 caracteres.
      - Inclua 1 ou 2 emojis relevantes.
      - Idioma: Português (Brasil).
      - Retorne APENAS o texto da bio, sem aspas ou explicações.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Erro ao gerar bio:", error);
    throw new Error("Falha ao conectar com a IA.");
  }
};