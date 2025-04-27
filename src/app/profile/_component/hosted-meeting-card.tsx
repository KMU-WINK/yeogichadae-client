import Link from 'next/link';

import { Button } from '@/component/ui/button';

import { Meeting } from '@/api/schema/meeting';
import { User } from '@/api/schema/user';

import MeetingCard from '@/component/meeting-card';

interface MeetingCardProps {
  user: User;
  meetings: Meeting[];
}

export default function HostedMeetingCard({ user, meetings }: MeetingCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">주최한 모임</h2>
        {meetings.length > 0 && (
          <Link href={`/profile/${user.id}/hosted`}>
            <Button variant="link" size="sm" className="text-primary h-auto">
              전체 보기
            </Button>
          </Link>
        )}
      </div>
      {meetings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {meetings.slice(0, 2).map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="bg-secondary flex items-center justify-center rounded-xl py-10 text-sm text-neutral-600">
          주최한 모임이 없습니다.
        </div>
      )}
    </div>
  );
}
