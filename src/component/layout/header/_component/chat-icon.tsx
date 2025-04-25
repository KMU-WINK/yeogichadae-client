import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Button } from '@/component/ui/button';

import Api from '@/api';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';

import { requestNotificationPermission } from '@/lib/firebase';

import { MessageSquare } from 'lucide-react';

export default function ChatIcon() {
  const [, startApi] = useApi();

  const { user } = useUserStore();

  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    startApi(async () => {
      const { rooms } = await Api.Domain.Chat.getRoomList();

      const isNewMessage = rooms.some((room) => room.unread > 0);

      setIsNewMessage(isNewMessage);
    });
  }, [user]);

  return (
    <Link href="/chat" onClick={requestNotificationPermission}>
      <Button variant="ghost" size="icon" className="relative rounded-full">
        <MessageSquare className="size-5" />
        {isNewMessage && (
          <div className="bg-destructive absolute top-1 right-1.5 size-2 animate-pulse rounded-full" />
        )}
      </Button>
    </Link>
  );
}
