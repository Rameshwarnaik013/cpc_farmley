
import { GoogleGenAI } from "@google/genai";
import { DeliveryRecord } from './types';

export async function getLogisticsSummary(data: DeliveryRecord[]): Promise<string> {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return "AI Insights are currently unavailable. Please configure the API_KEY in your environment variables.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const simplifiedData = data.map(d => ({
    transporter: d.transporter,
    state: d.state,
    qty: d.qty,
    status: d.status,
    item: d.item.substring(0, 30) + '...'
  })).slice(0, 30);

  const prompt = `
    Analyze the following logistics issue data and provide a professional, concise executive summary.
    Identify the biggest bottleneck (transporter or state) and suggest 2 actionable improvements.
    
    Data snippet:
    ${JSON.stringify(simplifiedData)}
    
    Total issues: ${data.length}
    Total qty affected: ${data.reduce((acc, curr) => acc + curr.qty, 0)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior supply chain analyst. Provide high-level insights based on the provided data.",
      },
    });
    return response.text || "Unable to generate summary at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to Gemini. Please ensure your API key is valid.";
  }
}
