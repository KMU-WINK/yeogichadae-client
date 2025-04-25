import { EventDto } from '@/api/dto/event';

import useMobile from '@/hook/use-mobile';

import EventCard from '@/component/event-card';

interface HotEventProps {
  events: EventDto[];
}

export default function HotEvent({ events }: HotEventProps) {
  const isMobile = useMobile();

  return (
    <section className="flex max-w-screen-xl flex-col justify-center gap-2 sm:gap-4">
      <h2 className="text-2xl font-bold sm:text-3xl">최근 행사</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {events.slice(0, isMobile ? 4 : 6).map((event) => (
          <EventCard key={event.event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
