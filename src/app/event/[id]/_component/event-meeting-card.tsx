import { redirect } from 'next/navigation';

import { Button } from '@/component/ui/button';

import { Event } from '@/api/schema/event';

import { useUserStore } from '@/store/user.store';

interface EventMeetingCardProps {
  event: Event;
}

export default function EventMeetingCard({ event }: EventMeetingCardProps) {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col gap-2 rounded-2xl border p-6">
      <h2 className="text-lg font-medium">모임</h2>
      <div className="flex flex-col gap-2">
        {user && (
          <Button
            className="w-full rounded-xl"
            onClick={() => redirect(`/event/${event.id}/meeting/create`)}
          >
            모임 만들기
          </Button>
        )}

        <Button
          variant="outline"
          className="w-full rounded-xl"
          onClick={() => redirect(`/event/${event.id}/meeting`)}
        >
          모임 목록
        </Button>
      </div>
    </div>
  );
}
