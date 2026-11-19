import {defineField, defineType} from 'sanity'

// Singleton "Instagram Feed" page (one document, ID "instagramFeed").
// Shows Instagram posts/videos and links back to the Instagram profile.
// If INSTAGRAM_ACCESS_TOKEN is set on the website, the latest posts are loaded from
// Instagram automatically; the "Posts" below are the manual fallback (and the only
// source when no token is configured).
export default defineType({
  name: 'instagramFeed',
  title: 'Instagram Feed',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'profile', title: 'Instagram profile'},
    {name: 'posts', title: 'Posts'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Instagram Feed',
      readOnly: true,
    }),

    // ---------- Hero ----------
    defineField({
      name: 'heroEyebrow',
      title: 'Badge (small label)',
      type: 'string',
      group: 'hero',
      initialValue: 'Instagram Feed',
    }),
    defineField({
      name: 'heroHeadingWhite',
      title: 'Heading (white part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Follow our journeys on',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeadingBlue',
      title: 'Heading (blue part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Instagram.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Moments, places and videos from Kerala and beyond, shared by Royal Grain and the travellers we host.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Background image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      description: 'Wide image (about 2400 × 1200). A navy tint is added automatically.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ---------- Instagram profile ----------
    defineField({
      name: 'instagramUrl',
      title: 'Instagram profile link',
      type: 'url',
      group: 'profile',
      description: 'The "Follow us" button links here, e.g. https://www.instagram.com/yourhandle/',
      initialValue: 'https://www.instagram.com/royalgrain/',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram handle',
      type: 'string',
      group: 'profile',
      description: 'Shown next to the follow button, e.g. @royalgrain',
      initialValue: '@royalgrain',
    }),
    defineField({
      name: 'followLabel',
      title: 'Follow button label',
      type: 'string',
      group: 'profile',
      initialValue: 'Follow us on Instagram',
    }),

    // ---------- Posts ----------
    defineField({
      name: 'feedEyebrow',
      title: 'Small label',
      type: 'string',
      group: 'posts',
      initialValue: 'Gallery',
    }),
    defineField({
      name: 'feedHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'posts',
      description: 'Press Enter to start a new line.',
      initialValue: 'Latest from\nour Instagram.',
    }),
    defineField({
      name: 'feedDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'posts',
      description: 'Shown on the right of the heading.',
      initialValue: 'Tap any photo or video to open it on Instagram.',
    }),
    defineField({
      name: 'posts',
      title: 'Posts (manual)',
      type: 'array',
      group: 'posts',
      description:
        'Photos and videos to show. Used when the live Instagram connection is not set up (or is temporarily unavailable). Drag to reorder; the first one is shown first.',
      of: [
        {
          type: 'object',
          name: 'instagramPost',
          title: 'Instagram post',
          fields: [
            defineField({
              name: 'image',
              title: 'Photo or reel cover',
              type: 'image',
              options: {hotspot: true},
              description:
                'Photo: portrait 4:5 (about 1080 × 1350). Reel: vertical 9:16 cover frame (about 1080 × 1920). The card takes the shape of the image type, so upload the full frame to avoid cropping.',
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'postUrl',
              title: 'Link to the Instagram post',
              type: 'url',
              description: 'The post/reel link, e.g. https://www.instagram.com/p/XXXX/ (falls back to the profile link).',
              validation: (r) => r.uri({scheme: ['https']}),
            }),
            defineField({
              name: 'isVideo',
              title: 'This is a reel / video',
              type: 'boolean',
              description: 'Makes the card tall (9:16) and shows the reel icon and a play button on hover.',
              initialValue: false,
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 3,
              description: 'Short text shown when hovering over the card.',
            }),
          ],
          preview: {select: {title: 'caption', subtitle: 'postUrl', media: 'image'}},
        },
      ],
      validation: (r) => r.max(24),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Instagram Feed'})},
})
