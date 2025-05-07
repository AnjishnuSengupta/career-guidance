"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface VideoPlayerProps {
  videoId: string
  title: string
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="relative pb-[56.25%] h-0 cursor-pointer" onClick={() => setIsOpen(true)}>
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-purple-600 border-b-8 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-black">
          <div className="relative pb-[56.25%] h-0 w-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
