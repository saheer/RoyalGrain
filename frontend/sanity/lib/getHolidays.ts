import {cacheLife, cacheTag} from 'next/cache'
import {client} from './client'
import {
  holidayBySlugQuery,
  holidaySlugsQuery,
  holidaysListQuery,
  holidaysMenuQuery,
  exploreHolidaysPageQuery,
} from './queries'

// Same pattern as the other fetchers: cached, refreshed every few minutes, or
// instantly when the "holidays" tag is revalidated (see app/api/revalidate/route.ts).

export async function getExploreHolidaysPage() {
  'use cache'
  cacheLife('minutes')
  cacheTag('holidays')
  return client.fetch(exploreHolidaysPageQuery)
}

export async function getHolidaysList() {
  'use cache'
  cacheLife('minutes')
  cacheTag('holidays')
  return client.fetch(holidaysListQuery)
}

// Header dropdown and "other solutions" cards
export async function getHolidaysMenu() {
  'use cache'
  cacheLife('minutes')
  cacheTag('holidays')
  return client.fetch(holidaysMenuQuery)
}

// One holiday, or null when the slug doesn't exist
export async function getHoliday(slug: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag('holidays')
  return client.fetch(holidayBySlugQuery, {slug})
}

export async function getHolidaySlugs(): Promise<{slug: string}[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('holidays')
  return client.fetch(holidaySlugsQuery)
}