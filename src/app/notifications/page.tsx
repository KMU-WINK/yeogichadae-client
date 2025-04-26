'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import {
  NotificationIcon as _NotificationIcon,
  generateBody,
  generateTitle,
} from '@/app/notifications/_util';

import TitleLayout from '@/component/layout/title';

import { Button } from '@/component/ui/button';

import Api from '@/api';
import { Notification, Type } from '@/api/schema/notification';

import { useApi } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';
import { cn } from '@/lib/utils';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function Page() {
  const [isApiProcessing, startApi] = useApi();
  const [, startApi2] = useApi();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    startApi(async () => {
      const { notifications } = await Api.Domain.Notification.getNotifications();
      setNotifications(
        notifications.filter((notification) => notification.type !== Type.CHAT_MESSAGE),
      );
    });
  }, []);

  return (
    <UserGuard>
      <TitleLayout
        title="알림"
        loading={isApiProcessing}
        className="max-w-xl"
        button={
          <Button
            variant="outline"
            className="rounded-xl text-xs"
            onClick={() => {
              startApi2(async () => {
                await Api.Domain.Notification.readAllNotification();

                setNotifications((prev) =>
                  prev.map((notification) => ({ ...notification, unread: false })),
                );
              });
            }}
          >
            모두 읽음 표시
          </Button>
        }
      >
        <div className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.url}
              onClick={() => {
                startApi2(async () => {
                  await Api.Domain.Notification.readNotification(notification.id);

                  setNotifications((prev) =>
                    prev.map((n) => (n.id === notification.id ? { ...n, unread: false } : n)),
                  );
                });
              }}
            >
              <div
                className={cn(
                  'hover:bg-secondary/50 rounded-2xl border p-4',
                  notification.unread && 'bg-primary/5 hover:bg-primary/10 border-primary/50',
                )}
              >
                <div className="flex items-center gap-3">
                  <_NotificationIcon notification={notification} />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <p className="line-clamp-1 text-sm font-medium">
                        {generateTitle(notification)}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {formatDistanceToNow(notification.createdAt, {
                          locale: ko,
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <p className="line-clamp-1 text-xs text-neutral-500">
                      {generateBody(notification)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </TitleLayout>
    </UserGuard>
  );
}
