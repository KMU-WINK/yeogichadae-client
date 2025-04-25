'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import Loading from '@/app/loading';
import BookmarkCard from '@/app/profile/_component/bookmark-card';
import HostedMeetingCard from '@/app/profile/_component/hosted-meeting-card';
import ProfileCard from '@/app/profile/_component/profile-card';
import ReviewCard from '@/app/profile/_component/review-card';

import TitleLayout from '@/component/layout/title';

import { Button } from '@/component/ui/button';

import Api from '@/api';
import { Event } from '@/api/schema/event';
import { Meeting } from '@/api/schema/meeting';
import { Review } from '@/api/schema/review';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';

import { Edit } from 'lucide-react';

export default function Page() {
  const [isApiProcessing, startApi] = useApi();

  const { user } = useUserStore();
  const [bookmarks, setBookmarks] = useState<Event[]>([]);
  const [joinedMeetings, setJoinedMeetings] = useState<number>(0);
  const [hostedMeetings, setHostedMeetings] = useState<Meeting[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    startApi(async () => {
      const response = await Api.Domain.User.getMyDetailInfo();

      setBookmarks(response.bookmarks);
      setJoinedMeetings(response.joinedMeetings);
      setHostedMeetings(response.hostedMeetings);
      setReviews(response.reviews);
      setScore(response.score);
    });
  }, [user]);

  return (
    <UserGuard>
      <TitleLayout
        title="프로필"
        button={
          <Link href="/profile/edit">
            <Button>
              <Edit />
              수정
            </Button>
          </Link>
        }
      >
        {isApiProcessing ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-1">
              <ProfileCard
                user={user!}
                score={score}
                bookmarks={bookmarks}
                joinedMeetings={joinedMeetings}
                hostedMeetings={hostedMeetings}
                isMyAccount={true}
              />
            </div>

            <div className="flex flex-col gap-4 lg:col-span-2 lg:gap-6">
              <ReviewCard reviews={reviews} isMyAccount={true} />
              <HostedMeetingCard meetings={hostedMeetings} />
              <BookmarkCard bookmarks={bookmarks} />
            </div>
          </div>
        )}
      </TitleLayout>
    </UserGuard>
  );
}
