import { meetingParticipants } from './meeting-participants';
import { meetingReviews } from './meeting-reviews';
import { type Notification, NotificationType } from './types';

export const notifications: Notification[] = [
  {
    id: 'notif1',
    type: NotificationType.MEETING_JOIN,
    detail: {
      meeting: meetingParticipants[0].meeting, // 모임 1
      user: meetingParticipants[1].user, // 음악사랑이 참여
      targetUser: meetingParticipants[0].user, // 재즈매니아(주최자)에게 알림
    },
    unread: false,
    createdAt: '2023-04-16T14:20:00Z',
    updatedAt: '2023-04-16T14:20:00Z',
  },
  {
    id: 'notif2',
    type: NotificationType.MEETING_JOIN,
    detail: {
      meeting: meetingParticipants[0].meeting, // 모임 1
      user: meetingParticipants[2].user, // 한강러버가 참여
      targetUser: meetingParticipants[0].user, // 재즈매니아(주최자)에게 알림
    },
    unread: false,
    createdAt: '2023-04-17T11:45:00Z',
    updatedAt: '2023-04-17T11:45:00Z',
  },
  {
    id: 'notif3',
    type: NotificationType.MEETING_JOIN,
    detail: {
      meeting: meetingParticipants[0].meeting, // 모임 1
      user: meetingParticipants[3].user, // 페스티벌고가 참여
      targetUser: meetingParticipants[0].user, // 재즈매니아(주최자)에게 알림
    },
    unread: true,
    createdAt: '2023-04-18T16:30:00Z',
    updatedAt: '2023-04-18T16:30:00Z',
  },
  {
    id: 'notif4',
    type: NotificationType.MEETING_REVIEW,
    detail: {
      meeting: meetingReviews[0].meeting, // 모임 1
      user: meetingReviews[0].author.user, // 음악사랑이 리뷰 작성
      targetUser: meetingReviews[0].target.user, // 재즈매니아에게 알림
      review: meetingReviews[0],
    },
    unread: true,
    createdAt: '2023-05-30T15:30:00Z',
    updatedAt: '2023-05-30T15:30:00Z',
  },
  {
    id: 'notif5',
    type: NotificationType.MEETING_REVIEW,
    detail: {
      meeting: meetingReviews[1].meeting, // 모임 1
      user: meetingReviews[1].author.user, // 한강러버가 리뷰 작성
      targetUser: meetingReviews[1].target.user, // 재즈매니아에게 알림
      review: meetingReviews[1],
    },
    unread: false,
    createdAt: '2023-05-29T14:20:00Z',
    updatedAt: '2023-05-29T14:20:00Z',
  },
];
