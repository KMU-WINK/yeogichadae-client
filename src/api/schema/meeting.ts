import BaseSchema from '@/api/schema/common';
import { Event } from '@/api/schema/event';
import { Gender, User } from '@/api/schema/user';

export interface Meeting extends BaseSchema {
  event: Event;
  title: string;
  description: string;
  date: string;
  maxPeople: number;
  minAge: number | null;
  maxAge: number | null;
  gender: Gender | null;
  host: User;
  participants: User[];
  end: boolean;
}
