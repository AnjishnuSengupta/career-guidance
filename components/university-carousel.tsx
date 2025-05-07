"use client"

import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface University {
  name: string
  image: string
  tags: string[]
  courses: string[]
  location: string
  description?: string
}

interface UniversityCarouselProps {
  universities: University[]
  autoRotateInterval?: number
}

export function UniversityCarousel({ universities, autoRotateInterval = 5000 }: UniversityCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotate carousel
  useEffect(() => {
    if (universities.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === universities.length - 1 ? 0 : prevIndex + 1))
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [universities, autoRotateInterval, isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? universities.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === universities.length - 1 ? 0 : prevIndex + 1))
  }

  if (universities.length === 0) {
    return null
  }

  return (
    <div
      className="relative max-w-md mx-auto h-[500px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 -left-12 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        aria-label="Previous university"
      >
        <ChevronUp className="h-6 w-6 text-gray-600" />
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        aria-label="Next university"
      >
        <ChevronDown className="h-6 w-6 text-gray-600" />
      </button>

      {/* Carousel content */}
      <div className="relative h-full overflow-hidden">
        {universities.map((university, index) => (
          <div
            key={university.name}
            className={`absolute w-full transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "top-0 opacity-100"
                : index < currentIndex
                  ? "-top-[600px] opacity-0"
                  : "top-[600px] opacity-0"
            }`}
          >
            <Card className="overflow-hidden h-[500px]">
              <div className="h-48 overflow-hidden">
                <img
                  src={university.image || "/placeholder.svg"}
                  alt={university.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{university.name}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {university.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 mb-1">Key Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {university.courses.slice(0, 3).map((course, idx) => (
                        <Badge key={idx} className="bg-purple-100 text-purple-800">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 mb-1">Location</h4>
                    <p className="text-gray-700 text-sm">{university.location}</p>
                  </div>
                  {university.description && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">About</h4>
                      <p className="text-gray-700 text-sm line-clamp-3">{university.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="absolute -bottom-10 left-0 right-0 flex justify-center space-x-2">
        {universities.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-purple-600 w-4" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
