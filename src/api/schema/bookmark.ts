import BaseSchema from '@/api/schema/common';
import { Event } from '@/api/schema/event';
import { User } from '@/api/schema/user';

export interface Bookmark extends BaseSchema {
  user: User;
  event: Event;
}
