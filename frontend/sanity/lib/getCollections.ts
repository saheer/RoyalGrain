import {cacheLife, cacheTag} from 'next/cache'
import {client} from './client'
import {
  collectionBySlugQuery,
  collectionSlugsQuery,
  collectionsListQuery,
  exploreCollectionsPageQuery,
} from './queries'

// Same pattern as the other fetchers: cached, refreshed every few minutes, or
// instantly when the "collections" tag is revalidated (see app/api/revalidate/route.ts).

export async function getExploreCollectionsPage() {
  'use cache'
  cacheLife('minutes')
  cacheTag('collections')
  return client.fetch(exploreCollectionsPageQuery)
}

export async function getCollectionsList() {
  'use cache'
  cacheLife('minutes')
  cacheTag('collections')
  return client.fetch(collectionsListQuery)
}

// One collection, or null when the slug doesn't exist
export async function getCollection(slug: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag('collections')
  return client.fetch(collectionBySlugQuery, {slug})
}

export async function getCollectionSlugs(): Promise<{slug: string}[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('collections')
  return client.fetch(collectionSlugsQuery)
}