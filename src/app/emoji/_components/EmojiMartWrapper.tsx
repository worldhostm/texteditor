// components/EmojiMartWrapper.tsx
'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const Picker = dynamic(() => import('./EmojiPickerWithTiptap'), {
    ssr: false,
  }) as any

export default function EmojiMartWrapper(props: any) {
  return <Picker {...props} />
}
