import {defineArrayMember, defineField, defineType} from 'sanity'

// Icons an editor can pick for the "Our Craft" cards. The values are the keys of ICONS in
// frontend/components/AboutCraftSection.tsx: add the drawing there first, then the option here.
const CRAFT_ICONS = [
  {title: 'People', value: 'users'},
  {title: 'Award / medal', value: 'award'},
  {title: 'Speed / energy', value: 'zap'},
  {title: 'Shield / trust', value: 'shield'},
  {title: 'Heart / care', value: 'heart'},
  {title: 'Leaf / natural wood', value: 'leaf'},
  {title: 'Ruler / precision', value: 'ruler'},
  {title: 'Home', value: 'home'},
]

// Singleton: everything on the /about-us page.
export default defineType({
  name: 'about',
  title: 'About Us',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'stats', title: 'Key Statistics'},
    {name: 'people', title: 'Our People'},
    {name: 'journey', title: 'Our Journey'},
    {name: 'craft', title: 'Our Craft'},
    {name: 'testimonials', title: 'Client Speak'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ---------- Hero ----------
    defineField({
      name: 'heroHeadingWhite',
      title: 'Heading (white part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Journeys That Inspire',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeadingBlue',
      title: 'Heading (blue part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Your Next Holiday',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Subheading / description',
      type: 'text',
      rows: 4,
      group: 'hero',
      initialValue:
        'Royal Grain Woodcraft & Interiors is a travel company based in Puthentheru, Kerala. We combine local expertise, trusted partners and personal service to plan holidays that are easy to book and hard to forget.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Background image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      description: 'A dark blue tint is added automatically so the text stays readable.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Button text',
      type: 'string',
      group: 'hero',
      initialValue: 'Learn About Our Approach',
    }),
    defineField({
      name: 'heroButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'hero',
      description: 'A page (/instagram-feed), a section on this page (#our-journey) or a full https:// link.',
      initialValue: '#our-journey',
    }),

    // ---------- Key Statistics (right after the hero) ----------
    defineField({
      name: 'statsItems',
      title: 'Statistics',
      type: 'array',
      group: 'stats',
      description: 'Up to 4 headline numbers, shown side by side. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Statistic',
          fields: [
            defineField({
              name: 'value',
              title: 'Number',
              type: 'string',
              description: 'Type it exactly as it should appear, e.g. 30+ Years or 50000+',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. Premium Teakwood Quality',
              validation: (r) => r.required(),
            }),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
      validation: (r) => r.min(1).max(4),
    }),
    defineField({
      name: 'statsNote',
      title: 'Note under the statistics',
      type: 'string',
      group: 'stats',
      description: 'Small grey text in the bottom bar. Leave empty to hide the bar.',
    }),
    // ---------- Our People ----------
    defineField({
      name: 'peopleHeading',
      title: 'Heading',
      type: 'string',
      group: 'people',
      initialValue: 'Our People',
    }),
    defineField({
      name: 'peopleDescription',
      title: 'Paragraphs',
      type: 'array',
      group: 'people',
      of: [defineArrayMember({type: 'text', rows: 3})],
      initialValue: [
        'Our team brings together local knowledge of Kerala’s destinations, stays and experiences.',
        'Each member of the Royal Grain team brings professionalism and care to planning, booking and hosting your holiday.',
      ],
    }),
    defineField({
      name: 'peopleImage',
      title: 'Image / graphic',
      type: 'image',
      group: 'people',
      options: {hotspot: true},
      description: 'Shown on the right, in a 16:9 rounded frame.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ---------- Our Journey ----------
    defineField({
      name: 'journeyHeading',
      title: 'Heading',
      type: 'string',
      group: 'journey',
      initialValue: 'Our Journey',
    }),
    defineField({
      name: 'journey',
      title: 'Timeline items',
      type: 'array',
      group: 'journey',
      description: 'Shown left to right (4 fit in one row). Drag to reorder.',
      of: [
        defineArrayMember({
          name: 'milestone',
          type: 'object',
          fields: [
            defineField({name: 'year', title: 'Year', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'year'}},
        }),
      ],
      initialValue: [
        {
          _type: 'milestone',
          year: '20XX',
          title: 'Founded',
          description:
            'Royal Grain Woodcraft & Interiors begins planning holidays from Puthentheru, Kerala. (Replace with your own milestone.)',
        },
        {
          _type: 'milestone',
          year: '20XX',
          title: 'Global Reach',
          description:
            'Add a milestone about growth or new destinations. (Replace with your own milestone.)',
        },
        {
          _type: 'milestone',
          year: '20XX',
          title: 'Technology',
          description:
            'Add a milestone about new services or partnerships. (Replace with your own milestone.)',
        },
        {
          _type: 'milestone',
          year: '20XX',
          title: 'Today',
          description:
            'A trusted travel partner for holidays across Kerala and beyond.',
        },
      ],
    }),

    // ---------- Our Craft (3 feature cards) ----------
    defineField({
      name: 'craftHeading',
      title: 'Heading',
      type: 'string',
      group: 'craft',
      initialValue: 'Handcrafted Teakwood Collections & Interiors',
    }),
    defineField({
      name: 'craftSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'craft',
      description: 'Shown to the right of the heading on desktop.',
      initialValue:
        'Premium solid teakwood furniture and custom interior solutions crafted to elevate your living spaces.',
    }),
    defineField({
      name: 'craftCards',
      title: 'Feature cards',
      type: 'array',
      group: 'craft',
      description:
        'Three cards side by side on desktop. Each has an icon badge, a title and a short paragraph. Drag to reorder.',
      validation: (r) => r.max(3).warning('The layout is designed for 3 cards.'),
      of: [
        defineArrayMember({
          name: 'craftCard',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: CRAFT_ICONS,
                layout: 'dropdown',
              },
              description:
                'Pick the icon for this card. Left empty, the card uses a default icon for its position (1: People, 2: Shield, 3: Ruler).',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required().max(70),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (r) => r.required().max(320),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),

    // ---------- Client Speak ----------
    defineField({
      name: 'testimonialsHeading',
      title: 'Heading',
      type: 'string',
      group: 'testimonials',
      initialValue: 'Client Speak',
    }),
    defineField({
      name: 'testimonialsSubtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'testimonials',
      initialValue: 'Testimonials from our clients.',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'testimonials',
      description: 'Shown one at a time in the slider. Drag to reorder.',
      of: [
        defineArrayMember({
          name: 'testimonial',
          type: 'object',
          fields: [
            defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (r) => r.required()}),
            defineField({
              name: 'author',
              title: 'Author name (optional)',
              type: 'string',
              description: 'Leave empty to show only the role and company, as in the design.',
            }),
            defineField({name: 'position', title: 'Designation', type: 'string'}),
            defineField({name: 'company', title: 'Company', type: 'string'}),
          ],
          preview: {select: {title: 'company', subtitle: 'quote'}},
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'About Us'})},
})