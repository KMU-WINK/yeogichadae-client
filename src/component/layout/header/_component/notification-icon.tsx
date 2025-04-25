import { useEffect, useState } from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import {
  NotificationIcon as _NotificationIcon,
  generateBody,
  generateTitle,
} from '@/app/notifications/_util';

import { Button } from '@/component/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover';

import Api from '@/api';
import { Notification, Type } from '@/api/schema/notification';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';
import useMobile from '@/hook/use-mobile';

import { requestNotificationPermission } from '@/lib/firebase';
import { cn } from '@/lib/utils';

import { Bell } from 'lucide-react';

export default function NotificationIcon() {
  const isMobile = useMobile();
  const [, startApi] = useApi();

  const { user } = useUserStore();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    startApi(async () => {
      const { notifications } = await Api.Domain.Notification.getNotifications();
      setNotifications(
        notifications.filter((notification) => notification.type !== Type.CHAT_MESSAGE).slice(0, 5),
      );
    });
  }, [user]);

  useEffect(() => {
    setIsNewNotification(notifications.some((notification) => notification.unread));
  }, [notifications]);

  return (
    <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          onClick={async (e) => {
            if (isMobile) e.preventDefault();
            await requestNotificationPermission();
            if (isMobile) redirect('/notifications');
          }}
        >
          <Bell className="size-5" />
          {isNewNotification && (
            <div className="bg-destructive absolute top-1 right-2 size-2 animate-pulse rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">알림</p>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary text-xs"
                onClick={() => {
                  startApi(async () => {
                    await Api.Domain.Notification.readAllNotification();

                    setNotifications((prev) =>
                      prev.map((notification) => ({ ...notification, unread: false })),
                    );
                  });

                  setIsNotificationOpen(false);
                }}
              >
                모두 읽음 표시
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Link
                key={notification.id}
                href={notification.url}
                onClick={() => {
                  startApi(async () => {
                    await Api.Domain.Notification.readNotification(notification.id);

                    setNotifications((prev) =>
                      prev.map((n) => (n.id === notification.id ? { ...n, unread: false } : n)),
                    );
                  });
                  setIsNotificationOpen(false);
                }}
              >
                <div
                  className={cn(
                    'hover:bg-secondary/50 p-4',
                    notification.unread && 'bg-primary/5 hover:bg-primary/10',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <_NotificationIcon notification={notification} />
                    <div className="flex flex-1 flex-col">
                      <p className="line-clamp-1 text-sm font-medium">
                        {generateTitle(notification)}
                      </p>
                      <p className="line-clamp-1 text-xs text-neutral-500">
                        {generateBody(notification)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-neutral-500">
              <p>알림이 없습니다</p>
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="border-t p-2">
            <Link href="/notifications">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary w-full"
                onClick={() => setIsNotificationOpen(false)}
              >
                모든 알림 보기
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
