import React from 'react'
import Post from './_components/Post'
import { Content } from '@/model/Content'

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list`).then((res)=>res.json());

  return posts.data.map((content: Content) => ({
    slug: content.id.toString(),
  }))
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Post id={parseInt(slug)} />
}
