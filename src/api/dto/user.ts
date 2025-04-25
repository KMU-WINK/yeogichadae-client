import { Event } from '@/api/schema/event';
import { Meeting } from '@/api/schema/meeting';
import { Review } from '@/api/schema/review';
import { District, Gender, User } from '@/api/schema/user';

import { z } from 'zod';

// ======================================== Request ========================================
export const UserEditRequestSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
  district: z.nativeEnum(District),
  gender: z.nativeEnum(Gender),
  age: z
    .number()
    .int('나이는 정수여야 합니다.')
    .min(15, '나이는 15세 이상이어야 합니다.')
    .max(70, '나이는 70세 이하이어야 합니다.'),
});

export type UserEditRequest = z.infer<typeof UserEditRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface GetMyInfoResponse {
  user: User;
  bookmarks: Event[];
  joinedMeetings: number;
  hostedMeetings: Meeting[];
  reviews: Review[];
  score: number;
}

export interface GetOtherInfoResponse {
  user: User;
  bookmarks: number;
  joinedMeetings: number;
  hostedMeetings: Meeting[];
  reviews: Review[];
  score: number;
}

export interface UpdateMyInfoResponse {
  user: User;
}
// ======================================== Response ========================================
