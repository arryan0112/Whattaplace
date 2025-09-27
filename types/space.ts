export interface Space {
  id: number
  name: string
  location: string
  activity: string
  price: number
  imageUrl: string
  image360Url: string
  facilities: {
    wifi: boolean
    parking: boolean
    capacity: number
  }
  googlePlaceId: string
}

export interface SearchFilters {
  location: string
  activity: string
  priceRange: {
    min: number
    max: number
  }
}
