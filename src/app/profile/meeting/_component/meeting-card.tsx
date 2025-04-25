import React from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Badge } from '@/component/ui/badge';
import { Button } from '@/component/ui/button';

import { Meeting } from '@/api/schema/meeting';

import { useUserStore } from '@/store/user.store';

import { format } from 'date-fns';
import { Calendar, MapPin, MessageSquare, Star, Users } from 'lucide-react';

interface MeetingCardProps {
  meeting: Meeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const { user } = useUserStore();

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-2xl border bg-white shadow transition-all hover:shadow-md"
      onClick={() => redirect(`/meeting/${meeting.id}`)}
    >
      <div className="flex flex-col sm:flex-row">
        <Image
          src={meeting.event.image}
          alt={meeting.event.title}
          width={640}
          height={192}
          className="h-40 w-auto object-cover transition-transform group-hover:scale-101 sm:aspect-square sm:h-auto sm:w-40"
        />
        <div className="flex w-full flex-col justify-center gap-4 p-5">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="group-hover:text-primary line-clamp-1 text-base font-medium sm:text-lg">
                {meeting.title}
              </h3>
              {meeting.host.id === user?.id && (
                <Badge className="bg-primary/10 text-primary min-w-fit">주최자</Badge>
              )}
            </div>
            <p className="line-clamp-1 text-sm font-medium text-neutral-500 sm:text-base">
              {meeting.event.title}
            </p>
          </div>

          <div className="flex max-w-xl flex-wrap justify-between gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="text-primary size-4" />
              <span>{format(meeting.date, 'yyyy-MM-dd HH:mm')}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="text-primary size-4" />
              <span>{meeting.event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="text-primary size-4" />
              <span>
                {meeting.participants.length}/{meeting.maxPeople}명 참여중
              </span>
            </div>
          </div>

          {meeting.end ? (
            <Button
              variant="outline"
              className="w-fit"
              onClick={(e) => {
                e.stopPropagation();
                redirect(`/meeting/${meeting.id}/review`);
              }}
            >
              <Star className="size-4" />
              <span>리뷰 달기</span>
            </Button>
          ) : (
            <Button
              className="w-fit"
              onClick={(e) => {
                e.stopPropagation();
                redirect(`/chat?id=${meeting.id}`);
              }}
            >
              <MessageSquare className="size-4" />
              <span>채팅방</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
