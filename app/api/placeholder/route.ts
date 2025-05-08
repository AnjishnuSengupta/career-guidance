import { NextResponse } from "next/server";

/**
 * API route handler for generating placeholder SVG images
 * This dynamic API generates SVG placeholders with customizable dimensions
 * It solves the 404 errors from missing placeholder images
 */
export async function GET(request: Request) {
  try {
    // Get the query parameters from the URL
    const { searchParams } = new URL(request.url);
    const width = parseInt(searchParams.get("width") || "300", 10);
    const height = parseInt(searchParams.get("height") || "150", 10);
    
    // Define colors - using purple to match the site theme
    const bgColor = "#F3F4F6"; // Light gray
    const textColor = "#7C3AED"; // Purple
    
    // Create an SVG with the requested dimensions
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${textColor}" stroke-opacity="0.2" stroke-width="2"/>
        <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="${textColor}" stroke-opacity="0.2" stroke-width="2"/>
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="16" 
          text-anchor="middle" 
          dominant-baseline="middle" 
          fill="${textColor}">
          ${width} × ${height}
        </text>
      </svg>
    `;

    // Return the SVG with appropriate content type
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400" // Cache for 1 day
      },
    });
  } catch (error) {
    console.error("Error generating placeholder SVG:", error);
    return NextResponse.json(
      { error: "Failed to generate placeholder image" },
      { status: 500 }
    );
  }
}