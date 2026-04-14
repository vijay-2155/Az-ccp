import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return new NextResponse("Missing id", { status: 400 });

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) return new NextResponse("Not configured", { status: 503 });

  // Download file content via Drive API — works for publicly shared files
  const url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) return new NextResponse("Failed to fetch image", { status: res.status });

  const contentType = res.headers.get("Content-Type") ?? "image/jpeg";

  return new NextResponse(res.body, {
    headers: {
      "Content-Type": contentType,
      // Cache for 7 days on CDN + browser — Drive images don't change
      "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
    },
  });
}
