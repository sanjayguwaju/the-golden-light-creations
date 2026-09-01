'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  hexCode: string
}

export default function CopyButton({ hexCode }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hexCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="mt-6 w-full bg-reliance-navy text-white py-3 px-6 rounded-xl hover:bg-reliance-navy/90 transition-colors flex items-center justify-center gap-2"
    >
      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      {copied ? 'Copied!' : 'Copy Hex Code'}
    </button>
  )
}
