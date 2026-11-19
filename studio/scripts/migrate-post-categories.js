/*
 * One-off migration: Design Guide post "category" from a plain string to a reference.
 *
 * Why: `post.category` used to be a string chosen from a fixed dropdown. It is now a
 * reference to a "postCategory" document, so editors can pick or create categories in
 * Studio. Existing posts still hold the old string until this script runs (the website
 * keeps showing those strings in the meantime).
 *
 * What it does (published posts AND drafts):
 *   1. For every distinct old category string, creates a "postCategory" document
 *      (_id = postCategory-<slug>, published). Existing ones are reused (matched by name,
 *      ignoring upper/lower case).
 *   2. Replaces post.category (string) with a reference to that document.
 *
 * Usage (from the studio/ folder, logged in with `npx sanity login`):
 *   npx sanity exec scripts/migrate-post-categories.js --with-user-token            # DRY RUN (default)
 *   npx sanity exec scripts/migrate-post-categories.js --with-user-token -- --commit # apply
 *
 * Take a backup first:  npx sanity dataset export production backup.tar.gz
 * Safe to run twice: posts whose category is already a reference are skipped.
 * After it ran, rename or tidy the categories under "Design Guide categories" in Studio.
 */
import {getCliClient} from 'sanity/cli'

const COMMIT = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2025-01-01'})

const norm = (name) => name.trim().replace(/\s+/g, ' ')
const key = (name) => norm(name).toLowerCase()
const slugify = (name) => {
  const slug = key(name)
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  // Names without latin letters/digits still get a stable, valid id
  return slug || 'c' + Array.from(key(name)).map((ch) => ch.codePointAt(0).toString(16)).join('')
}

async function main() {
  console.log(COMMIT ? 'COMMIT mode: changes will be written.\n' : 'DRY RUN: nothing is written (add --commit to apply).\n')

  const posts = await client.fetch(
    `*[_type == "post" && defined(category) && category._type != "reference"]{_id, title, "category": category}`,
  )
  const todo = posts.filter((p) => typeof p.category === 'string' && p.category.trim())
  if (!todo.length) {
    console.log('No posts with a string category. Nothing to do.')
    return
  }

  // Existing categories, matched by name
  const existing = await client.fetch(`*[_type == "postCategory" && !(_id in path("drafts.**"))]{_id, title}`)
  const idByKey = new Map(existing.map((c) => [key(c.title), c._id]))

  // Create the missing category documents
  const names = new Map() // key -> display name (first spelling found)
  for (const p of todo) if (!names.has(key(p.category))) names.set(key(p.category), norm(p.category))

  const tx = client.transaction()
  for (const [k, display] of names) {
    if (idByKey.has(k)) {
      console.log(`category  "${display}" -> existing ${idByKey.get(k)}`)
      continue
    }
    const _id = `postCategory-${slugify(display)}`
    idByKey.set(k, _id)
    console.log(`category  "${display}" -> create ${_id}`)
    tx.createIfNotExists({_id, _type: 'postCategory', title: display})
  }

  // Point every post at its category document
  for (const p of todo) {
    const ref = idByKey.get(key(p.category))
    console.log(`post      ${p._id} ("${p.title ?? ''}"): "${p.category}" -> ${ref}`)
    tx.patch(p._id, (patch) => patch.set({category: {_type: 'reference', _ref: ref, _weak: true}}))
  }

  console.log(`\n${names.size} categories, ${todo.length} posts.`)
  if (!COMMIT) {
    console.log('Dry run finished. Re-run with --commit to apply.')
    return
  }
  await tx.commit()
  console.log('Done. Posts and categories updated.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
