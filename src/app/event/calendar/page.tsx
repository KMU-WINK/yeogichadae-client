'use client';

import { useCallback, useEffect, useState } from 'react';

import { DatePickerCard } from '@/app/event/calendar/_component/date-picker-card';
import EventCard from '@/app/event/calendar/_component/event-card';
import FilterPopover from '@/app/event/calendar/_component/filter-popover';

import TitleLayout from '@/component/layout/title';

import Api from '@/api';
import { Category, Event } from '@/api/schema/event';
import { District } from '@/api/schema/user';

import { useApi } from '@/hook/use-api';

import { format } from 'date-fns';

export default function CalendarPage() {
  const [isProcessingApi, startApi] = useApi();

  const [events, setEvents] = useState<Event[]>([]);

  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [categories, setCategories] = useState<Category[]>();
  const [districts, setDistricts] = useState<District[]>();
  const [isFree, setIsFree] = useState<boolean>();

  const applyFilter = useCallback(() => {
    startApi(async () => {
      const { events } = await Api.Domain.Event.getEvents(date, categories, districts, isFree);
      setEvents(events.map((dto) => dto.event));
    });
  }, [date, categories, districts, isFree]);

  useEffect(() => {
    startApi(async () => {
      const { events } = await Api.Domain.Event.getEvents(date, categories, districts, isFree);
      setEvents(events.map((dto) => dto.event));
    });
  }, [date]);

  return (
    <TitleLayout
      title="행사 캘린더"
      loading={false}
      button={
        <FilterPopover
          categories={categories}
          districts={districts}
          isFree={isFree}
          setCategories={setCategories}
          setDistricts={setDistricts}
          setIsFree={setIsFree}
          applyFilter={applyFilter}
        />
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-1">
          <DatePickerCard date={date} setDate={setDate} events={events} />
        </div>

        <div className="lg:col-span-2">
          <EventCard loading={isProcessingApi} events={events} />
        </div>
      </div>
    </TitleLayout>
  );
}
