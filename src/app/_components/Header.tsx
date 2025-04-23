'use client'

import React from 'react';
import styled from 'styled-components';
import SVGIcon from './SVGIcon';

const HeaderContainer = styled.div`
      display: flex;
      flex-direction:column;
      justify-content:center;
      gap: 18px;
      word-break: break-all;
      width:100%
      height: auto;
      font-size : 24px;
      padding : 0px 20px;
`
export default function Header() {
  return (
    <HeaderContainer>
        <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',
            height:'calc(100vw/375*52)'

        }}> 
            <a href="/"><SVGIcon width={18} height={18} isResponsive={true} id="arrow-back"/></a>
            <a href={`/`} className='titleS pretendard-regular'>하나 콘텐츠 뷰어</a>
            <div style={{
                display:'flex',
                gap:'12px'
            }}>
            <a href="/editor"><SVGIcon id="menu" width={18} height={18} isResponsive={true} /></a>
                {/* <a href='/editor'>editor</a>
                <a href='/home'>home</a> */}
            </div>
        </div>
        <>
            {/* <div style={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                alignItems:'center',
                gap:'20px'
            }}>
                <span className='hana_bold'>Origineer x 하나은행의 콘텐츠</span>
                <div>하나 오리진은 하나 은행과 다양한 콘텐츠를 다룹니다</div>
            </div> */}
        </>
    </HeaderContainer>
  )
}
