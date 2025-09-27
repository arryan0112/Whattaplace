"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, User, Mail, Phone, MessageSquare, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Space } from "@/types/space"

interface BookingFormProps {
  space: Space | null
  isOpen: boolean
  onClose: () => void
}

interface BookingData {
  date: Date | undefined
  startTime: string
  duration: string
  name: string
  email: string
  phone: string
  message: string
  guests: string
}

export function BookingForm({ space, isOpen, onClose }: BookingFormProps) {
  const [bookingData, setBookingData] = useState<BookingData>({
    date: undefined,
    startTime: "",
    duration: "2",
    name: "",
    email: "",
    phone: "",
    message: "",
    guests: "1",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!space) return null

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  const durations = [
    { value: "1", label: "1 hour" },
    { value: "2", label: "2 hours" },
    { value: "3", label: "3 hours" },
    { value: "4", label: "4 hours" },
    { value: "6", label: "6 hours" },
    { value: "8", label: "8 hours" },
    { value: "full", label: "Full day" },
  ]

  const calculateTotal = () => {
    const hours = bookingData.duration === "full" ? 8 : Number.parseInt(bookingData.duration)
    return space.price * hours
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Booking submitted:", {
      space: space.name,
      ...bookingData,
      total: calculateTotal(),
    })

    alert(`Booking request submitted for ${space.name}! We'll contact you shortly to confirm.`)
    setIsSubmitting(false)
    onClose()
  }

  const updateBookingData = (field: keyof BookingData, value: string | Date | undefined) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book {space.name}</DialogTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Badge variant="secondary">{space.activity}</Badge>
            <span>•</span>
            <span>{space.location}</span>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                Select Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !bookingData.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingData.date ? format(bookingData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => updateBookingData("date", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Start Time
              </Label>
              <Select value={bookingData.startTime} onValueChange={(value) => updateBookingData("startTime", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={bookingData.duration} onValueChange={(value) => updateBookingData("duration", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Number of Guests</Label>
              <Select value={bookingData.guests} onValueChange={(value) => updateBookingData("guests", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: Math.min(space.facilities.capacity, 20) }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={bookingData.name}
                  onChange={(e) => updateBookingData("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => updateBookingData("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={bookingData.phone}
                onChange={(e) => updateBookingData("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                Special Requirements (Optional)
              </Label>
              <Textarea
                id="message"
                value={bookingData.message}
                onChange={(e) => updateBookingData("message", e.target.value)}
                placeholder="Any special requirements or questions..."
                rows={3}
              />
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />
              Booking Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Space:</span>
                <span className="font-medium">{space.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Rate:</span>
                <span>₹{space.price}/hour</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{durations.find((d) => d.value === bookingData.duration)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span>{bookingData.guests}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !bookingData.date ||
                !bookingData.startTime ||
                !bookingData.name ||
                !bookingData.email ||
                !bookingData.phone
              }
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
