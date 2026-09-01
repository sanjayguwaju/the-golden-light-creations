import React from 'react'
import { DealershipInquiryClient } from './DealershipInquiryClient'
import { BrandMarquee } from '@/components/home/BrandMarquee'

export const DealershipInquiryBlock: React.FC<any> = (props) => {
  return (
    <>
      <DealershipInquiryClient
        title={props.title || 'Dealership Inquiry'}
        subtitle={props.subtitle}
        content={props.content}
        form={props.form}
      />
      <div className="bg-reliance-offwhite">
        <BrandMarquee />
      </div>
    </>
  )
}
