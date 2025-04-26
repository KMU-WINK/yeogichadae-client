import { Dispatch, SetStateAction, useMemo } from 'react';

import { RedirectType, redirect } from 'next/navigation';

import DelegateHostModal from '@/app/meeting/[id]/_modal/delegate-host.modal';
import DeleteMeetingModal from '@/app/meeting/[id]/_modal/delete-meeting.modal';
import FinishMeetingModal from '@/app/meeting/[id]/_modal/finish-meeting.modal';
import JoinMeetingModal from '@/app/meeting/[id]/_modal/join-meeting.modal';
import LeaveMeetingModal from '@/app/meeting/[id]/_modal/leave-meeting.modal';

import { Button } from '@/component/ui/button';

import { Meeting } from '@/api/schema/meeting';

import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';

interface MeetingOperationCardProps {
  meeting: Meeting;
  isHost: boolean;
  isParticipating: boolean;
  setMeeting: Dispatch<SetStateAction<Meeting | undefined>>;
}

export default function MeetingOperationCard({
  meeting,
  isHost,
  isParticipating,
  setMeeting,
}: MeetingOperationCardProps) {
  const { user } = useUserStore();
  const { openModal } = useModalStore();

  const satisfied = useMemo(() => {
    if (!user) return false;
    if ((meeting.minAge || meeting.maxAge) && !user.age) return false;
    if (meeting.minAge && user.age! < meeting.minAge) return false;
    if (meeting.maxAge && user.age! > meeting.maxAge) return false;
    return !(meeting.gender && user.gender !== meeting.gender);
  }, [meeting, user]);

  return (
    <div className="flex flex-col gap-2 rounded-2xl border p-6">
      <h2 className="font-medium sm:text-lg">
        모임 {isHost ? '관리' : isParticipating ? '나가기' : '참여하기'}
      </h2>
      <div className="flex flex-col gap-2">
        {isHost ? (
          <>
            <Button
              variant="default"
              className="w-full rounded-xl"
              disabled={meeting.end}
              onClick={() =>
                openModal(<FinishMeetingModal meeting={meeting} callback={setMeeting} />)
              }
            >
              모임 완료하기
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-full rounded-xl"
                disabled={meeting.end}
                onClick={() =>
                  openModal(<DelegateHostModal meeting={meeting} callback={setMeeting} />)
                }
              >
                주최자 위임하기
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl text-red-400"
                disabled={meeting.end}
                onClick={() =>
                  openModal(
                    <DeleteMeetingModal
                      meeting={meeting}
                      callback={() => redirect('/event/' + meeting.event.id, RedirectType.push)}
                    />,
                  )
                }
              >
                모임 삭제하기
              </Button>
            </div>
          </>
        ) : isParticipating ? (
          <Button
            variant="destructive"
            className="w-full rounded-xl"
            disabled={meeting.end}
            onClick={() => openModal(<LeaveMeetingModal meeting={meeting} callback={setMeeting} />)}
          >
            모임 나가기
          </Button>
        ) : meeting.participants.length >= meeting.maxPeople ? (
          <Button variant="ghost" className="w-full rounded-xl" disabled>
            모임이 꽉참
          </Button>
        ) : !satisfied ? (
          <Button variant="ghost" className="w-full rounded-xl" disabled>
            모임 조건에 부합하지 않음
          </Button>
        ) : (
          <Button
            variant="default"
            className="w-full rounded-xl"
            onClick={() => openModal(<JoinMeetingModal meeting={meeting} callback={setMeeting} />)}
          >
            모임 참여하기
          </Button>
        )}
      </div>
    </div>
  );
}
