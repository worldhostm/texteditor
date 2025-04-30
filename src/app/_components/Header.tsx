'use client'

import React from 'react';
import SVGIcon from './SVGIcon';
import styles from './header.module.css';

export default function Header() {
  return (
    <div className={`${styles.container}`}>
        <div className={`${styles.contentContainer}`}> 
            <a href="/home"><SVGIcon width={18} height={18} id="arrow-back"/></a>
            <a href={`/home`} className='titleS pretendard-regular'>하나 콘텐츠 뷰어</a>
            <a href="/editor"><SVGIcon id="menu" width={18} height={18} /></a>
                {/* <a href='/editor'>editor</a>
                <a href='/home'>home</a> */}
        </div>
    </div>
  )
}
