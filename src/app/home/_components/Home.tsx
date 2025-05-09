'use client'
import React, { useEffect, useState } from 'react'
import ContentTile from './ContentTile'
import CardSwiper, { Content } from '@/app/_components/CardSwiper';
import SVGIcon from '@/app/_components/SVGIcon';
import styles from './home.module.css';
export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData=async()=>{
        const res = await fetch('/api/list',{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        if(res.ok){
            const response = await res.json()
            setData(response);
        }
      }
      fetchData();
      return () => {}
    }, [])
    
  return (
    <div className={`${styles.container}`}>
      <SVGIcon id="bank1" />
        <div className={`${styles._container}`}>
            <div className={`${styles.headerText} titleM`}></div>
          <CardSwiper data={data}/>
        </div>
        <div className={`${styles.radi_container} bodyS`}>
          <div 
            className={`${styles.radi_container_inner}`}
          >
          <SVGIcon id="swipe" className='shake'/>
            카드를 스크롤 해보세요
          </div>
        </div>
        <div 
        className={styles.underContainer}
        >
          <div className='titleM pretendard_bold' style={{color:'var(--primary-900)'}}>새로운 콘텐츠</div>
          <div className='bodyS pretendard_regular' style={{color:'var(--gray-500)'}}>미리 알아두면 유익한 최신 금융 정보</div>
        </div>
        <div className={`${styles.underContainer_upper}`}>
        {
            data.map((contents:Content,index)=> <ContentTile 
                                                    id={contents.id} 
                                                    key={contents.title +'$$$' +index} 
                                                    idx={index} 
                                                    thumbnail={contents.thumbnail}
                                                    title={contents.title} 
                                                    regDate={contents.regDate}
                                                    isCard={false}
                                                    icon = {`bank + ${index}`}
                                                  />)
        }
        </div>
    </div>
  )
}
