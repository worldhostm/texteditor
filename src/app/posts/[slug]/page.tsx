'use client'
// app/posts/[slug]/page.tsx
import React from 'react';
import Post from './_components/Post';
import { Content } from '@/model/Content';
import { usePathname } from 'next/navigation';

// export async function generateStaticParams() {
//   const posts = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list`).then((res) => res.json());

//   return posts.data.map((content: Content) => ({
//     slug: content.id.toString(), // 반드시 string으로!
//   }));
// }
interface Props{
  slug : string
}

export default function Page() {
  const path = usePathname();
  const slug = path.split('/')[2];
  // const post:Content= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/detail/${params.slug}`)
  //   .then((res) => res.json());
  return <Post id={slug} />;
}
