'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Home, RefreshCcw, TriangleAlert } from 'lucide-react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="container mx-auto px-4 py-20 sm:px-6 md:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full bg-red-100 p-6 text-red-600">
          <TriangleAlert className="size-12" />
        </div>
        <h2 className="mb-4 text-3xl font-bold">문제가 발생했습니다</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          페이지를 로드하는 중에 오류가 발생했습니다.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 rounded-xl">
              <Home className="h-4 w-4" />
              <span>메인으로 돌아가기</span>
            </Button>
          </Link>
          <Button onClick={reset} className="flex items-center gap-2 rounded-xl">
            <RefreshCcw className="h-4 w-4" />
            <span>다시 시도</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
