'use client';

import { use, useEffect, useState } from 'react';

import HostedMeetingCard from '@/app/profile/_component/hosted-meeting-card';
import ProfileCard from '@/app/profile/_component/profile-card';
import ReviewCard from '@/app/profile/_component/review-card';

import TitleLayout from '@/component/layout/title';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';
import { Review } from '@/api/schema/review';
import { User } from '@/api/schema/user';

import { useApi } from '@/hook/use-api';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const { id: userId } = use(params);

  const [isApiProcessing, startApi] = useApi();

  const [user, setUser] = useState<User>();
  const [bookmarks, setBookmarks] = useState<number>(0);
  const [joinedMeetings, setJoinedMeetings] = useState<number>(0);
  const [hostedMeetings, setHostedMeetings] = useState<Meeting[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    startApi(async () => {
      const response = await Api.Domain.User.getOtherDetailInfo(userId);

      setUser(response.user);
      setBookmarks(response.bookmarks);
      setJoinedMeetings(response.joinedMeetings);
      setHostedMeetings(response.hostedMeetings);
      setReviews(response.reviews);
      setScore(response.score);
    });
  }, [userId]);

  return (
    <TitleLayout title="프로필" loading={isApiProcessing || !user}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-1">
          <ProfileCard
            user={user!}
            score={score}
            bookmarks={bookmarks}
            joinedMeetings={joinedMeetings}
            hostedMeetings={hostedMeetings}
            isMyAccount={false}
          />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2 lg:gap-6">
          <ReviewCard reviews={reviews} isMyAccount={false} />
          <HostedMeetingCard meetings={hostedMeetings} />
        </div>
      </div>
    </TitleLayout>
  );
}
