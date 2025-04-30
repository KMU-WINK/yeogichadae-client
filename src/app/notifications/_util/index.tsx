import { Notification, Type } from '@/api/schema/notification';

import { cn } from '@/lib/utils';

import { Check, Star, UserCog, UserMinus, UserPlus } from 'lucide-react';

interface NotificationIconProps {
  notification: Notification;
}

export function NotificationIcon({ notification }: NotificationIconProps) {
  return (
    <div
      className={cn(
        'flex size-8 items-center justify-center rounded-full',
        notification.type === Type.MEETING_JOIN && 'bg-primary/10 text-primary',
        notification.type === Type.MEETING_LEAVE && 'bg-red-100 text-red-700',
        notification.type === Type.MEETING_HOST_DELEGATE && 'bg-amber-50 text-amber-700',
        notification.type === Type.MEETING_SUCCESS && 'bg-emerald-50 text-emerald-700',
        notification.type === Type.MEETING_REVIEW && 'bg-green-100 text-green-700',
      )}
    >
      {notification.type === Type.MEETING_JOIN && <UserPlus className="size-4" />}
      {notification.type === Type.MEETING_LEAVE && <UserMinus className="size-4" />}
      {notification.type === Type.MEETING_HOST_DELEGATE && <UserCog className="size-4" />}
      {notification.type === Type.MEETING_SUCCESS && <Check className="size-4" />}
      {notification.type === Type.MEETING_REVIEW && <Star className="size-4" />}
    </div>
  );
}
