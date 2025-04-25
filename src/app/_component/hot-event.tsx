import { useEffect, useMemo, useState } from 'react';

import Api from '@/api';
import { EventDto } from '@/api/dto/event';

import { useApi } from '@/hook/use-api';
import useMobile from '@/hook/use-mobile';

import EventCard from '@/component/event-card';

export default function HotEvent() {
  const [, startApi] = useApi();
  const isMobile = useMobile();

  const [events, setEvents] = useState<EventDto[]>([]);

  const hotEvents = useMemo(() => events.slice(0, isMobile ? 4 : 6), [events, isMobile]);

  useEffect(() => {
    startApi(async () => {
      const { events } = await Api.Domain.Event.getEvents();
      setEvents(events);
    });
  }, []);

  return (
    <section className="flex max-w-screen-xl flex-col justify-center gap-2 sm:gap-4">
      <h2 className="text-2xl font-bold sm:text-3xl">최근 행사</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {hotEvents.map((event) => (
          <EventCard key={event.event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
