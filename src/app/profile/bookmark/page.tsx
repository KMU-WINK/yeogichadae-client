'use client';

import React, { useEffect, useState } from 'react';

import TitleLayout from '@/component/layout/title';

import Api from '@/api';
import { Event } from '@/api/schema/event';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';

import EventCard from '@/component/event-card';

export default function Page() {
  const [isApiProcessing, startApi] = useApi();

  const { user } = useUserStore();

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!user) return;

    startApi(async () => {
      const { bookmark } = await Api.Domain.Bookmark.getBookmark();
      setEvents(bookmark);
    });
  }, [user]);

  return (
    <UserGuard>
      <TitleLayout title="찜한 행사" loading={isApiProcessing}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </TitleLayout>
    </UserGuard>
  );
}
