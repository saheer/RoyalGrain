import {defineField, defineType} from 'sanity'

// Singleton "Design Guide Page": the banner (hero) of /design-guide and its SEO settings.
// The posts themselves are managed under "Design Guide posts".
export default defineType({
  name: 'travelGuidePage',
  title: 'Design Guide Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Banner', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Design Guide Page',
      readOnly: true,
    }),

    // ---------- Banner ----------
    defineField({
      name: 'heroHeadingWhite',
      title: 'Heading (white part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Your Weekly',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeadingBlue',
      title: 'Heading (gold part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Design Guide.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'For the latest design ideas, craftsmanship insights and interior inspiration from Royal Grain.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Banner image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      description:
        'Wide image (about 2400 × 1200). A deep wood-brown tint is added automatically so the text stays readable. Use the hotspot to choose the focus area.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ---------- SEO ----------
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Design Guide Page'})},
})
