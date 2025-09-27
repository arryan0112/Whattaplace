'use client'

import { useState, useEffect } from "react"
import { Search, MapPin, Activity, IndianRupee, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { locations, activities } from "@/data/spaces"
import type { SearchFilters as SpaceFilters } from "@/types/space"

interface SearchFiltersProps {
  filters: SpaceFilters
  onFiltersChange: (filters: SpaceFilters) => void
  onSearch: (query: string) => void
}

export function SearchFilters({ filters, onFiltersChange, onSearch }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  useEffect(() => {
    // Live search: run on every query change
    onSearch(searchQuery)
  }, [searchQuery])

  const handleLocationChange = (location: string) => onFiltersChange({ ...filters, location })
  const handleActivityChange = (activity: string) => onFiltersChange({ ...filters, activity })
  const handlePriceRangeChange = (values: number[]) =>
    onFiltersChange({ ...filters, priceRange: { min: values[0], max: values[1] } })

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-16 z-40 animate-slide-up theme-transition">
      <div className="container-responsive py-4 md:py-6">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-4 md:mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5" />
            <Input
              type="text"
              placeholder="Search spaces by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20 md:pr-24 py-2 md:py-3 text-base md:text-lg bg-background border-border focus:border-primary focus:ring-primary theme-transition"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300"
            >
              <span className="hidden sm:inline">Search</span>
              <Search className="h-4 w-4 sm:hidden" />
            </Button>
          </div>
        </form>

        {/* Mobile Filters */}
        <div className="md:hidden mb-4">
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between touch-target bg-background border-border hover:bg-muted theme-transition"
              >
                <span className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </span>
                <span className="text-xs text-muted-foreground">
                  {filters.location !== "All" || filters.activity !== "All" ? "Active" : ""}
                </span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4 animate-slide-up">
              <FilterControls
                filters={filters}
                onLocationChange={handleLocationChange}
                onActivityChange={handleActivityChange}
                onPriceRangeChange={handlePriceRangeChange}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:grid md:grid-cols-4 gap-4">
          <FilterControls
            filters={filters}
            onLocationChange={handleLocationChange}
            onActivityChange={handleActivityChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
        </div>

        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onLocationChange={handleLocationChange}
          onActivityChange={handleActivityChange}
          onPriceRangeChange={handlePriceRangeChange}
        />
      </div>
    </div>
  )
}

// Combined Filter Controls for Desktop & Mobile
interface FilterControlsProps {
  filters: SpaceFilters
  onLocationChange: (value: string) => void
  onActivityChange: (value: string) => void
  onPriceRangeChange: (values: number[]) => void
}

function FilterControls({ filters, onLocationChange, onActivityChange, onPriceRangeChange }: FilterControlsProps) {
  return (
    <>
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          Location
        </label>
        <Select value={filters.location} onValueChange={onLocationChange}>
          <SelectTrigger className="bg-background border-border theme-transition">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-foreground">
          <Activity className="h-4 w-4 mr-1" />
          Activity
        </label>
        <Select value={filters.activity} onValueChange={onActivityChange}>
          <SelectTrigger className="bg-background border-border theme-transition">
            <SelectValue placeholder="Select activity" />
          </SelectTrigger>
          <SelectContent>
            {activities.map((activity) => (
              <SelectItem key={activity} value={activity}>
                {activity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="flex items-center text-sm font-medium text-foreground">
          <IndianRupee className="h-4 w-4 mr-1" />
          Price Range (₹{filters.priceRange.min.toLocaleString()} - ₹{filters.priceRange.max.toLocaleString()})
        </label>
        <div className="px-3 py-2">
          <Slider
            value={[filters.priceRange.min, filters.priceRange.max]}
            onValueChange={onPriceRangeChange}
            min={500}
            max={10000}
            step={250}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₹500</span>
            <span>₹10,000</span>
          </div>
        </div>
      </div>
    </>
  )
}

// Active Filters Component
function ActiveFilters({ filters, onLocationChange, onActivityChange, onPriceRangeChange }: FilterControlsProps) {
  const hasActiveFilters =
    filters.location !== "All" ||
    filters.activity !== "All" ||
    filters.priceRange.min > 500 ||
    filters.priceRange.max < 10000

  if (!hasActiveFilters) return null

  return (
    <div className="flex flex-wrap gap-2 mt-4 animate-fade-in">
      {filters.location !== "All" && (
        <ActiveFilterChip
          icon={<MapPin className="h-3 w-3 mr-1" />}
          label={filters.location}
          color="blue"
          onRemove={() => onLocationChange("All")}
        />
      )}
      {filters.activity !== "All" && (
        <ActiveFilterChip
          icon={<Activity className="h-3 w-3 mr-1" />}
          label={filters.activity}
          color="green"
          onRemove={() => onActivityChange("All")}
        />
      )}
      {(filters.priceRange.min > 500 || filters.priceRange.max < 10000) && (
        <ActiveFilterChip
          icon={<IndianRupee className="h-3 w-3 mr-1" />}
          label={`₹${filters.priceRange.min.toLocaleString()} - ₹${filters.priceRange.max.toLocaleString()}`}
          color="purple"
          onRemove={() => onPriceRangeChange([500, 10000])}
        />
      )}
    </div>
  )
}

// Single Active Filter Chip
interface ActiveFilterChipProps {
  icon: React.ReactNode
  label: string
  color: "blue" | "green" | "purple"
  onRemove: () => void
}

function ActiveFilterChip({ icon, label, color, onRemove }: ActiveFilterChipProps) {
  const bgColor = `bg-${color}-100 dark:bg-${color}-900/30`
  const textColor = `text-${color}-800 dark:text-${color}-200`
  const removeColor = `text-${color}-600 dark:text-${color}-300 hover:text-${color}-800 dark:hover:text-${color}-100`

  return (
    <div className={`px-3 py-1 rounded-full text-sm flex items-center ${bgColor} ${textColor} hover:opacity-90 transition-colors`}>
      {icon}
      {label}
      <button onClick={onRemove} className={`ml-2 ${removeColor} touch-target`}>
        ×
      </button>
    </div>
  )
}
