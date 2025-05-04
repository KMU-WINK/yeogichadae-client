'use client';

import { useEffect, useState } from 'react';

import AdModal from '@/app/_component/ad-modal';
import AllEvents from '@/app/_component/all-events';
import Hero from '@/app/_component/hero';
import HotEvent from '@/app/_component/hot-event';
import Loading from '@/app/loading';

import Api from '@/api';
import { EventDto } from '@/api/dto/event';
import { Category } from '@/api/schema/event';
import { District } from '@/api/schema/user';

import { useApi } from '@/hook/use-api';

import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function Page() {
  const [isApiProcessing, startApi] = useApi();
  const [, startApi2] = useApi();
  const [, startApi3] = useApi();

  const [hotEvents, setHotEvents] = useState<EventDto[]>([]);
  const [allEvents, setAllEvents] = useState<EventDto[]>([]);
  const [adEvents, setAdEvents] = useState<EventDto[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>();
  const [categories, setCategories] = useState<Category[]>();
  const [districts, setDistricts] = useState<District[]>();
  const [isFree, setIsFree] = useState<boolean>();

  useEffect(() => {
    startApi(async () => {
      const { events } = await Api.Domain.Event.getEvents(format(new Date(), 'yyyy-MM-dd'));
      setHotEvents(events);
    });
  }, []);

  useEffect(() => {
    startApi2(async () => {
      const { events } = await Api.Domain.Event.getEvents(
        format(new Date(), 'yyyy-MM-dd'),
        searchQuery,
        categories,
        districts,
        isFree,
      );
      setAllEvents(events);
    });
  }, [searchQuery, categories, districts, isFree]);

  useEffect(() => {
    startApi3(async () => {
      const { events } = await Api.Domain.Event.getAdvertisedEvents();
      setAdEvents(events);
    });
  }, []);

  if (isApiProcessing) return <Loading />;

  return (
    <>
      {adEvents.length > 0 && (
        <AdModal
          slides={adEvents.map((e) => ({
            id: e.event.id,
            content: (
              <img
                src={e.event.image}
                alt={e.event.title}
                className="h-48 w-full rounded-xl object-cover"
              />
            ),
          }))}
        />
      )}

      <motion.div
        className="flex flex-col items-center gap-8 sm:gap-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Hero />
        <HotEvent events={hotEvents} />
        <AllEvents
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          districts={districts}
          isFree={isFree}
          setCategories={setCategories}
          setDistricts={setDistricts}
          setIsFree={setIsFree}
          events={allEvents}
        />
      </motion.div>
    </>
  );
}
