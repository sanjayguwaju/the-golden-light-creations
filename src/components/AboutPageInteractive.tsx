'use client'

import type { ReactNode } from 'react'

type AboutPageInteractiveProps = {
  children: ReactNode
}

export default function AboutPageInteractive({ children }: AboutPageInteractiveProps) {
  return (
    <div>
      <style jsx global>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-fade-up {
          animation: fadeUp 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .animate-float {
          animation: floatSoft 6s ease-in-out infinite;
        }
        .card-interaction {
          transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
        }
        .card-interaction:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -24px rgba(18, 39, 67, 0.35);
        }
      `}</style>
      {children}
    </div>
  )
}
