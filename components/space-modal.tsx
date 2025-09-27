'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Star,
  MapPin,
  Users,
  Wifi,
  Car,
  Camera,
  X,
  IndianRupee,
  AirVent,
  Shield,
  Coffee,
  Zap,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
} from 'lucide-react'
import { GoogleMap } from './google-map'
import type { Space } from '@/types/space'
import { ClientOnly } from '@/components/ClientOnly'

// Client-only Rating
function Rating() {
  const [rating, setRating] = React.useState<number | null>(null)
  const [reviews, setReviews] = React.useState<number | null>(null)

  React.useEffect(() => {
    setRating(4 + Math.floor(Math.random() * 5) / 10)
    setReviews(Math.floor(Math.random() * 50) + 10)
  }, [])

  if (rating === null || reviews === null) return null

  return (
    <div className="flex items-center mb-4">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="ml-2 text-base font-semibold">{rating.toFixed(1)}</span>
      <span className="ml-2 text-muted-foreground text-sm">
        ({reviews} reviews)
      </span>
    </div>
  )
}

interface SpaceModalProps {
  space: Space | null
  isOpen: boolean
  onClose: () => void
  onBookingClick: (space: Space) => void
}

export function SpaceModal({
  space,
  isOpen,
  onClose,
  onBookingClick,
}: SpaceModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [is360View, setIs360View] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  if (!space) return null

  const images = [space.imageUrl, space.imageUrl, space.imageUrl]

  const amenities = [
    { icon: Wifi, label: 'High-speed WiFi', available: space.facilities.wifi, description: '100 Mbps fiber connection' },
    { icon: Car, label: 'Parking Available', available: space.facilities.parking, description: 'Free parking for 10 cars' },
    { icon: Users, label: `Capacity: ${space.facilities.capacity} people`, available: true, description: 'Comfortable seating arrangement' },
    { icon: AirVent, label: 'Air Conditioning', available: true, description: 'Climate controlled environment' },
    { icon: Shield, label: 'Security', available: true, description: '24/7 security & CCTV' },
    { icon: Coffee, label: 'Refreshments', available: true, description: 'Tea/coffee facilities available' },
    { icon: Zap, label: 'Power Backup', available: true, description: 'Uninterrupted power supply' },
    { icon: Camera, label: 'Photography Allowed', available: true, description: 'Professional equipment friendly' },
  ]

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Booking inquiry sent for ${space.name}! We'll contact you within 2 hours.`)
    setBookingData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <ClientOnly>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] lg:max-w-[1400px] w-full h-[95vh] lg:h-[90vh] p-0 rounded-2xl border-2 border-border bg-background flex flex-col">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-background/90 backdrop-blur-sm hover:bg-muted shadow-lg rounded-full w-10 h-10 p-0 border border-border"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex flex-col h-full overflow-hidden">
            {/* Image Gallery */}
            <div className="relative h-64 lg:h-72 w-full flex-shrink-0">
              <div className="w-full h-full relative overflow-hidden rounded-t-2xl">
                {is360View ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 dark:bg-gray-950 text-white text-center">
                    <Camera className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-xl font-semibold mb-2">360° Virtual Tour</p>
                    <p className="text-sm opacity-75 mb-2">Interactive 360° view placeholder</p>
                  </div>
                ) : (
                  <img
                    src={images[currentImageIndex] || '/placeholder.svg'}
                    alt={space.name}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute top-4 left-4 flex gap-2">
                  <Button
                    size="sm"
                    variant={is360View ? 'default' : 'secondary'}
                    onClick={() => setIs360View(!is360View)}
                    className="bg-background/90 backdrop-blur-sm hover:bg-muted shadow-lg border border-border text-xs"
                  >
                    <Camera className="w-3 h-3 mr-1" /> 360° View
                  </Button>
                </div>

                {!is360View && images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-white scale-125 shadow-lg'
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Details + Booking Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-7 gap-0 min-h-0">
              {/* Left Details */}
              <div className="lg:col-span-4 overflow-y-auto p-6 bg-background min-h-0">
                <DialogHeader className="mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-2xl font-bold text-foreground mb-2">{space.name}</DialogTitle>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-2" /> {space.location}
                      </div>
                      <Badge variant="secondary" className="text-xs px-2 py-1">{space.activity}</Badge>
                    </div>
                    <div className="text-right">
                      <ClientOnly>
                        <div className="flex items-center text-2xl font-bold text-foreground mb-1">
                          <IndianRupee className="w-6 h-6 mr-1" />
                          {space.price.toLocaleString('en-IN')}
                        </div>
                      </ClientOnly>
                      <div className="text-muted-foreground text-xs">per hour</div>
                    </div>
                  </div>
                </DialogHeader>

                <ClientOnly><Rating /></ClientOnly>

                <Separator className="my-4" />

                {/* Amenities */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3">Facilities & Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className={`flex items-start p-2 rounded-lg border text-sm ${
                          amenity.available
                            ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                            : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center mr-2">
                          {amenity.available ? (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <amenity.icon
                            className={`w-3 h-3 ml-1 ${
                              amenity.available
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-400'
                            }`}
                          />
                        </div>
                        <div>
                          <div className={`font-medium text-xs ${amenity.available ? 'text-foreground' : 'text-muted-foreground'}`}>{amenity.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{amenity.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* About Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">About this space</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    This unique {space.activity.toLowerCase()} space in {space.location} offers an exceptional environment
                    for your creative projects. With a capacity of {space.facilities.capacity} people, it's perfect for
                    both intimate sessions and larger productions. The space features modern amenities and flexible
                    booking options to suit your needs.
                  </p>
                </div>

                <Separator className="my-4" />

                {/* Contact */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm"><Phone className="w-3 h-3 mr-2 text-muted-foreground" /> +91 98765 43210</div>
                    <div className="flex items-center text-sm"><Mail className="w-3 h-3 mr-2 text-muted-foreground" /> booking@whattaplace.com</div>
                  </div>
                </div>
              </div>

              {/* Right Booking + Map */}
              <div className="lg:col-span-3 bg-gray-50 dark:bg-gray-900 border-l border-border flex flex-col overflow-hidden min-h-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div>
                    <h3 className="text-base font-semibold mb-2">Location</h3>
                    <div className="h-44 rounded-lg overflow-hidden border border-border">
                      <ClientOnly><GoogleMap space={space} /></ClientOnly>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-base font-semibold mb-3">Quick Booking Inquiry</h3>
                    <form onSubmit={handleBookingSubmit} className="space-y-3">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={bookingData.message}
                          onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full mt-2">Send Inquiry</Button>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  )
}
