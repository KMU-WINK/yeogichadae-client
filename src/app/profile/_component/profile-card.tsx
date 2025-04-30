import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Badge } from '@/component/ui/badge';

import { Event } from '@/api/schema/event';
import { Meeting } from '@/api/schema/meeting';
import { Gender, User } from '@/api/schema/user';

import { format } from 'date-fns';
import { MapPin, Star, UserIcon } from 'lucide-react';
import { districtLabel } from '@/lib/district-label';

interface ProfileCardProps {
  user: User;
  score: number;
  bookmarks: Event[] | number;
  joinedMeetings: Meeting[] | number;
  hostedMeetings: Meeting[] | number;
  isMyAccount: boolean;
}

export default function ProfileCard({
  user,
  score,
  bookmarks,
  joinedMeetings,
  hostedMeetings,
  isMyAccount,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border p-6">
      <Avatar className="size-28">
        <AvatarImage src={user.avatar}/>
        <AvatarFallback className="text-2xl">{user.nickname.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-0.5">
        <h2 className="text-2xl font-bold">{user.nickname}</h2>
        {isMyAccount && <p className="text-base text-neutral-600">{user.email}</p>}
        <p className="text-sm text-neutral-500">가입일: {format(user.createdAt, 'yyyy-MM-dd')}</p>
      </div>

      <Badge className="bg-primary/10 text-primary gap-1">
        <Star className="fill-primary size-3 sm:size-4" />
        <span className="text-sm font-medium sm:text-base">{score.toFixed(1)}</span>
      </Badge>

      <div className="flex w-full justify-around">
        <div className="flex items-center gap-1">
          <MapPin className="text-primary size-4" />
          {districtLabel(user.district)}
        </div>
        <div className="flex items-center gap-1">
          <UserIcon className="text-primary size-4" />
          {user.gender === Gender.MALE ? '남성' : '여성'}, {user.age}세
        </div>
      </div>

      <hr className="w-full" />

      <div className="flex w-full justify-around">
        <div className="flex flex-col items-center rounded-xl p-2">
          <div className="text-primary text-2xl font-bold">
            {Array.isArray(bookmarks) ? bookmarks.length : bookmarks}
          </div>
          <div className="text-xs text-neutral-500">찜한 행사</div>
        </div>
        <div className="flex flex-col items-center rounded-xl p-2">
          <div className="text-primary text-2xl font-bold">
            {Array.isArray(joinedMeetings) ? joinedMeetings.length : joinedMeetings}
          </div>
          <div className="text-xs text-neutral-500">참여 모임</div>
        </div>
        <div className="flex flex-col items-center rounded-xl p-2">
          <div className="text-primary text-2xl font-bold">
            {Array.isArray(hostedMeetings) ? hostedMeetings.length : hostedMeetings}
          </div>
          <div className="text-xs text-neutral-500">주최 모임</div>
        </div>
      </div>
    </div>
  );
}
