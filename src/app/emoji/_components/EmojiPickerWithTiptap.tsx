// EmojiPickerWithTiptap.tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// import 'emoji-mart/css/emoji-mart.css';

// emoji-mart Picker를 dynamic import로 불러오기
const Picker = dynamic(
  () => import('./EmojiMartWrapper'),
  { ssr: false }
);

export default function EmojiPickerWithTiptap() {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
    ],
    content: '<p>이모지를 선택해보세요! 😄</p>',
  })

  const [showPicker, setShowPicker] = useState(false)

  const handleEmojiSelect = (emoji: any) => {
    if (!editor) return
    editor.chain().focus().insertContent(emoji.emoji).run()
    setShowPicker(false)
  }

  if (!editor) return null

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="relative">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          😊 이모지 삽입
        </button>

        {showPicker && (
          <div className="absolute z-50 mt-2">
            <Picker onEmojiSelect={handleEmojiSelect} title="이모지 고르기" emoji="point_up" />
          </div>
        )}
      </div>

      <div className="w-full border p-4 rounded">
        <EditorContent editor={editor} className="tiptap" />
      </div>

      <p>
        <strong>HTML Output:</strong>
      </p>
      <div className="w-full break-words border p-4 bg-gray-50 rounded">
        {editor.getHTML()}
      </div>
    </div>
  )
}
