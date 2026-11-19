import { cacheLife, cacheTag } from "next/cache";

// One tile of the Instagram Feed page (from the live feed or from Sanity).
export type InstagramTile = {
  id: string;
  imageUrl: string;
  alt?: string | null;
  caption?: string | null;
  permalink?: string | null;
  isVideo?: boolean;
};

type GraphMedia = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
};

/**
 * Latest posts of the Instagram account, via the Instagram API (Instagram Login).
 * Needs a long-lived access token in INSTAGRAM_ACCESS_TOKEN (see .env.example).
 * Without a token, or if Instagram is unreachable, it returns [] and the page
 * shows the posts entered manually in Sanity instead. It never throws.
 *
 * Cached for a few hours; refreshed instantly when the "instagramFeed" tag is
 * revalidated (see app/api/revalidate/route.ts).
 */
export async function getInstagramLivePosts(limit = 12): Promise<InstagramTile[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("instagramFeed");

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,thumbnail_url,permalink",
    );
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("access_token", token);

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: GraphMedia[] };

    return (json.data ?? [])
      .map((m): InstagramTile | null => {
        const isVideo = m.media_type === "VIDEO";
        const imageUrl = isVideo ? m.thumbnail_url : m.media_url;
        if (!imageUrl) return null;
        return {
          id: m.id,
          imageUrl,
          caption: m.caption ?? null,
          permalink: m.permalink ?? null,
          isVideo,
        };
      })
      .filter((t): t is InstagramTile => t !== null);
  } catch {
    return [];
  }
}
