import type { Metadata } from 'next/types'
import React from 'react'
import Link from 'next/link'
import { ChevronRight, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import ContactMapClient from '@/components/ContactMapClient'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-static'

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  
  const { contactDetails, officeLocation } = siteSettings

  return (
    <div className="bg-page-bg min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative bg-reliance-navy pt-12 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-reliance-gold rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-reliance-red rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-reliance-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-reliance-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-reliance-white">Contact Us</span>
          </div>

          <div className="max-w-2xl text-reliance-white">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-reliance-white/70 text-lg leading-relaxed max-w-xl">
              Have a question or looking to partner with us? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* HQ Info */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 hover:border-reliance-gold transition-colors">
              <div className="w-12 h-12 bg-reliance-gold/10 rounded-2xl flex items-center justify-center text-reliance-gold">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-reliance-navy text-xl mb-2">Corporate Office</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {contactDetails?.address || 'Reliance Paints\nKathmandu, Nepal'}
                </p>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 hover:border-reliance-gold transition-colors">
              <div className="w-12 h-12 bg-reliance-gold/10 rounded-2xl flex items-center justify-center text-reliance-gold">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-reliance-navy text-xl mb-2">Direct Contact</h3>
                <a href={`tel:${contactDetails?.phone?.replace(/\s+/g, '')}`} className="text-gray-600 hover:text-reliance-gold transition-colors block mb-1">
                  {contactDetails?.phone}
                </a>
                <a href={`mailto:${contactDetails?.email}`} className="text-gray-600 hover:text-reliance-gold transition-colors flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4" /> {contactDetails?.email}
                </a>
                <a href={`https://wa.me/${contactDetails?.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-2 mt-2 font-medium">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 hover:border-reliance-gold transition-colors">
              <div className="w-12 h-12 bg-reliance-gold/10 rounded-2xl flex items-center justify-center text-reliance-gold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-reliance-navy text-xl mb-2">Business Hours</h3>
                <ul className="space-y-1 text-gray-600">
                  {contactDetails?.businessHours?.map((bh, i) => (
                    <li key={i} className="flex justify-between w-48 gap-4">
                      <span>{bh.days}:</span>
                      <span className="font-medium text-gray-900">{bh.hours}</span>
                    </li>
                  ))}
                  {!contactDetails?.businessHours?.length && (
                    <li className="flex justify-between w-48">
                      <span>Sunday - Friday:</span>
                      <span className="font-medium text-gray-900">10am - 6pm</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

          </div>

          {/* Form and Map */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <ContactForm />
            
            {/* Office Map */}
            {officeLocation?.latitude && officeLocation?.longitude && (
              <div>
                <h3 className="text-2xl font-bold text-reliance-navy mb-4">Our Location</h3>
                <ContactMapClient lat={officeLocation.latitude} lng={officeLocation.longitude} />
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Contact Us | Reliance Paints',
    description: 'Get in touch with Reliance Paints for general inquiries, sales, and support.',
  }
}
