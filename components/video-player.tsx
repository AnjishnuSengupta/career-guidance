"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative pb-[56.25%] h-0 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
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

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          // Allow Dialog to close and update our state
          if (!open) {
            setIsOpen(false);
          }
        }}
        modal
      >
        <DialogContent
          className="sm:max-w-3xl p-0 overflow-hidden bg-black"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>

          <button
            className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
            onClick={() => setIsOpen(false)}
            data-close="true"
          >
            <X size={20} />
          </button>
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
  );
}
