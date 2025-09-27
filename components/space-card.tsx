'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, IndianRupee } from 'lucide-react'
import type { Space } from '@/types/space'

interface SpaceCardProps {
  space: Space
  onClick: (space: Space) => void
}

export function SpaceCard({ space, onClick }: SpaceCardProps) {
  return (
    <Card
      onClick={() => onClick(space)}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Image */}
      <div className="h-40 w-full overflow-hidden rounded-t-lg flex-shrink-0">
        <img
          src={space.imageUrl || '/placeholder.svg'}
          alt={space.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <CardContent className="p-4 flex-1 min-h-0 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-sm font-semibold line-clamp-2 flex-1">
            {space.name}
          </CardTitle>
          <Badge variant="secondary" className="text-xs px-2 py-1 ml-2">
            {space.activity}
          </Badge>
        </div>

        <div className="flex items-center text-muted-foreground text-xs mb-2">
          <MapPin className="w-3 h-3 mr-1" /> {space.location}
        </div>

        <div className="flex items-center text-foreground font-bold text-sm mb-2">
          <IndianRupee className="w-4 h-4 mr-1" />
          {space.price.toLocaleString('en-IN')}
          <span className="text-muted-foreground text-xs ml-1">per hour</span>
        </div>

        {/* Scrollable description */}
        <div className="text-muted-foreground text-xs leading-snug flex-1 overflow-y-auto min-h-0">
          {space.description || 'No description available for this space.'}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="mt-2"
          onClick={() => onClick(space)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
