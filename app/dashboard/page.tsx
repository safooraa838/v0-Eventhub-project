"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronDown, LogOut, Menu, Plus, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardEventCard } from "@/components/dashboard-event-card"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // In a real app, these would come from the database
  const upcomingEvents = [
    {
      id: "1",
      title: "Tech Conference 2025",
      description:
        "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
      date: "June 15-17, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco Convention Center",
      image: "/placeholder.svg?height=200&width=300",
      registrations: 1250,
      capacity: 2000,
    },
    {
      id: "2",
      title: "Web Development Workshop",
      description: "Learn the latest web development techniques and tools.",
      date: "May 25, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "Online",
      image: "/placeholder.svg?height=200&width=300",
      registrations: 120,
      capacity: 200,
    },
  ]

  const pastEvents = [
    {
      id: "3",
      title: "Design Systems Webinar",
      description: "A comprehensive overview of design systems and their implementation.",
      date: "April 10, 2025",
      time: "1:00 PM - 3:00 PM",
      location: "Online",
      image: "/placeholder.svg?height=200&width=300",
      registrations: 350,
      capacity: 500,
    },
    {
      id: "4",
      title: "Startup Networking Event",
      description: "Connect with founders, investors, and industry experts.",
      date: "March 22, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Innovation Hub",
      image: "/placeholder.svg?height=200&width=300",
      registrations: 175,
      capacity: 200,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2 border-b py-4">
                    <CalendarDays className="h-6 w-6" />
                    <span className="text-lg font-bold">EventHub</span>
                  </div>
                  <nav className="flex-1 py-4">
                    <div className="grid gap-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-accent"
                      >
                        <CalendarDays className="h-4 w-4" />
                        My Events
                      </Link>
                      <Link
                        href="/dashboard/registrations"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                      >
                        <User className="h-4 w-4" />
                        Registrations
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </div>
                  </nav>
                  <div className="border-t py-4">
                    <Link
                      href="/logout"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6" />
              <span className="text-lg font-bold hidden md:inline-block">EventHub</span>
            </Link>
          </div>
          <nav className="hidden gap-6 lg:flex">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              My Events
            </Link>
            <Link href="/dashboard/registrations" className="text-sm font-medium transition-colors hover:text-primary">
              Registrations
            </Link>
            <Link href="/dashboard/settings" className="text-sm font-medium transition-colors hover:text-primary">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/events/create">
              <Button size="sm" className="hidden md:flex">
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <span className="hidden md:inline-block">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Events</h1>
                <p className="text-muted-foreground">Manage your events and track registrations</p>
              </div>
              <Link href="/events/create" className="md:hidden">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </Link>
            </div>
            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <div className="hidden md:block">
                  <Link href="/events/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </Link>
                </div>
              </div>
              <TabsContent value="upcoming" className="mt-6">
                {upcomingEvents.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.map((event) => (
                      <DashboardEventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium">No upcoming events</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Get started by creating a new event.</p>
                    <Link href="/events/create" className="mt-4">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="past" className="mt-6">
                {pastEvents.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.map((event) => (
                      <DashboardEventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium">No past events</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Your completed events will appear here.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
