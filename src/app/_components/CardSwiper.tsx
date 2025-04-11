'use client'
import React from 'react'
import { Swiper, SwiperSlide} from 'swiper/react';
import { Grid} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; // 페이지네이션을 위한 스타일
import ContentTile from '../home/_components/ContentTile';

export interface Content {
    title:string,
    thumbnail:string,
    regDate:string,
    id:number,
}
interface Props {
    data : Content[]
}
// export const sampleData: Content[] = [
//      {
//         title: 'React 상태 관리 제대로 이해하기',
//         regDate: '2024-11-01',
//         thumbnail: '/default_service.png',
//       },
//       {
//         title: 'Next.js App Router 완전 가이드',
//         regDate: '2024-11-03',
//         thumbnail: '/default_service.png',
//       },
//       {
//         title: 'TypeScript 유틸리티 타입 총정리',
//         regDate: '2024-11-05',
//         thumbnail: '/default_service.png',
//       },
//       {
//         title: 'CSS 모듈 vs Styled-components',
//         regDate: '2024-11-07',
//         thumbnail: '/default_service.png',
//       },
//       {
//         title: 'GitHub Actions로 자동 배포하기',
//         regDate: '2024-11-09',
//         thumbnail: '/default_service.png',
//       },
//       {
//         title: 'React Query vs SWR 비교 분석',
//         regDate: '2024-11-11',
//         thumbnail: '/default_service.png',
//       },
//       {
//         title: '웹 접근성(A11y) 체크리스트',
//         regDate: '2024-11-13',
//         thumbnail: '/default_service.png',
//       },
//       {
//         title: 'Vite와 Webpack 성능 비교',
//         regDate: '2024-11-15',
//         thumbnail: '/default_service.png',
//       },
//   ];
export default function CardSwiper({data}:Props) {
  // const [data=sampleData, setData] = useState(sampleData);
  //   useEffect(() => {
  //     const fetchData=async()=>{
  //       const res = await fetch('/api/list',{
  //           method:'GET',
  //           headers:{
  //               'Content-Type' : 'application/json'
  //           }
  //       });
  //       if(res.ok){
  //           const response = await res.json()
  //           console.info(response);
  //           setData(response);
  //       }
  //     }

  //     fetchData();

  //     return () => {}
  //   }, [])

  return (
  <Swiper
      slidesPerView={2}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      modules={[Grid]}
      navigation={false}
    >
      {data.map((contents, index) => (
        <SwiperSlide  
          key={`${contents.title}$`+index}
          style={{
            marginLeft:'8px'
          }}
        >
          <ContentTile
          id={contents.id}
          idx={index} 
          thumbnail={`/img/t${index+1}.jpg`} 
          title={contents.title} 
          regDate={contents.regDate}
          isCard={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
