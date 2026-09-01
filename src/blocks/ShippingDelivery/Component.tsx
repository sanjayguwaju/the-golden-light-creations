'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type ShippingDeliveryBlockProps = {
  title?: string | null
  lastUpdated?: string | null
  introText?: string | null
  shippingMethods?: Array<{
    title: string
    description: string
    timeframe: string
    cost: string
    id?: string | null
  }> | null
  trackingInfo?: {
    title?: string | null
    description?: string | null
  } | null
  faqs?: Array<{
    question: string
    answer: string
    id?: string | null
  }> | null
}

export const ShippingDeliveryBlock: React.FC<ShippingDeliveryBlockProps> = (props) => {
  const {
    title = 'Shipping & Delivery Information',
    lastUpdated,
    introText,
    shippingMethods,
    trackingInfo,
    faqs,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    
    // Animate background elements
    tl.from('.bg-circle', {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)',
    })
    
    // Animate hero text
    tl.from('.hero-text', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=1')
    
    // Animate the intro card floating up
    tl.from('.intro-card', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
    }, '-=0.5')

    // ScrollTrigger for Shipping Methods
    gsap.from('.shipping-method-card', {
      scrollTrigger: {
        trigger: '.shipping-methods-container',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    })

    // ScrollTrigger for Tracking section
    gsap.from('.tracking-section', {
      scrollTrigger: {
        trigger: '.tracking-section',
        start: 'top 85%',
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    // ScrollTrigger for FAQs
    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faqs-container',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    })

    // Subtle float animation for the bg circles
    gsap.to('.bg-circle-1', {
      y: '20px',
      x: '-10px',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
    gsap.to('.bg-circle-2', {
      y: '-20px',
      x: '15px',
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-theme-elevation-50 overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative bg-reliance-navy text-white pt-16 pb-20 px-4 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="bg-circle bg-circle-1 absolute -top-20 -right-20 w-96 h-96 rounded-full bg-reliance-gold/20 blur-3xl"></div>
          <div className="bg-circle bg-circle-2 absolute top-40 -left-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <h1 className="hero-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">{title}</h1>
          {lastUpdated && (
            <div className="hero-text inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-reliance-gold shadow-[4px_4px_0_0_#D9A05B]">
              <p className="text-white font-medium tracking-wide text-sm uppercase">
                Last Updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Main Content Sections */}
      <section className="container mx-auto px-4 max-w-5xl -mt-10 relative z-20 pb-24 space-y-16">
        
        {/* Intro */}
        {introText && (
          <div className="intro-card bg-white shadow-lg p-8 md:p-12 border border-slate-200">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed text-center font-medium">
              {introText}
            </p>
          </div>
        )}

        {/* Shipping Methods Grid */}
        {shippingMethods && shippingMethods.length > 0 && (
          <div className="shipping-methods-container pt-8">
            <div className="text-center mb-12">
              <span className="text-reliance-gold font-bold uppercase tracking-widest text-sm mb-4 block">Delivery Options</span>
              <h2 className="text-3xl md:text-4xl font-bold text-reliance-navy">How We Ship</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shippingMethods.map((method, i) => (
                <div key={method.id || i} className="shipping-method-card bg-white p-8 border-t-4 border-t-reliance-gold shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-reliance-navy mb-4">{method.title}</h3>
                  <p className="text-slate-600 mb-6 flex-grow">{method.description}</p>
                  
                  <div className="bg-theme-elevation-100 p-4 rounded-sm mt-auto space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-semibold uppercase tracking-wider">Time</span>
                      <span className="font-bold text-reliance-navy">{method.timeframe}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-2">
                      <span className="text-slate-500 font-semibold uppercase tracking-wider">Cost</span>
                      <span className="font-bold text-reliance-navy">{method.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tracking Section */}
        {trackingInfo && (
          <div className="tracking-section bg-reliance-navy text-white p-10 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-reliance-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-reliance-gold flex items-center justify-center rounded-full shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold">{trackingInfo.title || 'Order Tracking & Notifications'}</h2>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {trackingInfo.description}
              </p>
            </div>
          </div>
        )}

        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <div className="faqs-container pt-12 pb-12">
            <div className="text-center mb-12">
              <span className="text-reliance-gold font-bold uppercase tracking-widest text-sm mb-4 block">Common Questions</span>
              <h2 className="text-3xl md:text-4xl font-bold text-reliance-navy">Shipping FAQs</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, i) => (
                <div key={faq.id || i} className="faq-item bg-white p-6 md:p-8 border border-slate-200 hover:border-reliance-gold/50 transition-colors">
                  <h3 className="text-lg md:text-xl font-bold text-reliance-navy mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  )
}
