'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// 받은 후기 데이터 (실제로는 API에서 가져올 것)
const reviewsData = [
  {
    id: 1,
    reviewerId: 2,
    reviewerName: '재즈매니아',
    reviewerAvatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    content:
      '시간 약속을 잘 지키고 모임 분위기를 즐겁게 이끌어주셨어요. 다음에도 같이 모임하고 싶습니다!시간 약속을 잘 지키고 모임 분위기를 즐겁게 이끌어주셨어요. 다음에도 같이 모임하고 싶습니다!시간 약속을 잘 지키고 모임 분위기를 즐겁게 이끌어주셨어요. 다음에도 같이 모임하고 싶습니다!시간 약속을 잘 지키고 모임 분위기를 즐겁게 이끌어주셨어요. 다음에도 같이 모임하고 싶습니다!',
    date: '2023-05-30',
    meetingId: 1,
    meetingTitle: '재즈 페스티벌 같이 즐겨요',
  },
  {
    id: 2,
    reviewerId: 3,
    reviewerName: '음악사랑',
    reviewerAvatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    content:
      '친절하고 매너가 좋았습니다. 행사에 대한 정보도 많이 알려주셔서 즐겁게 참여할 수 있었어요.',
    date: '2023-04-20',
    meetingId: 2,
    meetingTitle: '영화제 관람 모임',
  },
  {
    id: 3,
    reviewerId: 4,
    reviewerName: '한강러버',
    reviewerAvatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    content: '정말 즐거운 시간이었습니다. 모임을 잘 이끌어주셔서 감사합니다!',
    date: '2023-03-15',
    meetingId: 3,
    meetingTitle: '마라톤 완주 도전',
  },
];

export default function ReviewsPage() {
  const [reviews] = useState(reviewsData);

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
    <div className="container mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-10 md:px-8">
      <motion.h1
        className="mb-4 flex text-2xl font-bold sm:text-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        받은 후기 목록
      </motion.h1>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex">
            <div className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1.5">
              <Star className="fill-primary h-4 w-4" />
              <span className="font-medium">4.7</span>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">총 {reviews.length}개의 후기</div>
        </div>
      </div>

      {reviewsData.length > 0 ? (
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reviews.map((review) => (
            <motion.div key={review.id} variants={itemVariants}>
              <div className="sinc-card p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-primary/10 h-12 w-12 border-2">
                      <AvatarImage src={review.reviewerAvatar} alt={review.reviewerName} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {review.reviewerName.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/profile/${review.reviewerId}`}
                        className="hover:text-primary font-medium transition-colors"
                      >
                        {review.reviewerName}
                      </Link>
                      <div className="text-muted-foreground text-sm">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? 'fill-primary text-primary' : 'text-neutral-300'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mb-4 text-sm sm:text-base">{review.content}</p>

                <div className="border-t pt-4">
                  <Link
                    href={`/meetings/${review.meetingId}`}
                    className="text-sm text-neutral-500 hover:underline"
                  >
                    {review.meetingTitle}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="sinc-card flex flex-col items-center py-16">
          <Star size={48} className="mb-3" />
          <h3 className="mb-2 text-xl font-medium">받은 후기가 없습니다</h3>
          <p className="text-muted-foreground mb-6">모임에 참여하고 후기를 받아보세요</p>
          <Link href="/">
            <Button className="rounded-xl">행사 둘러보기</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
