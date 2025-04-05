// 모든 모델의 타입 정의

export type LocalDateTime = string; // ISO 형식의 날짜 문자열로 표현

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum District {
  종로구 = '종로구',
  중구 = '중구',
  용산구 = '용산구',
  성동구 = '성동구',
  광진구 = '광진구',
  동대문구 = '동대문구',
  중랑구 = '중랑구',
  성북구 = '성북구',
  강북구 = '강북구',
  도봉구 = '도봉구',
  노원구 = '노원구',
  은평구 = '은평구',
  서대문구 = '서대문구',
  마포구 = '마포구',
  양천구 = '양천구',
  강서구 = '강서구',
  구로구 = '구로구',
  금천구 = '금천구',
  영등포구 = '영등포구',
  동작구 = '동작구',
  관악구 = '관악구',
  서초구 = '서초구',
  강남구 = '강남구',
  송파구 = '송파구',
  강동구 = '강동구',
}

export enum EventCategory {
  교육체험 = '교육체험',
  국악 = '국악',
  기타 = '기타',
  독주독창회 = '독주독창회',
  무용 = '무용',
  뮤지컬오페라 = '뮤지컬오페라',
  연극 = '연극',
  영화 = '영화',
  전시미술 = '전시미술',
  축제기타 = '축제기타',
  축제문화예술 = '축제문화예술',
  축제시민화합 = '축제시민화합',
  축제자연경관 = '축제자연경관',
  축제전통역사 = '축제전통역사',
  콘서트 = '콘서트',
  클래식 = '클래식',
}

export enum NotificationType {
  MEETING_JOIN = 'MEETING_JOIN',
  MEETING_LEAVE = 'MEETING_LEAVE',
  MEETING_HOST_DELEGATE = 'MEETING_HOST_DELEGATE',
  MEETING_REVIEW = 'MEETING_REVIEW',
}

export interface BaseSchema {
  id: string;
  createdAt: LocalDateTime;
  updatedAt: LocalDateTime;
}

export interface User extends BaseSchema {
  kakao: number;
  avatar: string;
  nickname: string;
  email: string;
  experience: number;
  birthYear: number;
  district: District;
  gender: Gender;
  meetingOpen: boolean;
}

export interface Event extends BaseSchema {
  category: EventCategory;
  image: string;
  title: string;
  startDate: LocalDateTime;
  endDate: LocalDateTime;
  host: string;
  district: District;
  location: string;
  target: string;
  free: boolean;
  cost: string;
  homepage: string;
}

export interface Meeting extends BaseSchema {
  event: Event;
  title: string;
  description: string;
  date: LocalDateTime;
  maxPeople: number;
  minAge: number | null;
  maxAge: number | null;
  gender: Gender | null;
  end: boolean;
}

export interface MeetingParticipant extends BaseSchema {
  meeting: Meeting;
  user: User;
  host: boolean;
}

export interface MeetingReview extends BaseSchema {
  meeting: Meeting;
  author: MeetingParticipant;
  target: MeetingParticipant;
  score: number;
  content: string;
}

export interface NotificationDetail {
  meeting?: Meeting;
  user?: User;
  targetUser?: User;
  review?: MeetingReview;
}

export interface Notification extends BaseSchema {
  type: NotificationType;
  detail: NotificationDetail;
  unread: boolean;
}

export interface ChatMessage extends BaseSchema {
  meeting: Meeting;
  user: User;
  content: string;
  read: MeetingParticipant[];
}

export interface Bookmark extends BaseSchema {
  user: User;
  event: Event;
}
