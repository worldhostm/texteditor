'use client'

// app/editor/[id]/page.tsx
import react, { useEffect } from 'react'
import EditDetail from './_components/EditDetail'
import { useParams, usePathname } from 'next/navigation'

export default function page() {
  const path = useParams();
  const slug = Number(path?.slug);
  useEffect(() => {
    console.info('id :: ',path?.slug);
  }, [])

  // return false;
  return <EditDetail id={slug} />
}
