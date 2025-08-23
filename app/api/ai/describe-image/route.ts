// /app/api/ai/describe-image/route.ts
import { NextRequest } from "next/server"
import { Buffer } from "buffer"
import { genAI } from "@/lib/gemini"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get("file") as File | null // 👈 changed to "file"
    const reportType = form.get("reportType") as string

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 })
    }

    const mimeType = file.type || "image/jpeg"
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString("base64")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are generating a description for a wildlife/stray protection report.
The report type is: ${reportType}.
Based on the uploaded image, describe the animal (species if possible, visible condition, injuries, age/size if inferable, surroundings, urgency).
Keep it 2–4 sentences, factual and safety-aware.`

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: { // 👈 fixed key
          mimeType: mimeType,
          data: base64,
        },
      },
    ])

    const description = result.response.text().trim()
    return Response.json({ description })
  } catch (err) {
    console.error("AI error:", err)
    return Response.json({ error: "Failed to process image" }, { status: 500 })
  }
}

