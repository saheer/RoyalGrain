import {revalidateTag} from 'next/cache'
import {NextRequest, NextResponse} from 'next/server'

const TAGS = [
  'home',
  'travelGuide',
  'contact',
  'footer',
  'about',
  'instagramFeed',
  'ourExpertise',
  'holidays',
  'seo',
]

// Sanity webhook target: POST /api/revalidate?secret=YOUR_SECRET
export async function POST(req: NextRequest) {
  if (req.nextUrl.searchParams.get('secret') !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({message: 'Invalid secret'}, {status: 401})
  }
  // expire: 0 -> cache is dropped immediately, the next visit gets fresh content
  for (const tag of TAGS) revalidateTag(tag, {expire: 0})
  return NextResponse.json({revalidated: true, tags: TAGS})
}