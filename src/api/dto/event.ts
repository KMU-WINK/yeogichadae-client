import { Event } from '@/api/schema/event';

// ======================================== Internal ========================================
export interface EventDto {
  event: Event;
  meetings: number;
}
// ======================================== Internal ========================================

// ======================================== Response ========================================
export interface EventsResponse {
  events: EventDto[];
}

export interface EventResponse {
  event: Event;
}
// ======================================== Response ========================================
