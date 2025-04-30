'use client';

import Link from 'next/link';

import { NotificationIcon as _NotificationIcon } from '@/app/notifications/_util';

import TitleLayout from '@/component/layout/title';

import { Button } from '@/component/ui/button';

import Api from '@/api';

import { useNotificationStore } from '@/store/notification.store';

import { useApi } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';
import { cn } from '@/lib/utils';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function Page() {
  const [, startApi] = useApi();

  const { notifications, read, readAll } = useNotificationStore();

  return (
    <UserGuard>
      <TitleLayout
        title="알림"
        loading={false}
        className="max-w-xl"
        button={
          <Button
            variant="outline"
            className="rounded-xl text-xs"
            onClick={() => {
              startApi(async () => {
                await Api.Domain.Notification.readAllNotification();
                readAll();
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
                startApi(async () => {
                  await Api.Domain.Notification.readNotification(notification.id);
                  read(notification.id);
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
                      <p className="line-clamp-1 text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-neutral-500">
                        {formatDistanceToNow(notification.createdAt, {
                          locale: ko,
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <p className="line-clamp-1 text-xs text-neutral-500">{notification.body}</p>
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
