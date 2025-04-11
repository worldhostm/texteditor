'use client'
// _components/Post.tsx
import React, { useEffect, useState } from 'react'
import RichContentRenderer from './RichContentRender'

interface Props {
  id: string
}

export default function Post({ id }: Props) {
  const [data, setData] = useState<string|''>('');
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/detail/${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data.content);
      })
  }, [])

  return (
    <RichContentRenderer html={data} />
  )
}
