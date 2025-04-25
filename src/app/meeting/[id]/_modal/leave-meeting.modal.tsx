import { Dispatch, SetStateAction, useCallback } from 'react';

import { Button } from '@/component/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/component/ui/dialog';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';

import { useModalStore } from '@/store/modal.store';

import { useApiWithToast } from '@/hook/use-api';

interface LeaveMeetingModalProps {
  meeting: Meeting;
  callback: Dispatch<SetStateAction<Meeting | undefined>>;
}

export default function LeaveMeetingModal({ meeting, callback }: LeaveMeetingModalProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { closeModal } = useModalStore();

  const handleLeaveMeeting = useCallback((meeting: Meeting) => {
    startApi(
      async () => {
        const { meeting: newMeeting } = await Api.Domain.Meeting.leaveMeeting(meeting.id);
        callback(newMeeting);
      },
      {
        loading: '모임에서 나가고 있습니다.',
        success: '모임에 나왔습니다.',
        finally: closeModal,
      },
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>모임에서 나가시겠습니까?</DialogTitle>
        <DialogDescription>{meeting.title}</DialogDescription>
      </DialogHeader>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeModal}>
          아니요
        </Button>
        <Button
          variant="destructive"
          disabled={isApiProcessing}
          onClick={() => handleLeaveMeeting(meeting)}
        >
          네
        </Button>
      </div>
    </>
  );
}
