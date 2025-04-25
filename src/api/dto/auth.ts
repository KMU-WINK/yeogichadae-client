import { User } from '@/api/schema/user';

import { z } from 'zod';

// ======================================== Request ========================================
export const LoginRequestSchema = z.object({
  token: z.string().min(1, '토큰을 입력해주세요.'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface GetMyTokenInfoResponse {
  user: User;
}

export interface LoginResponse {
  token: string;
}
// ======================================== Response ========================================
