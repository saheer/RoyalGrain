import {cacheLife, cacheTag} from 'next/cache'
import {client} from './client'
import {expertisePageBySlugQuery, expertisePagesListQuery} from './queries'
import {buildExpertiseIndex, type ExpertiseListItem} from '@/lib/expertisePages'

// One expertise detail page, or null when it hasn't been created in Studio yet (the page then
// uses the built-in content from lib/expertisePages.ts, if it is one of the original five).
// Cached like the other fetchers and refreshed by the "ourExpertise" / "seo" tags
// (see app/api/revalidate/route.ts).
export async function getExpertisePageDoc(slug: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag('ourExpertise', 'seo')

  return client.fetch(expertisePageBySlugQuery, {slug})
}

// Every expertise page for the footer, the listing and the "More from Our Expertise" row:
// the built-in five plus any page added in Studio. Never throws: if Sanity can't be reached
// the built-in five are returned.
export async function getExpertiseIndex(): Promise<ExpertiseListItem[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('ourExpertise')

  const docs = await client.fetch(expertisePagesListQuery).catch(() => [])
  return buildExpertiseIndex(docs)
}
