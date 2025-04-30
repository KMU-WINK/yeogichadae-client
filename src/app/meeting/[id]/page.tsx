'use client';

import { use, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';

import MeetingInfoCard from '@/app/meeting/[id]/_component/meeting-info-card';
import MeetingOperationCard from '@/app/meeting/[id]/_component/meeting-operation-card';
import MeetingParticipantCard from '@/app/meeting/[id]/_component/meeting-participant-card';

import TitleLayout from '@/component/layout/title';

import { Button } from '@/component/ui/button';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';
import useMobile from '@/hook/use-mobile';

import { Info, MessageSquare, Star } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { id: meetingId } = use(props.params);

  const isMobile = useMobile();
  const [isApiProcessing, startApi] = useApi();

  const { user } = useUserStore();

  const [meeting, setMeeting] = useState<Meeting>();

  const isHost = useMemo(() => (meeting ? meeting.host.id === user?.id : false), [user, meeting]);
  const isParticipating = useMemo(
    () => (meeting ? !!meeting.participants.find((u) => u.id === user?.id) : false),
    [user, meeting],
  );

  useEffect(() => {
    startApi(async () => {
      const { meeting } = await Api.Domain.Meeting.getMeeting(meetingId);
      setMeeting(meeting);
    });
  }, [meetingId]);

  return (
    <TitleLayout
      title="모임 정보"
      loading={isApiProcessing || !meeting}
      button={
        <>
          <Link href={`/event/${meeting?.event.id}`}>
            <Button size={isMobile ? 'icon' : 'default'} variant="outline">
              <Info />
              <span className="hidden sm:block">행사 정보</span>
            </Button>
          </Link>
          {meeting?.end && (
            <Link href={`/meeting/${meeting?.id}/review`}>
              <Button size={isMobile ? 'icon' : 'default'} variant="outline">
                <Star />
                <span className="hidden sm:block">리뷰</span>
              </Button>
            </Link>
          )}
          {isParticipating && (
            <Link href={`/chat?id=${meeting?.id}`}>
              <Button size={isMobile ? 'icon' : 'default'} variant="default">
                <MessageSquare />
                <span className="hidden sm:block">채팅방</span>
              </Button>
            </Link>
          )}
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2">
          <MeetingInfoCard meeting={meeting!} />
        </div>

        <div className="flex flex-col gap-4 lg:gap-6">
          <MeetingParticipantCard meeting={meeting!} />
          {user && (
            <MeetingOperationCard
              meeting={meeting!}
              isHost={isHost}
              isParticipating={isParticipating}
              setMeeting={setMeeting}
            />
          )}
        </div>
      </div>
    </TitleLayout>
  );
}
