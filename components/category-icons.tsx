import { Grid3X3, Camera, Video, Users, Mic, Music, Film, Calendar, Building } from "lucide-react"

const categories = [
  { name: "All Spaces", icon: Grid3X3, color: "text-blue-500" },
  { name: "Photoshoot", icon: Camera, color: "text-blue-500" },
  { name: "Video Shoot", icon: Video, color: "text-blue-500" },
  { name: "Workshops", icon: Users, color: "text-pink-500" },
  { name: "Podcast", icon: Mic, color: "text-green-500" },
  { name: "Dance shoot", icon: Music, color: "text-blue-500" },
  { name: "Film Shoot", icon: Film, color: "text-blue-500" },
  { name: "Events", icon: Calendar, color: "text-blue-500" },
  { name: "Exhibitions", icon: Building, color: "text-blue-500" },
]

export function CategoryIcons() {
  return (
    <div className="w-full py-8 md:py-12 animate-fade-in">
      <div className="container-responsive">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            const staggerDelay = `${index * 100}ms` // dynamic stagger

            return (
              <div
                key={category.name}
                className="flex flex-col items-center space-y-2 md:space-y-3 cursor-pointer group hover-lift"
                style={{ animationDelay: staggerDelay }}
                aria-label={category.name}
                title={category.name}
              >
                <div
                  className={`p-3 md:p-4 rounded-full bg-gray-50 group-hover:bg-gray-100 group-hover:scale-110 transition-all duration-300 ${category.color}`}
                >
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground text-center leading-tight group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
