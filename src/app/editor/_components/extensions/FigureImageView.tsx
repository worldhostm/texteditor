// // FigureImageView.tsx
// import React, { useRef, useEffect } from 'react'
// import { NodeViewWrapper , NodeViewContent} from '@tiptap/react'
// import Image from 'next/image'

// /* eslint-disable @typescript-eslint/no-explicit-any */
// interface Props {
//   node: any
// }
// /* eslint-disable @typescript-eslint/no-explicit-any */

// const FigureImageView: React.FC<Props> = ({ node }) => {
//   const { src, alt, caption } = node.attrs
//   const figcaptionRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (figcaptionRef.current) {
//       figcaptionRef.current.innerText = caption || ''
//     }
//   }, [caption])

//   return (
//     <NodeViewWrapper as="figure" style={{display: 'flex', flexDirection: 'column', position:'relative' }}>
//       <Image src={src} alt={alt} fill objectFit='contain' />
//       {/* 이 부분이 이제 Tiptap 내부 editable 영역이 됨 */}
//       <figcaption style={{ outline: 'none', fontSize: '14px', color: '#666' }}>
//         <NodeViewContent as="div" className="caption-content" />
//       </figcaption>
//     </NodeViewWrapper>
//   )
// }


// export default FigureImageView