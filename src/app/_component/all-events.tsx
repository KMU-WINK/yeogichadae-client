import { Dispatch, SetStateAction } from 'react';

import EventFilter from '@/app/_component/event-filter';

import { EventDto } from '@/api/dto/event';
import { Category } from '@/api/schema/event';
import { District } from '@/api/schema/user';

import EventCard from '@/component/event-card';

interface AllEventsProps {
  categories: Category[] | undefined;
  districts: District[] | undefined;
  isFree: undefined | boolean;
  setCategories: Dispatch<SetStateAction<Category[] | undefined>>;
  setDistricts: Dispatch<SetStateAction<District[] | undefined>>;
  setIsFree: Dispatch<SetStateAction<boolean | undefined>>;
  events: EventDto[];
}

export default function AllEvents({
  categories,
  districts,
  isFree,
  setCategories,
  setDistricts,
  setIsFree,
  events,
}: AllEventsProps) {
  return (
    <section className="flex max-w-screen-xl flex-col justify-center gap-2 sm:gap-4">
      <h2 className="text-2xl font-bold sm:text-3xl">전체 행사</h2>

      <EventFilter
        categories={categories}
        setCategories={setCategories}
        districts={districts}
        setDistricts={setDistricts}
        isFree={isFree}
        setIsFree={setIsFree}
      />

      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-neutral-500 sm:py-16">검색 결과가 없습니다</p>
      )}
    </section>
  );
}
