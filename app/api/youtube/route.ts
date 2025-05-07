import { NextResponse } from "next/server"

/**
 * API route handler for fetching relevant YouTube videos
 * This endpoint accepts a query parameter to search for specific videos
 * It's designed to work with the career guidance platform to show stream-specific content
 */
export async function GET(request: Request) {
  try {
    // Get the query parameter from the URL
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || "career guidance"
    
    // Get the YouTube API key from environment variables
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
    
    if (!YOUTUBE_API_KEY) {
      console.error("YouTube API key is not defined")
      return NextResponse.json(
        { error: "YouTube API key is not configured" },
        { status: 500 }
      )
    }
    
    // Create the YouTube API URL
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
    
    // Fetch data from the YouTube API
    const response = await fetch(url, { 
      headers: {
        "Accept": "application/json"
      },
      // Adding cache control to avoid rate limiting issues
      cache: 'no-store'
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }))
      console.error("YouTube API error:", errorData)
      return NextResponse.json(
        { error: "Failed to fetch videos from YouTube API" },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    
    // Format the data to match the expected structure
    // Define interfaces for YouTube API response structure
    interface YouTubeVideoId {
      videoId: string;
    }
    
    interface YouTubeThumbnail {
      url: string;
      width: number;
      height: number;
    }
    
    interface YouTubeThumbnails {
      default?: YouTubeThumbnail;
      medium?: YouTubeThumbnail;
      high?: YouTubeThumbnail;
    }
    
    interface YouTubeSnippet {
      title: string;
      thumbnails: YouTubeThumbnails;
      channelTitle: string;
      publishedAt: string;
      description: string;
    }
    
    interface YouTubeVideoItem {
      id: YouTubeVideoId;
      snippet: YouTubeSnippet;
      kind: string;
    }
    
    interface YouTubeApiResponse {
      items: YouTubeVideoItem[];
      kind: string;
      pageInfo: {
      totalResults: number;
      resultsPerPage: number;
      };
    }
    
    // Define interface for our formatted video structure
    interface FormattedVideo {
      id: string;
      title: string;
      thumbnail: string;
      channelTitle: string;
      publishedAt: string;
      videoId: string;
    }
    
    const formattedVideos: FormattedVideo[] = (data as YouTubeApiResponse).items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || "/placeholder.svg?height=180&width=320",
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt.split("T")[0], // Format as YYYY-MM-DD
      videoId: item.id.videoId
    }))
    
    return NextResponse.json({ items: formattedVideos })
  } catch (error) {
    console.error("Error fetching YouTube videos:", error)
    return NextResponse.json(
      { error: "Internal server error while fetching videos" },
      { status: 500 }
    )
  }
}