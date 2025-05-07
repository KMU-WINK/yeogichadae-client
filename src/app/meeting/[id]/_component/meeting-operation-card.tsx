import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import DelegateHostModal from '@/app/meeting/[id]/_modal/delegate-host.modal';
import DeleteMeetingModal from '@/app/meeting/[id]/_modal/delete-meeting.modal';
import FinishMeetingModal from '@/app/meeting/[id]/_modal/finish-meeting.modal';
import JoinMeetingModal from '@/app/meeting/[id]/_modal/join-meeting.modal';
import LeaveMeetingModal from '@/app/meeting/[id]/_modal/leave-meeting.modal';

import { Button } from '@/component/ui/button';

import { Meeting } from '@/api/schema/meeting';

import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';

import { boostAmount, tossPayments } from '@/lib/toss.sdk';

import { addDays, intervalToDuration, isBefore } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

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

  const [remainBooster, setRemainBooster] = useState<string>();

  const handleBoostMeeting = useCallback(
    (meeting: Meeting) => {
      const payment = tossPayments.payment({ customerKey: user?.id ?? 'GUEST' });

      payment
        .requestPayment({
          method: 'CARD',
          amount: {
            currency: 'KRW',
            value: boostAmount,
          },
          orderName: '모임 부스트',
          orderId: uuidv4(),
          customerName: user?.nickname ?? 'GUEST',
          customerEmail: user?.email ?? 'guest@example.com',
          successUrl: `${window.location.origin}/meeting/${meeting.id}/boost/success`,
          failUrl: `${window.location.origin}/meeting/${meeting.id}`,
        })
        .then();
    },
    [user],
  );

  useEffect(() => {
    if (!meeting || !meeting.boostedAt) return;

    const interval = setInterval(func, 1000);
    func();

    function func() {
      const now = new Date();
      const boostedAtDate = new Date(meeting.boostedAt!);

      const endTime = addDays(boostedAtDate, 1);

      if (isBefore(endTime, now)) {
        setRemainBooster(undefined);
        clearInterval(interval);
        return;
      }

      const {
        hours = 0,
        minutes = 0,
        seconds = 0,
      } = intervalToDuration({
        start: now,
        end: endTime,
      });

      const formattedTime = [hours, minutes, seconds]
        .map((unit) => String(unit).padStart(2, '0'))
        .join(':');

      setRemainBooster(formattedTime);
    }

    return () => clearInterval(interval);
  }, [meeting]);

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
            <Button
              variant="secondary"
              className="w-full rounded-xl"
              disabled={!!remainBooster}
              onClick={() => handleBoostMeeting(meeting)}
            >
              {remainBooster ? remainBooster : '모임 부스트'}
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
                onClick={() => openModal(<DeleteMeetingModal meeting={meeting} />)}
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
            onClick={() => openModal(<JoinMeetingModal meeting={meeting} />)}
          >
            모임 참여하기
          </Button>
        )}
      </div>
    </div>
  );
}
