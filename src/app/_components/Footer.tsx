'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function Footer() {
  const path = usePathname();
  return (
    path === '/editor'
    ?
    <></>
    :
    <div 
    className='bodyXS pretendard-regular'
    style={{
        color:'var(--gray-300)',
        padding : '24px 16px',
        borderTop: '1px solid #EEE',
        background: 'var(--gray-white)',
        width:'100vw',
        height:'auto',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }}
    >
        본 플랫폼은 ‘찬스웨이브커뮤니케이션’에서 콘텐츠를 제공합니다. <br/>
        하나은행 및 찬스웨이브는 일체의 개인정보 수집 및 관리하지 않습니다.<br/>
        E-mail. chancewaver@chancewavecm.com<br/>
        Phone. 010-7618-0186
    </div>
  )
}
