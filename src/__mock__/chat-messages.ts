import { meetingParticipants } from './meeting-participants';
import type { ChatMessage } from './types';

export const chatMessages: ChatMessage[] = [
  // 모임 1의 채팅
  {
    id: 'chat1',
    meeting: meetingParticipants[0].meeting, // 모임 1
    user: meetingParticipants[0].user, // 재즈매니아
    content: '안녕하세요! 모임에 참여해주셔서 감사합니다.',
    read: [
      meetingParticipants[0],
      meetingParticipants[1],
      meetingParticipants[2],
      meetingParticipants[3],
    ],
    createdAt: '2023-04-16T15:00:00Z',
    updatedAt: '2023-04-16T15:00:00Z',
  },
  {
    id: 'chat2',
    meeting: meetingParticipants[0].meeting, // 모임 1
    user: meetingParticipants[1].user, // 음악사랑
    content: '안녕하세요! 재즈 페스티벌 기대되네요.',
    read: [
      meetingParticipants[0],
      meetingParticipants[1],
      meetingParticipants[2],
      meetingParticipants[3],
    ],
    createdAt: '2023-04-16T15:05:00Z',
    updatedAt: '2023-04-16T15:05:00Z',
  },
  {
    id: 'chat3',
    meeting: meetingParticipants[0].meeting, // 모임 1
    user: meetingParticipants[0].user, // 재즈매니아
    content: '모임 당일에는 난지한강공원 정문에서 만나면 좋을 것 같아요. 어떻게 생각하시나요?',
    read: [meetingParticipants[0], meetingParticipants[1], meetingParticipants[2]],
    createdAt: '2023-04-16T15:10:00Z',
    updatedAt: '2023-04-16T15:10:00Z',
  },
  {
    id: 'chat4',
    meeting: meetingParticipants[0].meeting, // 모임 1
    user: meetingParticipants[2].user, // 한강러버
    content: '좋은 생각이에요! 정문에서 만나는 게 좋을 것 같습니다.',
    read: [meetingParticipants[0], meetingParticipants[1], meetingParticipants[2]],
    createdAt: '2023-04-16T15:15:00Z',
    updatedAt: '2023-04-16T15:15:00Z',
  },
  {
    id: 'chat5',
    meeting: meetingParticipants[0].meeting, // 모임 1
    user: meetingParticipants[3].user, // 페스티벌고
    content: '저도 동의합니다. 혹시 정확한 시간은 언제인가요?',
    read: [meetingParticipants[0], meetingParticipants[3]],
    createdAt: '2023-04-18T17:00:00Z',
    updatedAt: '2023-04-18T17:00:00Z',
  },

  // 모임 5의 채팅
  {
    id: 'chat6',
    meeting: meetingParticipants[13].meeting, // 모임 5
    user: meetingParticipants[13].user, // 영화광
    content: '첫날 개막작은 꼭 봐야할 것 같아요! 다들 시간 괜찮으신가요?',
    read: [meetingParticipants[13]],
    createdAt: '2023-06-01T11:00:00Z',
    updatedAt: '2023-06-01T11:00:00Z',
  },
];
