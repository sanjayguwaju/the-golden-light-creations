import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    const [
      productsCountRes,
      postsCountRes,
      usersCountRes,
      colorsCountRes,
      storesCountRes,
      pagesCountRes,
      mediaCountRes,
      contactSubmissionsCountRes,
      contractorAppsCountRes,
      warrantiesCountRes,
      jobAppsCountRes,
      allProductsRes,
      productCategoriesRes,
      allPostsRes,
      categoriesRes,
    ] = await Promise.all([
      payload.count({ collection: 'products' }),
      payload.count({ collection: 'posts' }),
      payload.count({ collection: 'users' }),
      payload.count({ collection: 'colors' }),
      payload.count({ collection: 'stores' }),
      payload.count({ collection: 'pages' }),
      payload.count({ collection: 'media' }),
      payload.count({ collection: 'contact-submissions' }),
      payload.count({ collection: 'contractor-applications' }),
      payload.count({ collection: 'warranties' }),
      payload.count({ collection: 'job-applications' }),
      payload.find({ collection: 'products', limit: 100, depth: 1 }),
      payload.find({ collection: 'product-categories', limit: 100 }),
      payload.find({ collection: 'posts', limit: 100, depth: 1 }),
      payload.find({ collection: 'categories', limit: 100 }),
    ])

    const totalProducts = productsCountRes.totalDocs || 0
    const totalPosts = postsCountRes.totalDocs || 0
    const totalUsers = usersCountRes.totalDocs || 0
    const totalColors = colorsCountRes.totalDocs || 0
    const totalStores = storesCountRes.totalDocs || 0
    const totalPages = pagesCountRes.totalDocs || 0
    const totalMedia = mediaCountRes.totalDocs || 0
    const totalContacts = contactSubmissionsCountRes.totalDocs || 0
    const totalContractors = contractorAppsCountRes.totalDocs || 0
    const totalWarranties = warrantiesCountRes.totalDocs || 0
    const totalJobApps = jobAppsCountRes.totalDocs || 0

    // Group Products by Category
    const categoryMap: Record<string, { name: string; count: number }> = {}
    
    productCategoriesRes.docs.forEach((cat: any) => {
      categoryMap[cat.id] = { name: cat.title || 'Uncategorized', count: 0 }
    })

    allProductsRes.docs.forEach((prod: any) => {
      const catId = typeof prod.category === 'object' && prod.category ? prod.category.id : prod.category
      if (catId && categoryMap[catId]) {
        categoryMap[catId].count += 1
      } else {
        const fallbackName = typeof prod.category === 'object' && prod.category?.title ? prod.category.title : 'Other'
        if (!categoryMap['other']) {
          categoryMap['other'] = { name: fallbackName, count: 0 }
        }
        categoryMap['other'].count += 1
      }
    })

    const productsByCategory = Object.values(categoryMap)
      .filter((item) => item.count > 0 || productCategoriesRes.docs.length <= 6)
      .map((item) => ({
        name: item.name,
        value: item.count,
      }))

    // Group Posts by Blog Category
    const postCategoryMap: Record<string, { name: string; count: number }> = {}
    categoriesRes.docs.forEach((cat: any) => {
      postCategoryMap[cat.id] = { name: cat.title || 'General', count: 0 }
    })

    allPostsRes.docs.forEach((post: any) => {
      if (Array.isArray(post.categories) && post.categories.length > 0) {
        post.categories.forEach((c: any) => {
          const cId = typeof c === 'object' && c ? c.id : c
          if (cId && postCategoryMap[cId]) {
            postCategoryMap[cId].count += 1
          }
        })
      } else {
        if (!postCategoryMap['uncategorized']) {
          postCategoryMap['uncategorized'] = { name: 'Articles', count: 0 }
        }
        postCategoryMap['uncategorized'].count += 1
      }
    })

    const postsByCategory = Object.values(postCategoryMap)
      .filter((item) => item.count > 0)
      .map((item) => ({
        name: item.name,
        count: item.count,
      }))

    // General Content Ecosystem
    const contentOverview = [
      { name: 'Products', count: totalProducts, fill: '#6366F1' },
      { name: 'Blog Posts', count: totalPosts, fill: '#10B981' },
      { name: 'Colors / Shades', count: totalColors, fill: '#F59E0B' },
      { name: 'Store Locations', count: totalStores, fill: '#EC4899' },
      { name: 'Pages', count: totalPages, fill: '#8B5CF6' },
      { name: 'Media Assets', count: totalMedia, fill: '#06B6D4' },
    ]

    // Inquiries & Submissions Breakdown
    const submissionsBreakdown = [
      { name: 'Contact Inquiries', count: totalContacts, fill: '#6366F1' },
      { name: 'Contractor Apps', count: totalContractors, fill: '#F97316' },
      { name: 'Warranty Claims', count: totalWarranties, fill: '#14B8A6' },
      { name: 'Job Applications', count: totalJobApps, fill: '#A855F7' },
    ]

    // Recent Products List
    const recentProducts = allProductsRes.docs.slice(0, 5).map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: typeof p.category === 'object' ? p.category?.title : 'Product',
      updatedAt: p.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalPosts,
        totalUsers,
        totalColors,
        totalStores,
        totalPages,
        totalMedia,
        totalSubmissions: totalContacts + totalContractors + totalWarranties + totalJobApps,
        productsByCategory,
        postsByCategory,
        contentOverview,
        submissionsBreakdown,
        recentProducts,
      },
    })
  } catch (error: any) {
    console.error('Error fetching dashboard statistics:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
}
