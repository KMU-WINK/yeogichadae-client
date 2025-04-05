'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

// 찜한 행사 데이터 (실제로는 API에서 가져올 것)
const bookmarkedEvents = [
  {
    id: 1,
    title: '서울 재즈 페스티벌 2023',
    description: '국내외 유명 재즈 아티스트들의 공연',
    category: '음악',
    district: '마포구',
    place: '난지한강공원',
    startDate: '2023-05-27',
    endDate: '2023-05-29',
    isFree: false,
    mainImage: '/placeholder.svg?height=200&width=400',
    meetingsCount: 12,
  },
  {
    id: 2,
    title: '서울 국제 도서전',
    description: '다양한 출판사와 작가들이 참여하는 도서 전시회',
    category: '전시',
    district: '강남구',
    place: '코엑스',
    startDate: '2023-06-14',
    endDate: '2023-06-18',
    isFree: true,
    mainImage: '/placeholder.svg?height=200&width=400',
    meetingsCount: 8,
  },
  {
    id: 3,
    title: '서울 국제 영화제',
    description: '국내외 다양한 영화 상영 및 감독과의 대화',
    category: '영화',
    district: '종로구',
    place: '메가박스 동대문',
    startDate: '2023-07-05',
    endDate: '2023-07-14',
    isFree: false,
    mainImage: '/placeholder.svg?height=200&width=400',
    meetingsCount: 15,
  },
  {
    id: 4,
    title: '서울 빛초롱 축제',
    description: '한국의 전통과 현대를 아우르는 빛 축제',
    category: '축제',
    district: '중구',
    place: '청계천',
    startDate: '2023-11-03',
    endDate: '2023-11-19',
    isFree: true,
    mainImage: '/placeholder.svg?height=200&width=400',
    meetingsCount: 20,
  },
];

export default function BookmarksPage() {
  const [events] = useState(bookmarkedEvents);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 md:px-8">
      <Link href="/profile" className="text-primary mb-6 inline-flex items-center hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        프로필로 돌아가기
      </Link>

      <motion.h1
        className="mb-8 text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        찜한 행사 목록
      </motion.h1>

      {events.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <Link href={`/events/${event.id}`} className="group">
                <div className="sinc-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.mainImage || '/placeholder.svg'}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge
                        className={`sinc-badge ${event.isFree ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'}`}
                      >
                        {event.isFree ? '무료' : '유료'}
                      </Badge>
                    </div>
                    <Badge className="sinc-badge text-foreground absolute top-3 left-3 bg-white/90">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-lg font-medium transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                      {event.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-1.5">
                      <div className="text-muted-foreground flex items-center text-sm">
                        <MapPin className="mr-1.5 h-4 w-4 shrink-0" />
                        <span>
                          {event.district} {event.place}
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center text-sm">
                        <Calendar className="mr-1.5 h-4 w-4 shrink-0" />
                        <span>
                          {event.startDate} ~ {event.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/30 flex items-center justify-between border-t px-5 py-3">
                    <div className="text-sm">
                      <span className="text-primary font-medium">{event.meetingsCount}개</span>의
                      모임 진행중
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary hover:text-primary/80 h-auto p-0 hover:bg-transparent"
                    >
                      자세히 보기
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="sinc-card p-16 text-center">
          <div className="mb-3 text-5xl">🔖</div>
          <h3 className="mb-2 text-xl font-medium">찜한 행사가 없습니다</h3>
          <p className="text-muted-foreground mb-6">관심있는 행사를 찜해보세요</p>
          <Link href="/">
            <Button className="rounded-xl">행사 둘러보기</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
