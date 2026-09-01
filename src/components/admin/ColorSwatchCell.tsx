'use client'
import React from 'react'

export function ColorSwatchCell(props: any) {
  const { cellData } = props
  
  if (!cellData) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div 
        style={{ 
          width: '24px', 
          height: '24px', 
          backgroundColor: cellData, 
          borderRadius: '4px',
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
        }} 
      />
      <span>{cellData}</span>
    </div>
  )
}

export default ColorSwatchCell
