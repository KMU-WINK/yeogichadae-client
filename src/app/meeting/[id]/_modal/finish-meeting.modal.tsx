import { Dispatch, SetStateAction, useCallback } from 'react';

import { Button } from '@/component/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/component/ui/dialog';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';

import { useModalStore } from '@/store/modal.store';

import { useApiWithToast } from '@/hook/use-api';

interface FinishMeetingModalProps {
  meeting: Meeting;
  callback: Dispatch<SetStateAction<Meeting | undefined>>;
}

export default function FinishMeetingModal({ meeting, callback }: FinishMeetingModalProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { closeModal } = useModalStore();

  const handleFinishMeeting = useCallback((meeting: Meeting) => {
    startApi(
      async () => {
        const { meeting: newMeeting } = await Api.Domain.Meeting.finishMeeting(meeting.id);
        callback(newMeeting);
      },
      {
        loading: '모임을 완료하고 있습니다.',
        success: '모임을 완료했습니다.',
        finally: closeModal,
      },
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>정말로 모임을 완료하시겠습니까?</DialogTitle>
        <DialogDescription>{meeting.title}</DialogDescription>
      </DialogHeader>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeModal}>
          아니요
        </Button>
        <Button disabled={isApiProcessing} onClick={() => handleFinishMeeting(meeting)}>
          네
        </Button>
      </div>
    </>
  );
}
