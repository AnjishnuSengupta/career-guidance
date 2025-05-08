"use client";

import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  width?: string;
  height?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Make sure this is a default export to match your import in page.tsx
export default function VideoPlayer({ videoId, title, width = "100%", height = "315" }: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const youtubePlayerRef = useRef<any>(null);

  useEffect(() => {
    // Create a unique container ID for each player instance
    const containerId = `youtube-player-${videoId}`;
    
    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      
      // Use the first script tag as an insertion point
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      // Set up global callback required by YouTube API
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      // YouTube API is already loaded
      initializePlayer();
    }
    
    return () => {
      // Clean up player on unmount
      if (youtubePlayerRef.current) {
        try {
          youtubePlayerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying YouTube player:", error);
        }
      }
    };
  }, [videoId]); // Re-initialize when videoId changes

  function initializePlayer() {
    if (!playerRef.current) return;
    
    try {
      // Clear previous content if any
      if (playerRef.current.innerHTML !== '') {
        playerRef.current.innerHTML = '';
      }
      
      youtubePlayerRef.current = new window.YT.Player(playerRef.current, {
        videoId: videoId,
        width: width,
        height: height,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onError: (event: any) => console.error("YouTube Player Error:", event),
        }
      });
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
      
      // Fallback to iframe if YT API fails
      if (playerRef.current) {
        playerRef.current.innerHTML = `
          <iframe 
            width="${width}" 
            height="${height}" 
            src="https://www.youtube.com/embed/${videoId}"
            title="${title || 'YouTube video player'}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        `;
      }
    }
  }

  return (
    <div className="video-container">
      <div ref={playerRef} id={`youtube-player-${videoId}`}></div>
    </div>
  );
}

// Add a named export to support both default and named imports
export { VideoPlayer };