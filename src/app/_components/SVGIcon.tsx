'use client'
import React from 'react'

interface Props {
    id:string
    width?:number
    height?:number
    isResponsive?:boolean
    className?:string
}

export default function SVGIcon({id,width=28,height=29, isResponsive,className}:Props) {
  return (
    <svg
    width={isResponsive ? `calc(${width}/375*80vw)`: width}
    height={isResponsive ? `calc(${height}/375*80vw)`: height}
    className={className}
    // style={{
    //   fill:'white',
    //   background:'black',
    // }}
    >
        <use href={`/sprite-sheet.svg#${id}`}/>
    </svg>
  )
}
