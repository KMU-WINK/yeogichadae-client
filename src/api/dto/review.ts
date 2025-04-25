import { Review } from '@/api/schema/review';

import { z } from 'zod';

// ======================================== Request ========================================
export const CreateReviewRequestSchema = z.object({
  score: z
    .number()
    .int('점수는 정수여야 합니다.')
    .min(1, '점수는 1점 이상이어야 합니다.')
    .max(5, '점수는 5점 이하이어야 합니다.'),
  content: z.string().optional().nullable(),
});

export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface GetReviewResponse {
  review: Review;
}

export interface GetReviewsResponse {
  reviews: Review[];
}
// ======================================== Response ========================================
