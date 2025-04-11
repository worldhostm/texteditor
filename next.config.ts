import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:'export',
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',       // 프론트에서 /api/로 시작하는 요청
  //       destination: 'http://localhost:8088/api/:path*', // 백엔드로 프록시
  //     },
  //   ];
  // },
};

export default nextConfig;
