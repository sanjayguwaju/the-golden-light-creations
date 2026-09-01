import "dotenv/config";
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function seedPages() {
  console.log('--- Seeding Contractors Program & Investor Relations Pages ---')
  const payload = await getPayload({ config: configPromise })

  const pagesToSeed = [
    {
      title: 'Reliance Pro Contractors Program',
      slug: 'contractors-program',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      layout: [
        {
          blockType: 'contractorsProgram',
          hero: {
            badge: 'Reliance Pro Contractors',
            title: 'Partner With The Best',
            description:
              'Elevate your painting business with exclusive pricing, priority support, and premium Reliance products tailored for professional contractors.',
            stats: [
              {
                value: '500+',
                label: 'Registered Contractors',
                icon: 'Users',
              },
              {
                value: '100%',
                label: 'Dedicated Support',
                icon: 'Trophy',
              },
            ],
          },
          benefits: {
            title: 'Program Benefits',
            description:
              "We understand the demands of professional painting. That's why we've designed a program that supports your business growth every step of the way.",
            cards: [
              {
                title: 'Wholesale Pricing & Rebates',
                description:
                  'Access tier-based contractor discounts and volume cashbacks on all premium Reliance products.',
                icon: 'NepaliRupee',
              },
              {
                title: 'Priority Color Tinting',
                description:
                  'Fast-track sample matching and on-demand large batch tinting for your commercial sites.',
                icon: 'Percent',
              },
              {
                title: 'Dedicated Technical Desk',
                description:
                  'Direct phone and on-site technical assistance for paint failure prevention and surface diagnosis.',
                icon: 'Headset',
              },
              {
                title: 'Direct Jobsite Delivery',
                description:
                  'Convenient scheduled bulk deliveries straight to your construction sites across Nepal.',
                icon: 'PackageOpen',
              },
              {
                title: 'Lead Referrals & Certifications',
                description:
                  'Receive certified contractor badges and direct customer homeowner leads from Reliance Paints.',
                icon: 'Trophy',
              },
              {
                title: 'Painter Training Workshops',
                description:
                  'Free skills upgrading and application technique certification for your painters and crews.',
                icon: 'Users',
              },
            ],
          },
          howItWorks: {
            title: 'How To Join',
            description: 'Three simple steps to unlock premium benefits.',
            steps: [
              {
                title: 'Submit Your Registration',
                description:
                  'Fill out the simple contractor / master painter registration form with your business details.',
                icon: 'ClipboardList',
              },
              {
                title: 'Account Verification',
                description:
                  'Our regional contractor relations manager reviews your application within 24–48 hours.',
                icon: 'ThumbsUp',
              },
              {
                title: 'Start Earning & Ordering',
                description:
                  'Receive your contractor ID card, access special trade pricing, and start claiming project rebates.',
                icon: 'Wrench',
              },
            ],
          },
          cta: {
            title: 'Ready to Upgrade Your Business?',
            description:
              'Join hundreds of top professionals who trust Reliance Paints to deliver quality and value on every job.',
            buttonText: 'Apply Now',
          },
        },
      ],
    },
    {
      title: 'Investor Relations',
      slug: 'investor-relations',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      layout: [
        {
          blockType: 'investorRelations',
          heroTitle: 'Investor Relations',
          heroSubtitle:
            'Explore Reliance Paints corporate governance, financial reports, annual disclosures, and investor information.',
          overviewTitle: 'Company Overview & Strategic Growth',
          reportsSectionTitle: 'Financial Statements & Annual Reports',
          reports: [
            {
              title: 'Annual Report & Audited Accounts FY 2024-25',
              year: 2025,
              type: 'annual',
              fileUrl: '/documents/reliance-annual-report-2024-25.pdf',
            },
            {
              title: 'Audited Financial Statements FY 2023-24',
              year: 2024,
              type: 'financial',
              fileUrl: '/documents/reliance-financials-2023-24.pdf',
            },
            {
              title: 'Corporate Presentation & Expansion Strategy 2024',
              year: 2024,
              type: 'presentation',
              fileUrl: '/documents/reliance-corporate-presentation-2024.pdf',
            },
            {
              title: 'Annual Report FY 2022-23',
              year: 2023,
              type: 'annual',
              fileUrl: '/documents/reliance-annual-report-2022-23.pdf',
            },
          ],
        },
      ],
    },
  ]

  for (const page of pagesToSeed) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      draft: true,
    })

    if (existing.docs.length > 0) {
      console.log(`Updating existing page: ${page.slug}`)
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: page as any,
        context: { disableRevalidate: true },
      })
    } else {
      console.log(`Creating new page: ${page.slug}`)
      await payload.create({
        collection: 'pages',
        data: page as any,
        context: { disableRevalidate: true },
      })
    }
  }

  console.log('✅ Successfully seeded Contractors Program & Investor Relations pages into pages collection!')
  process.exit(0)
}

seedPages().catch((err) => {
  console.error('Error seeding pages:', err)
  process.exit(1)
})
