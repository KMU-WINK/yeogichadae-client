import { Event } from '@/api/schema/event';
import { Meeting } from '@/api/schema/meeting';
import { Review } from '@/api/schema/review';
import { District, User } from '@/api/schema/user';

import { z } from 'zod';

// ======================================== Request ========================================
export const UserEditRequestSchema = z.object({
  avatar: z.string().optional().nullable(),
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
  district: z.nativeEnum(District),
  meetingOpen: z.boolean(),
});

export type UserEditRequest = z.infer<typeof UserEditRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface GetMyInfoResponse {
  user: User;
  bookmarks: Event[];
  joinedMeetings: number;
  hostedMeetings: number;
  reviews: Review[];
}

export interface GetOtherInfoResponse {
  user: User;
  bookmarks: number;
  joinedMeetings: number;
  hostedMeetings: Meeting[];
  reviews: Review[];
}

export interface UpdateMyInfoResponse {
  user: User;
}
// ======================================== Response ========================================
