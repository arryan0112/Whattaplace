"use client"

import { useState, useMemo } from "react"
import type { Space, SearchFilters } from "@/types/space"

export function useSearch(spaces: Space[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({
    location: "All",
    activity: "All",
    priceRange: { min: 500, max: 10000 },
  })

  const filteredSpaces = useMemo(() => {
    let filtered = spaces

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (space) =>
          space.name.toLowerCase().includes(query) ||
          space.location.toLowerCase().includes(query) ||
          space.activity.toLowerCase().includes(query),
      )
    }

    // Apply location filter
    if (filters.location !== "All") {
      filtered = filtered.filter((space) => space.location === filters.location)
    }

    // Apply activity filter
    if (filters.activity !== "All") {
      filtered = filtered.filter((space) => space.activity === filters.activity)
    }

    // Apply price range filter
    filtered = filtered.filter(
      (space) => space.price >= filters.priceRange.min && space.price <= filters.priceRange.max,
    )

    return filtered
  }, [spaces, searchQuery, filters])

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredSpaces,
    resultsCount: filteredSpaces.length,
  }
}
