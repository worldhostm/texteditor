'use client'

import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
      display: flex;
      flex-direction:column;
      justify-content:center;
      gap: 18px;
      word-break: break-all;
      width:100%
      height: auto;
      font-size : 24px;
      padding : 0px 40px;
`
export default function Header() {
  return (
    <HeaderContainer>
        <div style={{
            display:'flex',
            justifyContent:'space-between'
        }}> 
            <a href={'/home'}>로고</a>
            <div style={{
                display:'flex',
                gap:'12px'
            }}>
                <a href='/editor'>editor</a>
                <a href='/home'>home</a>
            </div>
        </div>
        <>
            <div style={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                alignItems:'center',
                gap:'20px'
            }}>
                <span className='hana_bold'>Origineer x 하나은행의 콘텐츠</span>
                <div>하나 오리진은 하나 은행과 다양한 콘텐츠를 다룹니다</div>
            </div>
        </>
    </HeaderContainer>
  )
}
