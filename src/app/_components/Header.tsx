'use client'

import React, { useEffect, useState } from 'react';
import SVGIcon from './SVGIcon';
import styles from './header.module.css';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isToken,setisToken] = useState<boolean|null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        setisToken(true)
      }
    }
  }, [])

  const logout = ()=>{
    window.localStorage.setItem('token','');
    router.push('/');
  }

  return (
    <div className={`${styles.container}`}>
        <div className={`${styles.contentContainer}`}> 
            <a href="/home"><SVGIcon width={18} height={18} id="arrow-back"/></a>
            <a href={`/home`} className='titleS pretendard-regular'>하나 콘텐츠 뷰어</a>
            <div style={{display:'flex',gap:'20px'}}>
              <a href="/editor"><SVGIcon id="menu" width={18} height={18} /></a>
              {
                isToken && 
                  <div 
                  className='bodyXS' 
                  style={{cursor: 'pointer'}}
                  onClick={()=>logout()}>로그아웃</div>
              }
            </div>
                {/* <a href='/editor'>editor</a>
                <a href='/home'>home</a> */}
        </div>
    </div>
  )
}
