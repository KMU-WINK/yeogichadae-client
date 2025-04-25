'use client';

import { use, useCallback, useEffect, useState } from 'react';

import EventInfoCard from '@/app/event/[id]/_component/event-info-card';
import EventMeetingCard from '@/app/event/[id]/_component/event-meeting-card';
import Loading from '@/app/loading';

import TitleLayout from '@/component/layout/title';

import { Button } from '@/component/ui/button';

import Api from '@/api';
import { Event } from '@/api/schema/event';

import { useUserStore } from '@/store/user.store';

import { useApi, useApiWithToast } from '@/hook/use-api';

import { cn } from '@/lib/utils';

import { Bookmark } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { id: eventId } = use(props.params);

  const [isApiProcessing, startApi] = useApi();
  const [isApiProcessing2, startApi2] = useApiWithToast();

  const { user } = useUserStore();

  const [event, setEvent] = useState<Event>();
  const [bookmarks, setBookmarks] = useState<Event[]>([]);

  const toggleBookmark = useCallback(() => {
    if (!event || !user) return;

    const bookmark = bookmarks.find((bookmark) => bookmark.id === event.id);

    if (bookmark) {
      startApi2(
        async () => {
          await Api.Domain.Bookmark.deleteBookmark(event.id);
          setBookmarks((prev) => prev.filter((b) => b.id !== event.id));
        },
        {
          loading: '북마크를 삭제하고 있습니다.',
          success: '북마크를 삭제했습니다.',
        },
      );
    } else {
      startApi2(
        async () => {
          await Api.Domain.Bookmark.postBookmark(event.id);
          setBookmarks((prev) => [...prev, event]);
        },
        {
          loading: '북마크를 추가하고 있습니다.',
          success: '북마크를 추가했습니다.',
        },
      );
    }
  }, [event, bookmarks]);

  useEffect(() => {
    startApi(async () => {
      const { event } = await Api.Domain.Event.getEvent(eventId);
      setEvent(event);

      if (user) {
        const { bookmark } = await Api.Domain.Bookmark.getBookmark();
        setBookmarks(bookmark);
      }
    });
  }, [eventId]);

  return (
    <TitleLayout
      title="행사 정보"
      button={
        !isApiProcessing &&
        event &&
        user && (
          <Button
            variant="ghost"
            size="icon"
            disabled={isApiProcessing2}
            onClick={toggleBookmark}
            className="hover:bg-primary/80 group size-10 rounded-full border"
          >
            <Bookmark
              className={cn(
                'group-hover:fill-white group-hover:text-white',
                bookmarks.find((bookmark) => bookmark.id === eventId) &&
                  'fill-primary text-primary',
              )}
            />
          </Button>
        )
      }
    >
      {isApiProcessing || !event ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-2">
              <EventInfoCard event={event} />
            </div>

            <div className="flex flex-col gap-4 lg:gap-6">
              <EventMeetingCard event={event} />
            </div>
          </div>
        </>
      )}
    </TitleLayout>
  );
}
