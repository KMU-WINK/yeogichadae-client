import { Dispatch, SetStateAction, useCallback } from 'react';

import { Button } from '@/component/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/component/ui/dialog';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';

import { useModalStore } from '@/store/modal.store';

import { useApiWithToast } from '@/hook/use-api';

interface JoinMeetingModalProps {
  meeting: Meeting;
  callback: Dispatch<SetStateAction<Meeting | undefined>>;
}

export default function JoinMeetingModal({ meeting, callback }: JoinMeetingModalProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { closeModal } = useModalStore();

  const handleJoinMeeting = useCallback((meeting: Meeting) => {
    startApi(
      async () => {
        const { meeting: newMeeting } = await Api.Domain.Meeting.joinMeeting(meeting.id);
        callback(newMeeting);
      },
      {
        loading: '모임에 참여하고 있습니다.',
        success: '모임에 참여했습니다.',
        finally: closeModal,
      },
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>모임에 참여하시겠습니까?</DialogTitle>
        <DialogDescription>{meeting.title}</DialogDescription>
      </DialogHeader>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeModal}>
          아니요
        </Button>
        <Button disabled={isApiProcessing} onClick={() => handleJoinMeeting(meeting)}>
          네
        </Button>
      </div>
    </>
  );
}
