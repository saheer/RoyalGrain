# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Royal Grain Woodcraft & Interiors rebrand: content migration

The schema types were renamed (`service` → `holiday`, `servicesPage` → `exploreHolidaysPage`,
`digitalFootprintPage` → `travelStoriesPage`, `footprintPost` → `travelStory`, `digestPage` → `travelGuidePage`) and several fields
were renamed on `home`, `footer`, `contact` and `holiday`. Existing documents in the dataset keep
their old names until you run the migration:

```bash
npx sanity dataset export production backup.tar.gz          # backup first
npx sanity exec scripts/migrate-rebrand.js --with-user-token            # dry run
npx sanity exec scripts/migrate-rebrand.js --with-user-token -- --commit # apply
```

After the migration, rebuild/redeploy the Studio (`npm run build`, `npm run deploy`).

## Design Guide categories

`post.category` is a reference to a `postCategory` document (Studio: "Design Guide categories"). Editors pick a category
in a post or create a new one there; renaming a category updates every post. Posts saved with the old string category
keep working on the site; convert them with `scripts/migrate-post-categories.js` (same dry-run / `--commit` usage as above).
