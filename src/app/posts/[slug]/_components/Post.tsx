'use client'
// _components/Post.tsx
import React, { useEffect, useState } from 'react';
import RichContentRenderer from './RichContentRender';

interface Props {
  id: string
}

export default function Post({ id }: Props) {
  const [html, sethtml] = useState<string|''>('');
  const [thumbnail, setthumbnail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`/api/detail/${id}`)
      .then(res => res.json())
      .then(data => {
        console.info(data.thumbnail);
        sethtml(data.content);
        setthumbnail(data.thumbnail);
        setIsLoading(false);
      })
  }, [id])

  return (
    !isLoading &&
    <>
      <div style={{
        width:'auto',
        height:'auto',
        aspectRatio:'375/240',
        backgroundImage:`url('${thumbnail}')`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'center'
      }}>
      </div>
      <RichContentRenderer html={html} />
    </>
  )
}
