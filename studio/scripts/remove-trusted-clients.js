/*
 * One-off cleanup: removes the old "Trusted Clients" fields (clientsHeading,
 * clientsSubtitle, clients) from the About Us document, published version and draft.
 * The fields no longer exist in the schema, so Studio would otherwise list them as
 * "unknown fields". The website ignores them either way.
 *
 * Usage (from the studio/ folder, logged in with `npx sanity login`):
 *   npx sanity exec scripts/remove-trusted-clients.js --with-user-token            # DRY RUN
 *   npx sanity exec scripts/remove-trusted-clients.js --with-user-token -- --commit # apply
 *
 * Back up first:  npx sanity dataset export production backup.tar.gz
 */
import {getCliClient} from 'sanity/cli'

const COMMIT = process.argv.includes('--commit')
const FIELDS = ['clientsHeading', 'clientsSubtitle', 'clients']
const client = getCliClient({apiVersion: '2025-01-01'})

async function main() {
  console.log(COMMIT ? 'COMMIT mode.\n' : 'DRY RUN (add --commit to apply).\n')
  const docs = await client.fetch(`*[_type == "about"]{_id, "found": [${FIELDS.map((f) => `select(defined(${f}) => "${f}")`).join(', ')}]}`)
  const tx = client.transaction()
  let n = 0
  for (const d of docs) {
    const found = (d.found || []).filter(Boolean)
    if (!found.length) continue
    n++
    console.log(`${d._id}: unset ${found.join(', ')}`)
    tx.patch(d._id, (p) => p.unset(found))
  }
  if (!n) return console.log('Nothing to remove.')
  if (!COMMIT) return console.log('\nDry run finished. Re-run with --commit to apply.')
  await tx.commit()
  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
