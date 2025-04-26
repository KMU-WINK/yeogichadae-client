'use client';

import React, { useEffect, useState } from 'react';

import MeetingCard from '@/app/profile/meeting/_component/meeting-card';

import TitleLayout from '@/component/layout/title';

import { Tabs, TabsList, TabsTrigger } from '@/component/ui/tabs';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';

type TabValue = 'active' | 'previous';

export default function Page() {
  const [isApiProcessing, startApi] = useApi();

  const { user } = useUserStore();

  const [tab, setTab] = useState<TabValue>('active');
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    if (!user) return;

    startApi(async () => {
      const { meetings } = await Api.Domain.Meeting.getMyMeetings(tab === 'active');
      setMeetings(meetings);
    });
  }, [user, tab]);

  return (
    <UserGuard>
      <TitleLayout
        title="내 모임"
        loading={isApiProcessing}
        button={
          <Tabs value={tab} onValueChange={(value) => setTab(value as TabValue)}>
            <TabsList className="h-auto">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-primary cursor-pointer px-4 py-2 data-[state=active]:text-white"
              >
                현재 모임
              </TabsTrigger>
              <TabsTrigger
                value="previous"
                className="data-[state=active]:bg-primary cursor-pointer px-4 py-2 data-[state=active]:text-white"
              >
                과거 모임
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
      >
        <div className="flex flex-col gap-4">
          {meetings.length > 0 ? (
            meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)
          ) : (
            <p className="py-8 text-center text-neutral-500 sm:py-16">모임이 없습니다</p>
          )}
        </div>
      </TitleLayout>
    </UserGuard>
  );
}
