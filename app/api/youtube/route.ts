import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Get the query parameter from the URL
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || "career guidance"

  // In a real implementation, you would use the YouTube API with your API key
  // const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  // const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${query}&type=video&key=${YOUTUBE_API_KEY}`

  // For this demo, we'll return mock data
  const mockVideos = [
    {
      id: "video1",
      title: "Introduction to Computer Science",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channelTitle: "Tech Academy",
      publishedAt: "2023-05-15",
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: "video2",
      title: "Business Management Fundamentals",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channelTitle: "Business School",
      publishedAt: "2023-06-20",
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: "video3",
      title: "Psychology 101",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channelTitle: "Mind Matters",
      publishedAt: "2023-07-10",
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: "video4",
      title: "Introduction to Medical Sciences",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channelTitle: "Medical Academy",
      publishedAt: "2023-08-05",
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: "video5",
      title: "Engineering Principles",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channelTitle: "Engineering Hub",
      publishedAt: "2023-09-12",
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: "video6",
      title: "Law and Ethics",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channelTitle: "Legal Studies",
      publishedAt: "2023-10-18",
      videoId: "dQw4w9WgXcQ",
    },
  ]

  // Add query-specific results
  if (query !== "career guidance") {
    mockVideos.unshift({
      id: "querySpecific",
      title: `${query} - Comprehensive Guide`,
      thumbnail: "/placeholder.svg?height=180&width=320",
      channelTitle: "Pathway Education",
      publishedAt: "2023-11-25",
      videoId: "dQw4w9WgXcQ",
    })
  }

  return NextResponse.json({ items: mockVideos })
}
