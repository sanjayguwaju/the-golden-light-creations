import React from 'react'
import { ContractorsHero } from '@/components/contractors-program/ContractorsHero'
import { BenefitsSection } from '@/components/contractors-program/BenefitsSection'
import { HowItWorks } from '@/components/contractors-program/HowItWorks'
import { ContractorsCTA } from '@/components/contractors-program/ContractorsCTA'

export const ContractorsProgramBlock: React.FC<any> = (props) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-surface">
      <ContractorsHero data={props.hero} />
      <BenefitsSection data={props.benefits} />
      <HowItWorks data={props.howItWorks} />
      <ContractorsCTA data={props.cta} />
    </div>
  )
}
