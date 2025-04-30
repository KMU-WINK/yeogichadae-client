'use client';

import React, { useEffect, useState } from 'react';

import ReviewItem from '@/app/profile/review/_component/review-item';

import TitleLayout from '@/component/layout/title';

import { Badge } from '@/component/ui/badge';

import Api from '@/api';
import { Review } from '@/api/schema/review';

import { useApi } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';

import { Star } from 'lucide-react';

export default function Page() {
  const [isApiProcessing, startApi] = useApi();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    startApi(async () => {
      const { reviews } = await Api.Domain.Review.getReviews();
      setReviews(reviews);
    });
  }, []);

  useEffect(() => {
    const sum = reviews.reduce((acc, review) => acc + review.score, 0);
    setScore(sum / reviews.length);
  }, [reviews]);

  return (
    <UserGuard>
      <TitleLayout title="내 리뷰" loading={isApiProcessing}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Badge className="bg-primary/10 text-primary gap-1">
              <Star className="fill-primary size-3 sm:size-4" />
              <span className="text-sm font-medium sm:text-base">{score.toFixed(1)}</span>
            </Badge>
            <div className="text-sm text-neutral-500">총 {reviews.length}개의 후기</div>
          </div>

          <div className="flex flex-col gap-2">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} simple={false} />
            ))}
          </div>
        </div>
      </TitleLayout>
    </UserGuard>
  );
}
