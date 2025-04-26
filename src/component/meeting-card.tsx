import Image from 'next/image';
import { RedirectType, redirect } from 'next/navigation';

import { Meeting } from '@/api/schema/meeting';

import { format } from 'date-fns';

interface MeetingCardProps {
  meeting: Meeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div
      className="group flex cursor-pointer flex-col overflow-clip rounded-2xl border bg-white shadow"
      onClick={() => redirect(`/meeting/${meeting.id}`, RedirectType.push)}
    >
      <Image
        src={meeting.event.image}
        alt={meeting.event.title}
        width={640}
        height={160}
        className="h-34 object-cover transition-transform group-hover:scale-101 sm:h-40"
      />

      <div className="flex flex-col px-6 py-4">
        <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
          {meeting.title}
        </h3>
        <p className="line-clamp-1 text-sm text-neutral-500">
          {format(meeting.date, 'yyyy-MM-dd')}
        </p>
      </div>
    </div>
  );
}
