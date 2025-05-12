"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Clock, Download, MapPin, Share, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventPage({ params }: { params: { id: string } }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isRegistered, setIsRegistered] = useState(false)

  // In a real app, this would fetch the event from the database
  const event = {
    id: params.id,
    title: "Tech Conference 2025",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops. Network with professionals, learn about the latest technologies, and gain insights from expert speakers.",
    longDescription: `
      <p>The Tech Conference 2025 is the premier event for technology professionals, bringing together industry leaders, innovators, and enthusiasts from around the world.</p>
      
      <h3>What to Expect:</h3>
      <ul>
        <li>Keynote presentations from industry leaders</li>
        <li>Hands-on workshops on cutting-edge technologies</li>
        <li>Networking opportunities with professionals</li>
        <li>Product demonstrations from leading tech companies</li>
        <li>Career development sessions</li>
      </ul>
      
      <h3>Featured Speakers:</h3>
      <ul>
        <li>Jane Smith - CEO, Tech Innovations Inc.</li>
        <li>John Doe - CTO, Future Systems</li>
        <li>Sarah Johnson - AI Research Director, Advanced Technologies</li>
        <li>Michael Brown - Cybersecurity Expert</li>
      </ul>
      
      <h3>Schedule Highlights:</h3>
      <p>Day 1: Opening keynote, AI and Machine Learning tracks, Evening networking reception</p>
      <p>Day 2: Web Development and Cloud Computing tracks, Tech startup showcase</p>
      <p>Day 3: Cybersecurity summit, Career fair, Closing keynote</p>
    `,
    date: "June 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco Convention Center",
    address: "747 Howard St, San Francisco, CA 94103",
    organizer: "Tech Events Inc.",
    image: "/placeholder.svg?height=400&width=800",
    attendees: 1250,
    capacity: 2000,
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsRegistering(true)

    try {
      // In a real app, this would call a server action or API to register for the event
      // For now, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsRegistered(true)
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ form: "Failed to register. Please try again." })
    } finally {
      setIsRegistering(false)
    }
  }

  const addToCalendar = () => {
    // In a real app, this would generate a calendar file or link
    alert("Calendar integration would be implemented here")
  }

  const shareEvent = () => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Share URL copied to clipboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <CalendarDays className="h-6 w-6" />
            <span>EventHub</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/events" className="text-sm font-medium transition-colors hover:text-primary">
              Browse Events
            </Link>
            <Link href="/calendar" className="text-sm font-medium transition-colors hover:text-primary">
              Calendar
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
                  ← Back to Events
                </Link>
              </div>
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="aspect-[2/1] w-full object-cover"
                  width={800}
                  height={400}
                />
              </div>
              <div className="mb-6">
                <h1 className="mb-2 text-3xl font-bold">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="organizer">Organizer</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.longDescription }} />
                </TabsContent>
                <TabsContent value="location" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Event Location</h3>
                    <p>{event.location}</p>
                    <p>{event.address}</p>
                    <div className="aspect-video overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=400&width=800&text=Map"
                        alt="Event location map"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="organizer" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">About the Organizer</h3>
                    <p>{event.organizer}</p>
                    <p>
                      Contact the organizer at{" "}
                      <a href="mailto:info@techevents.com" className="text-primary underline">
                        info@techevents.com
                      </a>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Register for this Event</CardTitle>
                    <CardDescription>Secure your spot at {event.title}</CardDescription>
                  </CardHeader>
                  {!isRegistered ? (
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isRegistering}
                          />
                          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isRegistering}
                          />
                          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="(123) 456-7890"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isRegistering}
                          />
                          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                        </div>
                        {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" type="submit" disabled={isRegistering}>
                          {isRegistering ? "Registering..." : "Register Now"}
                        </Button>
                      </CardFooter>
                    </form>
                  ) : (
                    <CardContent className="space-y-4">
                      <div className="rounded-lg bg-primary/10 p-4 text-center">
                        <h3 className="text-lg font-medium text-primary">Registration Successful!</h3>
                        <p className="mt-2 text-sm">
                          We've sent a confirmation email to {formData.email} with all the event details.
                        </p>
                      </div>
                      <Button className="w-full" onClick={addToCalendar}>
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </CardContent>
                  )}
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Event Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="outline" onClick={addToCalendar}>
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                    <Button className="w-full" variant="outline" onClick={shareEvent}>
                      <Share className="mr-2 h-4 w-4" />
                      Share Event
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Details
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Event Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Capacity</span>
                        <span className="font-medium">{event.capacity}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Registered</span>
                        <span className="font-medium">{event.attendees}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Available</span>
                        <span className="font-medium">{event.capacity - event.attendees}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            <span className="text-lg font-bold">EventHub</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
