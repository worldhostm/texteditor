// 'use client'
import React from 'react'
import styles from './contentTile.module.css';
import SVGIcon from '@/app/_components/SVGIcon';

interface Props{
  thumbnail?:string,
  title:string ,
  regDate:string,
  idx:number,
  isCard?:boolean,
  id:number,
  icon?:string,
}
export default function ContentTile({id,idx,thumbnail,title,regDate='2024.04.02', isCard, icon}:Props) {
  return (
    !isCard
    ?
    <div className={`${styles.container}`} key={title + idx}>
        <a href={`posts/${id}`}>
            <div className={`${styles.tileimg}`} style={{backgroundImage:`url('${thumbnail}')`}}></div>
            <div className={`${styles.tileText}`}>
              <div className={`${styles.title} bodyS`}>{title ? title : '제목없음'}</div>
                <div className={`${styles.regDate} bodyXS`}>{regDate ? regDate : ''}</div>
            </div>
        </a>
    </div>
    :
    <div className={`${styles.container_card}`} key={title + idx}>
      <div className={`${styles.tileimg_card}`}>
        <div className={styles.iconContainer}><SVGIcon id={icon ? "" :'sentiment_satisfied'}/></div>
        <div className={`${styles.title_card} labelM bold`}>{title}</div>
        <div className={`${styles.regDate_card} bodyXS`}>아티클 읽기</div>
      </div>
    </div>
  )
}
