'use client'

import { useState, useRef, useEffect } from 'react'

interface Props {
  editor: any
}

const headingOptions = [
  { label: '제목1', action: (editor: any) => editor.chain().focus().updateAttributes('paragraph', { class: 'headlineL' }).run(), isActive: (editor: any) => editor.getAttributes('paragraph').class === 'headlineL' },
  { label: '제목2', action: (editor: any) => editor.chain().focus().updateAttributes('paragraph', { class: 'headlineM' }).run(), isActive: (editor: any) => editor.getAttributes('paragraph').class === 'headlineM' },
  { label: '제목3', action: (editor: any) => editor.chain().focus().updateAttributes('paragraph', { class: 'headlineS' }).run(), isActive: (editor: any) => editor.getAttributes('paragraph').class === 'headlineS' },
  { label: '본문1', action: (editor: any) => editor.chain().focus().updateAttributes('paragraph', { class: 'bodyL' }).run(), isActive: (editor: any) => editor.getAttributes('paragraph').class === 'bodyL' },
  { label: '본문2', action: (editor: any) => editor.chain().focus().updateAttributes('paragraph', { class: 'bodyM' }).run(), isActive: (editor: any) => editor.getAttributes('paragraph').class === 'bodyM' },
  { label: '본문3', action: (editor: any) => editor.chain().focus().updateAttributes('paragraph', { class: 'bodyS' }).run(), isActive: (editor: any) => editor.getAttributes('paragraph').class === 'bodyS' },
]

export default function FontOptions({ editor }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = headingOptions.find(opt => opt.isActive(editor))?.label || '제목1'

  return (
    <div className="heading-dropdown" ref={ref}>
      <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        {current}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {headingOptions.map((opt, i) => (
            <button
              key={i}
              className={`dropdown-item ${opt.isActive(editor) ? 'active' : ''}`}
              onClick={() => {
                opt.action(editor)
                setIsOpen(false)
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
