'use client';

import React, { use, useEffect, useState } from 'react';

import TitleLayout from '@/component/layout/title';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';

import { useApi } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';

import MeetingCard from '@/component/meeting-card';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const { id: userId } = use(params);

  const [isApiProcessing, startApi] = useApi();

  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    startApi(async () => {
      const { hostedMeetings } = await Api.Domain.User.getOtherDetailInfo(userId);
      setMeetings(hostedMeetings);
    });
  }, [userId]);

  return (
    <UserGuard>
      <TitleLayout title="주최한 모임" loading={isApiProcessing}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </TitleLayout>
    </UserGuard>
  );
}
