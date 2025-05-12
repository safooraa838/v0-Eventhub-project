"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CalendarPage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState("month")

  // In a real app, these would come from the database
  const events = [
    {
      id: "1",
      title: "Tech Conference 2025",
      date: new Date(2025, 5, 15), // June 15, 2025
      endDate: new Date(2025, 5, 17), // June 17, 2025
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco Convention Center",
    },
    {
      id: "2",
      title: "Web Development Workshop",
      date: new Date(2025, 4, 25), // May 25, 2025
      time: "10:00 AM - 3:00 PM",
      location: "Online",
    },
    {
      id: "3",
      title: "Networking Mixer",
      date: new Date(2025, 5, 5), // June 5, 2025
      time: "6:00 PM - 9:00 PM",
      location: "Downtown Business Center",
    },
    {
      id: "4",
      title: "Product Management Seminar",
      date: new Date(2025, 5, 10), // June 10, 2025
      time: "9:00 AM - 12:00 PM",
      location: "Innovation Hub",
    },
  ]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const hasEvent = (date: Date) => {
    return events.some(
      (event) =>
        date.getDate() === event.date.getDate() &&
        date.getMonth() === event.date.getMonth() &&
        date.getFullYear() === event.date.getFullYear(),
    )
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        date.getDate() === event.date.getDate() &&
        date.getMonth() === event.date.getMonth() &&
        date.getFullYear() === event.date.getFullYear(),
    )
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-border p-1" />)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dayEvents = getEventsForDate(date)

      days.push(
        <div key={`day-${day}`} className={`h-24 border border-border p-1 ${isToday(date) ? "bg-primary/10" : ""}`}>
          <div className="flex justify-between">
            <span className={`text-sm font-medium ${isToday(date) ? "text-primary" : ""}`}>{day}</span>
            {hasEvent(date) && <div className="h-2 w-2 rounded-full bg-primary" />}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="block truncate rounded bg-primary/20 px-1 py-0.5 text-xs font-medium text-primary hover:bg-primary/30"
              >
                {event.title}
              </Link>
            ))}
          </div>
        </div>,
      )
    }

    return days
  }

  const renderWeekdays = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return weekdays.map((day) => (
      <div key={day} className="font-medium text-center py-2">
        {day}
      </div>
    ))
  }

  const renderListView = () => {
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

    return (
      <div className="space-y-4">
        {sortedEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {event.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {event.endDate &&
                      ` - ${event.endDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="mt-4">
                <Link href={`/events/${event.id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
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
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
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
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Event Calendar</h1>
              <p className="text-muted-foreground">View and manage your upcoming events</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={view} onValueChange={setView}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/events/create">
                <Button>Create Event</Button>
              </Link>
            </div>
          </div>

          {view === "month" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{formatMonth(currentMonth)}</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous month</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next month</span>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7">{renderWeekdays()}</div>
              <div className="grid grid-cols-7">{renderCalendar()}</div>
            </div>
          ) : (
            renderListView()
          )}
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
