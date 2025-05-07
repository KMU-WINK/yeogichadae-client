'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { EventDto } from '@/api/dto/event';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface AdModalProps {
  events: EventDto[];
}

export default function AdModal({ events }: AdModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const adHiddenStr = localStorage.getItem('adHiddenUntil');

    if (!adHiddenStr || new Date() > new Date(adHiddenStr)) {
      setIsOpen(true);
    }
  }, []);

  const hideModalForNDays = () => {
    const untilDate = new Date();
    untilDate.setDate(untilDate.getDate() + 7);
    localStorage.setItem('adHiddenUntil', untilDate.toISOString());
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="flex flex-col gap-4 rounded-t-2xl bg-white p-6 pb-3 shadow-lg sm:max-w-[400px] sm:rounded-2xl">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={8000}
          swipeable
          showIndicators={true}
          showArrows={true}
        >
          {events.map((event) => (
            <div key={event.event.id} className="flex items-center justify-center bg-white">
              <Link href={`/event/${event.event.id}`} className="flex items-center justify-center">
                <Image
                  src={event.event.image}
                  alt={event.event.title}
                  width={300}
                  height={400}
                  className="h-[400px] w-[300px] object-cover"
                />
              </Link>
            </div>
          ))}
        </Carousel>
        <div className="flex w-full justify-between text-sm text-gray-600">
          <button onClick={hideModalForNDays} className="cursor-pointer hover:underline">
            7일 동안 안보기
          </button>
          <button onClick={handleClose} className="cursor-pointer hover:underline">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
