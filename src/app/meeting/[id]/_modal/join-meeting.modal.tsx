import { useCallback } from 'react';

import { Button } from '@/component/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/component/ui/dialog';

import { Meeting } from '@/api/schema/meeting';

import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';

import { depositAmount, tossPayments } from '@/lib/toss.sdk';

import { v4 as uuidv4 } from 'uuid';

interface JoinMeetingModalProps {
  meeting: Meeting;
}

export default function JoinMeetingModal({ meeting }: JoinMeetingModalProps) {
  const { user } = useUserStore();

  const { closeModal } = useModalStore();

  const handleJoinMeeting = useCallback(
    (meeting: Meeting) => {
      closeModal();

      const payment = tossPayments.payment({ customerKey: user?.id ?? 'GUEST' });

      payment
        .requestPayment({
          method: 'CARD',
          amount: {
            currency: 'KRW',
            value: depositAmount,
          },
          orderName: '모임 참가 보증금',
          orderId: uuidv4(),
          customerName: user?.nickname ?? 'GUEST',
          customerEmail: user?.email ?? 'guest@example.com',
          successUrl: `${window.location.origin}/meeting/${meeting.id}/join/success`,
          failUrl: `${window.location.origin}/meeting/${meeting.id}`,
        })
        .then();
    },
    [user],
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>모임에 참여하시겠습니까?</DialogTitle>
        <DialogDescription>{meeting.title}</DialogDescription>
      </DialogHeader>

      <p className="text-sm text-neutral-600">
        모임 참여 시 노쇼 방지를 위해 보증금을 결제합니다.
        <br />
        보증금은 모임이 성공적으로 종료되면 다시 반환됩니다.
      </p>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeModal}>
          아니요
        </Button>
        <Button onClick={() => handleJoinMeeting(meeting)}>네</Button>
      </div>
    </>
  );
}
