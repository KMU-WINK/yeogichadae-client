import { RedirectType, redirect } from 'next/navigation';

import { Badge } from '@/component/ui/badge';

import { Room } from '@/api/dto/chat';

import { cn } from '@/lib/utils';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface RoomCardProps {
  room: Room;
  meetingId: string | null;
}

export default function RoomCard({ room, meetingId }: RoomCardProps) {
  return (
    <div
      className={cn(
        'hover:bg-secondary/50 flex min-h-[88px] cursor-pointer flex-col justify-center border-b px-6 py-3 last:border-b-0',
        meetingId === room.meeting.id && 'bg-secondary',
      )}
      onClick={() => redirect(`/chat?id=${room.meeting.id}`, RedirectType.push)}
    >
      <div className="flex items-center justify-between">
        <div className="line-clamp-1 flex gap-1 text-sm font-medium sm:text-base">
          {room.meeting.end && (
            <Badge className="text-[10px] sm:text-xs" variant="outline">
              종료됨
            </Badge>
          )}
          {room.meeting.title}
        </div>
        <div className="flex items-center gap-2">
          {room.unread > 0 && (
            <Badge className="bg-primary text-primary-foreground text-xs">{room.unread}</Badge>
          )}
          <p className="text-xs text-neutral-500">
            {room.last?.createdAt &&
              formatDistanceToNow(room.last?.createdAt, { locale: ko, addSuffix: true })}
          </p>
        </div>
      </div>
      <div className="line-clamp-1 text-xs text-neutral-500 sm:text-sm">
        {room.meeting.event.title}
      </div>
      {room.last && (
        <p className="line-clamp-1 text-sm">
          <span className="text-xs font-medium">{room.last?.user.nickname}:</span>{' '}
          {room.last?.content}
        </p>
      )}
    </div>
  );
}
