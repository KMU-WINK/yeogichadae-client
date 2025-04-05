import { meetingParticipants } from './meeting-participants';
import type { MeetingReview } from './types';

export const meetingReviews: MeetingReview[] = [
  // 모임 1의 리뷰들
  {
    id: 'review1',
    meeting: meetingParticipants[0].meeting, // 모임 1
    author: meetingParticipants[1], // 음악사랑이 작성
    target: meetingParticipants[0], // 재즈매니아에 대한 리뷰
    score: 5,
    content:
      '모임을 재미있게 이끌어주시고 정보도 많이 공유해주셔서 즐거웠습니다. 다음에도 같이 모임하고 싶어요!',
    createdAt: '2023-05-30T15:30:00Z',
    updatedAt: '2023-05-30T15:30:00Z',
  },
  {
    id: 'review2',
    meeting: meetingParticipants[0].meeting, // 모임 1
    author: meetingParticipants[2], // 한강러버가 작성
    target: meetingParticipants[0], // 재즈매니아에 대한 리뷰
    score: 4,
    content: '친절하고 매너가 좋았습니다. 재즈에 대한 지식이 풍부해서 많이 배웠어요.',
    createdAt: '2023-05-29T14:20:00Z',
    updatedAt: '2023-05-29T14:20:00Z',
  },
  {
    id: 'review3',
    meeting: meetingParticipants[0].meeting, // 모임 1
    author: meetingParticipants[3], // 페스티벌고가 작성
    target: meetingParticipants[0], // 재즈매니아에 대한 리뷰
    score: 5,
    content: '정말 즐거운 시간이었습니다. 모임을 잘 이끌어주셔서 감사합니다!',
    createdAt: '2023-05-28T16:45:00Z',
    updatedAt: '2023-05-28T16:45:00Z',
  },

  // 모임 5의 리뷰들 (완료된 모임)
  {
    id: 'review4',
    meeting: meetingParticipants[16].meeting, // 모임 6
    author: meetingParticipants[17], // 문화매니아가 작성
    target: meetingParticipants[16], // 러닝맨에 대한 리뷰
    score: 5,
    content: '페이스 조절을 잘 해주셔서 완주할 수 있었습니다. 다음 마라톤도 함께하고 싶어요!',
    createdAt: '2023-04-17T10:30:00Z',
    updatedAt: '2023-04-17T10:30:00Z',
  },
  {
    id: 'review5',
    meeting: meetingParticipants[16].meeting, // 모임 6
    author: meetingParticipants[18], // 재즈매니아가 작성
    target: meetingParticipants[16], // 러닝맨에 대한 리뷰
    score: 4,
    content: '응원과 격려를 아끼지 않으셔서 힘이 났습니다. 좋은 경험이었어요.',
    createdAt: '2023-04-17T11:15:00Z',
    updatedAt: '2023-04-17T11:15:00Z',
  },
  {
    id: 'review6',
    meeting: meetingParticipants[16].meeting, // 모임 6
    author: meetingParticipants[16], // 러닝맨이 작성
    target: meetingParticipants[17], // 문화매니아에 대한 리뷰
    score: 5,
    content: '시간 약속을 잘 지키고 모임 분위기를 즐겁게 만들어주셨어요.',
    createdAt: '2023-04-17T12:00:00Z',
    updatedAt: '2023-04-17T12:00:00Z',
  },
];
