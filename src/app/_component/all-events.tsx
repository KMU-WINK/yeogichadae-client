import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import EventFilter from '@/app/_component/event-filter';

import { EventDto } from '@/api/dto/event';
import { Category } from '@/api/schema/event';
import { District } from '@/api/schema/user';

import EventCard from '@/component/event-card';

interface AllEventsProps {
  searchQuery: string | undefined;
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>;
  categories: Category[] | undefined;
  districts: District[] | undefined;
  isFree: boolean | undefined;
  setCategories: Dispatch<SetStateAction<Category[] | undefined>>;
  setDistricts: Dispatch<SetStateAction<District[] | undefined>>;
  setIsFree: Dispatch<SetStateAction<boolean | undefined>>;
  events: EventDto[];
}

export default function AllEvents({
  searchQuery,
  setSearchQuery,
  categories,
  districts,
  isFree,
  setCategories,
  setDistricts,
  setIsFree,
  events,
}: AllEventsProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < events.length) {
        setVisibleCount((prev) => Math.min(prev + 24, events.length));
      }
    });

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [visibleCount, events.length]);

  return (
    <section className="flex max-w-screen-xl flex-col justify-center gap-2 sm:gap-4">
      <h2 className="text-2xl font-bold sm:text-3xl">전체 행사</h2>

      <EventFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        setCategories={setCategories}
        districts={districts}
        setDistricts={setDistricts}
        isFree={isFree}
        setIsFree={setIsFree}
      />

      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {events.slice(0, visibleCount).map((ev) => (
            <EventCard key={ev.event.id} event={ev} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-neutral-500 sm:py-16">검색 결과가 없습니다</p>
      )}

      <div ref={sentinelRef} />
    </section>
  );
}
