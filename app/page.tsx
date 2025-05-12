import Link from "next/link"
import { CalendarDays, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedEvent } from "@/components/featured-event"
import { EventCard } from "@/components/event-card"

export default function Home() {
  // In a real app, these would come from the database
  const featuredEvent = {
    id: "1",
    title: "Tech Conference 2025",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    date: "June 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco Convention Center",
    image: "/placeholder.svg?height=400&width=800",
    attendees: 1250,
  }

  const upcomingEvents = [
    {
      id: "2",
      title: "Web Development Workshop",
      description: "Learn the latest web development techniques and tools.",
      date: "May 25, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "Online",
      image: "/placeholder.svg?height=200&width=300",
      attendees: 120,
    },
    {
      id: "3",
      title: "Networking Mixer",
      description: "Connect with professionals in your industry.",
      date: "June 5, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Downtown Business Center",
      image: "/placeholder.svg?height=200&width=300",
      attendees: 75,
    },
    {
      id: "4",
      title: "Product Management Seminar",
      description: "Strategies for effective product management.",
      date: "June 10, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Innovation Hub",
      image: "/placeholder.svg?height=200&width=300",
      attendees: 90,
    },
  ]

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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover and Create Amazing Events
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Manage events, track registrations, and sync with your calendar - all in one place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/events">
                  <Button size="lg">Browse Events</Button>
                </Link>
                <Link href="/events/create">
                  <Button size="lg" variant="outline">
                    Create Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Event</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Don't miss out on our highlighted event of the month.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-8">
              <FeaturedEvent event={featuredEvent} />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our selection of upcoming events and secure your spot today.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/events">
                <Button variant="outline" size="lg">
                  View All Events
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose EventHub?</h2>
                <p className="text-muted-foreground md:text-xl">
                  Our platform makes event management simple, efficient, and stress-free.
                </p>
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">User-Friendly Registration</h3>
                      <p className="text-muted-foreground">
                        Simple registration process for attendees with automatic confirmations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <CalendarDays className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Calendar Integration</h3>
                      <p className="text-muted-foreground">
                        Sync events with your favorite calendar apps for easy scheduling.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Real-Time Updates</h3>
                      <p className="text-muted-foreground">
                        Get instant notifications about event changes and registrations.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Event management dashboard"
                    className="object-cover"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
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
