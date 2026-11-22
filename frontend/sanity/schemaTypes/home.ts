import {defineArrayMember, defineField, defineType} from 'sanity'

// Built-in line icons for the "Explore Collections" cards and the "Why Royal Grain" rows.
// The values are the keys of LINE_ICONS in frontend/components/LineIcon.tsx: draw the icon
// there first, then add it here.
const ICON_PRESETS = [
  {title: 'Round table', value: 'table'},
  {title: 'Swing (Unjal)', value: 'swing'},
  {title: 'Bed', value: 'bed'},
  {title: 'Door', value: 'door'},
  {title: 'Sofa / living', value: 'living'},
  {title: 'Leaf / natural wood', value: 'leaf'},
  {title: 'Ruler / precision', value: 'ruler'},
  {title: 'Award / medal', value: 'award'},
  {title: 'Home', value: 'home'},
  {title: 'Heart / care', value: 'heart'},
]

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero Banner', default: true},
    {name: 'logos', title: 'Logo Slider'},
    {name: 'featured', title: 'Featured Collection'},
    {name: 'packages', title: 'Highlight Cards'},
    {name: 'holidays', title: 'Explore Collections'},
    {name: 'why', title: 'Why Royal Grain (media + features)'},
    {name: 'testimonials', title: 'Client Speak (Testimonials)'},
    {name: 'newsletter', title: 'Newsletter Section'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Home Page',
      readOnly: true,
    }),
    defineField({
      name: 'heroHeadingWhite',
      title: 'Heading (white part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Discover Kerala',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeadingBlue',
      title: 'Heading (blue part)',
      type: 'string',
      group: 'hero',
      initialValue: 'with Royal Grain',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Description paragraphs',
      type: 'array',
      group: 'hero',
      of: [{type: 'text', rows: 3}],
      initialValue: [
        'Royal Grain Woodcraft & Interiors is a Kerala-based travel company in Puthentheru, crafting holidays across God’s Own Country and beyond.',
        "From backwater cruises to hill-station escapes, we plan every detail so you can simply enjoy the journey.",
      ],
      validation: (r) => r.min(1).max(3),
    }),
    defineField({
      name: 'heroBackground',
      title: 'Background image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
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
      initialValue: '/about-us',
    }),
    defineField({
      name: 'logos',
      title: 'Partner logos (slider)',
      type: 'array',
      group: 'logos',
      description: 'Drag & drop several images at once. Drag the rows to change the order.',
      of: [
        {
          type: 'image',
          options: {hotspot: false},
          fields: [
            defineField({
              name: 'name',
              title: 'Brand name (used as alt text)',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (r) => r.min(4).warning('Add at least 4 logos for a smooth slider'),
    }),
    // ---------- Featured Collection (right after the hero) ----------
    defineField({
      name: 'featuredEyebrow',
      title: 'Small heading',
      type: 'string',
      group: 'featured',
      initialValue: 'Featured Collection',
    }),
    defineField({
      name: 'featuredHeading',
      title: 'Heading',
      type: 'string',
      group: 'featured',
      initialValue: 'Solid teakwood with a point of view.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featuredHeadingAccent',
      title: 'Heading, gold part (optional)',
      type: 'string',
      group: 'featured',
      description:
        'Shown in gold after the heading, e.g. "in Solid Teakwood.". Leave empty to colour the last two words of the heading gold instead.',
    }),
    defineField({
      name: 'featuredDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'featured',
      initialValue:
        'A curated selection of handcrafted teakwood furniture, doors and interiors, made to last for generations.',
    }),
    defineField({
      name: 'featuredLinkText',
      title: 'Link text',
      type: 'string',
      group: 'featured',
      initialValue: 'View all collections',
    }),
    defineField({
      name: 'featuredLinkUrl',
      title: 'Link address',
      type: 'string',
      group: 'featured',
      description: 'A page of this site (e.g. /explore-collections) or a full https:// address.',
      initialValue: '/explore-collections',
    }),
    defineField({
      name: 'featuredCards',
      title: 'Cards',
      type: 'array',
      group: 'featured',
      description:
        'Cards in a slider next to the text: 3 per view on desktop, 2 on tablet, 1 on mobile. Add as many as you like; the arrows and counter appear automatically when there are more cards than fit. Each card has an image, a title, a short subtitle and a link. Drag to reorder.',
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          name: 'featuredCard',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              description: 'Square image works best. Use the hotspot to choose the focus area.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required().max(40),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              validation: (r) => r.max(70),
            }),
            defineField({
              name: 'link',
              title: 'Link address',
              type: 'string',
              description: 'Where the card (and its arrow) leads, e.g. /explore-collections.',
              initialValue: '/explore-collections',
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'subtitle', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'landscapeHeading',
      title: 'Section heading',
      type: 'string',
      group: 'packages',
      initialValue: 'Explore Our Exclusive Holiday Packages',
    }),
    defineField({
      name: 'landscapeDescription',
      title: 'Section description',
      type: 'text',
      rows: 3,
      group: 'packages',
      description: 'Short paragraph shown on the right of the heading.',
      initialValue:
        'From global adventures to romantic getaways, discover handpicked travel experiences crafted just for you by Royal Grain.',
    }),
    defineField({
      name: 'landscapeCards',
      title: 'Cards',
      type: 'array',
      group: 'packages',
      description: 'Image cards. Up to 3 show as a grid; add a 4th or more and the section becomes a slider. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'landscapeCard',
          title: 'Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'image',
              title: 'Background image',
              type: 'image',
              options: {hotspot: true},
              description: 'Portrait image works best (3:4). Use the hotspot to choose the focus area.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link address',
              type: 'string',
              description:
                'Where the card (and its arrow) leads, e.g. /explore-collections. Empty = /explore-collections.',
              initialValue: '/explore-collections',
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
        },
      ],
      validation: (r) => r.min(1).max(6),
    }),
    defineField({
      name: 'holidaysEyebrow',
      title: 'Small label above the heading',
      type: 'string',
      group: 'holidays',
      initialValue: 'Our Collections',
    }),
    defineField({
      name: 'holidaysHeading',
      title: 'Section heading',
      type: 'string',
      group: 'holidays',
      initialValue: 'Crafted for elegance built for a lifetime of natural beauty.',
    }),
    defineField({
      name: 'holidaysHeadingAccent',
      title: 'Heading, gold part (optional)',
      type: 'string',
      group: 'holidays',
      description:
        'Shown in gold after the heading. Leave empty to colour the last three words of the heading gold instead.',
    }),
    defineField({
      name: 'holidaysDescription',
      title: 'Section description',
      type: 'text',
      rows: 3,
      group: 'holidays',
      description: 'Paragraph shown on the right of the heading.',
      initialValue:
        'Explore handcrafted solid teakwood furniture and bespoke interior solutions designed to elevate your living spaces with traditional artistry and unmatched durability.',
    }),
    defineField({
      name: 'holidaysItems',
      title: 'Category cards',
      type: 'array',
      group: 'holidays',
      description: 'Shown in a row of 4 cards (icon, gold dash, name). Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'holidayItem',
          title: 'Collection',
          fields: [
            defineField({
              name: 'title',
              title: 'Name',
              type: 'string',
              description: 'e.g. Teakwood Center Tables',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'iconPreset',
              title: 'Icon (built-in)',
              type: 'string',
              options: {list: ICON_PRESETS, layout: 'dropdown'},
              description:
                'Pick a line icon. Left empty, the card uses a default for its position (table, swing, bed, door).',
            }),
            defineField({
              name: 'iconFile',
              title: 'Own icon (optional: SVG or PNG)',
              type: 'file',
              options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'},
              description: 'Upload your own icon to use instead of the built-in one.',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description:
                'Page path on this site (e.g. /explore-collections/kerala-backwaters) or a full https:// URL.',
              validation: (r) =>
                r.custom(
                  (v) =>
                    !v ||
                    /^(\/|https?:\/\/)/.test(v) ||
                    'Start with / for a page on this site, or https:// for an external link',
                ),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'link'}},
        },
      ],
      validation: (r) => r.min(1).max(8),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button text',
      type: 'string',
      group: 'holidays',
      initialValue: 'Explore Collections',
    }),
    defineField({
      name: 'holidayButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'holidays',
      initialValue: '/explore-collections',
    }),
    // ---------- Why Royal Grain: full-width media + feature rows ----------
    defineField({
      name: 'whyMediaType',
      title: 'Left side shows',
      type: 'string',
      group: 'why',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video (auto-plays, loops, muted)', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'whyVideoFile',
      title: 'Video file (MP4 or WebM)',
      type: 'file',
      group: 'why',
      options: {accept: 'video/mp4,video/webm'},
      description: 'Keep it short and light (ideally under 10 MB, no audio needed).',
      hidden: ({document}) => document?.whyMediaType !== 'video',
    }),
    defineField({
      name: 'whyVideoUrl',
      title: 'Or video URL',
      type: 'url',
      group: 'why',
      description: 'Direct link to an .mp4 / .webm file. Only used when no video file is uploaded.',
      validation: (r) => r.uri({scheme: ['https']}),
      hidden: ({document}) => document?.whyMediaType !== 'video',
    }),
    defineField({
      name: 'whyImage',
      title: 'Image',
      type: 'image',
      group: 'why',
      options: {hotspot: true},
      description:
        'Shown when "Image" is selected. With a video it is also the poster and the fallback if the video fails.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'whyFeatures',
      title: 'Feature rows (right side)',
      type: 'array',
      group: 'why',
      description: 'Shown one under another, next to the image. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'whyFeature',
          title: 'Feature',
          fields: [
            defineField({
              name: 'iconPreset',
              title: 'Icon (built-in)',
              type: 'string',
              options: {list: ICON_PRESETS, layout: 'dropdown'},
              description:
                'Pick a line icon. Left empty, the row uses a default for its position (door, award, bed).',
            }),
            defineField({
              name: 'iconFile',
              title: 'Own icon (optional: SVG or PNG)',
              type: 'file',
              options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'},
              description: 'Upload your own icon to use instead of the built-in one.',
            }),
            defineField({
              name: 'title',
              title: 'Title (brown line)',
              type: 'string',
              description: 'e.g. Pure Teakwood',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'highlight',
              title: 'Title (gold line)',
              type: 'string',
              description: 'e.g. Quality',
            }),
            defineField({
              name: 'description',
              title: 'Description (optional)',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'highlight'}},
        },
      ],
      validation: (r) => r.min(1).max(5),
    }),
    // ---------- Client Speak: testimonials slider ----------
    defineField({
      name: 'testimonialsHeading',
      title: 'Section heading',
      type: 'string',
      group: 'testimonials',
      initialValue: 'Client Speak',
    }),
    defineField({
      name: 'testimonialsSubtitle',
      title: 'Section subtitle',
      type: 'string',
      group: 'testimonials',
      initialValue: 'What our homeowners say about our teakwood craftsmanship and interior works.',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'testimonials',
      description: 'Shown one at a time in the dark card, with arrows at the bottom right. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              description: 'Type the quote without quotation marks – they are added automatically.',
              validation: (r) => [
                r.required(),
                r.max(400).warning('Keep it under about 400 characters so the card stays compact'),
              ],
            }),
            defineField({
              name: 'position',
              title: 'Author position / designation',
              type: 'string',
              description: 'e.g. Head of Legal',
            }),
            defineField({
              name: 'company',
              title: 'Location tag',
              type: 'string',
              description: 'Shown in gold capitals at the bottom left of the card, e.g. Malappuram',
              validation: (r) => r.required(),
            }),
          ],
          preview: {select: {title: 'company', subtitle: 'quote'}},
        },
      ],
      validation: (r) => r.min(1).max(10),
    }),
    // ---------- Newsletter: "Subscribe to our newsletter" banner ----------
    defineField({
      name: 'newsletterHeading',
      title: 'Heading',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Subscribe to our newsletter',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'newsletterSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'newsletter',
      initialValue:
        'for the latest destination guides, travel tips and holiday ideas from Royal Grain.',
    }),
    defineField({
      name: 'newsletterBackgroundType',
      title: 'Background type',
      type: 'string',
      group: 'newsletter',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video (auto-plays, loops, muted)', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'newsletterBackgroundImage',
      title: 'Background image',
      type: 'image',
      group: 'newsletter',
      options: {hotspot: true},
      description:
        'Used when "Image" is selected. With a video it is also the poster and the fallback if the video fails to load.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'newsletterBackgroundVideoFile',
      title: 'Background video file (MP4 or WebM)',
      type: 'file',
      group: 'newsletter',
      options: {accept: 'video/mp4,video/webm'},
      description: 'Keep it short and light (ideally under 10 MB, no audio needed).',
      hidden: ({document}) => document?.newsletterBackgroundType !== 'video',
    }),
    defineField({
      name: 'newsletterBackgroundVideoUrl',
      title: 'Or background video URL',
      type: 'url',
      group: 'newsletter',
      description: 'Direct https link to an .mp4 / .webm file. Only used when no video file is uploaded.',
      validation: (r) => r.uri({scheme: ['https']}),
      hidden: ({document}) => document?.newsletterBackgroundType !== 'video',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Home Page'})},
})