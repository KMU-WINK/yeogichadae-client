import Link from 'next/link';

import { Button } from '@/component/ui/button';

import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-20 sm:px-6 md:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-primary text-9xl font-bold">404</h1>
        <h2 className="mt-6 mb-4 text-3xl font-bold">페이지를 찾을 수 없습니다</h2>
        <p className="text-muted-foreground mb-8 max-w-md">요청하신 페이지가 존재하지 않습니다.</p>
        <Link href="/">
          <Button className="flex items-center gap-2 rounded-xl">
            <Home className="h-4 w-4" />
            <span>메인으로 돌아가기</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
