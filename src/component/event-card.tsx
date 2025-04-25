import { useCallback, useMemo } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/component/ui/badge';

import { EventDto } from '@/api/dto/event';
import { Event } from '@/api/schema/event';

import { cn } from '@/lib/utils';

import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event | EventDto;
}

export default function EventCard({ event: _event }: EventCardProps) {
  const isEventDto = useCallback((event: Event | EventDto): event is EventDto => {
    return (event as EventDto).meetings !== undefined;
  }, []);

  const event = useMemo(() => (isEventDto(_event) ? _event.event : _event), [isEventDto, _event]);

  return (
    <div className="flex cursor-pointer flex-col overflow-clip rounded-2xl border bg-white shadow">
      <Link href={`/event/${event.id}`} className="group">
        <div className="relative">
          <Image
            src={event.image}
            alt={event.title}
            width={640}
            height={160}
            className="h-34 w-full object-cover transition-transform group-hover:scale-101 sm:h-40"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-black">{event.category}</Badge>
          <Badge
            className={cn(
              'absolute top-3 right-3',
              event.free
                ? 'bg-emerald-100/90 text-emerald-700'
                : 'bg-primary/90 text-primary-foreground',
            )}
          >
            {event.free ? '무료' : '유료'}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 px-6 py-4">
          <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
            {event.title}
          </h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 truncate text-xs text-neutral-500 sm:text-sm">
              <MapPin className="size-3.5 sm:size-4" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-neutral-500 sm:text-sm">
              <Calendar className="size-3.5 sm:size-4" />
              <span className="truncate">
                {event.startDate} ~ {event.endDate}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {isEventDto(_event) && (
        <Link
          href={`/event/${event.id}/meeting`}
          className="group flex items-center justify-between border-t px-6 py-2.5 text-xs sm:text-sm"
        >
          <p>
            <span className="text-primary">{_event.meetings}개</span>의 모임 진행중
          </p>
          <p className="text-primary font-medium group-hover:underline">자세히 보기</p>
        </Link>
      )}
    </div>
  );
}
