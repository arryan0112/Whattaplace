"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CategoryIcons } from "@/components/category-icons"
import { SearchFilters } from "@/components/search-filters"
import { SpacesGrid } from "@/components/spaces-grid"
import { SpaceModal } from "@/components/space-modal"
import { BookingForm } from "@/components/booking-form"
import { spaces } from "@/data/spaces"
import { useSearch } from "@/hooks/use-search"
import type { Space } from "@/types/space"

export default function Home() {
  const { searchQuery, setSearchQuery, filters, setFilters, filteredSpaces, resultsCount } = useSearch(spaces)
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedSpace(null)
  }

  const handleBookingClick = (space: Space) => {
    setSelectedSpace(space)
    setIsModalOpen(false)
    setIsBookingOpen(true)
  }

  const handleBookingClose = () => {
    setIsBookingOpen(false)
    setSelectedSpace(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">All Spaces</h1>
            <p className="text-xl text-muted-foreground text-balance">Enjoy, browse & book the most unique locations</p>
          </div>
        </section>

        {/* Category Icons */}
        <CategoryIcons />

        {/* Search and Filters */}
        <SearchFilters filters={filters} onFiltersChange={setFilters} onSearch={setSearchQuery} />

        {/* Results Section */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {resultsCount} {resultsCount === 1 ? "space" : "spaces"} available
              </h2>
              <div className="text-sm text-muted-foreground">Showing results for your search</div>
            </div>

            <SpacesGrid spaces={filteredSpaces} onSpaceClick={handleSpaceClick} />
          </div>
        </section>
      </main>

      {/* Space Modal */}
      <SpaceModal
        space={selectedSpace}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onBookingClick={handleBookingClick}
      />

      {/* Booking Form Modal */}
      <BookingForm space={selectedSpace} isOpen={isBookingOpen} onClose={handleBookingClose} />
    </div>
  )
}
