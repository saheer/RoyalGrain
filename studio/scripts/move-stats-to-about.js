/*
 * One-off migration: moves the "Key Statistics" content from the Home Page document to
 * the About Us document (the section now lives on the About Us page).
 *
 * What it does:
 *   1. reads statsItems + statsNote from the Home Page document (published version first,
 *      draft if there is no published one);
 *   2. copies them into the About Us document(s) that do not have statistics yet
 *      (published and draft), so nothing has to be typed again;
 *   3. removes statsItems + statsNote from the Home Page document(s).
 *
 * The About Us document must already exist (publish it once in Studio if it does not).
 *
 * Usage (from the studio/ folder, logged in with `npx sanity login`):
 *   npx sanity exec scripts/move-stats-to-about.js --with-user-token             # DRY RUN
 *   npx sanity exec scripts/move-stats-to-about.js --with-user-token -- --commit # apply
 *
 * Back up first:  npx sanity dataset export production backup.tar.gz
 */
import {getCliClient} from 'sanity/cli'

const COMMIT = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2025-01-01'})
const isDraft = (id) => id.startsWith('drafts.')

async function main() {
  console.log(COMMIT ? 'COMMIT mode.\n' : 'DRY RUN (add --commit to apply).\n')

  const homes = await client.fetch(`*[_type == "home"]{_id, statsItems, statsNote}`)
  const abouts = await client.fetch(`*[_type == "about"]{_id, statsItems, statsNote}`)

  // Source: published Home document first, then its draft
  const withStats = homes.filter((h) => h.statsItems?.length)
  const source = withStats.find((h) => !isDraft(h._id)) || withStats[0]
  if (!source) console.log('No statistics found on the Home Page document: nothing to copy.')
  else console.log(`source: ${source._id} (${source.statsItems.length} statistics)`)

  if (!abouts.length) console.log('No About Us document found. Publish it once in Studio, then run this again.')

  const tx = client.transaction()
  let changes = 0

  if (source) {
    for (const a of abouts) {
      if (a.statsItems?.length) {
        console.log(`about  ${a._id}: already has statistics, left as it is`)
        continue
      }
      const set = {statsItems: source.statsItems}
      if (source.statsNote) set.statsNote = source.statsNote
      console.log(`about  ${a._id}: copy ${source.statsItems.length} statistics${source.statsNote ? ' + note' : ''}`)
      tx.patch(a._id, (p) => p.set(set))
      changes++
    }
  }

  // Remove from Home only when the data is safe in About Us (or there was nothing to move)
  for (const h of homes) {
    const fields = ['statsItems', 'statsNote'].filter((f) => h[f] !== undefined && h[f] !== null)
    if (!fields.length) continue
    if (source && !abouts.length) continue // nowhere to move it to yet: keep it
    console.log(`home   ${h._id}: remove ${fields.join(', ')}`)
    tx.patch(h._id, (p) => p.unset(fields))
    changes++
  }

  if (!changes) return console.log('\nNothing to do.')
  if (!COMMIT) return console.log('\nDry run finished. Re-run with --commit to apply.')
  await tx.commit()
  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
