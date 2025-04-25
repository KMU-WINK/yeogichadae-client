import { Notification } from '@/api/schema/notification';

import { z } from 'zod';

// ======================================== Request ========================================
export const SubscribeRequestSchema = z.object({
  token: z.string().min(1, '토큰을 입력해주세요.'),
});

export type SubscribeRequest = z.infer<typeof SubscribeRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface GetNotificationsResponse {
  notifications: Notification[];
}
// ======================================== Response ========================================
