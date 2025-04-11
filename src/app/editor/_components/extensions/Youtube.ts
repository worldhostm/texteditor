// extensions/YouTube.ts
import { Node, mergeAttributes,InputRule } from '@tiptap/core';

export interface YouTubeOptions {
  allowFullscreen: boolean
  width: number
  height: number
}

// ✅ 명시적으로 타입 확장
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      youtube: {
        setYouTubeVideo: (src: string) => ReturnType
      }
    }
  }

export const YouTube = Node.create<YouTubeOptions>({
  name: 'youtube',
  group: 'block',
  atom: true,

  addOptions() {
    return {
      allowFullscreen: true,
      width: 640,
      height: 360,
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src*="youtube.com"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'iframe',
      mergeAttributes(HTMLAttributes, {
        width: 640,
        height: 360,
        frameborder: '0',
        allowfullscreen: 'true',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      }),
    ]
  },

  addCommands() {
    return {
      setYouTubeVideo: (src: string) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { src },
        })
      },
    }
  },

  // ✅ 자동 감지용 input rule 추가
  addInputRules() {
    return [
      new InputRule({
        find: /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
        handler: ({ match, chain }) => {
          const videoId = match[4]
          const embedUrl = `https://www.youtube.com/embed/${videoId}`
          chain().setYouTubeVideo(embedUrl).run()
        },
      }),
    ]
  },
})
