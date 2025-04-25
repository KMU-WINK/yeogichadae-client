import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Badge } from '@/component/ui/badge';

import { Meeting } from '@/api/schema/meeting';

interface MeetingParticipantCardProps {
  meeting: Meeting;
}

export default function MeetingParticipantCard({ meeting }: MeetingParticipantCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border p-6">
      <div className="flex flex-col">
        <h2 className="font-medium sm:text-lg">참여 멤버</h2>
        <p className="text-xs text-neutral-500 sm:text-sm">
          현재 {meeting.participants.length}명이 참여 중입니다.
        </p>
      </div>

      <div className="flex flex-col gap-0.5">
        {meeting.participants.map((participant) => (
          <Link key={participant.id} href={`/profile/${participant.id}`}>
            <div className="hover:bg-secondary flex gap-3 rounded-2xl px-4 py-2.5">
              <Avatar className="size-10">
                <AvatarImage src={participant.avatar} />
                <AvatarFallback>{participant.nickname.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex w-full items-center justify-between">
                <span className="font-medium">{participant.nickname}</span>
                {participant.id === meeting.host.id && (
                  <Badge className="bg-primary/10 text-primary">주최자</Badge>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
