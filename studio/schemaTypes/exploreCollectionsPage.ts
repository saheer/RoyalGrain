import {defineArrayMember, defineField, defineType} from 'sanity'
import {createElement} from 'react'
import {InlineSvgPreviewItem} from '@focus-reactive/sanity-plugin-inline-svg-input'
// Singleton: texts of the /explore-collections listing page, plus the "Why Choose Royal Grain"
// block that is shown on every collection detail page.
export default defineType({
  // Stored type name stays 'exploreHolidaysPage' (renaming it would hide the existing document)
  name: 'exploreHolidaysPage',
  title: 'Explore Collections Page',
  type: 'document',
  groups: [
    {name: 'listing', title: 'Collections listing page', default: true},
    {name: 'whyChoose', title: 'Shared: Why Choose (all Collections pages)'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      group: 'listing',
      initialValue: 'Collections crafted around the way you live.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
      group: 'listing',
      initialValue:
        'From teakwood doors and furniture to complete interiors, explore the collections we craft for homes across Kerala and beyond.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero background image',
      type: 'image',
      group: 'listing',
      options: {hotspot: true},
      description: 'A dark navy tint is added automatically so the text stays readable.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'introHeading',
      title: 'Intro heading (above the cards)',
      type: 'string',
      group: 'listing',
      initialValue: 'Find Your Perfect Collection',
    }),
    defineField({
      name: 'introDescription',
      title: 'Intro description',
      type: 'text',
      rows: 3,
      group: 'listing',
      initialValue:
        'Every Royal Grain journey is planned with local knowledge, trusted stays and personal support from first enquiry to return home.',
    }),
    defineField({
      name: 'exploreLabel',
      title: '"Explore" link text on each card',
      type: 'string',
      group: 'listing',
      initialValue: 'Explore Collection',
    }),

    // ---------- Shared on every collection detail page ----------
    defineField({
      name: 'whyChooseHeading',
      title: 'Heading',
      type: 'string',
      group: 'whyChoose',
      initialValue: 'Why Choose Royal Grain',
    }),
    defineField({
      name: 'whyChooseItems',
      title: 'Strengths',
      type: 'array',
      group: 'whyChoose',
      description: 'Dark cards, 3 per row (6 fills two rows).',
      of: [
          defineArrayMember({
          name: 'strength',
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icon (SVG)', type: 'inlineSvg'}),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({              name: 'description',              title: 'Description (optional)',              type: 'text',              rows: 2,              description: 'Shown under the title. Leave empty to match the design (title only).',            }),
          ],
          preview: {select: {icon: 'icon', title: 'title', subtitle: 'description'}},          components: {            preview: (p: any) =>              createElement(InlineSvgPreviewItem, {icon: p.icon, title: p.title, subtitle: p.subtitle}),          },
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Explore Collections Page'})},
})