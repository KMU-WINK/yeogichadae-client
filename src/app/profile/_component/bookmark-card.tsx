import Link from 'next/link';

import { Button } from '@/component/ui/button';

import { Event } from '@/api/schema/event';

import EventCard from '@/component/event-card';

interface BookmarkCardProps {
  bookmarks: Event[];
}

export default function BookmarkCard({ bookmarks }: BookmarkCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">찜한 행사</h2>
        {bookmarks.length > 0 && (
          <Link href="/profile/bookmark">
            <Button variant="link" size="sm" className="text-primary h-auto">
              전체 보기
            </Button>
          </Link>
        )}
      </div>
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bookmarks.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-secondary flex items-center justify-center rounded-xl py-10 text-sm text-neutral-600">
          찜한 행사가 없습니다.
        </div>
      )}
    </div>
  );
}
