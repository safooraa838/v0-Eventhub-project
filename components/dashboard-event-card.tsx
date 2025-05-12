import Link from "next/link"
import { CalendarDays, Clock, Edit, MapPin, MoreHorizontal, Trash, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  registrations: number
  capacity: number
}

interface DashboardEventCardProps {
  event: Event
}

export function DashboardEventCard({ event }: DashboardEventCardProps) {
  const registrationPercentage = Math.round((event.registrations / event.capacity) * 100)

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="aspect-video w-full object-cover"
          width={300}
          height={200}
        />
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/20 hover:bg-black/40">
                <MoreHorizontal className="h-4 w-4 text-white" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/events/${event.id}/edit`} className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/events/${event.id}/registrations`} className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  View Registrations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <h3 className="font-bold">{event.title}</h3>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Registrations</span>
            <span>
              {event.registrations} / {event.capacity}
            </span>
          </div>
          <Progress value={registrationPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Link href={`/events/${event.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            View
          </Button>
        </Link>
        <Link href={`/events/${event.id}/edit`}>
          <Button size="sm" className="w-full">
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
