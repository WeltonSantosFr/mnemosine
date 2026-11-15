import { NextRequest, NextResponse } from "next/server";

interface CacheEntry {
  buffer: Uint8Array;
  contentType: string;
  timestamp: number;
}

// In-memory cache to ensure lightning fast responses and reduce network requests
const iconCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url") || searchParams.get("domain") || "";

  if (!rawUrl.trim()) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  let domain = "";
  let fullUrl = "";
  try {
    const formatted = rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
      ? rawUrl.trim()
      : `https://${rawUrl.trim()}`;
    const parsed = new URL(formatted);
    domain = parsed.hostname.toLowerCase();
    fullUrl = parsed.toString();
  } catch {
    return new NextResponse("Invalid URL parameter", { status: 400 });
  }

  if (!domain) {
    return new NextResponse("Invalid domain", { status: 400 });
  }

  // 1. Check in-memory cache
  const cached = iconCache.get(domain);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return new NextResponse(Buffer.from(cached.buffer), {
      status: 200,
      headers: {
        "Content-Type": cached.contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  }

  // Helper to store in cache and return
  const respondWithImage = (buffer: Uint8Array, contentType: string) => {
    iconCache.set(domain, { buffer, contentType, timestamp: Date.now() });
    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  };

  // 2. Primary: Try fetching authentic icon from unavatar.io
  try {
    const unavatarUrl = `https://unavatar.io/${domain}?fallback=false`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(unavatarUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const contentType = res.headers.get("content-type") || "image/png";
      const arrayBuffer = await res.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      if (bytes.length > 50) {
        return respondWithImage(bytes, contentType);
      }
    }
  } catch {
    // Continue to next strategy
  }

  // 3. Secondary: Fetch target site HTML and scrape <link rel="icon"> or apple-touch-icon
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const siteRes = await fetch(fullUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timeout);

    if (siteRes.ok) {
      const html = await siteRes.text();

      // Look for icons with preference to apple-touch-icon and larger png icons
      const candidates = [
        html.match(/<link[^>]+rel=["']apple-touch-icon(?:-precomposed)?["'][^>]+href=["']([^"']+)["']/i),
        html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']apple-touch-icon(?:-precomposed)?["']/i),
        html.match(/<link[^>]+rel=["']icon["'][^>]+sizes=["'][3-9]\d+x[3-9]\d+["'][^>]+href=["']([^"']+)["']/i),
        html.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i),
        html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:shortcut )?icon["']/i),
      ];

      const foundHref = candidates.find((m) => m && m[1])?.[1];
      if (foundHref) {
        const resolvedIconUrl = new URL(foundHref, fullUrl).toString();
        const imgController = new AbortController();
        const imgTimeout = setTimeout(() => imgController.abort(), 2000);

        const imgRes = await fetch(resolvedIconUrl, {
          signal: imgController.signal,
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });
        clearTimeout(imgTimeout);

        if (imgRes.ok) {
          const contentType = imgRes.headers.get("content-type") || "image/png";
          const arrayBuffer = await imgRes.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);

          if (bytes.length > 50) {
            return respondWithImage(bytes, contentType);
          }
        }
      }
    }
  } catch {
    // Continue to next strategy
  }

  // 4. Tertiary: Fallback to Google S2 / gstatic Favicon V2
  try {
    const gstaticUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=128`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(gstaticUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const contentType = res.headers.get("content-type") || "image/png";
      const arrayBuffer = await res.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Must be greater than 200 bytes to not be a 1x1 empty placeholder
      if (bytes.length > 200) {
        return respondWithImage(bytes, contentType);
      }
    }
  } catch {
    // Continue to 404
  }

  return new NextResponse("Icon not found", { status: 404 });
}
