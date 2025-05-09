import { Chat } from '@/api/schema/chat';
import { Meeting } from '@/api/schema/meeting';

import { z } from 'zod';

// ======================================== Internal ========================================
export interface Room {
  meeting: Meeting;
  last: Chat | null;
  unread: number;
}
// ======================================== Internal ========================================

// ======================================== Request ========================================
export const SendChatRequestSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.'),
});

export type SendChatRequest = z.infer<typeof SendChatRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface ChatInfoResponse {
  chats: Chat[];
}

export interface RoomListResponse {
  rooms: Room[];
}

export interface SendChatResponse {
  message: Chat;
}
// ======================================== Response ========================================
