import { useCallback } from 'react';

import { RedirectType, redirect } from 'next/navigation';

import { Button } from '@/component/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/component/ui/dialog';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';

import { useModalStore } from '@/store/modal.store';

import { useApiWithToast } from '@/hook/use-api';

interface DeleteMeetingModalProps {
  meeting: Meeting;
}

export default function DeleteMeetingModal({ meeting }: DeleteMeetingModalProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { closeModal } = useModalStore();

  const handleDeleteMeeting = useCallback((meeting: Meeting) => {
    startApi(
      async () => {
        await Api.Domain.Meeting.deleteMeeting(meeting.id);
      },
      {
        loading: '모임을 삭제하고 있습니다.',
        success: '모임을 삭제했습니다.',
        finally: () => {
          closeModal();
          redirect('/event/' + meeting.event.id, RedirectType.push);
        },
      },
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>정말로 모임을 삭제하시겠습니까?</DialogTitle>
        <DialogDescription>{meeting.title}</DialogDescription>
      </DialogHeader>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeModal}>
          아니요
        </Button>
        <Button
          variant="destructive"
          disabled={isApiProcessing}
          onClick={() => handleDeleteMeeting(meeting)}
        >
          네
        </Button>
      </div>
    </>
  );
}
