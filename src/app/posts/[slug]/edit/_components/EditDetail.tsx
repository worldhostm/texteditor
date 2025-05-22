'use client'

import React, { useEffect, useState } from 'react'
import styles from './EditDetail.module.css'
import TiptapEditor from '@/app/editor/_components/Tiptap'
import { Content } from '@/model/Content'

interface Props{
  id:string
}
export default function EditDetail({id}:Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [props, setProps] = useState<Content>();
  const [thumbnail, setThumbnail] = useState<string>();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/detail/${id}`,{method:"GET"})
        const data = await res.json()
        // html 데이터 세팅
        setProps(data);
      } catch (err) {
        console.error('데이터 로드 실패:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();

  }, [id])

  if (isLoading) return <div>로딩중...</div>
  return (
      <TiptapEditor isEdit detaildata={props}/>
  )
}
