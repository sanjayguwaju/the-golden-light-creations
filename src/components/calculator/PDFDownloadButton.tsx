'use client'

import React, { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { EstimatePDF, PDFData } from './EstimatePDF'
import { Download, Loader2, FileCheck } from 'lucide-react'

type PDFDownloadButtonProps = {
  data: PDFData
  className?: string
}

export default function PDFDownloadButton({ data, className }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    if (isGenerating) return
    try {
      setIsGenerating(true)
      const doc = <EstimatePDF data={data} />
      const blob = await pdf(doc).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `reliance-paints-estimate-${data.referenceId || 'report'}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3500)
    } catch (err) {
      console.error('Failed to generate PDF estimate:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={className || "w-full flex items-center justify-center gap-2 bg-reliance-gold hover:bg-reliance-gold/90 text-white font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Generating Official PDF...</span>
        </>
      ) : downloaded ? (
        <>
          <FileCheck className="w-5 h-5 text-white" />
          <span>Estimate Downloaded!</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>Download Estimate as PDF</span>
        </>
      )}
    </button>
  )
}

