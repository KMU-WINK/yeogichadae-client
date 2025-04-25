import Image from 'next/image';
import Link from 'next/link';

import { Spinner } from '@/app/loading';

import { Badge } from '@/component/ui/badge';

import { Event } from '@/api/schema/event';

import { MapPin } from 'lucide-react';

interface EventCardProps {
  loading: boolean;
  events: Event[];
}

export default function EventCard({ loading, events }: EventCardProps) {
  return (
    <div className="flex flex-col items-center overflow-y-auto rounded-2xl border px-3 py-4 lg:h-[calc(100dvh-64px-64px-32px-24px)]">
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : events.length > 0 ? (
        <div className="flex w-full flex-col">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/event/${event.id}`}
              className="hover:bg-secondary flex cursor-pointer gap-4 rounded-2xl p-3"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={128}
                height={80}
                className="h-20 max-w-16 min-w-16 rounded object-cover sm:max-w-30 sm:min-w-30"
              />

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge className="text-foreground border border-neutral-200 bg-white">
                    {event.category}
                  </Badge>
                  <Badge
                    className={
                      event.free ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'
                    }
                  >
                    {event.free ? '무료' : '유료'}
                  </Badge>
                </div>

                <div className="flex flex-col">
                  <h3 className="line-clamp-1 font-medium">{event.title}</h3>

                  <div className="flex items-center gap-1 text-xs text-neutral-500 sm:text-sm">
                    <MapPin className="size-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-10 text-sm text-neutral-600">
          행사가 없습니다.
        </div>
      )}
    </div>
  );
}
