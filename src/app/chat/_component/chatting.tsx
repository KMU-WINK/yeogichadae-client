import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Button } from '@/component/ui/button';
import { Input } from '@/component/ui/input';

import Api from '@/api';
import { Room } from '@/api/dto/chat';
import { Chat } from '@/api/schema/chat';

import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';
import useMobile from '@/hook/use-mobile';

import { cn } from '@/lib/utils';

import { format, isSameMinute } from 'date-fns';
import { ArrowLeft, Info, MessageSquare } from 'lucide-react';

interface ChattingProps {
  room: Room;
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[] | undefined>>;
}

export default function Chatting({ room, chats, setChats }: ChattingProps) {
  const isMobile = useMobile();
  const [isApiProcessing, startApi] = useApi();

  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useUserStore();

  const handleSend = useCallback(() => {
    if (!inputRef.current?.value) return;

    startApi(async () => {
      await Api.Domain.Chat.sendChat(room.meeting.id, { content: inputRef.current!.value.trim() });
      inputRef.current!.value = '';
    });
  }, [room.meeting, inputRef]);

  useEffect(() => {
    const sse = Api.Domain.Chat.openSseTunnel(room.meeting.id);

    sse.addEventListener('send_chat', (e) => {
      const chat = JSON.parse(e.data) as Chat;
      setChats((prev) => [...(prev || []), chat]);
    });

    return () => sse.close();
  }, [room.meeting]);

  return (
    <>
      <div className="flex items-center justify-between p-3 sm:pl-6">
        <div className="flex gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => redirect('/chat')}>
              <ArrowLeft className="size-4" />
            </Button>
          )}
          <div className="flex flex-col">
            <div className="font-medium">{room.meeting.title}</div>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="line-clamp-1">{room.meeting.event.title}</span>
              <span>•</span>
              <span className="min-w-10">
                {room.meeting.participants.length}/{room.meeting.maxPeople}명
              </span>
            </div>
          </div>
        </div>
        <Link href={`/meeting/${room.meeting.id}`}>
          <Button variant="ghost" size="icon">
            <Info />
          </Button>
        </Link>
      </div>

      <div className="flex h-full flex-col gap-1 overflow-y-auto border-y p-4">
        {chats.map((chat, index) => {
          const prev: Chat | undefined = chats[index - 1];
          const next: Chat | undefined = chats[index + 1];

          const isMine = chat.user.id === user?.id;

          const isTopMargin = prev ? !isSameMinute(chat.createdAt, prev.createdAt) : true;

          const showAvatarAndName = prev
            ? chat.user.id !== prev.user.id || !isSameMinute(chat.createdAt, prev.createdAt)
            : true;

          const showTime = next
            ? chat.user.id !== next.user.id || !isSameMinute(chat.createdAt, next.createdAt)
            : true;

          return (
            <div
              key={chat.id}
              ref={index === chats.length - 1 ? (el) => el?.scrollIntoView() : undefined}
              className={cn(
                'flex w-full gap-1',
                isMine && 'justify-end self-end',
                isTopMargin && 'mt-3',
              )}
            >
              {isMine ? (
                <>
                  {showTime && (
                    <p className="self-end text-xs text-neutral-500">
                      {format(chat.createdAt, 'HH:mm')}
                    </p>
                  )}
                  <p className="bg-primary text-primary-foreground max-w-[60%] rounded-2xl rounded-tr-none px-4 py-2 text-sm break-all">
                    {chat.content}
                  </p>
                </>
              ) : (
                <>
                  {showAvatarAndName ? (
                    <Link href={`/profile/${chat.user.id}`}>
                      <Avatar>
                        <AvatarImage src={chat.user.avatar} />
                        <AvatarFallback>{chat.user.nickname.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                  ) : (
                    <div className="min-w-10" />
                  )}

                  <div className="flex max-w-[60%] flex-col gap-1">
                    {showAvatarAndName && (
                      <Link href={`/profile/${chat.user.id}`}>
                        <p className="text-xs">{chat.user.nickname}</p>
                      </Link>
                    )}

                    <p className="bg-secondary rounded-2xl rounded-tl-none px-4 py-2 text-sm break-all">
                      {chat.content}
                    </p>
                  </div>

                  {showTime && (
                    <p className="self-end text-xs text-neutral-500">
                      {format(chat.createdAt, 'HH:mm')}
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            className="rounded-xl"
            placeholder="메시지를 입력하세요"
            onKeyDown={(e) => {
              if (e.key !== 'Enter' || e.shiftKey) return;
              if (isApiProcessing) return;

              e.preventDefault();
              handleSend();
            }}
          />
          <Button disabled={isApiProcessing} onClick={handleSend} className="rounded-xl">
            <MessageSquare />
            전송
          </Button>
        </div>
      </div>
    </>
  );
}
