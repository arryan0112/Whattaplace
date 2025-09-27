"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Users, Wifi, Car, IndianRupee } from "lucide-react"
import type { Space } from "@/types/space"

interface SpaceCardProps {
  space: Space
  onClick: (space: Space) => void
}

export function SpaceCard({ space, onClick }: SpaceCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-500 cursor-pointer group hover:-translate-y-2 hover:scale-[1.02] border-0 shadow-lg bg-card theme-transition"
      onClick={() => onClick(space)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={space.imageUrl || "/placeholder.svg"}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg group-hover:bg-background group-hover:scale-105 transition-all duration-300 border border-border/50">
          <div className="flex items-center">
            <IndianRupee className="w-3 h-3 mr-1 text-foreground" />
            <span className="text-sm font-bold text-foreground">{space.price.toLocaleString("en-IN")}/hr</span>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg group-hover:bg-blue-600 group-hover:scale-105 transition-all duration-300">
          <span className="text-xs font-semibold text-white">{space.activity}</span>
        </div>
      </div>

      <CardContent className="p-5 bg-card">
        <div className="mb-3">
          <h3 className="font-bold text-xl text-foreground text-balance mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {space.name}
          </h3>
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
            <span className="font-medium">{space.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="ml-2 font-semibold text-foreground">4.{Math.floor(Math.random() * 5) + 5}</span>
            <span className="ml-2 text-sm text-muted-foreground">({Math.floor(Math.random() * 50) + 10} reviews)</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
            <span className="font-medium">{space.facilities.capacity}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {space.facilities.wifi && (
            <div className="flex items-center group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
              <Wifi className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">WiFi</span>
            </div>
          )}
          {space.facilities.parking && (
            <div className="flex items-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              <Car className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Parking</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
