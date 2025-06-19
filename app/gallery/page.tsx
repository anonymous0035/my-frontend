"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize2, Home, Wrench, CloudLightning, Droplets, Filter } from "lucide-react"

// TypeScript interfaces
interface Project {
  id: number
  title: string
  location: string
  category: string
  description: string
  date: string
  testimonial: string
  customerName: string
  beforeImageUrl: string
  afterImageUrl: string
}

interface ProjectCardProps {
  project: Project
  index: number
  onViewDetails: (projectIndex: number) => void
}

// Project categories
const categories = [
  { id: "all", label: "All Projects" },
  { id: "replacement", label: "Roof Replacement", icon: Home },
  { id: "repair", label: "Roof Repair", icon: Wrench },
  { id: "storm", label: "Storm Damage", icon: CloudLightning },
  { id: "gutters", label: "Gutter Projects", icon: Droplets },
]

// Project data
const projects = [
  {
    id: 1,
    title: "Modern Kitchen Renovation",
    location: "Austin, TX",
    category: "replacement", // Add this line
    description: "Complete kitchen transformation with custom cabinetry, quartz countertops, and premium appliances.",
    date: "March 2024",
    testimonial: "The team exceeded our expectations! Our kitchen is now the heart of our home.",
    customerName: "Sarah Johnson",
    beforeImageUrl: "/images/gallery/before1.jpg",
    afterImageUrl: "/images/gallery/after1.jpg",
  },
  {
    id: 2,
    title: "Luxury Bathroom Remodel",
    location: "Houston, TX",
    category: "repair", // Add this line
    description: "Spa-like bathroom featuring marble tiles, rainfall shower, and heated floors.",
    date: "February 2024",
    testimonial: "Every morning feels like a retreat in our new bathroom. Absolutely stunning work!",
    customerName: "Michael Chen",
    beforeImageUrl: "/images/gallery/before2.jpeg",
    afterImageUrl: "/images/gallery/after2.jpg",
  },
  {
    id: 3,
    title: "Open Concept Living Space",
    location: "Dallas, TX",
    category: "replacement", // Add this line
    description: "Removed walls to create an open floor plan connecting kitchen, dining, and living areas.",
    date: "January 2024",
    testimonial: "The open concept has completely transformed how our family lives and entertains.",
    customerName: "The Rodriguez Family",
    beforeImageUrl: "/images/gallery/before3.jpeg",
    afterImageUrl: "/images/gallery/after3.jpg",
  },
  {
    id: 4,
    title: "Master Suite Addition",
    location: "San Antonio, TX",
    category: "replacement", // Add this line
    description: "Added a luxurious master suite with walk-in closet and ensuite bathroom.",
    date: "December 2023",
    testimonial: "Our new master suite is our personal sanctuary. The craftsmanship is exceptional.",
    customerName: "David & Lisa Thompson",
    beforeImageUrl: "/images/gallery/before1.jpg",
    afterImageUrl: "/images/gallery/after1.jpg",
  },
  {
    id: 5,
    title: "Outdoor Living Expansion",
    location: "Fort Worth, TX",
    category: "gutters", // Add this line
    description: "Created an outdoor kitchen and covered patio area perfect for entertaining.",
    date: "November 2023",
    testimonial: "We now spend most of our time in our beautiful outdoor space. It's like having a resort at home.",
    customerName: "Jennifer Martinez",
    beforeImageUrl: "/images/gallery/before2.jpeg",
    afterImageUrl: "/images/gallery/after2.jpg",
  },
  {
    id: 6,
    title: "Historic Home Restoration",
    location: "Galveston, TX",
    category: "storm", // Add this line
    description: "Carefully restored a 1920s home while adding modern amenities and efficiency.",
    date: "October 2023",
    testimonial: "They preserved the character of our historic home while making it perfect for modern living.",
    customerName: "Robert & Anne Wilson",
    beforeImageUrl: "/images/gallery/before3.jpeg",
    afterImageUrl: "/images/gallery/after3.jpg",
  },
]

function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const [cardShowBefore, setCardShowBefore] = useState(false)

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={
            cardShowBefore ? project.beforeImageUrl || "/placeholder.svg" : project.afterImageUrl || "/placeholder.svg"
          }
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">{project.date}</span>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm border-white/30 text-gray-800 hover:bg-white text-xs h-7 px-2"
            onClick={() => setCardShowBefore(!cardShowBefore)}
          >
            {cardShowBefore ? "After" : "Before"}
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold mb-1 text-gray-800">{project.title}</h3>
        <p className="text-xs text-gray-500 mb-2">{project.location}</p>
        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-brand-green text-brand-green hover:bg-brand-green/10 text-xs"
          onClick={() => onViewDetails(index)}
        >
          View Details
        </Button>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [currentProject, setCurrentProject] = useState(0)
  const [showBefore, setShowBefore] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeCategory))
    }
    setCurrentProject(0)
  }, [activeCategory])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % filteredProjects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gray-50 py-10">
        <div className="corporate-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-semibold mb-3 text-gray-800">Project Gallery</h1>
            <p className="text-base text-gray-600">
              Browse our portfolio of completed roofing projects throughout the Houston area. See the quality of our
              work and the transformations we've achieved for our satisfied customers.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="corporate-container py-6 border-b border-gray-100">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 text-brand-orange mr-2" />
          <h2 className="text-base font-semibold text-gray-800">Filter Projects</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`text-xs ${
                activeCategory === category.id
                  ? "bg-brand-orange hover:bg-brand-orange/90 text-white"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon && <category.icon className="h-3 w-3 mr-1" />}
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Project */}
      <div className="corporate-container py-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Featured Project</h2>

        <div className="relative rounded-md overflow-hidden shadow-sm">
          <div className="relative aspect-[16/9]">
            <div className="absolute inset-0">
              <img
                src={
                  showBefore
                    ? filteredProjects[currentProject]?.beforeImageUrl || "/placeholder.svg"
                    : filteredProjects[currentProject]?.afterImageUrl || "/placeholder.svg"
                }
                alt={filteredProjects[currentProject]?.title || "Project"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <h3 className="text-xl font-semibold mb-1">{filteredProjects[currentProject].title}</h3>
                <p className="text-sm text-white/80 mb-1">{filteredProjects[currentProject].location}</p>
                <p className="text-xs text-white/70">{filteredProjects[currentProject].description}</p>
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-xs"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Maximize2 className="h-3 w-3 mr-1" />
                  Enlarge
                </Button>
              </div>

              <div className="absolute top-4 left-4">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-md text-xs font-medium">
                  {showBefore ? "BEFORE" : "AFTER"}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 h-8 w-8"
              onClick={prevProject}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 h-8 w-8"
              onClick={nextProject}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-1">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentProject === index ? "bg-brand-orange" : "bg-gray-300"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-brand-green text-brand-green hover:bg-brand-green/10 text-xs"
            onClick={() => setShowBefore(!showBefore)}
          >
            Show {showBefore ? "After" : "Before"}
          </Button>
        </div>

        <div className="mt-6 bg-white p-4 rounded-md shadow-sm">
          <div className="flex items-start">
            <div className="text-3xl text-brand-orange font-serif mr-3">"</div>
            <div>
              <p className="text-sm text-gray-600 italic mb-3">{filteredProjects[currentProject].testimonial}</p>
              <p className="text-sm font-medium text-gray-800">— {filteredProjects[currentProject].customerName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="corporate-container py-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewDetails={(projectIndex) => {
                setCurrentProject(projectIndex)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          ))}
        </div>
      </div>

      {/* Full-screen modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 h-8 w-8"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="relative w-full max-w-4xl aspect-[16/9]">
            <img
              src={
                showBefore
                  ? filteredProjects[currentProject]?.beforeImageUrl || "/placeholder.svg"
                  : filteredProjects[currentProject]?.afterImageUrl || "/placeholder.svg"
              }
              alt={filteredProjects[currentProject]?.title || "Project"}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2">{filteredProjects[currentProject].title}</h3>
              <p className="text-sm text-white/80">{filteredProjects[currentProject].location}</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-sm"
              onClick={() => setShowBefore(!showBefore)}
            >
              Show {showBefore ? "After" : "Before"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
