'use client'
// app/posts/[slug]/edit/page.tsx
import React from 'react';
import { Content } from '@/model/Content';
// app/editor/[id]/page.tsx
import EditDetail from './_components/EditDetail'
import { usePathname } from 'next/navigation';

// import { useParams, usePathname } from 'next/navigation'

// export async function generateStaticParams() {
//   const posts = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list`).then((res)=>res.json());

//   return posts.data.map((content: Content) => ({
//     slug: content.id.toString(),
//   }))
// }

export default async function page({params}:any) {
  const path = usePathname();
  const slug = path.split('/')[2];
  // const slug = Number(path?.slug);
  // const post = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/detail/${params}`)
  //   .then(res => res.json());
  // return false;
  return <EditDetail id={slug} />
}
