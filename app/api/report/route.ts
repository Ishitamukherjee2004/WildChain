import { NextRequest, NextResponse } from "next/server";
// import the broadcast function from server.ts
import { broadcast } from "../../../server";

// Temporary in-memory storage (replace with DB later)
let reports: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newReport = {
      id: Date.now(),
      user: body.user || "anonymous",
      description: body.description || "",
      location: body.location || null,
      timestamp: new Date().toISOString(),
    };

    // Save in-memory
    reports.push(newReport);

    // Notify all admins via WebSocket
    broadcast(newReport);

    return NextResponse.json(
      { success: true, report: newReport },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in /api/report:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all reports (for debugging or admin history page)
  return NextResponse.json(reports);
}
