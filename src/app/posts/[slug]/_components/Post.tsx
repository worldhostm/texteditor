'use client'
// _components/Post.tsx
import React, { useEffect, useState } from 'react';
import RichContentRenderer from './RichContentRender';
import { useEditStore } from '@/store/editStore';
import { useRouter } from 'next/navigation';
// import { useEditStore } from '@/store/editStore';

interface Props {
  id: string
  // title: string
  // content: string
  // thumbnail: string
}

export default function Post({ id}: Props) {
  const [html, sethtml] = useState<string|''>('');
  const [title, settitle] = useState<string>('');
  const [thumbnail, setthumbnail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contents,setContents] =  useState();
  const {username} = useEditStore();
  const router = useRouter();
  useEffect(() => {
    fetch(`/api/detail/${id}`,{
      method:'GET',
      headers:{},
    })
      .then(res => res.json())
      .then(data => {
        console.info(data.thumbnail);
        sethtml(data.content);
        setthumbnail(data.thumbnail);
        settitle(data.title);
        setIsLoading(false);
      })
  }, [id]);

  const deleteDetail=async(id:string)=>{
    fetch(`/api/detail/${id}`,{method:'DELETE',})
  }

  return (
    // !isLoading &&
    <>
      <div style={{
        width:'100%',
        height:'auto',
        aspectRatio:'375/240',
        backgroundImage:`url('${thumbnail}')`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'top center',
        objectFit:'cover'
      }}>
      </div>
      <RichContentRenderer html={html} title={title} />
      {
        username &&
          <div 
          className='pretendard-regular bodyXS'
          style={{
            width:'100%',
            maxWidth:'700px',
            display:'flex',
            justifyContent:'flex-end',
            gap:'10px',
            padding : '10px'
          }}>
            <div 
              style={{display:'flex',justifyContent:'center',alignItems:'center',minWidth:'60px',borderRadius:'24px', border:'1px solid var(--gray-300)', padding:'6px', color:'var(--gray-500)'}}      
              onClick={()=>{router.push(`/posts/${id}/edit`)}}
              >
            수정</div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',minWidth:'60px',borderRadius:'24px', border:'1px solid var(--gray-300)', padding:'6px', color:'var(--gray-500)'}} 
            onClick={()=>deleteDetail(id)}>삭제</div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',minWidth:'60px',borderRadius:'24px', border:'1px solid var(--gray-300)', padding:'6px', color:'var(--gray-500)'}} 
            onClick={()=>{}}>비공개로 변경</div>
          </div>
      }
    </>
  )
}
