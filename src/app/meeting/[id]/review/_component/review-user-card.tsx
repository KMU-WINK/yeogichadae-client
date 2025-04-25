import { Dispatch, SetStateAction, useMemo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Badge } from '@/component/ui/badge';

import { Meeting } from '@/api/schema/meeting';
import { Review } from '@/api/schema/review';
import { User } from '@/api/schema/user';

import { cn } from '@/lib/utils';

interface ReviewUserCardProps {
  meeting: Meeting;
  reviews: Review[];
  user: User;
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
}

export default function ReviewUserCard({
  meeting,
  reviews,
  user,
  selectedUser,
  setSelectedUser,
}: ReviewUserCardProps) {
  const review = useMemo(
    () => reviews.find((review) => review.target.id === user.id),
    [user, reviews],
  );

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center justify-between rounded-2xl p-4 ring transition-all hover:bg-neutral-50',
        user.id === selectedUser?.id ? 'ring-primary' : 'ring-neutral-200',
      )}
      onClick={() => setSelectedUser(user)}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{user.nickname}</span>
          <span className={cn('text-xs font-medium', review ? 'text-neutral-500' : 'text-primary')}>
            {review ? '후기 작성 완료' : '후기를 작성해주세요'}
          </span>
        </div>
      </div>

      {meeting.host.id === user.id && <Badge className="bg-primary/10 text-primary">주최자</Badge>}
    </div>
  );
}
