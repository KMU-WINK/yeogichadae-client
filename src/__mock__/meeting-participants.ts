import { meetings } from './meetings';
import type { MeetingParticipant } from './types';
import { users } from './users';

export const meetingParticipants: MeetingParticipant[] = [
  // 모임 1 참여자들
  {
    id: 'mp1',
    meeting: meetings[0],
    user: users[1], // 재즈매니아
    host: true,
    createdAt: '2023-04-15T09:30:00Z',
    updatedAt: '2023-04-15T09:30:00Z',
  },
  {
    id: 'mp2',
    meeting: meetings[0],
    user: users[2], // 음악사랑
    host: false,
    createdAt: '2023-04-16T14:20:00Z',
    updatedAt: '2023-04-16T14:20:00Z',
  },
  {
    id: 'mp3',
    meeting: meetings[0],
    user: users[3], // 한강러버
    host: false,
    createdAt: '2023-04-17T11:45:00Z',
    updatedAt: '2023-04-17T11:45:00Z',
  },
  {
    id: 'mp4',
    meeting: meetings[0],
    user: users[4], // 페스티벌고
    host: false,
    createdAt: '2023-04-18T16:30:00Z',
    updatedAt: '2023-04-18T16:30:00Z',
  },

  // 모임 2 참여자들
  {
    id: 'mp5',
    meeting: meetings[1],
    user: users[2], // 음악사랑
    host: true,
    createdAt: '2023-04-20T14:15:00Z',
    updatedAt: '2023-04-20T14:15:00Z',
  },
  {
    id: 'mp6',
    meeting: meetings[1],
    user: users[4], // 페스티벌고
    host: false,
    createdAt: '2023-04-21T10:30:00Z',
    updatedAt: '2023-04-21T10:30:00Z',
  },

  // 모임 3 참여자들
  {
    id: 'mp7',
    meeting: meetings[2],
    user: users[0], // 문화매니아
    host: true,
    createdAt: '2023-04-25T11:45:00Z',
    updatedAt: '2023-04-25T11:45:00Z',
  },
  {
    id: 'mp8',
    meeting: meetings[2],
    user: users[1], // 재즈매니아
    host: false,
    createdAt: '2023-04-26T09:15:00Z',
    updatedAt: '2023-04-26T09:15:00Z',
  },
  {
    id: 'mp9',
    meeting: meetings[2],
    user: users[3], // 한강러버
    host: false,
    createdAt: '2023-04-27T15:40:00Z',
    updatedAt: '2023-04-27T15:40:00Z',
  },

  // 모임 4 참여자들
  {
    id: 'mp10',
    meeting: meetings[3],
    user: users[2], // 음악사랑 (여성)
    host: true,
    createdAt: '2023-04-18T16:20:00Z',
    updatedAt: '2023-04-18T16:20:00Z',
  },
  {
    id: 'mp11',
    meeting: meetings[3],
    user: users[3], // 한강러버 (여성)
    host: false,
    createdAt: '2023-04-19T10:25:00Z',
    updatedAt: '2023-04-19T10:25:00Z',
  },
  {
    id: 'mp12',
    meeting: meetings[3],
    user: users[6], // 씨네필 (여성)
    host: false,
    createdAt: '2023-04-20T14:10:00Z',
    updatedAt: '2023-04-20T14:10:00Z',
  },
  {
    id: 'mp13',
    meeting: meetings[3],
    user: users[0], // 문화매니아 (남성) - 성별 제한으로 참여 불가
    host: false,
    createdAt: '2023-04-21T09:30:00Z',
    updatedAt: '2023-04-21T09:30:00Z',
  },

  // 모임 5 참여자들
  {
    id: 'mp14',
    meeting: meetings[4],
    user: users[5], // 영화광
    host: true,
    createdAt: '2023-06-01T10:00:00Z',
    updatedAt: '2023-06-01T10:00:00Z',
  },
  {
    id: 'mp15',
    meeting: meetings[4],
    user: users[0], // 문화매니아
    host: false,
    createdAt: '2023-06-02T15:45:00Z',
    updatedAt: '2023-06-02T15:45:00Z',
  },
  {
    id: 'mp16',
    meeting: meetings[4],
    user: users[6], // 씨네필
    host: false,
    createdAt: '2023-06-03T11:20:00Z',
    updatedAt: '2023-06-03T11:20:00Z',
  },

  // 모임 6 참여자들 (완료된 모임)
  {
    id: 'mp17',
    meeting: meetings[5],
    user: users[7], // 러닝맨
    host: true,
    createdAt: '2023-03-01T09:15:00Z',
    updatedAt: '2023-03-01T09:15:00Z',
  },
  {
    id: 'mp18',
    meeting: meetings[5],
    user: users[0], // 문화매니아
    host: false,
    createdAt: '2023-03-05T14:30:00Z',
    updatedAt: '2023-03-05T14:30:00Z',
  },
  {
    id: 'mp19',
    meeting: meetings[5],
    user: users[1], // 재즈매니아
    host: false,
    createdAt: '2023-03-10T11:45:00Z',
    updatedAt: '2023-03-10T11:45:00Z',
  },
  {
    id: 'mp20',
    meeting: meetings[5],
    user: users[3], // 한강러버
    host: false,
    createdAt: '2023-03-15T16:20:00Z',
    updatedAt: '2023-03-15T16:20:00Z',
  },
  {
    id: 'mp21',
    meeting: meetings[5],
    user: users[4], // 페스티벌고
    host: false,
    createdAt: '2023-03-20T10:10:00Z',
    updatedAt: '2023-03-20T10:10:00Z',
  },
];
