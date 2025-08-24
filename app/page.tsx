"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Shield, Heart, TrendingUp, Users, Globe, Eye} from "lucide-react"

export default function HomePage() {
  const [stats, setStats] = useState({
    reports: 312,
    rescues: 45,
    adoptions: 18,
    volunteers: 1247,
  })

  // Animate stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        reports: prev.reports + Math.floor(Math.random() * 3),
        rescues: prev.rescues + (Math.random() > 0.8 ? 1 : 0),
        adoptions: prev.adoptions + (Math.random() > 0.9 ? 1 : 0),
        volunteers: prev.volunteers + Math.floor(Math.random() * 2),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen mx-[6%] bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 sm:py-20 md:py-[5%]">
        <div className="text-center space-y-8 lg:space-y-10">
          {/* <Badge variant="outline" className="border-glow text-primary hover:scale-105 transition-all duration-200">
            Powered by Blockchain Technology
          </Badge> */}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-bold tracking-tight text-glow leading-tight">
            Protect Wildlife.
            <br />
            <span className="text-accent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Empower Communities.
            </span>
            <br />
            Powered by You.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Join the world's first wildlife protection platform. Report wildlife crimes and track rescues with real-time mapping.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="glow text-lg px-8 py-3 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              <Link href="/report">Report Now</Link>
            </Button>
            {/* <Button
              asChild
              variant="outline"
              size="lg"
              className="border-glow text-lg px-8 py-3 bg-transparent hover:bg-primary/10 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              <Link href="/adopt">Adopt & Protect</Link>
            </Button> */}
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-lg px-8 py-3 hover:bg-primary/10 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              <Link href="/map">View Live Map</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 place-items-center">
          <Card className="border-glow bg-card/50 backdrop-blur hover:bg-card/70 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-glow">{stats.reports}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Reports Submitted</div>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur hover:bg-card/70 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent text-glow">{stats.rescues}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Animals Rescued</div>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur hover:bg-card/70 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 text-glow">
                {stats.volunteers}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Active Volunteers</div>
            </CardContent>
          </Card>

          {/* <Card className="border-glow bg-card/50 backdrop-blur hover:bg-card/70 hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 text-glow">
                {stats.volunteers}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Active Volunteers</div>
            </CardContent>
          </Card> */}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="text-center space-y-8 lg:space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-glow">How WildChain Works</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Three simple steps to make a real impact on wildlife protection
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-glow bg-card/50 backdrop-blur group hover:glow-green hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 lg:p-8 text-center space-y-4 lg:space-y-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center glow group-hover:scale-110 transition-all duration-300">
                  <MapPin className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold">1. Report</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Spot wildlife in danger? Report it instantly with GPS location, photos, and AI-generated descriptions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-glow bg-card/50 backdrop-blur group hover:glow-orange hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 lg:p-8 text-center space-y-4 lg:space-y-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center glow-green group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-8 w-8 lg:h-10 lg:w-10 text-accent" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold">2. Alert</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your report instantly alerts nearby volunteers, NGOs, and authorities through our network.
                </p>
              </CardContent>
            </Card>

            <Card className="border-glow bg-card/50 backdrop-blur group hover:glow hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 lg:p-8 text-center space-y-4 lg:space-y-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-orange-400/20 rounded-full flex items-center justify-center glow-orange group-hover:scale-110 transition-all duration-300">
                  <Eye className="h-8 w-8 lg:h-10 lg:w-10 text-orange-400" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold">3. Monitor</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track rescue progress in real-time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      {/* <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="text-center space-y-8 lg:space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-glow">Why Choose WildChain?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Revolutionary features powered by blockchain technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-glow bg-card/50 backdrop-blur hover:bg-card/70 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <TrendingUp className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />
                <h3 className="text-lg lg:text-xl font-semibold">Real-time Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monitor rescue operations and animal welfare in real-time with blockchain transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-glow bg-card/50 backdrop-blur hover:bg-card/70 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <Users className="h-8 w-8 lg:h-10 lg:w-10 text-accent" />
                <h3 className="text-lg lg:text-xl font-semibold">Community Driven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with volunteers, NGOs, and wildlife enthusiasts in your area.
                </p>
              </CardContent>
            </Card>

            <Card className="border-glow bg-card/50 backdrop-blur hover:bg-card/70 hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <Globe className="h-8 w-8 lg:h-10 lg:w-10 text-orange-400" />
                <h3 className="text-lg lg:text-xl font-semibold">Global Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Part of a worldwide network protecting wildlife across all continents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 lg:py-24">
        <Card className="border-glow bg-gradient-to-r from-primary/10 via-accent/10 to-orange-400/10 backdrop-blur hover:from-primary/15 hover:via-accent/15 hover:to-orange-400/15 transition-all duration-300">
          <CardContent className="p-8 sm:p-12 lg:p-16 text-center space-y-6 lg:space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-glow">Ready to Make a Difference?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of wildlife protectors to create real change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="glow text-lg px-8 py-3 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              >
                <Link href="/auth/signup">Join WildChain</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-glow text-lg px-8 py-3 bg-transparent hover:bg-primary/10 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
