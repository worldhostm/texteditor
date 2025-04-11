import React from 'react'

interface Props {
    id:string
    width?:number
    height?:number
}

export default function SVGIcon({id,width=28,height=29}:Props) {
  return (
    <svg
    width={width}
    height={height}
    >
        <use href={`/sprite-sheet.svg#${id}`}/>
    </svg>
  )
}
