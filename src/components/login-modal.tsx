'use client';

import type React from 'react';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import KakaoLoginButton from '@/public/icon/kakao-login.png';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

interface LoginModalProps {
  children: React.ReactNode;
}

export function LoginModal({ children }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-hidden rounded-2xl p-0 sm:max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 py-12">
            <div className="space-y-4">
              <p className="text-center font-medium">간편하게 로그인하고 서비스를 이용해보세요</p>

              <Link href="/" className="flex items-center justify-center">
                <Image
                  src={KakaoLoginButton}
                  alt="카카오 로고"
                  width={300}
                  height={45}
                  className="w-[270px]"
                />
              </Link>

              {/*<Button*/}
              {/*  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] text-black shadow-md transition-all duration-300 hover:bg-[#FEE500]/90 hover:shadow-lg"*/}
              {/*  onClick={handleKakaoLogin}*/}
              {/*>*/}
              {/*  */}
              {/*  <span>카카오로 시작하기</span>*/}
              {/*</Button>*/}

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
