import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(): Promise<Response> {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://the-golden-light-creations.netlify.app'
  const payload = await getPayload({ config: configPromise })

  const postsRes = await payload.find({
    collection: 'posts',
    limit: 1000,
    pagination: false,
    select: { slug: true, updatedAt: true },
    where: { _status: { equals: 'published' } },
  })

  const urls = postsRes.docs.map((doc) => `  <url>
    <loc>${siteUrl}/posts/${doc.slug}</loc>
    <lastmod>${new Date(doc.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
