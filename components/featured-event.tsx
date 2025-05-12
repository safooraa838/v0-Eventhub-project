import Link from "next/link"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  attendees: number
}

interface FeaturedEventProps {
  event: Event
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="aspect-[2/1] w-full object-cover"
          width={800}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
      </div>
      <CardHeader className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold">{event.title}</h3>
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
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href={`/events/${event.id}`}>
            <Button className="w-full sm:w-auto">Register Now</Button>
          </Link>
          <Link href={`/events/${event.id}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
