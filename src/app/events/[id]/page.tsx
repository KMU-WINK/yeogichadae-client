'use client';

import { use, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { handleShare } from '@/app/utils/clipboard';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { events } from '@/__mock__';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bookmark,
  Calendar,
  CreditCard,
  Globe,
  Info,
  MapPin,
  Plus,
  Share2,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

export default function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  // 해당 ID의 이벤트 찾기
  const eventData = events.find((event) => event.id === params.id) || events[0];

  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // 실제로는 API 호출하여 북마크 상태 변경
    toast(isBookmarked ? '북마크가 해제되었습니다' : '북마크에 추가되었습니다');
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/\. /g, '-')
      .replace('.', '');
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-10 md:px-8">
      <motion.div
        className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge className="sinc-badge text-foreground border bg-white text-xs outline outline-neutral-200 sm:text-sm">
              {eventData.category}
            </Badge>
            <Badge
              className={`sinc-badge text-xs sm:text-sm ${eventData.free ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'}`}
            >
              {eventData.free ? '무료' : '유료'}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">{eventData.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            className="hover:bg-primary/5 hover:text-primary h-10 w-10 rounded-full transition-all duration-200"
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
            <span className="sr-only">북마크</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleShare(e, 'event', eventData.id)}
            className="hover:bg-primary/5 hover:text-primary h-10 w-10 rounded-full transition-all duration-200"
          >
            <Share2 className="h-5 w-5" />
            <span className="sr-only">공유</span>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="relative mb-8 aspect-2/1 w-full overflow-hidden rounded-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          src={eventData.image || '/placeholder.svg'}
          alt={eventData.title}
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <motion.div
          className="space-y-8 md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="sinc-card p-6">
            <h2 className="mb-1 text-xl font-medium">행사 정보</h2>
            <p className="mb-6 text-base leading-relaxed">{eventData.host}</p>

            <div className="mb-8 grid grid-cols-1 gap-5 text-sm sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">일정</p>
                  <p className="text-muted-foreground">
                    {formatDate(eventData.startDate)} ~ {formatDate(eventData.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">장소</p>
                  <Link
                    href="https://map.naver.com/v5/search/37.5118239121138,127.059159043842"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {eventData.location}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Info className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">주최</p>
                  <p className="text-muted-foreground">{eventData.host}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">대상</p>
                  <p className="text-muted-foreground">{eventData.target}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">비용</p>
                  <p className="text-muted-foreground">{eventData.cost}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">홈페이지</p>
                  <a
                    href={eventData.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    바로가기
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <h3 className="mb-2 font-medium">추가 정보</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">등록일</dt>
                  <dd>{formatDate(eventData.createdAt)}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">카테고리</dt>
                  <dd>{eventData.category}</dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="sinc-card p-6">
            <h2 className="mb-4 text-xl font-medium">모임</h2>
            <div className="flex flex-col space-y-3">
              <Link href={`/events/${eventData.id}/meetings/create`}>
                <Button className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl text-white shadow-xs transition-all duration-200 hover:shadow-sm">
                  <Plus className="h-4 w-4" />
                  <span>모임 만들기</span>
                </Button>
              </Link>
              <Link href={`/events/${eventData.id}/meetings`}>
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2 rounded-xl transition-all duration-200"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>모든 모임 보기</span>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}