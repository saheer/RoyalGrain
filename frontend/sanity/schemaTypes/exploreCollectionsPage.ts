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
      initialValue: 'Explore Our Handcrafted Collections',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroTitleAccent',
      title: 'Hero title: gold part',
      type: 'string',
      group: 'listing',
      description: 'Optional. The word(s) shown in gold. Leave empty to use the last two words.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
      group: 'listing',
      initialValue:
        'Thoughtfully crafted solid teakwood furniture, architectural doors, and bespoke interior pieces designed for modern living and enduring warmth.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero background image',
      type: 'image',
      group: 'listing',
      options: {hotspot: true},
      description: 'A dark teakwood tint is added automatically so the text stays readable.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'introHeading',
      title: 'Intro heading (above the cards)',
      type: 'string',
      group: 'listing',
      initialValue: 'Our Masterpiece Collections',
    }),
    defineField({
      name: 'introHeadingAccent',
      title: 'Intro heading: gold part',
      type: 'string',
      group: 'listing',
      description: 'Optional. The word(s) shown in gold. Leave empty to use the last two words.',
    }),
    defineField({
      name: 'introDescription',
      title: 'Intro description',
      type: 'text',
      rows: 3,
      group: 'listing',
      initialValue:
        'From grand entrances to serene bedrooms and living spaces, explore dedicated collections tailored to every corner of your home.',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero button label',
      type: 'string',
      group: 'listing',
      initialValue: 'Explore Collections',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero button link',
      type: 'string',
      group: 'listing',
      initialValue: '#masterpiece-collections',
      description: 'Use #masterpiece-collections to scroll to the cards, or a path such as /explore-collections/main-doors.',
    }),
    defineField({
      name: 'featuredEyebrow',
      title: 'Featured banner: small label',
      type: 'string',
      group: 'listing',
      initialValue: 'Featured Collection',
    }),
    defineField({
      name: 'featuredHeading',
      title: 'Featured banner: heading',
      type: 'string',
      group: 'listing',
      initialValue: 'Masterpieces in Solid Teakwood.',
      description: 'The last two words are shown in gold.',
    }),
    defineField({
      name: 'featuredHeadingAccent',
      title: 'Featured banner: gold part',
      type: 'string',
      group: 'listing',
      description: 'Optional. The word(s) shown in gold. Leave empty to use the last two words.',
    }),
    defineField({
      name: 'featuredDescription',
      title: 'Featured banner: description',
      type: 'text',
      rows: 3,
      group: 'listing',
      initialValue:
        'A curated selection of doors, wardrobes, designer beds, and traditional unjals—each categorized so you can browse by space and style with ease.',
    }),
    defineField({
      name: 'featuredCtaLabel',
      title: 'Featured banner: button label',
      type: 'string',
      group: 'listing',
      initialValue: 'View all collections',
    }),
    defineField({
      name: 'featuredCtaLink',
      title: 'Featured banner: button link',
      type: 'string',
      group: 'listing',
      initialValue: '#masterpiece-collections',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured banner: image',
      type: 'image',
      group: 'listing',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
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