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
    return [
      'figure',
      mergeAttributes(HTMLAttributes),
      ['img', HTMLAttributes],
      ['figcaption', {}, HTMLAttributes.caption || ''],
    ]
  },
})