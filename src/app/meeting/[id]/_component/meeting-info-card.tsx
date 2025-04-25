import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/component/ui/badge';

import { Meeting } from '@/api/schema/meeting';

import { format } from 'date-fns';
import { Calendar, MapPin, Users } from 'lucide-react';

interface MeetingInfoCardProps {
  meeting: Meeting;
}

export default function MeetingInfoCard({ meeting }: MeetingInfoCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border p-6">
      <Image
        src={meeting.event.image}
        alt={meeting.event.title}
        width={400}
        height={500}
        className="h-[250px] w-fit self-center rounded-xl object-cover lg:h-[500px]"
      />

      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{meeting.title}</h3>
        <p className="text-neutral-700">{meeting.description}</p>
      </div>

      <div className="grid grid-cols-1 justify-between gap-x-4 gap-y-2 text-xs sm:grid-cols-2 sm:text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="text-primary size-5" />
          <div>
            <p className="font-medium">모임 일시</p>
            <p className="text-neutral-500">{format(meeting.date, 'yyyy-MM-dd HH:mm')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="text-primary size-5" />
          <div>
            <p className="font-medium">참여 인원</p>
            <p className="text-neutral-500">
              {meeting.participants.length}/{meeting.maxPeople}명
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-primary size-5" />
          <div>
            <p className="font-medium">장소</p>
            <Link
              href={`https://map.naver.com/v5/search/${meeting.event.latitude},${meeting.event.longitude}`}
              target="_blank"
              className="text-primary hover:underline"
            >
              {meeting.event.location}
            </Link>
          </div>
        </div>
      </div>

      {((meeting.minAge && meeting.maxAge) || meeting.gender) && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">참여 조건</h3>
          <div className="flex flex-wrap gap-1">
            {meeting.minAge && meeting.maxAge && (
              <Badge variant="outline">
                {meeting.minAge}~{meeting.maxAge}세
              </Badge>
            )}
            {meeting.gender && (
              <Badge variant="outline">{meeting.gender === 'MALE' ? '남성' : '여성'}</Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
