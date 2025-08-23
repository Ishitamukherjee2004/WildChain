"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronLeft, ChevronRight, Share2, Twitter, Instagram, Heart, MapPin, Calendar, User } from "lucide-react"

interface Story {
  id: string
  title: string
  description: string
  image: string
  location: string
  date: string
  type: "rescue" | "adoption" | "conservation"
  creditedTo: string
  organization: string
  impact: string
  shareUrl: string
}

export default function StoriesPage() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  const stories: Story[] = [
    {
      id: "1",
      title: "Raja the Tiger's Second Chance",
      description:
        "Raja was found severely injured after escaping from poachers in the Sundarbans. Thanks to our rapid response network and blockchain-verified funding, he received immediate medical care and is now thriving in a protected sanctuary.",
      image: "/placeholder.svg?height=400&width=600&text=Raja+the+Tiger",
      location: "Sundarbans, India",
      date: "2024-02-15",
      type: "rescue",
      creditedTo: "Dr. Priya Sharma",
      organization: "Wildlife Conservation Trust",
      impact: "1 tiger rescued, $2,500 raised through blockchain donations",
      shareUrl: "https://wildchain.app/stories/raja-tiger-rescue",
    },
    {
      id: "2",
      title: "Luna Finds Her Forever Home",
      description:
        "Luna, a golden retriever found abandoned in Times Square, was adopted through our blockchain adoption system. Her new family received a verified NFT certificate, ensuring complete transparency in the adoption process.",
      image: "/placeholder.svg?height=400&width=600&text=Luna+Golden+Retriever",
      location: "New York, USA",
      date: "2024-03-02",
      type: "adoption",
      creditedTo: "Sarah Johnson",
      organization: "NYC Animal Rescue",
      impact: "1 dog adopted, blockchain certificate issued",
      shareUrl: "https://wildchain.app/stories/luna-adoption",
    },
    {
      id: "3",
      title: "Elephant Corridor Protection Initiative",
      description:
        "Our community reported multiple elephant-vehicle collisions on a busy highway. Through coordinated efforts and blockchain-funded infrastructure, we successfully established a protected wildlife corridor, saving countless lives.",
      image: "/placeholder.svg?height=400&width=600&text=Elephant+Corridor",
      location: "Kerala, India",
      date: "2024-01-20",
      type: "conservation",
      creditedTo: "Ravi Menon",
      organization: "Elephant Conservation Alliance",
      impact: "50+ elephants protected, 2km corridor established",
      shareUrl: "https://wildchain.app/stories/elephant-corridor",
    },
    {
      id: "4",
      title: "Marine Turtle Rescue Operation",
      description:
        "A critically injured sea turtle was reported through our platform. Volunteers coordinated a beach rescue, and blockchain donations funded emergency surgery. The turtle was successfully released back to the ocean.",
      image: "/placeholder.svg?height=400&width=600&text=Sea+Turtle+Rescue",
      location: "Costa Rica",
      date: "2024-02-28",
      type: "rescue",
      creditedTo: "Maria Rodriguez",
      organization: "Ocean Conservation Society",
      impact: "1 sea turtle saved, $1,800 in emergency funding",
      shareUrl: "https://wildchain.app/stories/turtle-rescue",
    },
    {
      id: "5",
      title: "Urban Wildlife Rehabilitation Center",
      description:
        "Community reports led to the discovery of injured urban wildlife. Through blockchain-verified funding and volunteer coordination, we established a rehabilitation center that has now treated over 200 animals.",
      image: "/placeholder.svg?height=400&width=600&text=Wildlife+Rehabilitation",
      location: "London, UK",
      date: "2024-01-10",
      type: "conservation",
      creditedTo: "James Wilson",
      organization: "Urban Wildlife Trust",
      impact: "200+ animals treated, permanent facility established",
      shareUrl: "https://wildchain.app/stories/rehab-center",
    },
  ]

  const currentStory = stories[currentStoryIndex]

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length)
  }

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }

  const shareOnTwitter = (story: Story) => {
    const text = `Check out this amazing wildlife rescue story: ${story.title} 🐾 #WildChain #WildlifeProtection`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(story.shareUrl)}`
    window.open(url, "_blank")
  }

  const shareOnInstagram = (story: Story) => {
    // Instagram doesn't have direct sharing API, so we'll copy to clipboard
    navigator.clipboard.writeText(`${story.title} - ${story.shareUrl}`)
    alert("Story link copied to clipboard! Share it on Instagram.")
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "rescue":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "adoption":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "conservation":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "rescue":
        return "🚨"
      case "adoption":
        return "❤️"
      case "conservation":
        return "🌿"
      default:
        return "🐾"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <div className="container py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-glow">Success Stories</h1>
          <p className="text-xl text-muted-foreground">
            Real impact stories from our global wildlife protection community
          </p>
        </div>

        {/* Featured Story Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-glow bg-card/50 backdrop-blur overflow-hidden">
            <div className="relative">
              <img
                src={currentStory.image || "/placeholder.svg"}
                alt={currentStory.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Navigation Arrows */}
              <Button
                onClick={prevStory}
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={nextStory}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Story Type Badge */}
              <Badge className={`absolute top-4 left-4 ${getTypeColor(currentStory.type)}`}>
                {getTypeIcon(currentStory.type)} {currentStory.type}
              </Badge>

              {/* Story Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-glow">{currentStory.title}</h2>
                <p className="text-sm md:text-base mb-4 opacity-90">{currentStory.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {currentStory.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(currentStory.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {currentStory.creditedTo}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Organization:</strong> {currentStory.organization}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Impact:</strong> {currentStory.impact}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => shareOnTwitter(currentStory)}
                    size="sm"
                    variant="outline"
                    className="border-glow bg-transparent"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    onClick={() => shareOnInstagram(currentStory)}
                    size="sm"
                    variant="outline"
                    className="border-glow bg-transparent"
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline" className="border-glow bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStoryIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStoryIndex ? "bg-primary glow" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Story Timeline */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-glow">Impact Timeline</h2>

          <div className="space-y-8">
            {stories.map((story, index) => (
              <div key={story.id} className="flex gap-6">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${getTypeColor(story.type)} border-2`} />
                  {index < stories.length - 1 && <div className="w-0.5 h-16 bg-border/40 mt-2" />}
                </div>

                {/* Story Card */}
                <Card className="flex-1 border-glow bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-lg font-semibold">{story.title}</h3>
                          <Badge className={getTypeColor(story.type)}>
                            {getTypeIcon(story.type)} {story.type}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{story.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {story.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(story.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {story.creditedTo}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              <strong>Impact:</strong> {story.impact}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Organization:</strong> {story.organization}
                            </p>
                          </div>

                          <div className="flex gap-1">
                            <Button onClick={() => shareOnTwitter(story)} size="sm" variant="ghost">
                              <Twitter className="h-3 w-3" />
                            </Button>
                            <Button onClick={() => shareOnInstagram(story)} size="sm" variant="ghost">
                              <Instagram className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-16 border-glow bg-gradient-to-r from-primary/10 via-accent/10 to-orange-400/10 backdrop-blur">
          <CardContent className="p-12 text-center space-y-6">
            <Heart className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-glow">Be Part of the Next Success Story</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every report, adoption, and donation creates real impact. Join our community and help write the next
              chapter in wildlife protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="glow">
                <a href="/report">Report Wildlife</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-glow bg-transparent">
                <a href="/adopt">Adopt & Protect</a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
