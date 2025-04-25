'use client';

import { use, useEffect, useState } from 'react';

import Loading from '@/app/loading';
import ReviewForm from '@/app/meeting/[id]/review/_component/review-form';
import ReviewUserCard from '@/app/meeting/[id]/review/_component/review-user-card';

import TitleLayout from '@/component/layout/title';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';
import { Review } from '@/api/schema/review';
import { User } from '@/api/schema/user';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { id: meetingId } = use(props.params);

  const [isApiProcessing, startApi] = useApi();

  const { user } = useUserStore();

  const [meeting, setMeeting] = useState<Meeting>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    startApi(async () => {
      const { meeting } = await Api.Domain.Meeting.getMeeting(meetingId);
      setMeeting(meeting);

      const { reviews } = await Api.Domain.Review.getReview(meeting.id);
      setReviews(reviews);
    });
  }, [meetingId]);

  return (
    <UserGuard>
      <TitleLayout title="모임 후기" className="max-w-2xl">
        {isApiProcessing || !meeting ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border p-6">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {meeting.participants
                .filter((participant) => participant.id !== user?.id)
                .map((participant) => (
                  <ReviewUserCard
                    key={participant.id}
                    meeting={meeting}
                    reviews={reviews}
                    user={participant}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                ))}
            </div>

            {selectedUser && (
              <>
                <hr className="w-2xl" />
                <ReviewForm
                  meeting={meeting}
                  reviews={reviews}
                  setReviews={setReviews}
                  user={selectedUser}
                />
              </>
            )}
          </div>
        )}
      </TitleLayout>
    </UserGuard>
  );
}
