import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://reliancepaints.com'
  const payload = await getPayload({ config: configPromise })

  // Fetch all published products
  const productsRes = await payload.find({
    collection: 'products' as any,
    limit: 1000,
    pagination: false,
    select: { slug: true, updatedAt: true } as any,
  })

  // Fetch all product categories
  const categoriesRes = await payload.find({
    collection: 'product-categories' as any,
    limit: 200,
    pagination: false,
    select: { slug: true, updatedAt: true } as any,
  })

  // Fetch all published posts
  const postsRes = await payload.find({
    collection: 'posts',
    limit: 1000,
    pagination: false,
    select: { slug: true, updatedAt: true },
    where: { _status: { equals: 'published' } },
  })

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/posts`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/store-locator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/colors`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const productRoutes: MetadataRoute.Sitemap = productsRes.docs.map((doc: any) => ({
    url: `${siteUrl}/products/${doc.slug}`,
    lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categoriesRes.docs.map((doc: any) => ({
    url: `${siteUrl}/products/${doc.slug}`,
    lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const postRoutes: MetadataRoute.Sitemap = postsRes.docs.map((doc) => ({
    url: `${siteUrl}/posts/${doc.slug}`,
    lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...postRoutes]
}
