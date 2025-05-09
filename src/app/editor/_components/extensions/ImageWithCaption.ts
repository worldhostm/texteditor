// ImageWithCaptionExtension.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const ImageWithCaption = Node.create({
  name: 'figureImage',
  group: 'block',
  content: 'inline*',
  inline: false,
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      caption: { default: '' },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { caption, ...imgAttrs } = HTMLAttributes
  
    return [
      'figure',
      mergeAttributes(HTMLAttributes),
      ['img', {
        ...imgAttrs,
        style: 'width: 100%; height: 100%; object-fit: contain;',
      }],
      ['figcaption', {}, caption || ''],
    ]
  },
})