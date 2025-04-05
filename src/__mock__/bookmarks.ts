import { events } from './events';
import type { Bookmark } from './types';
import { users } from './users';

export const bookmarks: Bookmark[] = [
  {
    id: 'bookmark1',
    user: users[0], // 문화매니아
    event: events[0], // 서울 재즈 페스티벌 2023
    createdAt: '2023-03-15T10:30:00Z',
    updatedAt: '2023-03-15T10:30:00Z',
  },
  {
    id: 'bookmark2',
    user: users[0], // 문화매니아
    event: events[2], // 서울 국제 영화제
    createdAt: '2023-05-10T14:45:00Z',
    updatedAt: '2023-05-10T14:45:00Z',
  },
  {
    id: 'bookmark3',
    user: users[0], // 문화매니아
    event: events[3], // 서울 빛초롱 축제
    createdAt: '2023-09-20T09:15:00Z',
    updatedAt: '2023-09-20T09:15:00Z',
  },
  {
    id: 'bookmark4',
    user: users[0], // 문화매니아
    event: events[6], // 서울 벚꽃 축제
    createdAt: '2023-02-20T16:30:00Z',
    updatedAt: '2023-02-20T16:30:00Z',
  },
  {
    id: 'bookmark5',
    user: users[1], // 재즈매니아
    event: events[0], // 서울 재즈 페스티벌 2023
    createdAt: '2023-03-05T11:20:00Z',
    updatedAt: '2023-03-05T11:20:00Z',
  },
  {
    id: 'bookmark6',
    user: users[2], // 음악사랑
    event: events[0], // 서울 재즈 페스티벌 2023
    createdAt: '2023-03-10T15:40:00Z',
    updatedAt: '2023-03-10T15:40:00Z',
  },
];
