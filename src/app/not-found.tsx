import Link from 'next/link';

import { Button } from '@/component/ui/button';

import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-4">
      <h1 className="text-primary text-8xl font-bold sm:text-9xl">404</h1>

      <div className="flex flex-col items-center gap-1">
        <h2 className="text-2xl font-bold sm:text-3xl">페이지를 찾을 수 없습니다</h2>
        <p className="text-sm text-neutral-500 sm:text-base">
          요청하신 페이지가 존재하지 않습니다.
        </p>
      </div>

      <Link href="/">
        <Button>
          <Home />
          <span>메인으로 돌아가기</span>
        </Button>
      </Link>
    </div>
  );
}
