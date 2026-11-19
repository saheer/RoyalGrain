import {defineArrayMember, defineField, defineType} from 'sanity'

// Icons an editor can pick for the expertise cards. The values are the keys of ICONS in
// frontend/components/OurExpertiseSection.tsx: add the drawing there first, then the option here.
const EXPERTISE_ICONS = [
  {title: 'Door', value: 'door'},
  {title: 'Bed', value: 'bed'},
  {title: 'Swing (Unjal)', value: 'swing'},
  {title: 'Sofa / living', value: 'living'},
  {title: 'Leaf / natural wood', value: 'leaf'},
  {title: 'Ruler / precision', value: 'ruler'},
  {title: 'Home', value: 'home'},
  {title: 'Award / medal', value: 'award'},
]

// Singleton "Our Expertise Page" (one document, ID "ourExpertisePage"): the /our-expertise
// page = hero + the "Our Expertise" cards section.
export default defineType({
  name: 'ourExpertisePage',
  title: 'Our Expertise Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'expertise', title: 'Our Expertise'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Our Expertise Page',
      readOnly: true,
    }),

    // ---------- Hero ----------
    defineField({
      name: 'heroEyebrow',
      title: 'Badge (small label)',
      type: 'string',
      group: 'hero',
      initialValue: 'Our Expertise',
    }),
    defineField({
      name: 'heroHeadingWhite',
      title: 'Heading (white part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Solid teakwood,',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeadingBlue',
      title: 'Heading (gold part)',
      type: 'string',
      group: 'hero',
      initialValue: 'skilfully crafted.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Doors, beds, swings and complete interiors, built from solid teakwood with traditional joinery.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Background image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      description: 'Wide image (about 2400 × 1200). A dark brown tint is added automatically.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ---------- Our Expertise section ----------
    defineField({
      name: 'expertiseHeading',
      title: 'Section heading',
      type: 'string',
      group: 'expertise',
      initialValue: 'Our Expertise in Solid Woodcraft',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'expertiseSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'expertise',
      description: 'Shown to the right of the heading on desktop.',
      initialValue:
        'From magnificent architectural elements to bespoke interior living spaces, discover what we specialize in crafting.',
    }),
    defineField({
      name: 'expertiseItems',
      title: 'Expertise cards',
      type: 'array',
      group: 'expertise',
      description:
        'One card per expertise area: 4 across on desktop, 2 on tablet, 1 on mobile. Drag to reorder.',
      initialValue: [
        {
          _key: 'main-doors',
          _type: 'expertiseItem',
          icon: 'door',
          title: 'Main Doors & Entrance',
          description:
            'Custom-built heavy teakwood main doors, intricate frames, and grand entrances designed for everlasting first impressions.',
        },
        {
          _key: 'beds-wardrobes',
          _type: 'expertiseItem',
          icon: 'bed',
          title: 'Custom Teakwood Beds & Wardrobes',
          description:
            'Premium box-type beds, sleek wall-mounted wardrobes, and smart bedroom storage tailored to your space.',
        },
        {
          _key: 'wooden-swings',
          _type: 'expertiseItem',
          icon: 'swing',
          title: 'Traditional Wooden Swings (Unjals)',
          description:
            'Authentically crafted Malabar-style hanging swings featuring fine artistic carvings and robust joinery.',
        },
        {
          _key: 'living-dining',
          _type: 'expertiseItem',
          icon: 'living',
          title: 'Living & Dining Collections',
          description:
            'Bespoke solid wood center tables, teepoys, dining sets, and complete custom interior furniture solutions.',
        },
      ],
      validation: (r) => r.min(1).error('Add at least one card.'),
      of: [
        defineArrayMember({
          name: 'expertiseItem',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {list: EXPERTISE_ICONS, layout: 'dropdown'},
              initialValue: 'door',
              validation: (r) => r.required(),
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
              validation: (r) => r.required().max(260),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),

    // ---------- SEO ----------
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Our Expertise Page'})},
})
