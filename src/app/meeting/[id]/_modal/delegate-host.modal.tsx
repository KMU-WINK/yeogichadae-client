import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { Button } from '@/component/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/component/ui/dialog';

import Api from '@/api';
import { Meeting } from '@/api/schema/meeting';
import { User } from '@/api/schema/user';

import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';

import { useApiWithToast } from '@/hook/use-api';

interface DelegateHostModalProps {
  meeting: Meeting;
  callback: Dispatch<SetStateAction<Meeting | undefined>>;
}

export default function DelegateHostModal({ meeting, callback }: DelegateHostModalProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { user } = useUserStore();
  const { closeModal } = useModalStore();

  const [selectedUser, setSelectedUser] = useState<User>();

  const handleDelegateHost = useCallback((meeting: Meeting, user: User) => {
    startApi(
      async () => {
        const { meeting: newMeeting } = await Api.Domain.Meeting.delegateHost(meeting.id, user.id);
        callback(newMeeting);
      },
      {
        loading: '주최자를 위임하고 있습니다.',
        success: '주최자를 위임했습니다.',
        finally: closeModal,
      },
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>누구에게 주최자를 위임하시겠습니까?</DialogTitle>
        <DialogDescription>{meeting.title}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-1">
        {meeting.participants
          .filter((u) => u.id !== user?.id)
          .map((user) => (
            <Button
              key={user.id}
              variant={user.id === selectedUser?.id ? 'secondary' : 'outline'}
              onClick={() => setSelectedUser(user)}
            >
              {user.nickname}
            </Button>
          ))}
      </div>

      <Button
        disabled={isApiProcessing || !selectedUser}
        onClick={() => handleDelegateHost(meeting, selectedUser!)}
      >
        위임하기
      </Button>
    </>
  );
}
