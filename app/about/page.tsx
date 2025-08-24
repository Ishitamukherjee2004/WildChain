"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Shield,
  Globe,
  Users,
  Zap,
  Heart,
  TrendingUp,
  Lock,
  CheckCircle,
  ArrowRight,
  Handshake,
  Building,
  DollarSign,
} from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Blockchain Security",
      description:
        "Every transaction and adoption is secured by blockchain technology, ensuring complete transparency.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Network",
      description: "Connect with wildlife protectors, NGOs, and volunteers across all continents.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Response",
      description: "Real-time alerts and rapid response coordination for wildlife emergencies.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Verified Impact",
      description: "Blockchain certificates provide undeniable proof of your conservation contributions.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Animals Protected" },
    { number: "500+", label: "Active Volunteers" },
    { number: "50+", label: "Partner NGOs" },
    { number: "$2M+", label: "Funds Raised" },
  ]

  const whyBlockchain = [
    {
      title: "Complete Transparency",
      description:
        "Every donation, adoption, and rescue operation is recorded on the blockchain for full accountability.",
    },
    {
      title: "Immutable Records",
      description:
        "Adoption certificates and impact records cannot be altered or falsified, building trust with donors.",
    },
    {
      title: "Global Accessibility",
      description: "Anyone, anywhere can participate in wildlife protection without traditional banking barriers.",
    },
    {
      title: "Smart Contracts",
      description: "Automated fund distribution ensures donations reach their intended recipients efficiently.",
    },
  ]

  return (
    <div className="min-h-screen mx-[6%] bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      {/* Hero Section */}
      <section className="container py-24">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* <Badge variant="outline" className="border-glow text-primary">
            Powered by Blockchain Technology
          </Badge> */}

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-glow">
            Revolutionizing
            <br />
            <span className="text-accent">Wildlife Protection</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground">
            WildChain is the world's first platform that connects communities, technology, and conservation for wildlife protection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="glow">
              Join the Movement
            </Button>
            <Button variant="outline" size="lg" className="border-glow bg-transparent">
              Watch Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-glow bg-card/50 backdrop-blur text-center">
              <CardContent className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-primary text-glow mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-glow">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              We believe that wildlife protection should be transparent, accessible, and community-driven. Traditional
              conservation efforts often lack accountability and struggle with funding transparency.
            </p>
            <p className="text-lg text-muted-foreground">
              WildChain solves these problems by leveraging blockchain technology to create an immutable record of every
              rescue, adoption, and conservation effort. Our platform empowers individuals worldwide to make a direct,
              verifiable impact on wildlife protection.
            </p>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Transparent fund allocation</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Verifiable impact certificates</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Global community coordination</span>
            </div>
          </div>

          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <img
                src="/placeholder.svg?height=400&width=500&text=Wildlife+Conservation"
                alt="Wildlife Conservation"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-4">Founded on Trust</h3>
              <p className="text-muted-foreground">
                Started by a team of conservationists and blockchain developers who witnessed the lack of transparency
                in traditional wildlife protection funding.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Blockchain Section */}
      <section className="container py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-glow">Why Blockchain?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Blockchain technology brings unprecedented transparency and trust to wildlife conservation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {whyBlockchain.map((item, index) => (
            <Card key={index} className="border-glow bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-glow">Platform Features</h2>
          <p className="text-xl text-muted-foreground">
            Cutting-edge technology meets conservation in our comprehensive platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-glow bg-card/50 backdrop-blur text-center">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center glow">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-glow">How WildChain Works</h2>
          <p className="text-xl text-muted-foreground">Simple steps, powerful impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-glow bg-card/50 backdrop-blur text-center">
            <CardContent className="p-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center glow">
                <span className="text-2xl font-bold text-red-400">1</span>
              </div>
              <h3 className="text-xl font-semibold">Report & Alert</h3>
              <p className="text-muted-foreground">
                Community members report wildlife emergencies through our platform, creating blockchain-verified alerts
              </p>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur text-center">
            <CardContent className="p-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center glow-orange">
                <span className="text-2xl font-bold text-yellow-400">2</span>
              </div>
              <h3 className="text-xl font-semibold">Coordinate & Fund</h3>
              <p className="text-muted-foreground">
                Volunteers and NGOs coordinate rescue efforts while the community provides transparent blockchain
                funding
              </p>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur text-center">
            <CardContent className="p-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center glow-green">
                <span className="text-2xl font-bold text-green-400">3</span>
              </div>
              <h3 className="text-xl font-semibold">Verify & Celebrate</h3>
              <p className="text-muted-foreground">
                Every rescue and adoption is verified on the blockchain, creating permanent impact certificates
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="container py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-glow">Join the Movement</h2>
          <p className="text-xl text-muted-foreground">Multiple ways to contribute to global wildlife protection</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Join as Volunteer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Become part of our global volunteer network. Respond to local wildlife emergencies and coordinate rescue
                operations.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Receive real-time alerts in your area</li>
                <li>• Coordinate with local NGOs</li>
                <li>• Earn blockchain-verified volunteer badges</li>
                <li>• Access specialized training resources</li>
              </ul>
              <Button className="w-full glow">
                Become a Volunteer
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Partner NGO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Partner with WildChain to access transparent funding, volunteer networks, and blockchain-verified impact
                tracking.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Access to global volunteer network</li>
                <li>• Transparent blockchain funding</li>
                <li>• Impact verification and reporting</li>
                <li>• Technology platform integration</li>
              </ul>
              <Button variant="outline" className="w-full border-glow bg-transparent">
                Partner With Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Support as Donor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Make direct, transparent contributions to wildlife protection with blockchain-verified impact tracking.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 100% transparent fund allocation</li>
                <li>• Blockchain-verified impact certificates</li>
                <li>• Direct animal sponsorship options</li>
                <li>• Real-time progress tracking</li>
              </ul>
              <Button variant="outline" className="w-full border-glow bg-transparent">
                Start Donating
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container py-24">
        <Card className="border-glow bg-gradient-to-r from-primary/10 via-accent/10 to-orange-400/10 backdrop-blur">
          <CardContent className="p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-glow">Ready to Protect Wildlife?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of conservationists using blockchain technology to create transparent, verifiable impact in
              wildlife protection. Every action matters, every contribution counts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="glow text-lg px-8">
                <a href="/auth/signup">Get Started Today</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-glow text-lg px-8 bg-transparent">
                <a href="/stories">See Our Impact</a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Growing Impact</span>
              </div>
              <div className="flex items-center gap-2">
                <Handshake className="h-4 w-4" />
                <span>Trusted Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Global Community</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
