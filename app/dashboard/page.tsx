"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Users,
  Shield,
  Heart,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

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
  assignedTo?: string
}

interface Volunteer {
  id: string
  name: string
  location: string
  specialization: string[]
  availability: "available" | "busy" | "offline"
  responseTime: string
  completedRescues: number
}

export default function DashboardPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  useEffect(() => {
    if (!isAuthenticated || userRole !== "admin") {
      router.push("/auth/signin")
      return
    }

    const savedReports = JSON.parse(localStorage.getItem("wildchain_reports") || "[]")

    const mockReports: Report[] = []

    const mockVolunteers: Volunteer[] = [
      {
        id: "vol-1",
        name: "Ishita Mukherjee",
        location: "Kalyani",
        specialization: ["Wildlife Veterinary", "Bird Rescue"],
        availability: "available",
        responseTime: "15 min",
        completedRescues: 47,
      },
      {
        id: "vol-2",
        name: "Shatakshi Saha",
        location: "Barrackpore",
        specialization: ["Large Animal Rescue", "Emergency Response"],
        availability: "busy",
        responseTime: "8 min",
        completedRescues: 62,
      },
      {
        id: "vol-3",
        name: "Madhurima Khan",
        location: "Kalyani",
        specialization: ["Stray Animals", "Urban Wildlife"],
        availability: "available",
        responseTime: "12 min",
        completedRescues: 134,
      },
    ]

    setReports([...mockReports, ...savedReports])
    setVolunteers(mockVolunteers)
  }, [isAuthenticated, userRole, router])

  const updateReportStatus = (reportId: string, newStatus: "reported" | "on-the-way" | "rescued") => {
    setReports((prev) =>
      prev.map((report) => (report.id === reportId ? { ...report, status: newStatus } : report))
    )

    const updatedReports = reports.map((report) =>
      report.id === reportId ? { ...report, status: newStatus } : report
    )
    localStorage.setItem("wildchain_reports", JSON.stringify(updatedReports.filter((r) => !r.id.startsWith("admin-"))))
  }

  const assignVolunteer = (reportId: string, volunteerId: string) => {
    const volunteer = volunteers.find((v) => v.id === volunteerId)
    if (volunteer) {
      setReports((prev) =>
        prev.map((report) => (report.id === reportId ? { ...report, assignedTo: volunteer.name } : report))
      )
    }
  }

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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "busy":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "offline":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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

  if (!isAuthenticated || userRole !== "admin") {
    return null
  }

  const reportedCount = reports.filter((r) => r.status === "reported").length
  const onTheWayCount = reports.filter((r) => r.status === "on-the-way").length
  const rescuedCount = reports.filter((r) => r.status === "rescued").length
  const availableVolunteers = volunteers.filter((v) => v.availability === "available").length

  // === Generate data for bar chart (category-wise report count) ===
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {}
    reports.forEach((report) => {
      counts[report.type] = (counts[report.type] || 0) + 1
    })
    return Object.entries(counts).map(([type, count]) => ({ type, count }))
  }, [reports])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <div className="container py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-glow">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage wildlife reports and coordinate rescue operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-400 text-glow">{reportedCount}</div>
              <div className="text-sm text-muted-foreground">Pending Reports</div>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 text-glow">{onTheWayCount}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 text-glow">{rescuedCount}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>

          <Card className="border-glow bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 text-glow">{availableVolunteers}</div>
              <div className="text-sm text-muted-foreground">Available Volunteers</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reports">Manage Reports</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteer Network</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Reports List */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="border-glow bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Active Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="p-4 bg-muted/20 rounded-lg border border-border/40 cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => setSelectedReport(report)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(report.type)}
                            <div>
                              <h4 className="font-medium">{report.type}</h4>
                              <p className="text-sm text-muted-foreground">{report.location.address}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(report.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(report.status)}>{report.status.replace("-", " ")}</Badge>
                        </div>

                        {report.assignedTo && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            Assigned to: <span className="text-primary">{report.assignedTo}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Bar Chart for Categories */}
              <div>
                <Card className="border-glow bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Reports by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="type" stroke="#888" />
                        <YAxis allowDecimals={false} stroke="#888" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <Card className="border-glow bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Volunteer Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {volunteers.map((volunteer) => (
                    <Card key={volunteer.id} className="border border-border/40 bg-muted/10">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{volunteer.name}</h3>
                            <p className="text-sm text-muted-foreground">{volunteer.location}</p>
                          </div>
                          <Badge className={getAvailabilityColor(volunteer.availability)}>
                            {volunteer.availability}
                          </Badge>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Specializations</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {volunteer.specialization.map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Response Time:</span>
                          <span className="font-medium">{volunteer.responseTime}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed Rescues:</span>
                          <span className="font-medium text-primary">{volunteer.completedRescues}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
