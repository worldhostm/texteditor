import React, { useRef } from 'react'
import { NodeViewWrapper,NodeViewProps } from '@tiptap/react'

export default function ResizableImageView({ node, updateAttributes, selected }:NodeViewProps) {
  const { src, width,caption } = node.attrs
  const wrapperRef = useRef<HTMLDivElement>(null);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = wrapperRef.current?.offsetWidth || 0

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX)
      updateAttributes({ width: newWidth })
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <NodeViewWrapper as="div" ref={wrapperRef} style={{ position: 'relative', width, display:'flex',flexDirection:'column', gap:'10px', alignItems:'center' }}>
      <img src={src} style={{ width: '100%' }} />
      <input
        type="text"
        placeholder="설명글을 입력하세요."
        value={caption || ''}
        onChange={(e) => updateAttributes({ caption: e.target.value })}
        style={{
            width: '100%',
            fontSize: '0.9rem',
            padding: '4px',
            outline:'none',
            border: 'none',
            borderRadius: '4px',
            color : 'var(--gray-500)'
        }}
      />
      {selected && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 16,
            height: 16,
            background: 'white',
            border: '2px solid #999',
            borderRadius: '50%',
            cursor: 'nwse-resize',
          }}
          onMouseDown={startResize}
        />
      )}
    </NodeViewWrapper>
  )
}
