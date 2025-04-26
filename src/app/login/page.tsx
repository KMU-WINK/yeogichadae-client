'use client';

import { useMemo } from 'react';

import Image from 'next/image';

import { Button } from '@/component/ui/button';

import { requestNotificationPermission } from '@/lib/firebase';

import KakaoLogo from '@/public/icon/kakao.svg';

export default function Page() {
  const kakaoUrl = useMemo(
    () =>
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${window.location.origin}/login/callback&response_type=code`,
    [],
  );

  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-10">
      <h2 className="text-primary text-3xl font-bold sm:text-4xl">Seoul IN Culture</h2>

      <Button
        size="lg"
        className="w-[227.23px] bg-[#FEE500] text-[#191919] hover:bg-[#FEE500] sm:w-[272.672px]"
        onClick={async (e) => {
          e.preventDefault();
          const result = await requestNotificationPermission();
          if (!result) alert('푸시 알림을 허용해주세요.');
          window.location.href = kakaoUrl;
        }}
      >
        <Image src={KakaoLogo} alt="kakao-login" width={18} height={18} />
        카카오 로그인
      </Button>
    </div>
  );
}
