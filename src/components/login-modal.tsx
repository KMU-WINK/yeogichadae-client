'use client';

import type React from 'react';
import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { motion } from 'framer-motion';

interface LoginModalProps {
  children: React.ReactNode;
}

export function LoginModal({ children }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKakaoLogin = () => {
    // 실제로는 카카오 로그인 API 호출
    console.log('카카오 로그인 시도');
    // 로그인 성공 후 모달 닫기
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-hidden rounded-2xl p-0 sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-primary/5 p-6">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">Seoul IN Culture</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground mt-2 text-center">
              서울의 문화행사를 함께 즐길 친구를 찾아보세요
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <p className="text-center font-medium">간편하게 로그인하고 서비스를 이용해보세요</p>

              <Button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] text-black shadow-md transition-all duration-300 hover:bg-[#FEE500]/90 hover:shadow-lg"
                onClick={handleKakaoLogin}
              >
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="카카오 로고"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>카카오로 시작하기</span>
              </Button>

              <p className="text-muted-foreground text-center text-xs">
                로그인 시{' '}
                <a href="#" className="text-primary hover:underline">
                  이용약관
                </a>
                과{' '}
                <a href="#" className="text-primary hover:underline">
                  개인정보처리방침
                </a>
                에 동의하게 됩니다
              </p>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
