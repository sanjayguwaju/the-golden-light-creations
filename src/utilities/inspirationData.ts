import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { InspirationImage } from '@/components/ActionGallery'

export interface InspirationPalette {
  id: string
  name: string
  tagline: string
  roomRecommendation: string
  colors: {
    name: string
    role: 'Primary Wall' | 'Accent Wall' | 'Trim & Molding' | 'Ceiling'
    hexCode: string
    slug: string
  }[]
}

export const FALLBACK_INSPIRATION_SPACES: InspirationImage[] = [
  {
    id: 'insp-1',
    title: 'Contemporary Emerald Living Sanctuary',
    description:
      'Deep jewel tones paired with warm brass fixtures and warm off-white trim create an inviting, ultra-premium living room.',
    image: {
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      alt: 'Contemporary emerald living room with luxury finishes',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-1',
      name: 'Teal Lagoon',
      hexCode: '#008080',
      slug: 'teal-lagoon',
      colorCode: 'TR-5840',
      colorFamily: 'Blues & Teals',
    },
    roomType: 'living-room',
    styleTags: ['Modern', 'Luxury', 'Contemporary'],
  },
  {
    id: 'insp-2',
    title: 'Minimalist Scandinavian Master Suite',
    description:
      'Soft earthy beige and warm morning light create a tranquil bedroom sanctuary promoting deep rest and effortless calm.',
    image: {
      url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      alt: 'Minimalist bedroom in warm beige and soft tones',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-2',
      name: 'Soft Peach',
      hexCode: '#FFDAB9',
      slug: 'soft-peach',
      colorCode: 'TR-1432',
      colorFamily: 'Warm Pastels',
    },
    roomType: 'bedroom',
    styleTags: ['Minimalist', 'Scandinavian', 'Modern'],
  },
  {
    id: 'insp-3',
    title: 'Modern Himalayan Mountain Villa Facade',
    description:
      'Engineered to resist high UV, heavy monsoon rains, and mountain frost while keeping a crisp, timeless exterior appearance.',
    image: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern exterior architectural villa facade',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-3',
      name: 'Abyss Blue',
      hexCode: '#1A2A44',
      slug: 'abyss-blue',
      colorCode: 'TR-3911',
      colorFamily: 'Deep Oceans',
    },
    roomType: 'exterior',
    styleTags: ['Modern', 'Architectural', 'Minimalist'],
  },
  {
    id: 'insp-4',
    title: 'Gourmet Chef Kitchen & Dining Oasis',
    description:
      'Refreshing seafoam accents combined with natural timber cabinetry create a lively, modern culinary hub for family gatherings.',
    image: {
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern kitchen in fresh seafoam green and timber',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-4',
      name: 'Seafoam',
      hexCode: '#9FE2BF',
      slug: 'seafoam',
      colorCode: 'TR-6388',
      colorFamily: 'Greens & Mints',
    },
    roomType: 'kitchen',
    styleTags: ['Contemporary', 'Clean', 'Modern'],
  },
  {
    id: 'insp-5',
    title: 'Executive Royal Heritage Home Study',
    description:
      'Deep dusk violet walls framed by crisp crown molding provide a sophisticated backdrop for focused productivity and deep thought.',
    image: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Luxury home office in deep dusk violet with book shelves',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-5',
      name: 'Dusk Violet',
      hexCode: '#483D8B',
      slug: 'dusk-violet',
      colorCode: 'TR-7827',
      colorFamily: 'Purples & Violets',
    },
    roomType: 'office',
    styleTags: ['Classic', 'Industrial', 'Luxury'],
  },
  {
    id: 'insp-6',
    title: 'Sunlit Mediterranean Dining Hall',
    description:
      'Warm golden tones reflect natural sunlight throughout the day, creating an energetic and hospitable dining atmosphere.',
    image: {
      url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      alt: 'Sunlit warm dining room with open windows',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-6',
      name: 'Reliance Gold',
      hexCode: '#C59B27',
      slug: 'reliance-gold',
      colorCode: 'TR-1080',
      colorFamily: 'Golds & Yellows',
    },
    roomType: 'dining-room',
    styleTags: ['Classic', 'Rustic', 'Warm'],
  },
  {
    id: 'insp-7',
    title: 'Serene Spa-Inspired Bathroom Retreat',
    description:
      'High-humidity resistance paint formulation creates a refreshing, water-repellent sanctuary with gentle sea-mist tones.',
    image: {
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern spa bathroom with clean minimalist tiling',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-7',
      name: 'Aqua Mist',
      hexCode: '#70B5B0',
      slug: 'aqua-mist',
      colorCode: 'TR-6110',
      colorFamily: 'Blues & Teals',
    },
    roomType: 'bathroom',
    styleTags: ['Minimalist', 'Modern', 'Spa'],
  },
  {
    id: 'insp-8',
    title: 'Rustic Heritage Brick & Stucco Portico',
    description:
      'A warm terracotta and deep forest tone palette that seamlessly blends heritage Nepali architecture with modern color vibrancy.',
    image: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      alt: 'Rustic exterior veranda with warm lighting and brickwork',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-8',
      name: 'Terracotta Earth',
      hexCode: '#C86D51',
      slug: 'terracotta-earth',
      colorCode: 'TR-2201',
      colorFamily: 'Oranges & Earth',
    },
    roomType: 'exterior',
    styleTags: ['Rustic', 'Classic', 'Heritage'],
  },
  {
    id: 'insp-9',
    title: 'Urban Chic Open-Plan Living & Lounge',
    description:
      'Contrasting warm greige with dark charcoal structural beams creates an airy, cosmopolitan atmosphere for urban apartment living.',
    image: {
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      alt: 'Urban modern open plan living room with stylish furniture',
      width: 1200,
      height: 800,
    },
    featuredColour: {
      id: 'c-9',
      name: 'Warm Greige',
      hexCode: '#D8D2C9',
      slug: 'warm-greige',
      colorCode: 'TR-2410',
      colorFamily: 'Neutrals & Greiges',
    },
    roomType: 'living-room',
    styleTags: ['Industrial', 'Modern', 'Contemporary'],
  },
]

export const DESIGNER_PALETTES: InspirationPalette[] = [
  {
    id: 'pal-1',
    name: 'Kathmandu Royal Heritage',
    tagline: 'Warm earth, royal gold, and deep night sapphire for stately living spaces',
    roomRecommendation: 'Living Room & Grand Entrance Halls',
    colors: [
      { name: 'Abyss Blue', role: 'Accent Wall', hexCode: '#1A2A44', slug: 'abyss-blue' },
      { name: 'Reliance Gold', role: 'Primary Wall', hexCode: '#C59B27', slug: 'reliance-gold' },
      { name: 'Terracotta Earth', role: 'Trim & Molding', hexCode: '#C86D51', slug: 'terracotta-earth' },
      { name: 'Snow White', role: 'Ceiling', hexCode: '#FAFAF8', slug: 'snow-white' },
    ],
  },
  {
    id: 'pal-2',
    name: 'Himalayan Morning Breeze',
    tagline: 'Serene seafoam, clean alpine white, and soft silver grey for calm bedrooms',
    roomRecommendation: 'Master Suite & Wellness Spaces',
    colors: [
      { name: 'Seafoam', role: 'Primary Wall', hexCode: '#9FE2BF', slug: 'seafoam' },
      { name: 'Soft Peach', role: 'Accent Wall', hexCode: '#FFDAB9', slug: 'soft-peach' },
      { name: 'Slate Gray', role: 'Trim & Molding', hexCode: '#4A5568', slug: 'slate-gray' },
      { name: 'Alpine White', role: 'Ceiling', hexCode: '#EDEDED', slug: 'alpine-white' },
    ],
  },
  {
    id: 'pal-3',
    name: 'Modern Nordic Calm',
    tagline: 'Refined greiges and midnight accents for contemporary open-plan homes',
    roomRecommendation: 'Open Kitchen, Dining & Living',
    colors: [
      { name: 'Warm Greige', role: 'Primary Wall', hexCode: '#D8D2C9', slug: 'warm-greige' },
      { name: 'Teal Lagoon', role: 'Accent Wall', hexCode: '#008080', slug: 'teal-lagoon' },
      { name: 'Dusk Violet', role: 'Trim & Molding', hexCode: '#483D8B', slug: 'dusk-violet' },
      { name: 'Snow White', role: 'Ceiling', hexCode: '#FFFFFF', slug: 'snow-white' },
    ],
  },
]

export async function getInspirationSpaces(locale = 'en'): Promise<InspirationImage[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const inspirations = await payload.find({
      collection: 'inspiration',
      depth: 2,
      limit: 100,
      locale: locale as any,
      overrideAccess: false,
    })

    if (inspirations.docs && inspirations.docs.length > 0) {
      const mapped = inspirations.docs
        .map((doc) => {
          const image = doc.image && typeof doc.image !== 'string' ? doc.image : null
          const featuredColour =
            doc.featuredColour && typeof doc.featuredColour !== 'string'
              ? doc.featuredColour
              : null

          if (!image?.url || !featuredColour?.hexCode) return null

          return {
            id: String(doc.id),
            title: doc.title,
            image: {
              url: image.url,
              alt: image.alt ?? doc.title,
              width: image.width ?? undefined,
              height: image.height ?? undefined,
            },
            featuredColour: {
              id: typeof featuredColour.id === 'string' ? featuredColour.id : String(featuredColour.id),
              name: featuredColour.name,
              hexCode: featuredColour.hexCode,
              slug: featuredColour.slug,
              colorCode: (featuredColour as any).colorId,
              colorFamily: (featuredColour as any).colorFamily,
            },
            roomType: doc.roomType ?? undefined,
            styleTags: Array.isArray(doc.styleTags) ? doc.styleTags : undefined,
            secondaryColours: Array.isArray(doc.secondaryColours)
              ? doc.secondaryColours
                  .filter((c) => c && typeof c !== 'string')
                  .map((c: any) => ({
                    id: String(c.id),
                    name: c.name,
                    hexCode: c.hexCode,
                    slug: c.slug,
                    colorCode: c.colorId,
                  }))
              : undefined,
            productRecommendation:
              doc.recommendedProduct && typeof doc.recommendedProduct !== 'string'
                ? {
                    title: (doc.recommendedProduct as any).title,
                    slug: (doc.recommendedProduct as any).slug,
                  }
                : undefined,
          }
        })
        .filter(Boolean) as InspirationImage[]

      if (mapped.length > 0) {
        return mapped
      }
    }
  } catch (error) {
    console.warn('Could not fetch inspirations from CMS, falling back to curated spaces:', error)
  }

  return FALLBACK_INSPIRATION_SPACES
}
