"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useWallet } from "@/components/wallet-provider"
import { Heart, Trophy, Wallet, Download, QrCode, TrendingUp, Star } from "lucide-react"

interface Animal {
  id: string
  name: string
  type: "wildlife" | "stray"
  species: string
  age: string
  location: string
  description: string
  image: string
  adoptionFee: number
  urgency: "low" | "medium" | "high"
  adopted: boolean
}

interface AdoptionCertificate {
  id: string
  animalId: string
  animalName: string
  animalImage: string
  walletAddress: string
  transactionHash: string
  adoptionDate: string
  certificateType: "sponsorship" | "adoption"
}

interface Leaderboard {
  walletAddress: string
  adoptions: number
  totalDonated: number
  rank: number
}

export default function AdoptPage() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [certificates, setCertificates] = useState<AdoptionCertificate[]>([])
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([])
  const [isAdopting, setIsAdopting] = useState<string | null>(null)
  const [showCertificate, setShowCertificate] = useState<AdoptionCertificate | null>(null)
  const { isConnected, account, connectWallet } = useWallet()

  useEffect(() => {
    // Mock animals data
    const mockAnimals: Animal[] = [
      {
        id: "1",
        name: "Raja",
        type: "wildlife",
        species: "Bengal Tiger",
        age: "5 years",
        location: "Sundarbans, India",
        description: "Raja was rescued from poachers and needs ongoing medical care and habitat protection.",
        image: "/placeholder-v4b09.png",
        adoptionFee: 500,
        urgency: "high",
        adopted: false,
      },
      {
        id: "2",
        name: "Luna",
        type: "stray",
        species: "Golden Retriever",
        age: "2 years",
        location: "New York, USA",
        description: "Luna is a friendly dog who was found abandoned. She's healthy and ready for a loving home.",
        image: "/happy-golden-retriever.png",
        adoptionFee: 150,
        urgency: "medium",
        adopted: false,
      },
      {
        id: "3",
        name: "Kesi",
        type: "wildlife",
        species: "African Elephant",
        age: "8 years",
        location: "Kenya",
        description: "Kesi lost her mother to poaching. Your sponsorship helps provide care and protection.",
        image: "/placeholder-divgy.png",
        adoptionFee: 1000,
        urgency: "high",
        adopted: false,
      },
      {
        id: "4",
        name: "Whiskers",
        type: "stray",
        species: "Tabby Cat",
        age: "1 year",
        location: "London, UK",
        description: "Whiskers is a playful kitten who needs a warm home and lots of love.",
        image: "/placeholder-qtf2o.png",
        adoptionFee: 75,
        urgency: "low",
        adopted: false,
      },
      {
        id: "5",
        name: "Storm",
        type: "wildlife",
        species: "White Rhino",
        age: "12 years",
        location: "South Africa",
        description: "Storm is part of a critical breeding program to save the white rhino species.",
        image: "/placeholder-pymlj.png",
        adoptionFee: 2000,
        urgency: "high",
        adopted: false,
      },
      {
        id: "6",
        name: "Buddy",
        type: "stray",
        species: "Mixed Breed",
        age: "4 years",
        location: "Austin, USA",
        description: "Buddy is a loyal companion who loves walks and playing fetch.",
        image: "/placeholder-97re6.png",
        adoptionFee: 100,
        urgency: "medium",
        adopted: false,
      },
    ]

    // Mock leaderboard data
    const mockLeaderboard: Leaderboard[] = [
      { walletAddress: "0x1234...5678", adoptions: 12, totalDonated: 5000, rank: 1 },
      { walletAddress: "0xabcd...efgh", adoptions: 8, totalDonated: 3200, rank: 2 },
      { walletAddress: "0x9876...5432", adoptions: 6, totalDonated: 2800, rank: 3 },
      { walletAddress: "0xfedc...ba98", adoptions: 5, totalDonated: 2100, rank: 4 },
      { walletAddress: "0x1111...2222", adoptions: 4, totalDonated: 1800, rank: 5 },
    ]

    setAnimals(mockAnimals)
    setLeaderboard(mockLeaderboard)

    // Load existing certificates from localStorage
    const savedCertificates = JSON.parse(localStorage.getItem("wildchain_certificates") || "[]")
    setCertificates(savedCertificates)
  }, [])

  const handleAdopt = async (animal: Animal) => {
    if (!isConnected) {
      await connectWallet()
      return
    }

    setIsAdopting(animal.id)

    try {
      // Mock blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate mock transaction hash
      const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`

      // Create adoption certificate
      const certificate: AdoptionCertificate = {
        id: Date.now().toString(),
        animalId: animal.id,
        animalName: animal.name,
        animalImage: animal.image,
        walletAddress: account!,
        transactionHash,
        adoptionDate: new Date().toISOString(),
        certificateType: animal.type === "wildlife" ? "sponsorship" : "adoption",
      }

      // Save certificate
      const updatedCertificates = [...certificates, certificate]
      setCertificates(updatedCertificates)
      localStorage.setItem("wildchain_certificates", JSON.stringify(updatedCertificates))

      // Mark animal as adopted
      setAnimals((prev) => prev.map((a) => (a.id === animal.id ? { ...a, adopted: true } : a)))

      // Show certificate
      setShowCertificate(certificate)
    } catch (error) {
      console.error("Adoption failed:", error)
      alert("Adoption failed. Please try again.")
    } finally {
      setIsAdopting(null)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const downloadCertificate = (certificate: AdoptionCertificate) => {
    // Mock download functionality
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(certificate, null, 2))}`
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `wildchain-certificate-${certificate.animalName}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const wildlifeAnimals = animals.filter((animal) => animal.type === "wildlife")
  const strayAnimals = animals.filter((animal) => animal.type === "stray")

  if (showCertificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navbar />
        <div className="container py-24">
          <Card className="max-w-2xl mx-auto border-glow bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow">
                <Heart className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-glow">
                {showCertificate.certificateType === "sponsorship" ? "Sponsorship" : "Adoption"} Certificate
              </h2>

              <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-orange-400/10 p-8 rounded-lg border border-primary/20">
                <img
                  src={showCertificate.animalImage || "/placeholder.svg"}
                  alt={showCertificate.animalName}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary/30 mb-4"
                />

                <h3 className="text-xl font-bold mb-2">{showCertificate.animalName}</h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Certificate Type:</strong>{" "}
                    {showCertificate.certificateType === "sponsorship" ? "Wildlife Sponsorship" : "Animal Adoption"}
                  </p>
                  <p>
                    <strong>Wallet Address:</strong> {showCertificate.walletAddress}
                  </p>
                  <p>
                    <strong>Transaction Hash:</strong>
                  </p>
                  <code className="text-xs font-mono break-all bg-muted/20 p-2 rounded block">
                    {showCertificate.transactionHash}
                  </code>
                  <p>
                    <strong>Date:</strong> {new Date(showCertificate.adoptionDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="w-24 h-24 bg-white p-2 rounded-lg glow">
                    <QrCode className="w-full h-full text-black" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={() => downloadCertificate(showCertificate)} className="glow">
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  onClick={() => setShowCertificate(null)}
                  variant="outline"
                  className="border-glow bg-transparent"
                >
                  Continue Exploring
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <div className="container py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-glow">Adopt & Protect</h1>
          <p className="text-xl text-muted-foreground">
            Sponsor wildlife or adopt strays with blockchain-verified certificates
          </p>
        </div>

        {/* Donation Progress Tracker */}
        <Card className="mb-12 border-glow bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Global Impact Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Wildlife Protected</span>
                  <span>847 / 1000</span>
                </div>
                <Progress value={84.7} className="h-2" />
                <p className="text-xs text-muted-foreground">84.7% of monthly goal</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Strays Adopted</span>
                  <span>234 / 300</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">78% of monthly goal</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Funds Raised</span>
                  <span>$156K / $200K</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">78% of monthly target</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="wildlife" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="wildlife">Wildlife Sponsorship</TabsTrigger>
                <TabsTrigger value="strays">Direct Adoption</TabsTrigger>
              </TabsList>

              <TabsContent value="wildlife" className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-2xl font-bold">Sponsor Wildlife</h2>
                  <p className="text-muted-foreground">
                    Support endangered species and wildlife conservation efforts worldwide
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {wildlifeAnimals.map((animal) => (
                    <Card key={animal.id} className="border-glow bg-card/50 backdrop-blur overflow-hidden">
                      <div className="relative">
                        <img
                          src={animal.image || "/placeholder.svg"}
                          alt={animal.name}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className={`absolute top-2 right-2 ${getUrgencyColor(animal.urgency)}`}>
                          {animal.urgency} priority
                        </Badge>
                        {animal.adopted && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge className="bg-green-500 text-white">Sponsored</Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold">{animal.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {animal.species} • {animal.age} • {animal.location}
                          </p>
                        </div>

                        <p className="text-sm">{animal.description}</p>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-primary">${animal.adoptionFee}</p>
                            <p className="text-xs text-muted-foreground">Sponsorship fee</p>
                          </div>

                          <Button
                            onClick={() => handleAdopt(animal)}
                            disabled={animal.adopted || isAdopting === animal.id}
                            className="glow"
                          >
                            {isAdopting === animal.id ? (
                              "Processing..."
                            ) : animal.adopted ? (
                              "Sponsored"
                            ) : isConnected ? (
                              "Sponsor Now"
                            ) : (
                              <>
                                <Wallet className="h-4 w-4 mr-2" />
                                Connect Wallet
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="strays" className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-2xl font-bold">Adopt Strays</h2>
                  <p className="text-muted-foreground">
                    Give abandoned animals a loving home with blockchain certificates
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {strayAnimals.map((animal) => (
                    <Card key={animal.id} className="border-glow bg-card/50 backdrop-blur overflow-hidden">
                      <div className="relative">
                        <img
                          src={animal.image || "/placeholder.svg"}
                          alt={animal.name}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className={`absolute top-2 right-2 ${getUrgencyColor(animal.urgency)}`}>
                          {animal.urgency} priority
                        </Badge>
                        {animal.adopted && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge className="bg-green-500 text-white">Adopted</Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold">{animal.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {animal.species} • {animal.age} • {animal.location}
                          </p>
                        </div>

                        <p className="text-sm">{animal.description}</p>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-primary">${animal.adoptionFee}</p>
                            <p className="text-xs text-muted-foreground">Adoption fee</p>
                          </div>

                          <Button
                            onClick={() => handleAdopt(animal)}
                            disabled={animal.adopted || isAdopting === animal.id}
                            className="glow"
                          >
                            {isAdopting === animal.id ? (
                              "Processing..."
                            ) : animal.adopted ? (
                              "Adopted"
                            ) : isConnected ? (
                              "Adopt Now"
                            ) : (
                              <>
                                <Wallet className="h-4 w-4 mr-2" />
                                Connect Wallet
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="border-glow bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Top Protectors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div key={entry.walletAddress} className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                      {index === 0 ? (
                        <Star className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <span className="text-sm font-bold">#{entry.rank}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{entry.walletAddress}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.adoptions} adoptions • ${entry.totalDonated.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* My Certificates */}
            {certificates.length > 0 && (
              <Card className="border-glow bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>My Certificates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {certificates.slice(0, 3).map((cert) => (
                    <div key={cert.id} className="p-3 bg-muted/20 rounded-lg border border-border/40">
                      <div className="flex items-center gap-3">
                        <img
                          src={cert.animalImage || "/placeholder.svg"}
                          alt={cert.animalName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{cert.animalName}</p>
                          <p className="text-xs text-muted-foreground">
                            {cert.certificateType === "sponsorship" ? "Sponsored" : "Adopted"}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => downloadCertificate(cert)}>
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {certificates.length > 3 && (
                    <p className="text-xs text-center text-muted-foreground">
                      +{certificates.length - 3} more certificates
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
