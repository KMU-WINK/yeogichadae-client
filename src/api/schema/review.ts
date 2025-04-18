import BaseSchema from '@/api/schema/common';
import { Meeting } from '@/api/schema/meeting';
import { User } from '@/api/schema/user';

export interface Review extends BaseSchema {
  meeting: Meeting;
  author: User;
  target: User;
  score: number;
  content: string;
}
