import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Send image to Gemini for classification
    const result = await model.generateContent([
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg",
        },
      },
      { text: "Is this image of an animal? Answer only 'yes' or 'no'." },
    ]);

    const responseText = result.response.text().toLowerCase();

    return NextResponse.json({ isAnimal: responseText.includes("yes") });
  } catch (error) {
    console.error("AI validation error:", error);
    return NextResponse.json({ isAnimal: false, error: "AI validation failed" });
  }
}
