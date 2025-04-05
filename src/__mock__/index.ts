// 모든 모의 데이터를 한 곳에서 내보내기
import { bookmarks } from './bookmarks';
import { chatMessages } from './chat-messages';
import { events } from './events';
import { meetingParticipants } from './meeting-participants';
import { meetingReviews } from './meeting-reviews';
import { meetings } from './meetings';
import { notifications } from './notifications';
import { users } from './users';

// 현재 로그인한 사용자 ID (실제 앱에서는 인증 시스템에서 가져옴)
export const currentUserId = 'user1';

// 현재 로그인한 사용자 객체
export const currentUser = users.find((user) => user.id === currentUserId)!;

export {
  users,
  events,
  meetings,
  meetingParticipants,
  meetingReviews,
  notifications,
  chatMessages,
  bookmarks,
};

// 유틸리티 함수: 특정 사용자가 참여한 모임 찾기
export function getUserMeetings(userId: string) {
  const participations = meetingParticipants.filter((mp) => mp.user.id === userId);
  return participations.map((p) => p.meeting);
}

// 유틸리티 함수: 특정 사용자가 주최한 모임 찾기
export function getUserHostedMeetings(userId: string) {
  const participations = meetingParticipants.filter((mp) => mp.user.id === userId && mp.host);
  return participations.map((p) => p.meeting);
}

// 유틸리티 함수: 특정 모임의 참여자 찾기
export function getMeetingParticipants(meetingId: string) {
  return meetingParticipants.filter((mp) => mp.meeting.id === meetingId);
}

// 유틸리티 함수: 특정 모임의 채팅 메시지 찾기
export function getMeetingChatMessages(meetingId: string) {
  return chatMessages.filter((msg) => msg.meeting.id === meetingId);
}

// 유틸리티 함수: 특정 사용자의 북마크 찾기
export function getUserBookmarks(userId: string) {
  return bookmarks.filter((b) => b.user.id === userId).map((b) => b.event);
}

// 유틸리티 함수: 특정 사용자의 리뷰 찾기
export function getUserReviews(userId: string) {
  return meetingReviews.filter((r) => r.target.user.id === userId);
}
