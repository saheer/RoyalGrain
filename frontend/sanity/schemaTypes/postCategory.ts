import {defineField, defineType} from 'sanity'

// Categories of the Design Guide posts. Editors can pick an existing one from the
// "Category" field of a post, or create a new one right there ("Create new").
// They can also be managed (renamed / deleted) under "Design Guide categories".
// Renaming a category here updates every post that uses it.
export default defineType({
  name: 'postCategory',
  title: 'Design Guide category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'Shown as the tag on every card and in the breadcrumb of the post, e.g. "Teakwood Furniture".',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(60)
          .custom(async (value, context) => {
            const name = typeof value === 'string' ? value.trim() : ''
            if (!name) return true
            const id = (context.document?._id || '').replace(/^drafts\./, '')
            const duplicates = await context
              .getClient({apiVersion: '2025-01-01'})
              .fetch<number>(
                `count(*[_type == "postCategory" && lower(title) == lower($name) && !(_id in [$id, "drafts." + $id])])`,
                {name, id},
              )
            return duplicates === 0
              ? true
              : 'A category with this name already exists. Select it from the list instead of creating it again.'
          }),
    }),
    defineField({
      name: 'description',
      title: 'Description (internal)',
      type: 'text',
      rows: 2,
      description: 'Optional note for editors. Not shown on the website.',
    }),
  ],
  orderings: [{title: 'Name, A to Z', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description'}},
})
