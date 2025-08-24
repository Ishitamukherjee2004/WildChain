"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Clock, AlertTriangle, Heart, Shield, Navigation, Loader2 } from "lucide-react"

interface Report {
  id: string
  type: string
  location: {
    latitude: number
    longitude: number
    address: string
  }
  description: string
  timestamp: string
  status: "reported" | "on-the-way" | "rescued"
  blockchainHash: string
}

export default function MapPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("wildchain_reports") || "[]")

    const mockReports: Report[] = [
      {
        id: "1",
        type: "WildAlert",
        location: { latitude: 40.7128, longitude: -74.006, address: "Central Park, New York" },
        description: "Injured red-tailed hawk spotted near the lake",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: "rescued",
        blockchainHash: "0x1234567890abcdef",
      },
      {
        id: "2",
        type: "PawChain",
        location: { latitude: 40.7589, longitude: -73.9851, address: "Times Square, New York" },
        description: "Golden retriever stray needs immediate attention",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: "on-the-way",
        blockchainHash: "0xabcdef1234567890",
      },
      {
        id: "3",
        type: "AbuseReport",
        location: { latitude: 40.7505, longitude: -73.9934, address: "Brooklyn Bridge, New York" },
        description: "Suspected animal abuse case - urgent investigation needed",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        status: "reported",
        blockchainHash: "0x567890abcdef1234",
      },
      {
        id: "4",
        type: "EcoPath",
        location: { latitude: 40.7282, longitude: -74.0776, address: "Liberty Island, New York" },
        description: "Wildlife crossing needs monitoring - deer migration route",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: "rescued",
        blockchainHash: "0xdef1234567890abc",
      },
      {
        id: "5",
        type: "StraySafe",
        location: { latitude: 40.7614, longitude: -73.9776, address: "Central Park West, New York" },
        description: "Orange tabby cat spotted - appears lost and hungry",
        timestamp: new Date(Date.now() - 2700000).toISOString(),
        status: "reported",
        blockchainHash: "0x890abcdef1234567",
      },
      {
        id: "6",
        type: "WildAlert",
        location: { latitude: 40.7831, longitude: -73.9712, address: "Upper East Side, New York" },
        description: "Raccoon family trapped in building construction site",
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        status: "on-the-way",
        blockchainHash: "0xfedcba0987654321",
      },
    ]

    const allReports = [...mockReports, ...savedReports]
    setReports(allReports)
  }, [])

  useEffect(() => {
    const initializeMap = async () => {
      if (typeof window === "undefined" || mapInstanceRef.current) return

      try {
        // Dynamically import Leaflet to avoid SSR issues
        const L = (await import("leaflet")).default

        // Import Leaflet CSS
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)

        // Fix default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        })

        if (mapRef.current) {
          // Initialize map centered on New York
          const map = L.map(mapRef.current).setView([40.7128, -74.006], 12)

          L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 20,
          }).addTo(map)

          mapInstanceRef.current = map
          setMapLoaded(true)

          reports.forEach((report) => {
            const getMarkerColor = (status: string) => {
              switch (status) {
                case "reported":
                  return "#ff4757" // Bright red
                case "on-the-way":
                  return "#ffa502" // Bright orange
                case "rescued":
                  return "#2ed573" // Bright green
                default:
                  return "#747d8c" // Gray
              }
            }

            const getTypeEmoji = (type: string) => {
              switch (type) {
                case "WildAlert":
                  return "🦅"
                case "PawChain":
                  return "🐕"
                case "AbuseReport":
                  return "🛡️"
                case "EcoPath":
                  return "🌿"
                case "StraySafe":
                  return "🐱"
                default:
                  return "📍"
              }
            }

            const getTypeColor = (type: string) => {
              switch (type) {
                case "WildAlert":
                  return "#3742fa" // Blue
                case "PawChain":
                  return "#ff6b6b" // Pink
                case "AbuseReport":
                  return "#ee5a52" // Red
                case "EcoPath":
                  return "#2ed573" // Green
                case "StraySafe":
                  return "#ffa502" // Orange
                default:
                  return "#747d8c"
              }
            }

            const customIcon = L.divIcon({
              html: `
                <div style="
                  background: linear-gradient(135deg, ${getMarkerColor(report.status)}, ${getTypeColor(report.type)});
                  width: 35px;
                  height: 35px;
                  border-radius: 50%;
                  border: 3px solid white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 16px;
                  box-shadow: 0 0 20px ${getMarkerColor(report.status)}88, 0 4px 15px rgba(0,0,0,0.3);
                  ${report.status === "reported" ? "animation: pulse 2s infinite;" : ""}
                  transform: scale(1);
                  transition: transform 0.2s ease;
                ">
                  ${getTypeEmoji(report.type)}
                </div>
              `,
              className: "custom-marker",
              iconSize: [35, 35],
              iconAnchor: [17.5, 17.5],
            })

            const marker = L.marker([report.location.latitude, report.location.longitude], {
              icon: customIcon,
            }).addTo(map)

            marker.bindPopup(`
              <div style="color: #1f2937; min-width: 220px; font-family: system-ui;">
                <div style="background: linear-gradient(135deg, ${getTypeColor(report.type)}, ${getMarkerColor(report.status)}); padding: 8px; margin: -8px -8px 8px -8px; border-radius: 4px;">
                  <h3 style="margin: 0; font-weight: bold; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
                    ${getTypeEmoji(report.type)} ${report.type}
                  </h3>
                </div>
                <div style="padding: 4px 0;">
                  <p style="margin: 0 0 6px 0; font-size: 13px;"><strong style="color: ${getMarkerColor(report.status)};">Status:</strong> ${report.status.replace("-", " ").toUpperCase()}</p>
                  <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Location:</strong> ${report.location.address}</p>
                  <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Description:</strong> ${report.description}</p>
                  <p style="margin: 0; font-size: 11px; color: #6b7280;">
                    📅 ${new Date(report.timestamp).toLocaleString()}
                  </p>
                  <div style="margin-top: 8px; padding: 4px 8px; background: #f3f4f6; border-radius: 4px; border-left: 3px solid ${getTypeColor(report.type)};">
                    <code style="font-size: 10px; color: #374151;">🔗 ${report.blockchainHash.substring(0, 20)}...</code>
                  </div>
                </div>
              </div>
            `)

            // Add hover effects
            marker.on("mouseover", function () {
              this.getElement().style.transform = "scale(1.1)"
              this.getElement().style.zIndex = "1000"
            })

            marker.on("mouseout", function () {
              this.getElement().style.transform = "scale(1)"
              this.getElement().style.zIndex = "auto"
            })

            // Add click event to select report
            marker.on("click", () => {
              setSelectedReport(report)
            })
          })
        }
      } catch (error) {
        console.error("Failed to initialize map:", error)
      }
    }

    if (reports.length > 0) {
      initializeMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        setMapLoaded(false)
      }
    }
  }, [reports])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "on-the-way":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "rescued":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "WildAlert":
        return <AlertTriangle className="h-4 w-4" />
      case "PawChain":
        return <Heart className="h-4 w-4" />
      case "AbuseReport":
        return <Shield className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const filteredReports = filter === "all" ? reports : reports.filter((report) => report.type === filter)

  return (
    <div className="min-h-screen bg-neon-dark">
      <Navbar />

      <div className="container py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neon-blue">Live Wildlife Map</h1>
          <p className="text-xl text-muted-foreground">Real-time tracking of wildlife reports and rescue operations</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="border-glow bg-glass backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neon-cyan">
                  <Navigation className="h-5 w-5" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg border border-neon-blue/30 overflow-hidden relative">
                  <div ref={mapRef} className="w-full h-full" />

                  {!mapLoaded && (
                    <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Loader2 className="h-8 w-8 mx-auto animate-spin text-neon-blue" />
                        <p className="text-muted-foreground">Loading interactive map...</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                    <span className="text-sm font-medium">Reported</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full shadow-lg shadow-orange-500/50"></div>
                    <span className="text-sm font-medium">On the Way</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg shadow-green-500/50"></div>
                    <span className="text-sm font-medium">Rescued</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <Card className="border-glow bg-glass backdrop-blur">
              <CardHeader>
                <CardTitle className="text-neon-cyan">Filter Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  className="w-full justify-start glow"
                  onClick={() => setFilter("all")}
                >
                  All Reports ({reports.length})
                </Button>
                <Button
                  variant={filter === "WildAlert" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setFilter("WildAlert")}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Wildlife Alerts
                </Button>
                <Button
                  variant={filter === "PawChain" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setFilter("PawChain")}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Stray Animals
                </Button>
                <Button
                  variant={filter === "AbuseReport" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setFilter("AbuseReport")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Abuse Reports
                </Button>
              </CardContent>
            </Card>

            {/* Selected Report Details */}
            {selectedReport && (
              <Card className="border-glow bg-glass backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-neon-cyan">
                    {getTypeIcon(selectedReport.type)}
                    Report Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge className={getStatusColor(selectedReport.status)}>
                      {selectedReport.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Type</h4>
                    <p className="text-neon-blue">{selectedReport.type}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Location</h4>
                    <p className="text-sm">{selectedReport.location.address}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Description</h4>
                    <p className="text-sm">{selectedReport.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Reported</h4>
                    <p className="text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(selectedReport.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Blockchain Hash</h4>
                    <code className="text-xs font-mono break-all bg-muted/20 p-2 rounded border border-neon-blue/30 text-neon-cyan">
                      {selectedReport.blockchainHash}
                    </code>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Reports Feed */}
            <Card className="border-glow bg-glass backdrop-blur">
              <CardHeader>
                <CardTitle className="text-neon-cyan">Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {filteredReports.slice(0, 10).map((report) => (
                  <div
                    key={report.id}
                    className="p-3 bg-muted/10 rounded-lg border border-neon-blue/20 cursor-pointer hover:bg-muted/20 hover:border-neon-blue/40 transition-all hover:glow-cyan"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(report.type)}
                        <span className="font-medium text-sm text-neon-blue">{report.type}</span>
                      </div>
                      <Badge className={`${getStatusColor(report.status)} text-xs`}>{report.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{report.location.address}</p>
                    <p className="text-xs text-muted-foreground">{new Date(report.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.05);
          }
        }
        .custom-marker:hover {
          transform: scale(1.1) !important;
          z-index: 1000 !important;
        }
      `}</style>
    </div>
  )
}
