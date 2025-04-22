'use client'
import React, { useEffect, useState } from 'react'
import ContentTile from './ContentTile'
import CardSwiper, { Content } from '@/app/_components/CardSwiper';
import SVGIcon from '@/app/_components/SVGIcon';
// const sampleData: Content[] = [
//     {
//       title: 'React 상태 관리 제대로 이해하기',
//       regDate: '2024-11-01',
//       thumbnail: '/default_service.png',
//     },
//     {
//       title: 'Next.js App Router 완전 가이드',
//       regDate: '2024-11-03',
//       thumbnail: '/default_service.png',
//     },
//     {
//       title: 'TypeScript 유틸리티 타입 총정리',
//       regDate: '2024-11-05',
//       thumbnail: '/default_service.png',
//     },
//     {
//       title: 'CSS 모듈 vs Styled-components',
//       regDate: '2024-11-07',
//       thumbnail: '/default_service.png',
//     },
//     {
//       title: 'GitHub Actions로 자동 배포하기',
//       regDate: '2024-11-09',
//       thumbnail: '/default_service.png',
//     },
//     {
//       title: 'React Query vs SWR 비교 분석',
//       regDate: '2024-11-11',
//       thumbnail: '/default_service.png',
//     },
//     {
//       title: '웹 접근성(A11y) 체크리스트',
//       regDate: '2024-11-13',
//       thumbnail: '/default_service.png',
//     },
//     {
//       title: 'Vite와 Webpack 성능 비교',
//       regDate: '2024-11-15',
//       thumbnail: '/default_service.png',
//     }
//   ];
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
    <div style={{
    }}>
        <div style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            width:'100%',
            height:'calc(100vw/375*250)',
            // borderBottomLeftRadius:'60%',
            // borderBottomRightRadius:'60%',
            backgroundColor:'var(--primary-500)'
          }}>
            <div style={{marginTop:'42px', marginBottom:'32px', color:'white'}}>“은행 방문 보다 쉬운 생활 금융 팁”</div>
          <CardSwiper data={data}/>
        </div>
        <div style={{
          width:'100%',
          height:'calc(100vw/375*80)',
          backgroundColor:'var(--primary-500)',
          borderBottomLeftRadius: '100%',
          borderBottomRightRadius:'100%',
          color:'var(--primary-300)',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          gap:'calc(100vw/375*7)'
        }}>
          <SVGIcon id="swipe"/>
          카드를 스크롤 해보세요
        </div>
        <div 
        className={''}
        style={{
          display:'flex',
          justifyContent:'center',
          flexDirection:'column',
          alignItems:'center',
          marginTop:'36px'
        }}
        >
          <div className='titleM' style={{color:'var(--primary-900)'}}>새로운 콘텐츠</div>
          <div className='' style={{color:'var(--gray-500)'}}>미리 알아두면 유익한 최신 금융 정보</div>
        </div>
        {
            data.map((contents:Content,index)=> <ContentTile 
                                                    id={contents.id} 
                                                    key={contents.title +'$$$' +index} 
                                                    idx={index} 
                                                    thumbnail={contents.thumbnail}
                                                    title={contents.title} 
                                                    regDate={contents.regDate}
                                                    isCard={false}
                                                  />)
        }
    </div>
  )
}
