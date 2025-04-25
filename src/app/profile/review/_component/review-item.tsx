import React from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';

import { Review } from '@/api/schema/review';

import { cn } from '@/lib/utils';

import { format } from 'date-fns';
import { Star } from 'lucide-react';

interface ReviewItemProps {
  review: Review;
  simple: boolean;
}

export default function ReviewItem({ review, simple }: ReviewItemProps) {
  return (
    <div key={review.id} className="flex flex-col gap-2 rounded-xl border p-4">
      <div className="flex items-start justify-between">
        <Link href={`/profile/${review.author.id}`} className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src={review.author.avatar} />
            <AvatarFallback>{review.author.nickname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="font-medium">{review.author.nickname}</div>
            <div className="text-xs text-neutral-500">{format(review.createdAt, 'yyyy-MM-dd')}</div>
          </div>
        </Link>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'size-4',
                i < review.score ? 'fill-primary text-primary' : 'text-neutral-500',
              )}
            />
          ))}
        </div>
      </div>
      <p className={cn('text-sm', simple && 'line-clamp-3')}>{review.content}</p>
      {!simple && (
        <>
          <hr />
          <Link href={`/meeting/${review.meeting.id}`} className="text-sm hover:underline">
            {review.meeting.title}
          </Link>
        </>
      )}
    </div>
  );
}
