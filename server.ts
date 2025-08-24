import { WebSocketServer, WebSocket } from "ws";

// Start WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws: WebSocket) => {
  console.log("✅ Admin connected via WebSocket");

  ws.on("message", (message: string) => {
    console.log("📩 Message from client:", message.toString());
  });

  ws.send(JSON.stringify({ type: "connected", msg: "Welcome Admin!" }));
});

// Function to broadcast new reports to all connected clients (admins)
export function broadcast(report: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "new-report", report }));
    }
  });
}

console.log("🚀 WebSocket server running on ws://localhost:8080");
