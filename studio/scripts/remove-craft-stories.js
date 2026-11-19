/*
 * One-off cleanup after removing the "Craft Stories" (LinkedIn posts) section from the site.
 *
 * The schema ("travelStoriesPage" / "travelStory") no longer exists, so the old content is
 * only dead weight in the dataset. This script:
 *   1. deletes the "Craft Stories Page" document (published + draft). The LinkedIn posts
 *      were objects inside it, so they go with it;
 *   2. removes the "Craft Stories" / "/craft-stories" link from the Footer document;
 *   3. with --delete-assets: deletes images/files that were used ONLY by that page
 *      (e.g. its hero image). Assets used anywhere else are kept.
 *
 * Usage (from the studio/ folder, logged in with `npx sanity login`):
 *   npx sanity exec scripts/remove-craft-stories.js --with-user-token                            # DRY RUN
 *   npx sanity exec scripts/remove-craft-stories.js --with-user-token -- --commit --delete-assets # apply
 *
 * Back up first:  npx sanity dataset export production backup.tar.gz
 */
import {getCliClient} from 'sanity/cli'

const COMMIT = process.argv.includes('--commit')
const DELETE_ASSETS = process.argv.includes('--delete-assets')
const PAGE_IDS = ['travelStoriesPage', 'drafts.travelStoriesPage']
const client = getCliClient({apiVersion: '2025-01-01'})

async function main() {
  console.log(COMMIT ? 'COMMIT mode.\n' : 'DRY RUN (add --commit to apply).\n')

  // 1. the page document(s)
  const pages = await client.fetch(`*[_id in $ids]._id`, {ids: PAGE_IDS})
  pages.forEach((id) => console.log(`delete document  ${id}`))
  if (!pages.length) console.log('No Craft Stories Page document found.')

  // 3. assets used only by that page (looked up now, deleted after the page is gone)
  const assets = await client.fetch(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]
        && count(*[references(^._id) && _id in $ids]) > 0
        && count(*[references(^._id) && !(_id in $ids)]) == 0]._id`,
    {ids: PAGE_IDS},
  )
  assets.forEach((id) => console.log(`${DELETE_ASSETS ? 'delete' : 'orphan (kept, use --delete-assets)'} asset  ${id}`))

  // 2. footer links
  const footers = await client.fetch(`*[_type == "footer"]{_id, indexLinks}`)
  const footerPatches = footers
    .map((f) => ({
      id: f._id,
      next: (f.indexLinks || []).filter((l) => l?.url !== '/craft-stories'),
      had: (f.indexLinks || []).length,
    }))
    .filter((f) => f.next.length !== f.had)
  footerPatches.forEach((f) => console.log(`footer ${f.id}: remove the /craft-stories link`))

  if (!COMMIT) return console.log('\nDry run finished. Re-run with --commit to apply.')

  const tx = client.transaction()
  pages.forEach((id) => tx.delete(id))
  footerPatches.forEach((f) => tx.patch(f.id, (p) => p.set({indexLinks: f.next})))
  await tx.commit()
  console.log('\nDocuments cleaned up.')

  if (DELETE_ASSETS) {
    for (const id of assets) await client.delete(id)
    console.log(`${assets.length} unused assets deleted.`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
