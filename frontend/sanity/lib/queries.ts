import {groq} from 'next-sanity'

// ---------------------------------------------------------------------------
// SEO: the `seoFields` object, as a reusable projection. Add `${seoFragment}`
// inside the projection of any query whose document has a `seo` field.
export const seoFragment = groq`
  "seo": seo{
    metaTitle,
    metaDescription,
    keywords,
    noIndex,
    noFollow,
    "ogImage": ogImage.asset->url,
    "ogImageAlt": ogImage.alt,
    "ogHotspot": ogImage.hotspot{x, y}
  }
`

// SEO of a one-document page: pageSeoQuery with { type: "about" }, { type: "home" } …
export const pageSeoQuery = groq`
  *[_type == $type][0]{
    ${seoFragment}
  }
`

export const homeQuery = groq`
  *[_type == "home"][0]{
    heroHeadingWhite,
    heroHeadingBlue,
    heroDescription,
    heroButtonText,
    heroButtonLink,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "logos": logos[defined(asset)]{
      _key,
      "name": coalesce(name, asset->originalFilename),
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    "featured": {
      "eyebrow": featuredEyebrow,
      "heading": featuredHeading,
      "headingAccent": featuredHeadingAccent,
      "description": featuredDescription,
      "linkText": featuredLinkText,
      "linkUrl": featuredLinkUrl,
      "cards": featuredCards[defined(image.asset)]{
        _key,
        title,
        subtitle,
        link,
        "image": image.asset->url,
        "hotspot": image.hotspot{x, y}
      }
    },
    "landscape": {
      "heading": landscapeHeading,
      "description": landscapeDescription,
      "cards": landscapeCards[defined(image.asset)]{
        _key,
        title,
        description,
        link,
        "image": image.asset->url,
        "hotspot": image.hotspot{x, y}
      }
    },
    "approach": {
      "heading": approachHeading,
      "description": approachDescription,
      "ctaText": approachCtaText,
      "ctaLink": approachCtaLink,
      "steps": approachSteps[]{
        _key,
        title,
        subtitle,
        highlight,
        "icon": iconFile.asset->url,
        "iconType": iconFile.asset->mimeType
      }
    },
    "holidays": {
      "eyebrow": holidaysEyebrow,
      "heading": holidaysHeading,
      "headingAccent": holidaysHeadingAccent,
      "description": holidaysDescription,
      "items": holidaysItems[]{
        _key,
        title,
        link,
        iconPreset,
        "icon": iconFile.asset->url,
        "iconType": iconFile.asset->mimeType
      },
      "buttonLabel": buttonLabel,
      "holidayButtonLink": holidayButtonLink
    },
    "why": {
      "mediaType": whyMediaType,
      "videoUrl": coalesce(whyVideoFile.asset->url, whyVideoUrl),
      "image": whyImage.asset->url,
      "imageAlt": whyImage.alt,
      "hotspot": whyImage.hotspot{x, y},
      "features": whyFeatures[]{
        _key,
        title,
        highlight,
        description,
        iconPreset,
        "icon": iconFile.asset->url,
        "iconType": iconFile.asset->mimeType
      }
    },
    "testimonials": {
      "heading": testimonialsHeading,
      "subtitle": testimonialsSubtitle,
      "items": testimonials[defined(quote)]{
        _key,
        quote,
        position,
        company
      }
    }
  }
`

// ---------------------------------------------------------------------------
// Design Guide (blog): documents of type "post".
//
// Only posts that have a slug are listed (a post without one has no URL).
// "Newest first" is decided by `publishedAt`; a missing
// date falls back to a very old one so undated posts sink to the bottom, and
// `_createdAt` breaks ties.
const POST_FILTER = '_type == "post" && defined(slug.current)'
const POST_NEWEST_FIRST =
  'order(coalesce(publishedAt, "1970-01-01") desc, _createdAt desc)'

// Fields every card needs (home section, featured slot, grid).
// `category` is a reference to a "postCategory" document; posts saved before that
// change still hold a plain string, so both shapes resolve to the category name.
const POST_CARD = `
  _id,
  title,
  "slug": slug.current,
  "category": select(category._type == "reference" => category->title, category),
  excerpt,
  publishedAt,
  "image": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "hotspot": mainImage.hotspot{x, y}
`

// Home page: the 3 newest posts
export const guideHomeQuery = groq`
  *[${POST_FILTER}] | ${POST_NEWEST_FIRST}[0...3]{${POST_CARD}}
`

// Listing page: the banner (hero) of /design-guide
export const guideHeroQuery = groq`
  *[_type == "travelGuidePage"][0]{
    heroHeadingWhite,
    heroHeadingBlue,
    heroDescription,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroHotspot": heroBackground.hotspot{x, y}
  }
`

// Listing page, part 1: the featured post + how many posts exist.
// Pinned posts win ("featured == true"); among them (or among all posts, when none
// is pinned) the newest comes first.
export const guideFeaturedQuery = groq`
  {
    "featured": *[${POST_FILTER}]
      | order(coalesce(featured, false) desc, coalesce(publishedAt, "1970-01-01") desc, _createdAt desc)[0]{${POST_CARD}},
    "total": count(*[${POST_FILTER}])
  }
`

// Listing page, part 2: one page of the grid = every post except the featured one
export const guideGridQuery = groq`
  *[${POST_FILTER} && _id != $featuredId] | ${POST_NEWEST_FIRST}[$from...$to]{${POST_CARD}}
`

// Detail page: one post by slug (body images carry their URL and size for next/image)
export const guidePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${POST_CARD},
    ${seoFragment},
    "body": body[]{
      ...,
      _type == "image" => {
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        alt,
        caption
      }
    }
  }
`
export const newsletterQuery = groq`
  *[_type == "home"][0]{
    "heading": newsletterHeading,
    "subtitle": newsletterSubtitle,
    "backgroundType": newsletterBackgroundType,
    "image": newsletterBackgroundImage.asset->url,
    "imageAlt": newsletterBackgroundImage.alt,
    "hotspot": newsletterBackgroundImage.hotspot{x, y},
    "videoUrl": coalesce(newsletterBackgroundVideoFile.asset->url, newsletterBackgroundVideoUrl)
  }
`
// ---------------------------------------------------------------------------
// Contact Us: ONE Studio document ("Contact Us") feeds both the Home page
// "Have an Enquiry?" section and the /contact-us page.
export const contactQuery = groq`
  *[_type == "contact"][0]{
    heading,
    description,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "heroHotspot": heroImage.hotspot{x, y},
    generalEmail,
    bookingEmail,
    phone,
    whatsapp,
    address
  }
`
// ---------------------------------------------------------------------------
// Global footer (singleton "Footer" document), rendered on every page
export const footerQuery = groq`
  *[_type == "footer"][0]{
    "logo": logo.asset->url,
    "logoAlt": logo.alt,
    description,
    socialLinks[]{platform, label, url},
    indexTitle,
    indexLinks[]{label, url},
    holidaysTitle,
    holidayLinks[]{label, url},
    copyright,
    legalLinks[]{label, url}
  }
`
// ---------------------------------------------------------------------------
// About Us page (singleton "About Us" document)
export const aboutQuery = groq`
  *[_type == "about"][0]{
    heroHeadingWhite,
    heroHeadingBlue,
    heroDescription,
    heroButtonText,
    heroButtonLink,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroHotspot": heroBackground.hotspot{x, y},

    "stats": statsItems[]{_key, value, label},
    statsNote,

    peopleHeading,
    peopleDescription,
    "peopleImage": peopleImage.asset->url,
    "peopleImageAlt": peopleImage.alt,
    peopleButtonText,
    peopleButtonLink,

    journeyHeading,
    journey[]{_key, icon, year, title, description},

    craftHeading,
    craftSubtitle,
    craftCards[]{_key, icon, title, description},

    testimonialsHeading,
    testimonialsSubtitle,
    testimonials[]{_key, quote, author, position, company}
  }
`
// ---------------------------------------------------------------------------
// Instagram Feed page (singleton "Instagram Feed" document)
export const instagramFeedQuery = groq`
  *[_type == "instagramFeed"][0]{
    heroEyebrow,
    heroHeadingWhite,
    heroHeadingBlue,
    heroDescription,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroHotspot": heroBackground.hotspot{x, y},

    instagramUrl,
    instagramHandle,
    followLabel,

    feedEyebrow,
    feedHeading,
    feedDescription,

    "posts": posts[defined(image.asset)]{
      _key,
      "imageUrl": image.asset->url,
      "alt": image.alt,
      "hotspot": image.hotspot{x, y},
      postUrl,
      isVideo,
      caption
    }
  }
`
// ---------------------------------------------------------------------------
// Holidays: "Explore Collections Page" singleton + one "holiday" document per solution
export const exploreHolidaysPageQuery = groq`
  *[_type == "exploreHolidaysPage"][0]{
    heroTitle,
    heroSubtitle,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroHotspot": heroBackground.hotspot{x, y},
    introHeading,
    introDescription,
    exploreLabel,
    whyChooseHeading,
    whyChooseItems[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)},
    benefits[]{
      _key,
      title,
      description,
      "icon": coalesce(icon.asset->url, icon)
    },
    coverItems[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)}
  }
`

const HOLIDAY_CARD = `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  features,
  "image": image.asset->url,
  "imageAlt": image.alt,
  "hotspot": image.hotspot{x, y}
`

const HOLIDAY_ORDER = `order(coalesce(order, 999) asc, title asc)`

// /explore-collections listing
export const holidaysListQuery = groq`
  *[_type == "holiday" && defined(slug.current)] | ${HOLIDAY_ORDER}{${HOLIDAY_CARD}}
`

// Header dropdown + "other solutions": only what a small card needs
export const holidaysMenuQuery = groq`
  *[_type == "holiday" && defined(slug.current)] | ${HOLIDAY_ORDER}{
    _id,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    "imageAlt": image.alt
  }
`

// /explore-collections/[slug]
export const holidayBySlugQuery = groq`
  *[_type == "holiday" && slug.current == $slug][0]{
    ${HOLIDAY_CARD},
    ${seoFragment},

    heroTitleWhite,
    heroTitleBlue,
    heroSubtitle,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "heroHotspot": heroImage.hotspot{x, y},

    keyFeaturesHeading,
    keyFeaturesIntro,
    keyFeatures[]{_key, tabLabel, title, description, "image": image.asset->url, "imageAlt": image.alt},

    whyHeading,
    whyText,
    whyPoints,
    "whyImage": whyImage.asset->url,
    "whyImageAlt": whyImage.alt,

    highlightsHeading,
    highlightItems[]{_key, title, description, "image": image.asset->url, "imageAlt": image.alt},

    benefitsHeading,
    benefits[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)},

    coverHeading,
    coverIntro,
    coverItems[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)},

    ctaEyebrow,
    ctaHeading,
    ctaText,
    ctaButtonLabel,
    ctaLink,
    whyChooseHeading,
    whyChooseItems[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)},
    faqHeading,
    faqs[]{_key, question, answer}
  }
`

// For generateStaticParams
export const holidaySlugsQuery = groq`
  *[_type == "holiday" && defined(slug.current)] | ${HOLIDAY_ORDER}{"slug": slug.current}
`
// Slugs for generateStaticParams on /design-guide/[slug]
export const guideSlugsQuery = groq`
  *[${POST_FILTER}] | ${POST_NEWEST_FIRST}{"slug": slug.current}
`
// ---------------------------------------------------------------------------
// Our Expertise page (singleton "Our Expertise Page" document)
export const ourExpertiseQuery = groq`
  *[_type == "ourExpertisePage"][0]{
    heroEyebrow,
    heroHeadingWhite,
    heroHeadingBlue,
    heroDescription,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroHotspot": heroBackground.hotspot{x, y},

    expertiseHeading,
    expertiseSubtitle,
    expertiseItems[]{_key, icon, title, description}
  }
`


// One of the five /our-expertise/<slug> detail pages (document type "expertisePage")
export const expertisePageBySlugQuery = groq`
  *[_type == "expertisePage" && slug.current == $slug][0]{
    menuName,
    "slug": slug.current,
    bannerEyebrow,
    title,
    titleAccent,
    bannerCopy,
    ctaLabel,
    ctaLink,
    "bannerImage": bannerImage.asset->url,
    "bannerImageAlt": bannerImage.alt,
    "bannerHotspot": bannerImage.hotspot{x, y},
    overview,
    menuIcon,
    listHeading,
    listCards[]{icon, text},
    listItems,
    focusHeading,
    focusText,
    ${seoFragment}
  }
`


// Every published expertise page (menu name + address + a one-line description), oldest first.
// Merged with the built-in five in lib/expertisePages.ts (buildExpertiseIndex).
export const expertisePagesListQuery = groq`
  *[_type == "expertisePage" && defined(slug.current)] | order(_createdAt asc){
    "slug": slug.current,
    menuName,
    title,
    bannerCopy,
    menuIcon
  }
`
