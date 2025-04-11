'use client'
import React, { useEffect, useState } from 'react'
import ContentTile from './ContentTile'
import CardSwiper, { Content } from '@/app/_components/CardSwiper';
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
            console.info(response);
            setData(response);
        }
      }

      fetchData();

      return () => {}
    }, [])
    
  return (
    <div style={{
      padding : '40px'
    }}>
        <CardSwiper data={data}/>
        {
            data.map((contents:Content,index)=> <ContentTile 
                                              id={contents.id} 
                                              key={contents.title +'$$$' +index} 
                                              idx={index} 
                                              thumbnail={`/img/t${index+1}.jpg`} 
                                              title={contents.title} 
                                              regDate={contents.regDate}/>)
        }
    </div>
  )
}
