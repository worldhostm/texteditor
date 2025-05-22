'use client'

import React ,{ useEffect, useState } from 'react';
import ContentTile from './ContentTile'
import CardSwiper, { Content } from '@/app/_components/CardSwiper';
import SVGIcon from '@/app/_components/SVGIcon';
import styles from './home.module.css';
import { useEditStore } from '@/store/editStore';
import Pagination, { PaginationProps } from '@/app/_components/Pagination';
import {Content as ModelContent} from '@/model/Content';

// export async function  generateStaticParams(){
//   const posts = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list`, {}).then((res)=>res.json());
//   return posts.data.map((e:ModelContent)=>e);
// }
export default function Home({params}:any) {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list`, {
  //   cache: 'force-cache', // ✅ SSG로 강제
  // });
  // const { data: posts } = await res.json();
  console.info(Date.now().toLocaleString('kr'));
  const {count} = useEditStore();

  const [data, setData] = useState([]);
  const [pageProps, setPageProps] = useState<PaginationProps>()
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
          setData(response.data);
          setPageProps({data,...response});
      }
    }
    fetchData();
    return () => {}
  }, [])
    
  return (
    <div className={`${styles.container}`}>
      <div style={{
        width:'100%',
        display:'flex',
        justifyContent:'baseline',
        flexDirection:'column',
        color : 'var(--primary-500)'
      }}>
        <div className='hana_bold headlineL'>
          Hana Jounals
        </div>
        <div className='pretendard-regular' 
        style={{color:'black'}}>
          은행 방문보다 쉬운 생활 금융 팁팁
        </div>
      </div>
        {/* <div>count : {count}</div>
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
        </div> */}
        <div 
        className={styles.underContainer}
        >
          <div className='titleM pretendard_bold' style={{color:'var(--primary-900)'}}>새로운 콘텐츠</div>
          <div className='bodyS pretendard_regular' style={{color:'var(--gray-500)'}}>미리 알아두면 유익한 최신 금융 정보</div>
        </div>
        <div className={`${styles.underContainer_upper}`}>
        {
            data.map((contents:Content,index:number)=> <ContentTile 
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
        {/* 페이지네이션 추후 적용 0520 */}
        {
          pageProps?.totalItems && pageProps?.totalItems > 20 &&
          <Pagination {...pageProps}/>
        }
    </div>
  )
}
