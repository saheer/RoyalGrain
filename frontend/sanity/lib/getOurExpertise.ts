import {cacheLife, cacheTag} from 'next/cache'
import {client} from './client'
import {ourExpertiseQuery} from './queries'

// Cached like the other fetchers; busted by the "ourExpertise" tag
// (see app/api/revalidate/route.ts)
export async function getOurExpertise() {
  'use cache'
  cacheLife('minutes')
  cacheTag('ourExpertise')

  return client.fetch(ourExpertiseQuery)
}
