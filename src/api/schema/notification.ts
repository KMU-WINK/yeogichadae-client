import { Chat } from '@/api/schema/chat';
import BaseSchema from '@/api/schema/common';
import { Meeting } from '@/api/schema/meeting';
import { User } from '@/api/schema/user';

export enum Type {
  MEETING_JOIN = 'MEETING_JOIN',
  MEETING_LEAVE = 'MEETING_LEAVE',
  MEETING_HOST_DELEGATE = 'MEETING_HOST_DELEGATE',
  MEETING_REVIEW = 'MEETING_REVIEW',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
}

export interface Notification extends BaseSchema {
  type: Type;
  detail: NotificationDetail;
  user: User;
  url: string;
  unread: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NotificationDetail {}

export interface MeetingJoinDetail extends NotificationDetail {
  meeting: Meeting;
  user: User;
}

export interface MeetingLeaveDetail extends NotificationDetail {
  meeting: Meeting;
  user: User;
}

export interface MeetingHostDelegateDetail extends NotificationDetail {
  meeting: Meeting;
}

export interface MeetingReviewDetail extends NotificationDetail {
  meeting: Meeting;
  user: User;
}

export interface ChatMessageDetail extends NotificationDetail {
  message: Chat;
}
