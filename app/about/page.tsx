"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle } from "lucide-react"

export default function AboutPage() {
  const userGuidelines = [
    "📸 Upload Clear Photos – Make sure the animal or situation is visible.",
    "🕒 Be Timely – Report sightings or issues as soon as possible.",
    "📍 Share Location – Enable location or add details to help responders.",
    "🔒 Stay Safe – Don’t get too close to wild animals for pictures.",
    "🤝 Be Honest – Report only genuine cases (avoid fake or duplicate uploads).",
    "📝 Give Context – Add a short note (injury, conflict, stray rescue, etc.).",
    "❤️ Respect Wildlife – No harassment, baiting, or disturbance.",
  ]

  const ngoGuidelines = [
    "👀 Verify Reports Quickly – Check images and descriptions for authenticity.",
    "📊 Use the Dashboard – Track cases, update statuses, and avoid duplication.",
    "🚑 Prioritize Emergencies – Injuries, conflicts, and rescues come first.",
    "📢 Communicate Clearly – Update users on their report’s progress.",
    "🌱 Educate Users – Share tips about coexistence and safety.",
    "🔐 Maintain Privacy – Protect reporter identities when needed.",
    "🌍 Collaborate – Share data with other NGOs or authorities for larger impact.",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      {/* Hero Section */}
      <section className="container py-16 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-glow">
          About <span className="text-accent">WildChain</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          WildChain empowers communities and NGOs with blockchain-powered wildlife protection, 
          ensuring transparency, safety, and collaboration.
        </p>
      </section>

      {/* Guidelines Section */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Reporter Guidelines */}
          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📣 Reporter Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground italic">
                ✨ “Your small step can make a big difference”
              </p>
              <ul className="space-y-3">
                {userGuidelines.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* NGO Guidelines */}
          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🛡 NGO Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground italic">
                ✨ “Together, we protect and serve the voiceless”
              </p>
              <ul className="space-y-3">
                {ngoGuidelines.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
