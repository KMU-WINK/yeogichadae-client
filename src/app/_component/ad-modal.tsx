'use client';

import React, {useEffect, useState} from 'react';

import useMobile from '@/hook/use-mobile';

import { X } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface AdModalProps {
  slides: {
    id: string;
    content: React.ReactNode;
  }[];
}

export default function AdModal({ slides }: AdModalProps) {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => { setIsOpen(false); };

  // 렌더 시 localstorage 확인
  useEffect(() => {
    const adHiddenStr = localStorage.getItem('adHiddenUntil');
    if (!adHiddenStr || new Date() > new Date(adHiddenStr)){ //없거나(최초) 기존 날짜 값을 넘으면
      setIsOpen(true);
    }
  }, []);


  const hideModalForNDays = ()=> {
    const untilDate = new Date();
    untilDate.setDate((untilDate.getDate())+ 7);
    localStorage.setItem('adHiddenUntil', untilDate.toISOString()); //로컬 스토리지에 저장해두기
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const AdCarousel = () => (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={8000}
      swipeable
      showIndicators={true}
      showArrows={true} //일단 둘 다 화살표 뜨게
      // showArrows={!isMobile}
    >
      {slides.map((slide) => (
        <div key={slide.id} className="p-6">
          {slide.content}
        </div>
      ))}
    </Carousel>
  );

  return isMobile ? (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="w-full rounded-t-2xl bg-white px-4 pt-6 pb-8 shadow-xl">
        <AdCarousel />
        <div className="mt-4 flex w-full justify-between text-sm text-gray-600">
          <button onClick={hideModalForNDays} className="hover:underline">
            7일 동안 안보기
          </button>
          <button onClick={handleClose} className="hover:underline">
            닫기
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-md rounded-xl bg-white px-6 pt-6 pb-8 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={handleClose}
        >
          <X className="size-5" />
        </button>
        <AdCarousel />
        <div className="mt-4 flex w-full justify-between text-sm text-gray-600">
          <button onClick={hideModalForNDays} className="hover:underline">
            7일 동안 안보기
          </button>
          <button onClick={handleClose} className="hover:underline">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
