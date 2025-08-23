"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Upload, Loader2, CheckCircle } from "lucide-react"

type ReportType = "WildAlert" | "PawChain" | "EcoPath" | "StraySafe" | "AbuseReport"

interface LocationData {
  latitude: number
  longitude: number
  address: string
}

export default function ReportPage() {
  const [reportType, setReportType] = useState<ReportType>("WildAlert")
  const [location, setLocation] = useState<LocationData | null>(null)
  const [manualLocation, setManualLocation] = useState("")
  const [description, setDescription] = useState("")
  const [aiDescription, setAiDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [blockchainHash, setBlockchainHash] = useState("")
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTypeDescriptions = {
    WildAlert: "Report wildlife in immediate danger or distress",
    PawChain: "Report stray animals needing rescue or care",
    EcoPath: "Report wildlife crossing hazards or habitat issues",
    StraySafe: "Report injured or abandoned domestic animals",
    AbuseReport: "Report animal abuse or illegal wildlife activities",
  }

  const getLocationFromIP = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/")
      const data = await response.json()
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        address: `${data.city}, ${data.region}, ${data.country_name}`,
      }
    } catch (error) {
      console.error("Error getting IP location:", error)
      return null
    }
  }

  const getCurrentLocation = async () => {
    setIsGettingLocation(true)

    // First try GPS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            )
            const data = await response.json()
            const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            setLocation({ latitude, longitude, address })
            generateAIDescription(reportType, address)
          } catch (error) {
            console.error("Error getting address:", error)
            setLocation({
              latitude,
              longitude,
              address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            })
          }
          setIsGettingLocation(false)
        },
        async (error) => {
          console.error("GPS Error:", error)
          const ipLocation = await getLocationFromIP()
          if (ipLocation) {
            setLocation(ipLocation)
            generateAIDescription(reportType, ipLocation.address)
          } else {
            alert("Unable to get your location. Please enter it manually.")
          }
          setIsGettingLocation(false)
        },
        { timeout: 10000, enableHighAccuracy: true },
      )
    } else {
      const ipLocation = await getLocationFromIP()
      if (ipLocation) {
        setLocation(ipLocation)
        generateAIDescription(reportType, ipLocation.address)
      } else {
        alert("Geolocation is not supported and IP location failed. Please enter location manually.")
      }
      setIsGettingLocation(false)
    }
  }

  const generateAIDescription = (type: ReportType, locationStr: string) => {
    // Mock AI description generation
    const descriptions = {
      WildAlert: `Wildlife alert reported at ${locationStr}. Potential threat to local wildlife detected. Immediate attention required for assessment and possible intervention.`,
      PawChain: `Stray animal sighting at ${locationStr}. Animal appears to need assistance. Rescue team should evaluate condition and provide necessary care.`,
      EcoPath: `Wildlife crossing hazard identified at ${locationStr}. Potential danger to both wildlife and vehicles. Infrastructure assessment recommended.`,
      StraySafe: `Domestic animal in distress at ${locationStr}. Animal may be lost, injured, or abandoned. Immediate care and shelter needed.`,
      AbuseReport: `Suspected animal abuse reported at ${locationStr}. Situation requires immediate investigation by authorities and animal welfare organizations.`,
    }
    setAiDescription(descriptions[type])
    setDescription(descriptions[type])
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const newFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...newFiles])

    // Send first file to Gemini API
    const formData = new FormData()
    formData.append("file", newFiles[0])

    try {
      setIsGenerating(true)
      const res = await fetch("/api/generate-description", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.description) {
        setAiDescription(data.description)
        setDescription(data.description)
      }
    } catch (error) {
      console.error("Error generating AI description:", error)
    } finally {
      setIsGenerating(false)
    }
  }
}


  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Mock submission delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate mock blockchain hash
      const hash = `0x${Math.random().toString(16).substr(2, 64)}`
      setBlockchainHash(hash)

      // Mock adding to reports store (in real app, this would be API call)
      const newReport = {
        id: Date.now().toString(),
        type: reportType,
        location: location || { latitude: 0, longitude: 0, address: manualLocation },
        description,
        files: files.map((f) => f.name),
        timestamp: new Date().toISOString(),
        status: "reported",
        blockchainHash: hash,
      }

      // Store in localStorage for demo (in real app, use proper state management)
      const existingReports = JSON.parse(localStorage.getItem("wildchain_reports") || "[]")
      existingReports.push(newReport)
      localStorage.setItem("wildchain_reports", JSON.stringify(existingReports))

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting report:", error)
      alert("Failed to submit report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (location) {
      generateAIDescription(reportType, location.address)
    }
  }, [reportType, location])

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navbar />
        <div className="container py-24">
          <Card className="max-w-2xl mx-auto border-glow bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center space-y-6">
              <CheckCircle className="h-16 w-16 text-accent mx-auto" />
              <h2 className="text-2xl font-bold text-glow">Report Submitted Successfully!</h2>
              <p className="text-xl text-muted-foreground">
                Your report has been added to the blockchain and nearby volunteers have been notified.
              </p>
              <div className="bg-muted/20 p-4 rounded-lg border border-border/40">
                <p className="text-sm text-muted-foreground mb-2">Blockchain Transaction Hash:</p>
                <code className="text-xs font-mono text-primary break-all">{blockchainHash}</code>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push("/map")} className="glow">
                  View on Map
                </Button>
                <Button onClick={() => router.push("/")} variant="outline" className="border-glow bg-transparent">
                  Back to Home
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-glow">Report Wildlife Emergency</h1>
            <p className="text-xl text-muted-foreground">
              Help us protect wildlife by reporting threats, injuries, or animals in need
            </p>
          </div>

          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Submit a Report</CardTitle>
              <CardDescription>All reports are verified and added to our blockchain network</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Report Type */}
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={reportType} onValueChange={(value: ReportType) => setReportType(value)}>
                    <SelectTrigger className="border-glow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(reportTypeDescriptions).map(([type, desc]) => (
                        <SelectItem key={type} value={type}>
                          <div>
                            <div className="font-medium">{type}</div>
                            <div className="text-xs text-muted-foreground">{desc}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <Label>Location</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      variant="outline"
                      className="border-glow bg-transparent"
                    >
                      {isGettingLocation ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <MapPin className="h-4 w-4 mr-2" />
                      )}
                      {isGettingLocation ? "Getting Location..." : "Use Current Location"}
                    </Button>
                  </div>

                  {location && (
                    <div className="bg-muted/20 p-3 rounded-lg border border-border/40">
                      <p className="text-sm">
                        <strong>GPS:</strong> {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                      </p>
                      <p className="text-sm">
                        <strong>Address:</strong> {location.address}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="manualLocation">Or enter location manually</Label>
                    <Input
                      id="manualLocation"
                      value={manualLocation}
                      onChange={(e) => setManualLocation(e.target.value)}
                      placeholder="Enter address or landmark"
                      className="border-glow"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <Label>Photos/Videos</Label>
                  <div className="border-2 border-dashed border-border/40 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload photos or videos</p>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted/20 p-2 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Description */}
                {aiDescription && (
                  <div className="space-y-2">
                    <Label>AI-Generated Description</Label>
                    <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                      <p className="text-sm">{aiDescription}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        AI Generated
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Editable)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you observed..."
                    rows={4}
                    className="border-glow"
                    required
                  />
                </div>

                <Button type="submit" className="w-full glow" disabled={isSubmitting || (!location && !manualLocation)}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting to Blockchain...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
