'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import useMobile from '@/hook/use-mobile';

interface AdModalProps {
  slides: {
    id: number;
    content: React.ReactNode;
  }[];
}

export default function AdModal({ slides }: AdModalProps) {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const AdCarousel = () => (
      <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={5000}
          swipeable
          showIndicators={false}
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
            <button onClick={handleClose} className="hover:underline">오늘 안보기</button>
            <button onClick={handleClose} className="hover:underline">닫기</button>
          </div>
        </div>
      </div>
  ) : (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-[90%] max-w-md rounded-xl bg-white px-6 pt-6 pb-8 shadow-lg">
          <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={handleClose}>
            <X className="size-5" />
          </button>
          <AdCarousel />
          <div className="mt-4 flex w-full justify-between text-sm text-gray-600">
            <button onClick={handleClose} className="hover:underline">오늘 안보기</button>
            <button onClick={handleClose} className="hover:underline">닫기</button>
          </div>
        </div>
      </div>
  );
}
