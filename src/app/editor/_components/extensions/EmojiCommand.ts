// extensions/EmojiCommand.ts
import { Extension } from '@tiptap/core'
import { Command } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    emojiCommand: {
      insertEmoji: (emoji: string) => ReturnType
    }
  }
}

export const EmojiCommand = Extension.create({
  name: 'emojiCommand',

  addCommands() {
    return {
      insertEmoji:
        (emoji: string): Command =>
        ({ commands }) => {
          return commands.insertContent(emoji)
        },
    }
  },
})
