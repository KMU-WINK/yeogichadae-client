'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const usersData = {
  '4': {
    //주최 모임, 참가 모임 다 2 초과
    id: 4,
    nickname: '예술애호가',
    avatar: '/placeholder.svg?height=128&width=128',
    district: '성동구',
    gender: 'female',
    age: 29,
    mannerScore: 4.9,
    createdAt: '2023-01-15',
    bookmarkedEvents: 6,
    meetings: {
      hosted: [
        {
          id: 101,
          title: '한강에서 그림 그리기 모임',
          date: '2024-09-15 10:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
        {
          id: 102,
          title: '성수동 갤러리 투어',
          date: '2024-10-02 14:30',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
        {
          id: 103,
          title: '가을 감성 사진 산책',
          date: '2024-10-20 16:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
      ],
      participated: [
        {
          id: 201,
          title: '플리마켓 체험 모임',
          date: '2024-08-30 13:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
        {
          id: 202,
          title: '전시회 후기 공유 세션',
          date: '2024-09-10 19:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
        {
          id: 203,
          title: '뮤지컬 함께 보기',
          date: '2024-09-25 18:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
        {
          id: 204,
          title: '낙서 드로잉 클래스',
          date: '2024-10-05 11:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
      ],
    },
    reviews: [
      {
        id: 1,
        reviewerName: '문화러버',
        reviewerAvatar: '/placeholder.svg?height=40&width=40',
        rating: 5,
        content: '모임을 너무 따뜻하게 잘 이끌어주셔서 힐링되는 시간이었어요.',
        date: '2024-09-16',
      },
      {
        id: 2,
        reviewerName: '도시여행자',
        reviewerAvatar: '/placeholder.svg?height=40&width=40',
        rating: 4,
        content: '전시회 설명도 잘해주시고 질문에 성실히 답해주셔서 좋았어요!',
        date: '2024-10-03',
      },
    ],
  },

  '5': {
    // 2개 2개 씩
    id: 5,
    nickname: '역사연구자',
    avatar: '/placeholder.svg?height=128&width=128',
    district: '종로구',
    gender: 'male',
    age: 41,
    mannerScore: 4.2,
    createdAt: '2022-11-05',
    bookmarkedEvents: 2,
    meetings: {
      hosted: [
        {
          id: 401,
          title: '한양도성 걷기 모임',
          date: '2024-07-10 09:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
        {
          id: 402,
          title: '고지도 해설 세미나',
          date: '2024-09-03 13:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
      ],
      participated: [
        {
          id: 403,
          title: '독립운동 유적지 투어',
          date: '2024-08-15 14:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
        {
          id: 404,
          title: '역사토론 모임',
          date: '2024-08-25 19:30',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
      ],
    },
    reviews: [
      {
        id: 1,
        reviewerName: '문화해설가',
        reviewerAvatar: '/placeholder.svg?height=40&width=40',
        rating: 5,
        content: '모임이 알차고 유익했습니다. 감사합니다!',
        date: '2024-07-12',
      },
    ],
  },
  '6': {
    //모두 0개
    id: 6,
    nickname: '신입회원',
    avatar: '/placeholder.svg?height=128&width=128',
    district: '강남구',
    gender: 'female',
    age: 23,
    mannerScore: 5.0,
    createdAt: '2024-03-01',
    bookmarkedEvents: 0,
    meetings: {
      hosted: [],
      participated: [],
    },
    reviews: [],
  },
  '7': {
    id: 7, // 1개 0개 사실 말은 안됨
    nickname: '공간기획자',
    avatar: '/placeholder.svg?height=128&width=128',
    district: '송파구',
    gender: 'female',
    age: 30,
    mannerScore: 4.7,
    createdAt: '2023-06-30',
    bookmarkedEvents: 4,
    meetings: {
      hosted: [
        {
          id: 501,
          title: '소셜살롱 공간 소개 모임',
          date: '2024-09-12 15:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
      ],
      participated: [],
    },
    reviews: [
      {
        id: 1,
        reviewerName: '살롱참여자',
        reviewerAvatar: '/placeholder.svg?height=40&width=40',
        rating: 5,
        content: '편안한 분위기 속에서 유익한 시간을 보낼 수 있었어요!',
        date: '2024-09-13',
      },
    ],
  },
};

export default function ParticipatedMeetingsPage() {
  const { id } = useParams();
  const user = usersData[id as keyof typeof usersData];

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">사용자 정보를 찾을 수 없습니다.</h2>
      </div>
    );
  }

  const meetings = user.meetings.participated;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-10 md:px-8">
      <motion.div
        className="mb-4 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold sm:text-3xl">{user.nickname}님의 참여한 모임</h1>
      </motion.div>

      {meetings.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {meetings.map((meeting) => (
            <motion.div key={meeting.id} variants={itemVariants}>
              <Link href={`/meetings/${meeting.id}`} className="group">
                <div className="sinc-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={meeting.image}
                      alt={meeting.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="sinc-badge absolute top-3 right-3 bg-emerald-100 text-emerald-700">
                      {meeting.status}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
                      {meeting.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">{meeting.date}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="sinc-card p-16 text-center">
          <div className="mb-3 text-5xl">🙋</div>
          <h3 className="mb-2 text-xl font-medium">참여한 모임이 없습니다</h3>
          <p className="text-muted-foreground">다른 사람의 모임에 참여해보세요!</p>
        </div>
      )}
    </div>
  );
}
