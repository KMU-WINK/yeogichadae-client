import BaseSchema from '@/api/schema/common';
import { Meeting } from '@/api/schema/meeting';
import { User } from '@/api/schema/user';

export interface Chat extends BaseSchema {
  meeting: Meeting;
  user: User;
  content: string;
  unread: User[];
}
