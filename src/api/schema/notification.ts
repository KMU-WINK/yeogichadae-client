import BaseSchema from '@/api/schema/common';
import { User } from '@/api/schema/user';

export enum Type {
  MEETING_JOIN = 'MEETING_JOIN',
  MEETING_LEAVE = 'MEETING_LEAVE',
  MEETING_HOST_DELEGATE = 'MEETING_HOST_DELEGATE',
  MEETING_SUCCESS = 'MEETING_SUCCESS',
  MEETING_REVIEW = 'MEETING_REVIEW',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
}

export interface Notification extends BaseSchema {
  type: Type;
  title: string;
  body: string;
  user: User;
  url: string;
  unread: boolean;
}
