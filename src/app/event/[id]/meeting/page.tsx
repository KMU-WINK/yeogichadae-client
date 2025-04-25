'use client';

import { use, useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import FilterPopover from '@/app/event/[id]/meeting/_component/filter-popover';
import { MeetingBadge } from '@/app/event/[id]/meeting/_component/meeting-badge';
import Loading from '@/app/loading';

import TitleLayout from '@/component/layout/title';

import { AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Button } from '@/component/ui/button';

import Api from '@/api';
import { Event } from '@/api/schema/event';
import { Meeting } from '@/api/schema/meeting';
import { Gender } from '@/api/schema/user';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';

import { Avatar } from '@radix-ui/react-avatar';
import { format } from 'date-fns';
import { Calendar, Plus, Users } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { id: eventId } = use(props.params);

  const [isApiProcessing, startApi] = useApi();

  const { user } = useUserStore();

  const [event, setEvent] = useState<Event>();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const [minAge, setMinAge] = useState(15);
  const [maxAge, setMaxAge] = useState(70);
  const [gender, setGender] = useState<Gender>();

  const applyFilter = useCallback(() => {
    if (!event) return;

    startApi(async () => {
      const { meetings } = await Api.Domain.Meeting.getMeetings(event.id, minAge, maxAge, gender);
      setMeetings(meetings);
    });
  }, [event, minAge, maxAge, gender]);

  useEffect(() => {
    startApi(async () => {
      const { event } = await Api.Domain.Event.getEvent(eventId);
      setEvent(event);

      const { meetings } = await Api.Domain.Meeting.getMeetings(event.id, minAge, maxAge, gender);
      setMeetings(meetings);
    });
  }, [eventId]);

  return (
    <TitleLayout
      title="모임 목록"
      button={
        !isApiProcessing &&
        event && (
          <>
            <FilterPopover
              minAge={minAge}
              maxAge={maxAge}
              gender={gender}
              setMinAge={setMinAge}
              setMaxAge={setMaxAge}
              setGender={setGender}
              applyFilter={applyFilter}
            />

            {user && (
              <>
                <Link href={`/event/${event.id}/meeting/create`} className="hidden gap-2 sm:flex">
                  <Button className="rounded-xl shadow-md transition-all hover:shadow-lg">
                    <Plus />
                    모임 만들기
                  </Button>
                </Link>

                <div className="fixed right-0 bottom-4 z-50 px-4 py-2 sm:hidden">
                  <Link href={`/event/${event.id}/meeting/create`} className="flex sm:hidden">
                    <Button className="rounded-xl shadow-md transition-all hover:shadow-lg">
                      <Plus />
                      모임 만들기
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </>
        )
      }
    >
      {isApiProcessing || !event ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-4">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <Link key={meeting.id} href={`/meeting/${meeting.id}`}>
                <div className="flex justify-between rounded-2xl border p-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <h3 className="font-medium sm:text-lg">{meeting.title}</h3>
                      <MeetingBadge meeting={meeting} />
                    </div>

                    <p className="line-clamp-2 text-sm text-neutral-500">{meeting.description}</p>

                    <div className="grid max-w-2xl grid-cols-1 gap-2 text-xs sm:grid-cols-2 sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-primary size-4" />
                        <span className="text-neutral-600">
                          {format(meeting.date, 'yyyy년 MM월 dd일 HH시 mm분')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="text-primary size-4" />
                        <span className="text-neutral-600">
                          {meeting.participants.length}/{meeting.maxPeople} 명 참여중
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1">
                      <Avatar className="size-8">
                        <AvatarImage src={meeting.host.avatar} />
                        <AvatarFallback>{meeting.host.nickname.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{meeting.host.nickname}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center py-10 text-sm text-neutral-600">
              모임이 없습니다.
            </div>
          )}
        </div>
      )}
    </TitleLayout>
  );
}
