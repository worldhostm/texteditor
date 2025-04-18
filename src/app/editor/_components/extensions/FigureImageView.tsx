// FigureImageView.tsx
import React, { useRef, useEffect } from 'react'
import { NodeViewWrapper , NodeViewContent} from '@tiptap/react'

interface Props {
  node: any
  updateAttributes: (attrs: Record<string, any>) => void
}

const FigureImageView: React.FC<Props> = ({ node, updateAttributes }) => {
  const { src, alt, caption } = node.attrs
  const figcaptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (figcaptionRef.current) {
      figcaptionRef.current.innerText = caption || ''
    }
  }, [caption])

  return (
    <NodeViewWrapper as="figure" style={{ display: 'flex', flexDirection: 'column' }}>
      <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
      {/* 이 부분이 이제 Tiptap 내부 editable 영역이 됨 */}
      <figcaption style={{ outline: 'none', fontSize: '14px', color: '#666' }}>
        <NodeViewContent as="div" className="caption-content" />
      </figcaption>
    </NodeViewWrapper>
  )
}

export default FigureImageView