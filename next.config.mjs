import NextPWA from 'next-pwa';

const withPWA = NextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  compress: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'culture.seoul.go.kr',
        pathname: '/cmmn/file/getImage.do',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

export default withPWA(nextConfig);
