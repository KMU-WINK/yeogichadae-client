import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { Button } from '@/component/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/component/ui/dialog';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';
import { User } from '@/api/schema/user';

import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';

import { useApiWithToast } from '@/hook/use-api';

interface FinishMeetingModalProps {
  meeting: Meeting;
  callback: Dispatch<SetStateAction<Meeting | undefined>>;
}

export default function FinishMeetingModal({ meeting, callback }: FinishMeetingModalProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { user } = useUserStore();
  const { closeModal } = useModalStore();

  const [users, setUsers] = useState<User[]>([]);

  const handleFinishMeeting = useCallback((meeting: Meeting, users: User[]) => {
    startApi(
      async () => {
        const { meeting: newMeeting } = await Api.Domain.Meeting.finishMeeting(
          meeting.id,
          users.map((u) => u.id),
        );
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

      <h3 className="text-sm">모임에 참석한 인원을 선택해주세요.</h3>
      <div className="flex flex-col gap-1">
        {meeting.participants
          .filter((u) => u.id !== user?.id)
          .map((user) => (
            <Button
              key={user.id}
              variant={users.find((u) => u.id === user.id) ? 'secondary' : 'outline'}
              onClick={() =>
                setUsers((prev) =>
                  prev.includes(user) ? prev.filter((u) => u.id !== user.id) : [...prev, user],
                )
              }
            >
              {user.nickname}
            </Button>
          ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeModal}>
          아니요
        </Button>
        <Button disabled={isApiProcessing} onClick={() => handleFinishMeeting(meeting, users)}>
          네
        </Button>
      </div>
    </>
  );
}
