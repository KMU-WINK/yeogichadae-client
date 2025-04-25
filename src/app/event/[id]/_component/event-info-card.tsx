import Image from 'next/image';
import Link from 'next/link';
import { userAgentFromString } from 'next/server';

import { Event } from '@/api/schema/event';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, MapPin } from 'lucide-react';

interface EventInfoCardProps {
  event: Event;
}

export default function EventInfoCard({ event }: EventInfoCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border p-6">
      <Image
        src={event.image}
        alt={event.title}
        width={400}
        height={500}
        className="h-[250px] w-fit self-center rounded-xl object-cover lg:h-[500px]"
      />

      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <p className="text-neutral-700">{event.description}</p>
      </div>

      <div className="grid grid-cols-1 justify-between gap-x-4 gap-y-2 text-xs sm:grid-cols-2 sm:text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="text-primary size-5" />
          <div>
            <p className="font-medium">분류</p>
            <p className="text-neutral-500">{event.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="text-primary size-5" />
          <div>
            <p className="font-medium">주최</p>
            <p className="text-neutral-500">{event.host}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="text-primary size-5" />
          <div>
            <p className="font-medium">행사일</p>
            <p className="text-neutral-500">
              {format(event.startDate, 'yyyy-MM-dd (E)', { locale: ko })} ~{' '}
              {format(event.endDate, 'yyyy-MM-dd (E)', { locale: ko })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="text-primary size-5" />
          <div>
            <p className="font-medium">신청일</p>
            <p className="text-neutral-500">
              {format(event.applicationDate, 'yyyy-MM-dd (E)', { locale: ko })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="text-primary size-5" />
          <div>
            <p className="font-medium">장소</p>
            <Link
              href={generateNMapUrl(event)}
              target="_blank"
              className="text-primary hover:underline"
            >
              {event.location}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="text-primary size-5" />
          <div>
            <p className="font-medium">홈페이지</p>
            <Link href={event.homepage} target="_blank" className="text-primary hover:underline">
              {new URL(event.homepage).hostname}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">비용</h3>
        <p className="text-xs whitespace-pre-line sm:text-sm">
          {event.free ? '무료' : (event.cost?.split('/').join('\n') ?? '유료')}
        </p>
      </div>

      {event.target && event.target !== '누구나' && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">대상</h3>
          <p className="text-xs whitespace-pre-line sm:text-sm">
            {event.target.split('/').join('\n')}
          </p>
        </div>
      )}

      {event.cast && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">배우</h3>
          <p className="text-xs whitespace-pre-line sm:text-sm">
            {event.cast.split('/').join('\n')}
          </p>
        </div>
      )}

      {event.other && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">기타</h3>
          <p className="text-xs whitespace-pre-line sm:text-sm">{event.other}</p>
        </div>
      )}
    </div>
  );
}

export function generateNMapUrl(event: Event) {
  return typeof window !== 'undefined' &&
    userAgentFromString(window.navigator.userAgent).device.type === 'mobile'
    ? `nmap://place?lat=${event.latitude}&lng=${event.longitude}&name=${encodeURIComponent(event.location)}&appname=seoul-in-culture`
    : `https://map.naver.com/?lat=${event.latitude}&lng=${event.longitude}&title=${encodeURIComponent(event.location)}`;
}
