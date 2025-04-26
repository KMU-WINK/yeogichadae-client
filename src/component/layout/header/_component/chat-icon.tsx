import Link from 'next/link';

import { Button } from '@/component/ui/button';

import { useRoomStore } from '@/store/chat.store';

import { requestNotificationPermission } from '@/lib/firebase';

import { MessageSquare } from 'lucide-react';

export default function ChatIcon() {
  const { rooms } = useRoomStore();

  return (
    <Link href="/chat" onClick={requestNotificationPermission}>
      <Button variant="ghost" size="icon" className="relative rounded-full">
        <MessageSquare className="size-5" />
        {rooms.find((room) => room.unread > 0) && (
          <div className="bg-destructive absolute top-1 right-1.5 size-2 animate-pulse rounded-full" />
        )}
      </Button>
    </Link>
  );
}
