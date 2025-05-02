'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { X } from 'lucide-react';

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

    const handleClose = () => { setIsOpen(false); };

    if (!isOpen) return null;

    const AdSwiper = () => (
        <Swiper
            slidesPerView={1}
            pagination={{ el: '.custom-pagination', clickable: true }}
            modules={[Pagination]}
            className="w-full"
        >

        {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className="flex flex-col items-center justify-center px-4 py-6">
                        {slide.content}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );

    return isMobile ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50">
            <div className="w-full rounded-t-2xl bg-white px-4 pt-6 pb-8 shadow-xl">
                <AdSwiper/>

                <div className="mt-4 flex flex-col items-center space-y-2 text-sm text-gray-600">
                    {/* pagination 점 */}
                    <div className="custom-pagination flex justify-center gap-2"/>

                    {/* 버튼 */}
                    <div className="flex w-full justify-between px-1">
                        <button onClick={handleClose} className="hover:underline">
                            오늘 안보기
                        </button>
                        <button onClick={handleClose} className="hover:underline">
                            닫기
                        </button>
                    </div>
                </div>


            </div>
        </div>
    ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-[90%] max-w-md rounded-xl bg-white px-6 pt-6 pb-8 shadow-lg">
                <button
                    className="absolute right-3 top-3 text-gray-500 hover:text-black"
                    onClick={handleClose}
                >
                    <X className="size-5" />
                </button>

                <AdSwiper />

                {/* pagination */}
                <div className="mt-4 flex flex-col items-center space-y-2 text-sm text-gray-600">
                    <div className="custom-pagination flex justify-center gap-2" />
                    {/* 버튼 */}
                    <div className="flex w-full justify-between px-1">
                        <button onClick={handleClose} className="hover:underline">
                            오늘 안보기
                        </button>
                        <button onClick={handleClose} className="hover:underline">
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>


    );

}
