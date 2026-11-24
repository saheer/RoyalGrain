import {defineArrayMember, defineField, defineType} from 'sanity'

// Icons an editor can pick. The values are the keys in frontend/components/ExpertiseIcon.tsx
// (list in frontend/lib/expertiseIcons.ts): draw a new icon there first, then add it here.
export const ICONS = [
  {title: 'Table', value: 'table'},
  {title: 'Armchair', value: 'chair'},
  {title: 'Sofa / living', value: 'sofa'},
  {title: 'Bed', value: 'bed'},
  {title: 'Shelf / desk / storage', value: 'shelf'},
  {title: 'Wardrobe', value: 'wardrobe'},
  {title: 'Kitchen cabinets', value: 'kitchen'},
  {title: 'Pooja lamp', value: 'lamp'},
  {title: 'Door', value: 'door'},
  {title: 'Wooden swing (unjal)', value: 'swing'},
  {title: 'Wall panelling', value: 'panel'},
  {title: 'Ceiling beams', value: 'beams'},
  {title: 'Niche / partition', value: 'niche'},
  {title: 'Ruler / joinery', value: 'ruler'},
  {title: 'Compass / planning', value: 'compass'},
  {title: 'Palette / materials', value: 'palette'},
  {title: 'Sparkle / detailing', value: 'sparkle'},
  {title: 'Briefcase / office', value: 'office'},
  {title: 'Reception desk', value: 'reception'},
  {title: 'Shop / retail', value: 'shop'},
  {title: 'Building', value: 'building'},
  {title: 'Home', value: 'home'},
  {title: 'Leaf / natural wood', value: 'leaf'},
  {title: 'Award / medal', value: 'award'},
  {title: 'Star', value: 'star'},
  {title: 'Check', value: 'check'},
]

// Detail pages /our-expertise/<slug>: one document per page. The original five (custom-furniture,
// interior-woodwork, bespoke-interiors, residential-interiors, commercial-interiors) have built-in
// content in frontend/lib/expertisePages.ts; any field left empty here falls back to it. A page
// with a NEW slug works as soon as it is published: no code change needed.
export default defineType({
  name: 'expertisePage',
  title: 'Expertise Page',
  type: 'document',
  groups: [
    {name: 'banner', title: '1 · Banner', default: true},
    {name: 'content', title: '2 · Page sections'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'menuName',
      title: 'Page name / menu name',
      type: 'string',
      group: 'banner',
      description:
        'Short name used in the footer, the listing and “More from Our Expertise”, e.g. “Custom Furniture”. You can rename it any time.',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (page address)',
      type: 'slug',
      group: 'banner',
      description:
        'Click Generate to create it from the name. The page lives at /our-expertise/<slug>. Changing it later changes the address, so update any links that point to the old one.',
      options: {source: 'menuName', maxLength: 96},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'menuIcon',
      title: 'Menu icon',
      type: 'string',
      group: 'banner',
      description:
        'Small gold icon shown beside this page in “More from Our Expertise”. Empty = the built-in icon (or a leaf for a new page).',
      options: {list: ICONS, layout: 'dropdown'},
    }),

    // ---------- Banner ----------
    defineField({
      name: 'bannerEyebrow',
      title: 'Eyebrow (small gold line)',
      type: 'string',
      group: 'banner',
      description: 'e.g. OUR EXPERTISE · CUSTOM FURNITURE',
    }),
    defineField({
      name: 'title',
      title: 'Banner heading',
      type: 'string',
      group: 'banner',
      description: 'The big heading on the banner (can be longer than the page name), e.g. “Custom Furniture Crafted to Your Space”.',
    }),
    defineField({
      name: 'titleAccent',
      title: 'Gold part of the banner heading',
      type: 'string',
      group: 'banner',
      description:
        'Optional. The END of the banner heading shown in gold, typed exactly as in the heading (e.g. “Crafted to Your Space”). Empty = the last two words.',
    }),
    defineField({
      name: 'bannerCopy',
      title: 'Short banner copy',
      type: 'text',
      rows: 3,
      group: 'banner',
      validation: (r) => r.max(260).warning('Keep the banner copy short (under about 260 characters).'),
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      group: 'banner',
      options: {hotspot: true},
      description:
        'Wide photo, about 2400 × 1200 px. A dark teakwood tint is added automatically so the text stays readable. Empty = a warm brown banner without a photo.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button text',
      type: 'string',
      group: 'banner',
      description: 'e.g. Plan a Custom Piece. Used on the banner and again in the “Craft & Finish” box.',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button link',
      type: 'string',
      group: 'banner',
      description: 'A page of the site such as /contact-us, or a full https:// address.',
      validation: (r) =>
        r.custom((v) =>
          !v || /^\/(?!\/)/.test(v) || /^https:\/\//.test(v)
            ? true
            : 'Start with / (a page of this site) or https://',
        ),
    }),

    // ---------- Sections below the banner ----------
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'listHeading',
      title: 'List heading',
      type: 'string',
      group: 'content',
      description: 'e.g. What We Craft / Core Woodwork Elements / Home Spaces We Cover',
    }),
    defineField({
      name: 'listCards',
      title: 'List cards',
      type: 'array',
      group: 'content',
      description:
        'One card per item: pick an icon and write a short line. Shown 4 across on desktop, 2 on tablet, 1 on mobile. Drag to reorder.',
      of: [
        defineArrayMember({
          name: 'listCard',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {list: ICONS, layout: 'dropdown'},
              initialValue: 'leaf',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (r) => r.required().max(120),
            }),
          ],
          preview: {select: {title: 'text', subtitle: 'icon'}},
        }),
      ],
      validation: (r) => r.max(8).warning('More than 8 cards makes the page long.'),
    }),
    defineField({
      name: 'listItems',
      title: 'List items (older, plain text)',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      description:
        'Older plain-text list, kept so existing content still shows (icons are picked automatically). Add “List cards” above to choose icons; once they are filled in these are ignored.',
      hidden: ({value}) => !Array.isArray(value) || value.length === 0,
    }),
    defineField({
      name: 'focusHeading',
      title: '“Craft & Finish” heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'focusText',
      title: '“Craft & Finish” text',
      type: 'text',
      rows: 3,
      group: 'content',
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    select: {menuName: 'menuName', title: 'title', slug: 'slug.current', media: 'bannerImage'},
    prepare: ({menuName, title, slug, media}) => ({
      title: menuName || title || 'Expertise Page',
      subtitle: slug ? `/our-expertise/${slug}` : 'Add a name and generate the slug',
      media,
    }),
  },
})
