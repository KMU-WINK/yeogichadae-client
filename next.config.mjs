import NextPWA from 'next-pwa';

const withPWA = NextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // TODO: placeholder.svg 삭제 후, 삭제해야 할 옵션
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
