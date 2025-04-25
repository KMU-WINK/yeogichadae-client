'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { Button } from '@/component/ui/button';

import { Home, RefreshCcw, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-4">
      <div className="rounded-full bg-red-100 p-6 text-red-600">
        <TriangleAlert className="size-10" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <h2 className="text-2xl font-bold sm:text-3xl">문제가 발생했습니다</h2>
        <p className="text-sm text-neutral-500 sm:text-base">
          페이지를 로드하는 중에 오류가 발생했습니다.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href="/">
          <Button variant="outline">
            <Home />
            <span>메인으로 돌아가기</span>
          </Button>
        </Link>

        <Button onClick={reset}>
          <RefreshCcw />
          <span>다시 시도</span>
        </Button>
      </div>
    </div>
  );
}
