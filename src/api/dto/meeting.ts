import { Meeting } from '@/api/schema/meeting';
import { Gender } from '@/api/schema/user';
import { LocalDateTimePattern } from '@/api/validation';

import { z } from 'zod';

// ======================================== Request ========================================
export const CreateMeetingRequestSchema = z.object({
  title: z.string().min(1, '이름을 입력해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  datetime: z.string().regex(LocalDateTimePattern, '날짜 형식이 올바르지 않습니다.'),
  maxPeople: z
    .number()
    .int('인원 수는 정수여야 합니다.')
    .min(2, '인원 수는 2명 이상이어야 합니다.'),
  minAge: z
    .number()
    .int('최소 나이는 정수여야 합니다.')
    .min(15, '최소 나이는 15세 이상이어야 합니다.')
    .max(70, '최소 나이는 70세 이하이어야 합니다.')
    .optional()
    .nullable(),
  maxAge: z
    .number()
    .int('최소 나이는 정수여야 합니다.')
    .min(15, '최소 나이는 15세 이상이어야 합니다.')
    .max(70, '최소 나이는 70세 이하이어야 합니다.')
    .optional()
    .nullable(),
  gender: z.nativeEnum(Gender).optional().nullable(),
});

export type CreateMeetingRequest = z.infer<typeof CreateMeetingRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface GetMeetingResponse {
  meeting: Meeting;
}

export interface GetMeetingsResponse {
  meetings: Meeting[];
}
// ======================================== Response ========================================
