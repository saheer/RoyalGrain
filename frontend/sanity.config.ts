import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'
import {inlineSvgInput} from '@focus-reactive/sanity-plugin-inline-svg-input'

// Singletons: one document each, fixed ID, no create/delete.
const singletons = [
  'home',
  'contact',
  'footer',
  'about',
  'exploreHolidaysPage',
  'instagramFeed',
  'ourExpertisePage',
  'travelGuidePage',
]

export default defineConfig({
  name: 'default',
  basePath: '/studio',
  title: 'royal-grain',
  projectId: 'atpzvewv',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('home')
              .child(S.document().schemaType('home').documentId('home')),
            
            S.listItem()
              .title('About Us')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
              
            S.listItem()
              .title('Instagram Feed')
              .id('instagramFeed')
              .child(S.document().schemaType('instagramFeed').documentId('instagramFeed')),

            S.listItem()
              .title('Explore Collections Page')
              .id('exploreHolidaysPage')
              .child(S.document().schemaType('exploreHolidaysPage').documentId('exploreHolidaysPage')),
            S.documentTypeListItem('holiday').title('Collections (the 4 solutions)'),

            S.listItem()
              .title('Our Expertise Page')
              .id('ourExpertisePage')
              .child(S.document().schemaType('ourExpertisePage').documentId('ourExpertisePage')),
            S.documentTypeListItem('expertisePage').title('Expertise Pages (the 5 detail pages)'),

            S.listItem()
              .title('Contact Us')
              .id('contact')
              .child(S.document().schemaType('contact').documentId('contact')),
            S.divider(),
            S.listItem()
              .title('Footer (all pages)')
              .id('footer')
              .child(S.document().schemaType('footer').documentId('footer')),
            S.divider(),
            // Blog posts (many documents, so a normal list instead of a singleton)
            S.listItem()
              .title('Design Guide Page (banner & SEO)')
              .id('travelGuidePage')
              .child(S.document().schemaType('travelGuidePage').documentId('travelGuidePage')),
            S.documentTypeListItem('post').title('Design Guide posts'),
            S.documentTypeListItem('postCategory').title('Design Guide categories'),
          ]),
    }),
    visionTool(),
    inlineSvgInput(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletons.includes(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})