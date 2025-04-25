import { useCallback } from 'react';

import { Badge } from '@/component/ui/badge';

import { Meeting } from '@/api/schema/meeting';
import { Gender } from '@/api/schema/user';

import { useUserStore } from '@/store/user.store';

interface MeetingBadgeProps {
  meeting: Meeting;
}

export function MeetingBadge({ meeting }: MeetingBadgeProps) {
  const { user } = useUserStore();

  const satisfied = useCallback(
    (meeting: Meeting) => {
      if (!user) return true;
      if ((meeting.minAge || meeting.maxAge) && !user.age) return false;
      if (meeting.minAge && user.age! < meeting.minAge) return false;
      if (meeting.maxAge && user.age! > meeting.maxAge) return false;
      return !(meeting.gender && user.gender !== meeting.gender);
    },
    [user],
  );

  return (
    <div className="flex gap-1">
      <Badge
        className={
          !satisfied(meeting) && !meeting.end
            ? 'border-amber-200 bg-amber-50 text-xs text-amber-700'
            : meeting.end
              ? 'bg-gray-100 text-gray-700'
              : 'bg-emerald-100 text-emerald-700'
        }
      >
        {!satisfied(meeting) && !meeting.end ? '참여 불가' : meeting.end ? '종료됨' : '모집중'}
      </Badge>

      {meeting.minAge && meeting.maxAge && (
        <Badge variant="outline">
          {meeting.minAge}~{meeting.maxAge}세
        </Badge>
      )}

      {meeting.gender && (
        <Badge variant="outline">{meeting.gender === Gender.MALE ? '남성' : '여성'}만</Badge>
      )}
    </div>
  );
}
