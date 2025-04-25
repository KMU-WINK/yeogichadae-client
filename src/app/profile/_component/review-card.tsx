import Link from 'next/link';

import ReviewItem from '@/app/profile/review/_component/review-item';

import { Button } from '@/component/ui/button';

import { Review } from '@/api/schema/review';

interface ReviewCardProps {
  reviews: Review[];
  isMyAccount: boolean;
}

export default function ReviewCard({ reviews, isMyAccount }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">받은 후기</h2>
        {isMyAccount && reviews.length > 0 && (
          <Link href="/profile/review">
            <Button variant="link" size="sm" className="text-primary">
              자세히 보기
            </Button>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewItem key={review.id} review={review} simple={true} />)
        ) : (
          <div className="bg-secondary flex items-center justify-center rounded-xl py-10 text-sm text-neutral-600">
            아직 후기가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}
