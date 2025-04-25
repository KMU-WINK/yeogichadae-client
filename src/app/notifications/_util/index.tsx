import {
  MeetingHostDelegateDetail,
  MeetingJoinDetail,
  MeetingLeaveDetail,
  MeetingReviewDetail,
  Notification,
  Type,
} from '@/api/schema/notification';

import { cn } from '@/lib/utils';

import { Star, UserCog, UserMinus, UserPlus } from 'lucide-react';

export function generateTitle(notification: Notification) {
  if (notification.type === Type.MEETING_JOIN) {
    return '모임에 새로운 참여자가 생겼습니다.';
  } else if (notification.type === Type.MEETING_LEAVE) {
    return '모임에 참여자가 나갔습니다.';
  } else if (notification.type === Type.MEETING_HOST_DELEGATE) {
    return '모임의 호스트가 변경되었습니다.';
  } else if (notification.type === Type.MEETING_REVIEW) {
    return '리뷰가 달렸습니다.';
  }

  return '';
}

export function generateBody(notification: Notification) {
  if (notification.type === Type.MEETING_JOIN) {
    const detail = notification.detail as MeetingJoinDetail;
    return `${detail.meeting.title}에 ${detail.user.nickname}님이 참여했습니다.`;
  } else if (notification.type === Type.MEETING_LEAVE) {
    const detail = notification.detail as MeetingLeaveDetail;
    return `${detail.meeting.title}에 ${detail.user.nickname}님이 나갔습니다.`;
  } else if (notification.type === Type.MEETING_HOST_DELEGATE) {
    const detail = notification.detail as MeetingHostDelegateDetail;
    return `${detail.meeting.title}의 호스트가 ${detail.meeting.host.nickname}님으로 변경되었습니다.`;
  } else if (notification.type === Type.MEETING_REVIEW) {
    const detail = notification.detail as MeetingReviewDetail;
    return `${detail.meeting.title}의 ${detail.user.nickname}님이 리뷰를 달았습니다.`;
  }

  return '';
}

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
        notification.type === Type.MEETING_REVIEW && 'bg-green-100 text-green-700',
      )}
    >
      {notification.type === Type.MEETING_JOIN && <UserPlus className="size-4" />}
      {notification.type === Type.MEETING_LEAVE && <UserMinus className="size-4" />}
      {notification.type === Type.MEETING_HOST_DELEGATE && <UserCog className="size-4" />}
      {notification.type === Type.MEETING_REVIEW && <Star className="size-4" />}
    </div>
  );
}
