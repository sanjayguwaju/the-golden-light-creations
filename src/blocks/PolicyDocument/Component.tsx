'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RichText from '@/components/RichText'

export type PolicyDocumentBlockProps = {
  title?: string | null
  lastUpdated?: string | null
  content?: any
}

export const PolicyDocumentBlock: React.FC<PolicyDocumentBlockProps> = ({
  title = 'Policy Document',
  lastUpdated,
  content,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    
    tl.from('.animate-fade-up', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    })
    
    tl.from('.animate-content', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4')

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-reliance-offwhite py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 border-b border-reliance-navy/10 pb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up text-reliance-navy uppercase tracking-widest">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-reliance-grey animate-fade-up font-bold tracking-widest text-sm uppercase">
              Last Updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
        
        <div className="prose prose-lg max-w-none animate-content prose-headings:text-reliance-navy prose-p:text-reliance-grey prose-a:text-reliance-gold hover:prose-a:text-reliance-navy prose-a:font-bold prose-headings:uppercase prose-headings:tracking-widest bg-white border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] p-8 md:p-12">
          {content ? (
            <RichText data={content} enableGutter={false} />
          ) : (
            <p className="font-bold text-reliance-navy">Policy content is empty. Please update it in the admin panel.</p>
          )}
        </div>
      </div>
    </div>
  )
}
