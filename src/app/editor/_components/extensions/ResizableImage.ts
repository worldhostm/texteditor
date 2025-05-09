// ResizableImage.ts
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ResizableImageView from './ResizableImageView';

export const ResizableImage = Node.create({
  name: 'resizableImage',
  group: 'block',
  draggable: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: 300 },
      height: { default: 'auto' },
      caption:{default:''}
    }
  },

  parseHTML() {
    return [{ tag: 'img' }]
  },

  renderHTML({ HTMLAttributes }) {
    const { caption, ...rest } = HTMLAttributes
    return [
        'figure',
        {},
        ['img', rest],
        ['figcaption', {}, caption || ''],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView)
  },
})
