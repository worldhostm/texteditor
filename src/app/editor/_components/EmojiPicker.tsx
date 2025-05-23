// components/EmojiPicker.tsx
import React from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


interface EmojiPickerProps {
  onSelect: (emoji: string) => void
  position: {
    top: number
    left: number
  }
}


export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, position }) => {
    const handleEmojiSelect = (emoji: { native: string }) => {
        onSelect(emoji.native)
      }
  return (
    <div
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        background: '#fff',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '6px',
        zIndex: 999,
      }}
    >
      <Picker
        data={data}
        onEmojiSelect={handleEmojiSelect}
        theme="light"
        //light or dark
      />
      {/* {emojiList.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          style={{ fontSize: 24, margin: 4, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {emoji}
        </button>
      ))} */}
    </div>
  )
}
