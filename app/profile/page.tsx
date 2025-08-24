"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { useWallet } from "@/components/wallet-provider"
import { useRouter } from "next/navigation"
import { User, Wallet, Download, Trophy, Heart, Shield, MapPin, Calendar, TrendingUp, Award, Star } from "lucide-react"

interface UserStats {
  reportsSubmitted: number
  animalsHelped: number
  adoptionsCertificates: number
  impactScore: number
  badgesEarned: string[]
  joinDate: string
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

interface Report {
  id: string
  type: string
  location: {
    address: string
  }
  timestamp: string
  status: "reported" | "on-the-way" | "rescued"
}

export default function ProfilePage() {
  const { isAuthenticated, userRole } = useAuth()
  const { isConnected, account, connectWallet } = useWallet()
  const router = useRouter()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [certificates, setCertificates] = useState<AdoptionCertificate[]>([])
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    if (!isAuthenticated || userRole !== "user") {
      router.push("/auth/signin")
      return
    }

    // Load user data from localStorage
    const savedCertificates = JSON.parse(localStorage.getItem("wildchain_certificates") || "[]")
    const savedReports = JSON.parse(localStorage.getItem("wildchain_reports") || "[]")

    setCertificates(savedCertificates)
    setReports(savedReports)

    // Calculate user stats
    const rescuedReports = savedReports.filter((r: Report) => r.status === "rescued").length
    const totalAnimalsHelped = rescuedReports + savedCertificates.length

    const badges = []
    if (savedReports.length >= 1) badges.push("First Reporter")
    if (savedReports.length >= 5) badges.push("Wildlife Guardian")
    if (savedReports.length >= 10) badges.push("Conservation Hero")
    if (savedCertificates.length >= 1) badges.push("Animal Protector")
    if (savedCertificates.length >= 3) badges.push("Adoption Champion")
    if (totalAnimalsHelped >= 10) badges.push("Impact Maker")
    if (isConnected) badges.push("Blockchain Pioneer")

    const stats: UserStats = {
      reportsSubmitted: savedReports.length,
      animalsHelped: totalAnimalsHelped,
      adoptionsCertificates: savedCertificates.length,
      impactScore: savedReports.length * 10 + savedCertificates.length * 25 + rescuedReports * 15,
      badgesEarned: badges,
      joinDate: "2024-01-15", // Mock join date
    }

    setUserStats(stats)
  }, [isAuthenticated, userRole, router, isConnected])

  const downloadCertificate = (certificate: AdoptionCertificate) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(certificate, null, 2))}`
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `wildchain-certificate-${certificate.animalName}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "First Reporter":
        return <MapPin className="h-4 w-4" />
      case "Wildlife Guardian":
        return <Shield className="h-4 w-4" />
      case "Conservation Hero":
        return <Trophy className="h-4 w-4" />
      case "Animal Protector":
        return <Heart className="h-4 w-4" />
      case "Adoption Champion":
        return <Award className="h-4 w-4" />
      case "Impact Maker":
        return <TrendingUp className="h-4 w-4" />
      case "Blockchain Pioneer":
        return <Wallet className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "First Reporter":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Wildlife Guardian":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Conservation Hero":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Animal Protector":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Adoption Champion":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Impact Maker":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "Blockchain Pioneer":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (!isAuthenticated || userRole !== "user") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <div className="container py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-glow">My Profile</h1>
          <p className="text-xl text-muted-foreground">Track your wildlife protection impact and achievements</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="space-y-6">
            <Card className="border-glow bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Wildlife Protector</h3>
                  <p className="text-sm text-muted-foreground">
                    Member since {userStats ? new Date(userStats.joinDate).toLocaleDateString() : "2024"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Wallet Status:</span>
                  </div>
                  {isConnected ? (
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                      <p className="text-sm font-mono text-green-400">{account}</p>
                      <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">Connected</Badge>
                    </div>
                  ) : (
                    <div className="bg-muted/20 p-3 rounded-lg border border-border/40">
                      <p className="text-sm text-muted-foreground mb-2">
                        Connect your wallet to unlock blockchain features
                      </p>
                      <Button onClick={connectWallet} size="sm" className="glow">
                        Connect MetaMask
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            {userStats && (
              <Card className="border-glow bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Impact Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary text-glow mb-2">{userStats.animalsHelped}</div>
                    <p className="text-sm text-muted-foreground">Animals Helped</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Impact Score</span>
                      <span className="font-medium">{userStats.impactScore}</span>
                    </div>
                    <Progress value={Math.min((userStats.impactScore / 500) * 100, 100)} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-accent">{userStats.reportsSubmitted}</div>
                      <div className="text-xs text-muted-foreground">Reports</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-orange-400">{userStats.adoptionsCertificates}</div>
                      <div className="text-xs text-muted-foreground">Adoptions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badges */}
            {userStats && userStats.badgesEarned.length > 0 && (
              <Card className="border-glow bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Badges Earned ({userStats.badgesEarned.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userStats.badgesEarned.map((badge) => (
                      <div key={badge} className="text-center">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-2 glow">
                          {getBadgeIcon(badge)}
                        </div>
                        <Badge className={`${getBadgeColor(badge)} text-xs`}>{badge}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Adoption Certificates */}
            {/* {certificates.length > 0 && (
              <Card className="border-glow bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    My Adoption Certificates ({certificates.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-4 bg-muted/20 rounded-lg border border-border/40">
                      <div className="flex items-center gap-4">
                        <img
                          src={cert.animalImage || "/placeholder.svg"}
                          alt={cert.animalName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{cert.animalName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cert.certificateType === "sponsorship" ? "Sponsored" : "Adopted"} on{" "}
                            {new Date(cert.adoptionDate).toLocaleDateString()}
                          </p>
                          <code className="text-xs font-mono text-muted-foreground">
                            {cert.transactionHash.slice(0, 20)}...
                          </code>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => downloadCertificate(cert)}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )} */}

            {/* Recent Reports */}
            {reports.length > 0 && (
              <Card className="border-glow bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    My Reports ({reports.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                  {reports.map((report) => (
                    <div key={report.id} className="p-3 bg-muted/20 rounded-lg border border-border/40">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{report.type}</h4>
                          <p className="text-xs text-muted-foreground">{report.location.address}</p>
                          <p className="text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {new Date(report.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          className={
                            report.status === "rescued"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : report.status === "on-the-way"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          {report.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {certificates.length === 0 && reports.length === 0 && (
              <Card className="border-glow bg-card/50 backdrop-blur">
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start Your Wildlife Protection Journey</h3>
                  <p className="text-muted-foreground mb-6">
                    Submit your first report or adopt an animal to begin making an impact
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild className="glow">
                      <a href="/report">Submit Report</a>
                    </Button>
                    <Button asChild variant="outline" className="border-glow bg-transparent">
                      <a href="/adopt">Adopt Animal</a>
                    </Button>
                  </div>
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
