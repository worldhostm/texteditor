'use client'
import React from 'react'
import styles from './contentTile.module.css';

interface Props{
  thumbnail:string,
  title:string ,
  regDate:string,
  idx:number,
  isCard?:boolean,
  id:number
}
export default function ContentTile({id,idx,thumbnail='/default_service.png',title= '상금만 4조 원, 챔피언스리그는 어떻게 돈을 벌까?',regDate='2024.04.02', isCard}:Props) {
  return (
    !isCard
    ?
    <div className={`${styles.container}`} key={title + idx}>
        <a href={`/posts/${id}`}>
            <div className={`${styles.tileimg}`} style={{backgroundImage:`url(${thumbnail})`}}></div>
            <div className={`${styles.tileText}`}>
                <div className={`${styles.title} bodyS`}>{title}</div>
                <div className={`${styles.regDate} bodyXS`}>{regDate}</div>
            </div>
        </a>
    </div>
    :
    <div className={`${styles.container_card}`} key={title + idx}>
      <a href='#'>
          <div className={`${styles.tileimg_card}`} style={{backgroundImage:`url(${thumbnail})`}}></div>
          <div className={`${styles.tileText_card}`}>
              <div className={`${styles.title_card} bodyS`}>{title}</div>
              <div className={`${styles.regDate_card} bodyXS`}>{regDate}</div>
          </div>
      </a>
  </div>
  )
}
