import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    const [
      portfolioCountRes,
      filmsCountRes,
      servicesCountRes,
      testimonialsCountRes,
      contactSubmissionsCountRes,
      albumsCountRes,
      mediaCountRes,
      usersCountRes,
      postsCountRes,
      pagesCountRes,
      allPortfolioRes,
      allFilmsRes,
      allServicesRes,
    ] = await Promise.all([
      payload.count({ collection: 'portfolio' }),
      payload.count({ collection: 'films' }),
      payload.count({ collection: 'services' }),
      payload.count({ collection: 'testimonials' }),
      payload.count({ collection: 'contact-submissions' }),
      payload.count({ collection: 'albums' }),
      payload.count({ collection: 'media' }),
      payload.count({ collection: 'users' }),
      payload.count({ collection: 'posts' }),
      payload.count({ collection: 'pages' }),
      payload.find({ collection: 'portfolio', limit: 100 }),
      payload.find({ collection: 'films', limit: 100 }),
      payload.find({ collection: 'services', limit: 100 }),
    ])

    const totalPortfolio = portfolioCountRes.totalDocs || 0
    const totalFilms = filmsCountRes.totalDocs || 0
    const totalServices = servicesCountRes.totalDocs || 0
    const totalTestimonials = testimonialsCountRes.totalDocs || 0
    const totalSubmissions = contactSubmissionsCountRes.totalDocs || 0
    const totalAlbums = albumsCountRes.totalDocs || 0
    const totalMedia = mediaCountRes.totalDocs || 0
    const totalUsers = usersCountRes.totalDocs || 0
    const totalPosts = postsCountRes.totalDocs || 0
    const totalPages = pagesCountRes.totalDocs || 0

    // Group Portfolio by Category
    const portfolioCategoryMap: Record<string, { name: string; value: number }> = {}
    allPortfolioRes.docs.forEach((item: any) => {
      const cat = (item.category || 'weddings').toUpperCase()
      const label =
        cat === 'WEDDINGS' ? 'Weddings' :
        cat === 'FASHION' ? 'Fashion' :
        cat === 'EVENTS' ? 'Events' :
        cat === 'COMMERCIAL' ? 'Commercial' :
        cat === 'CONCERTS' ? 'Concerts' : cat
      
      if (!portfolioCategoryMap[label]) {
        portfolioCategoryMap[label] = { name: label, value: 0 }
      }
      portfolioCategoryMap[label].value += 1
    })

    const portfolioByCategory = Object.values(portfolioCategoryMap)

    // Group Films by Category
    const filmCategoryMap: Record<string, { name: string; count: number }> = {}
    allFilmsRes.docs.forEach((item: any) => {
      const cat = item.category || 'Cinema'
      if (!filmCategoryMap[cat]) {
        filmCategoryMap[cat] = { name: cat, count: 0 }
      }
      filmCategoryMap[cat].count += 1
    })

    const filmsByCategory = Object.values(filmCategoryMap)

    // Studio Content Overview
    const contentOverview = [
      { name: 'Photography', count: totalPortfolio, fill: '#F5B301' },
      { name: 'Cinematic Films', count: totalFilms, fill: '#FFD04A' },
      { name: 'Production Services', count: totalServices, fill: '#10B981' },
      { name: 'Client Reviews', count: totalTestimonials, fill: '#6366F1' },
      { name: 'Client Galleries', count: totalAlbums, fill: '#EC4899' },
      { name: 'Media Assets', count: totalMedia, fill: '#06B6D4' },
    ]

    // Studio Inquiries & Client Engagement
    const submissionsBreakdown = [
      { name: 'Booking Inquiries', count: totalSubmissions, fill: '#F5B301' },
      { name: 'Client Reviews', count: totalTestimonials, fill: '#10B981' },
      { name: 'Client Albums', count: totalAlbums, fill: '#6366F1' },
    ]

    return NextResponse.json({
      success: true,
      stats: {
        totalPortfolio,
        totalFilms,
        totalServices,
        totalTestimonials,
        totalSubmissions,
        totalAlbums,
        totalMedia,
        totalUsers,
        totalPosts,
        totalPages,
        portfolioByCategory,
        filmsByCategory,
        contentOverview,
        submissionsBreakdown,
      },
    })
  } catch (error: any) {
    console.error('Error computing studio dashboard statistics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch studio dashboard statistics',
      },
      { status: 500 }
    )
  }
}
