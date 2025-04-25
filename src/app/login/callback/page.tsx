'use client';

import { useEffect } from 'react';

import { redirect, useSearchParams } from 'next/navigation';

import Loading from '@/app/loading';

import Api from '@/api';

import { useApiWithToast } from '@/hook/use-api';

export default function Page() {
  const queryParams = useSearchParams();

  const [, startApi] = useApiWithToast();

  useEffect(() => {
    const code = queryParams.get('code');
    if (!code) return;

    startApi(
      async () => {
        const { token } = await Api.Domain.Auth.login({ token: code });
        await Api.Request.setToken(token);
      },
      {
        loading: '로그인 중...',
        success: '로그인 성공',
        finally: () => redirect('/'),
      },
    );
  }, []);

  return <Loading />;
}
