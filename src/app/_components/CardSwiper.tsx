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
export default function CardSwiper({data}:Props) {
  return (
  <Swiper
      slidesPerView={3.5}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      modules={[Grid]}
      navigation={false}
      loop={false}
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
          thumbnail={contents.thumbnail ?`/img/t${index+1}.jpg`:`default_service.png`} 
          title={contents.title}
          regDate={contents.regDate}
          isCard={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
