import BaseSchema from '@/api/schema/common';
import { District } from '@/api/schema/user';

// noinspection NonAsciiCharacters
export enum Category {
  연극 = '연극',
  뮤지컬오페라 = '뮤지컬오페라',
  무용 = '무용',
  독주독창회 = '독주독창회',
  콘서트 = '콘서트',
  클래식 = '클래식',
  국악 = '국악',
  영화 = '영화',
  전시미술 = '전시미술',
  축제문화예술 = '축제문화예술',
  축제전통역사 = '축제전통역사',
  축제자연경관 = '축제자연경관',
  축제시민화합 = '축제시민화합',
  축제기타 = '축제기타',
  교육체험 = '교육체험',
  기타 = '기타',
}

export interface Event extends BaseSchema {
  category: Category;
  image: string;
  title: string;
  startDate: string;
  endDate: string;
  applicationDate: string;
  host: string;
  district: District | null;
  location: string;
  latitude: number;
  longitude: number;
  target: string;
  homepage: string;
  free: boolean;
  cost: string | null;
  cast: string | null;
  description: string | null;
  other: string | null;
  isAdvertised: boolean;
}
