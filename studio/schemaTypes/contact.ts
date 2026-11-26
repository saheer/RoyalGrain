import {defineField, defineType} from 'sanity'

// Singleton: feeds BOTH the "Have an Enquiry?" section on the Home page and the
// /contact-us page (hero + contact details).
export default defineType({
  name: 'contact',
  title: 'Contact Us',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Have an Enquiry?',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Planning a custom piece or a complete interior? Tell us about your space and we will get back to you shortly.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Contact page hero background image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Shown behind the heading on the Contact page. A dark blue tint is added automatically so the text stays readable.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'generalEmail',
      title: 'General enquiries email (shown on the site)',
      type: 'string',
      initialValue: 'hello@royalgrain.com',
      description:
        'Display only. Where submitted enquiries are delivered is set in the website environment variables.',
      validation: (r) => r.email(),
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Project enquiries email (shown on the site)',
      type: 'string',
      initialValue: 'royalgrainwood@gmail.com',
      description: 'Display only (see above).',
      validation: (r) => r.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone number (shown on the site)',
      type: 'string',
      description:
        'Shown under "Call Us" as a tap-to-call link. Include the country code, e.g. +91 98765 43210.',
      validation: (r) =>
        r.regex(/^[+\d\s()-]{10,20}$/, {name: 'phone number'}).error('Use digits, spaces and + only.'),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number (shown on the site)',
      type: 'string',
      description:
        'Shown under "WhatsApp"; opens a chat on wa.me. Include the country code, e.g. +91 98765 43210.',
      validation: (r) =>
        r.regex(/^[+\d\s()-]{10,20}$/, {name: 'phone number'}).error('Use digits, spaces and + only.'),
    }),
    defineField({
      name: 'address',
      title: 'Address (shown on the site)',
      type: 'text',
      rows: 3,
      description: 'Shown under "Visit Us". One line per row: press Enter to start a new line.',
      initialValue:
        'Royal Grain Woodcraft & Interiors\nPuthentheru, Tanur\nMalappuram, Kerala, India - 676302',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields'}),
  ],
  preview: {prepare: () => ({title: 'Contact Us'})},
})