'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { ShieldCheck, TrendingUp, Handshake, ArrowRight, AlertCircle } from 'lucide-react'

type Props = {
  title: string
  subtitle?: string
  content: any
  form?: FormType | string | null
}

export function DealershipInquiryClient({ title, subtitle, content, form }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Animate background shapes
    tl.fromTo('.bg-shape', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 2, stagger: 0.3 }
    )

    // Content fade up
    tl.fromTo('.animate-fade-up',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      '-=1.5'
    )

    // Value props stagger
    tl.fromTo('.animate-feature',
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15 },
      '-=1.2'
    )
    
    // Form slide in
    tl.fromTo('.animate-form',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power4.out' },
      '-=1.0'
    )

    // Gentle floating animation for background shapes
    gsap.to('.bg-shape', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5,
    })

  }, { scope: containerRef })

  return (
    <main ref={containerRef} className="relative min-h-screen bg-reliance-offwhite overflow-hidden font-sans">
      
      <div className="container mx-auto px-4 lg:px-16 py-16 md:py-24 max-w-[1440px] relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 flex flex-col space-y-8 md:space-y-10">
            <div>
              <div className="inline-flex items-center space-x-2 py-1.5 px-3 md:px-4 bg-reliance-gold/10 border border-reliance-gold text-reliance-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6 animate-fade-up">
                <Handshake className="w-4 h-4" />
                <span>Partner With Reliance Paints</span>
              </div>
              <h1 className="text-4xl lg:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-up tracking-tight text-reliance-navy leading-[1.1] uppercase">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg text-reliance-grey animate-fade-up leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="prose prose-base sm:prose-lg prose-slate prose-a:text-primary hover:prose-a:text-primary/80 max-w-none animate-fade-up">
              {content ? (
                <RichText data={content} enableGutter={false} />
              ) : (
                <p className="text-slate-500 italic">Content pending update from admin panel.</p>
              )}
            </div>
            
            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 md:mt-6">
              <div className="animate-feature group flex flex-col p-6 bg-white border border-reliance-navy shadow-[4px_4px_0_0_#0D1B3E] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#C9A84C] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-reliance-gold/10 text-reliance-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-reliance-navy uppercase tracking-widest text-lg mb-2">High Margins</h3>
                <p className="text-sm text-reliance-grey leading-relaxed">Boost your business growth with our lucrative partnership structure and continuous support.</p>
              </div>
              <div className="animate-feature group flex flex-col p-6 bg-white border border-reliance-navy shadow-[4px_4px_0_0_#0D1B3E] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#C9A84C] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-reliance-navy/10 text-reliance-navy mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-reliance-navy uppercase tracking-widest text-lg mb-2">Premium Quality</h3>
                <p className="text-sm text-reliance-grey leading-relaxed">Offer industry-leading formulations trusted by professionals and loved by homeowners.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6 relative animate-form mt-4 lg:mt-0 lg:sticky lg:top-32">
            
            <div className="relative bg-white border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] p-6 sm:p-10 lg:p-12 overflow-hidden">
              
              <div className="mb-8 md:mb-10 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-reliance-navy mb-1 uppercase tracking-widest">Apply Now</h2>
                  <p className="text-reliance-grey text-sm">Take the first step towards a rewarding partnership.</p>
                </div>
                <div className="hidden sm:flex w-10 h-10 bg-reliance-navy/5 items-center justify-center shrink-0 border border-reliance-navy">
                  <ArrowRight className="w-4 h-4 text-reliance-navy" />
                </div>
              </div>

              <div className="relative z-10 form-container [&_input]:rounded-none [&_select]:rounded-none [&_textarea]:rounded-none [&_button]:rounded-none [&_button]:py-3 [&_button]:bg-reliance-navy [&_button]:text-white [&_button]:hover:bg-reliance-gold [&_button]:hover:text-reliance-navy [&_button]:border [&_button]:border-transparent [&_button]:hover:border-reliance-navy [&_button]:font-bold [&_button]:uppercase [&_button]:tracking-widest md:[&_button]:py-3.5 [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-widest [&_label]:text-xs md:[&_label]:text-sm [&_label]:text-reliance-navy">
                {form && typeof form === 'object' ? (
                  <FormBlock
                    enableIntro={false}
                    form={form}
                  />
                ) : (
                  <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <AlertCircle className="w-8 h-8 text-slate-400 mb-3" />
                    <p className="text-slate-500 font-medium text-sm md:text-base">Inquiry form is not currently available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
