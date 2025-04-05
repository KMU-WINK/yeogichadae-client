import { events } from './events';
import { Gender, type Meeting } from './types';

export const meetings: Meeting[] = [
  {
    id: 'meeting1',
    event: events[0], // 서울 재즈 페스티벌 2023
    title: '재즈 페스티벌 같이 즐겨요',
    description:
      '재즈를 좋아하는 분들과 함께 페스티벌을 즐기고 싶어요. 첫날 공연을 함께 볼 분들을 찾습니다. 공연 전에 근처에서 간단히 식사도 하고 함께 즐겨요!',
    date: '2023-05-27T14:00:00Z',
    maxPeople: 6,
    minAge: 20,
    maxAge: 35,
    gender: null,
    end: false,
    createdAt: '2023-04-15T09:30:00Z',
    updatedAt: '2023-04-15T09:30:00Z',
  },
  {
    id: 'meeting2',
    event: events[0], // 서울 재즈 페스티벌 2023
    title: '마지막 날 공연 함께해요',
    description:
      '페스티벌 마지막 날 헤드라이너 공연을 함께 볼 분들을 모집합니다. 공연 전에 근처에서 식사도 같이해요.',
    date: '2023-05-29T16:00:00Z',
    maxPeople: 4,
    minAge: null,
    maxAge: null,
    gender: null,
    end: false,
    createdAt: '2023-04-20T14:15:00Z',
    updatedAt: '2023-04-20T14:15:00Z',
  },
  {
    id: 'meeting3',
    event: events[0], // 서울 재즈 페스티벌 2023
    title: '둘째 날 저녁 공연만 볼 사람~',
    description: '둘째 날 저녁 공연만 보려고 합니다. 함께 즐기실 분들 모여요!',
    date: '2023-05-28T18:00:00Z',
    maxPeople: 5,
    minAge: 25,
    maxAge: 40,
    gender: null,
    end: false,
    createdAt: '2023-04-25T11:45:00Z',
    updatedAt: '2023-04-25T11:45:00Z',
  },
  {
    id: 'meeting4',
    event: events[0], // 서울 재즈 페스티벌 2023
    title: '여성분들만 모여요',
    description: '여성분들끼리 안전하게 페스티벌 즐겨요. 첫째 날 오후부터 참여합니다.',
    date: '2023-05-27T13:00:00Z',
    maxPeople: 4,
    minAge: null,
    maxAge: null,
    gender: Gender.FEMALE,
    end: false,
    createdAt: '2023-04-18T16:20:00Z',
    updatedAt: '2023-04-18T16:20:00Z',
  },
  {
    id: 'meeting5',
    event: events[2], // 서울 국제 영화제
    title: '영화제 관람 모임',
    description: '첫날 개막작은 꼭 봐야할 것 같아요! 다들 시간 괜찮으신가요?',
    date: '2023-07-06T18:30:00Z',
    maxPeople: 4,
    minAge: null,
    maxAge: null,
    gender: null,
    end: false,
    createdAt: '2023-06-01T10:00:00Z',
    updatedAt: '2023-06-01T10:00:00Z',
  },
  {
    id: 'meeting6',
    event: events[5], // 서울 마라톤
    title: '마라톤 완주 도전',
    description: '서울 마라톤 풀코스 완주에 도전하실 분들 모집합니다. 함께 페이스 맞춰 달려요!',
    date: '2023-04-16T08:00:00Z',
    maxPeople: 5,
    minAge: 20,
    maxAge: 45,
    gender: null,
    end: true,
    createdAt: '2023-03-01T09:15:00Z',
    updatedAt: '2023-04-16T15:30:00Z',
  },
];
