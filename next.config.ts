import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath:'/purfit.co.kr/out',
  // output:'export',
  // assetPrefix : 'https://s3.ap-northeast-2.amazonaws.com/purfit.co.kr/out/',
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',       // 프론트에서 /api/로 시작하는 요청
  //       destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`

  //       // destination: process.env.NEXT_PUBLIC_ENV ==='develop' ? 'http://localhost:8088/api/:path*' : , // 백엔드로 프록시
  //     },
  //   ];
  // },
  images : {
    domains: [
      'purfit.co.kr.s3.ap-northeast-2.amazonaws.com',
    ],
  }
};

export default nextConfig;
