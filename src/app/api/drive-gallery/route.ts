import { NextRequest, NextResponse } from "next/server";

export interface DriveFile {
  id: string;
  name: string;
}

export async function GET(req: NextRequest) {
  const folderId = req.nextUrl.searchParams.get("folderId");
  if (!folderId) {
    return NextResponse.json({ error: "folderId is required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Drive API not configured" }, { status: 503 });
  }

  const query = encodeURIComponent(
    `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
  );

  const url =
    `https://www.googleapis.com/drive/v3/files` +
    `?q=${query}` +
    `&fields=files(id,name)` +
    `&orderBy=createdTime` +
    `&pageSize=50` +
    `&key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err?.error?.message ?? "Drive API error" },
        { status: res.status },
      );
    }
    const data = await res.json();
    const files: DriveFile[] = (data.files ?? []).map((f: DriveFile) => ({
      id: f.id,
      name: f.name,
    }));
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ error: "Failed to reach Drive API" }, { status: 500 });
  }
}
