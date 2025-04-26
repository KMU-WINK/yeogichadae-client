'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import Chatting from '@/app/chat/_component/chatting';
import RoomCard from '@/app/chat/_component/room-card';
import Loading, { Spinner } from '@/app/loading';

import Api from '@/api';
import { Room } from '@/api/dto/chat';
import { Chat } from '@/api/schema/chat';

import { useApi } from '@/hook/use-api';
import useMobile from '@/hook/use-mobile';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function Page() {
  const meetingId = useSearchParams().get('id');

  const isMobile = useMobile();

  const [isApiProcessing, startApi] = useApi();
  const [rooms, setRooms] = useState<Room[]>();

  const [isApiProcessing2, startApi2] = useApi();
  const [chats, setChats] = useState<Chat[]>();

  useEffect(() => {
    startApi(async () => {
      const { rooms } = await Api.Domain.Chat.getRoomList();
      setRooms(
        rooms.sort((a, b) => {
          if (a.last && b.last)
            return new Date(b.last.createdAt).getTime() - new Date(a.last.createdAt).getTime();
          if (a.last) return -1;
          if (b.last) return 1;

          return 0;
        }),
      );
    });
  }, []);

  useEffect(() => {
    const sse = Api.Domain.Chat.openSseTunnel();

    sse.addEventListener('send_chat', (e) => {
      const chat = JSON.parse(e.data) as Chat;

      if (chat.meeting.id === meetingId) {
        setChats((prev) => [...(prev || []), chat]);
      }

      setRooms((prev) =>
        prev
          ? prev
              .map((room) =>
                room.meeting.id === chat.meeting.id
                  ? {
                      ...room,
                      last: chat,
                      unread: room.meeting.id === meetingId ? room.unread : room.unread + 1,
                    }
                  : room,
              )
              .sort((a, b) => {
                if (a.last && b.last)
                  return (
                    new Date(b.last.createdAt).getTime() - new Date(a.last.createdAt).getTime()
                  );
                if (a.last) return -1;
                if (b.last) return 1;

                return 0;
              })
          : undefined,
      );
    });

    return () => sse.close();
  }, [meetingId]);

  useEffect(() => {
    if (!meetingId) return;

    startApi2(async () => {
      const { chats } = await Api.Domain.Chat.getChatInfo(meetingId);
      setChats(chats);

      await Api.Domain.Chat.readAllChat(meetingId);
      setRooms((prev) =>
        prev
          ? prev.map((r) => (r.meeting.id === chats[0]?.meeting.id ? { ...r, unread: 0 } : r))
          : undefined,
      );
    });
  }, [meetingId]);

  useEffect(() => {
    if (!chats || chats.length === 0) return;

    (async () => {
      await Api.Domain.Chat.readChat(chats.at(-1)!.id);
      setRooms((prev) =>
        prev
          ? prev.map((r) => (r.meeting.id === meetingId ? { ...r, unread: r.unread - 1 } : r))
          : undefined,
      );
    })();
  }, [meetingId, chats]);

  if (isApiProcessing || !rooms) return <Loading />;

  return (
    <motion.div
      className="container mx-auto grid h-[calc(100dvh-56px-16px)] max-w-screen-xl grid-cols-1 gap-4 sm:h-[calc(100dvh-64px-32px)] sm:grid-cols-3"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {(!isMobile || !meetingId) && (
        <div className="flex flex-col overflow-clip rounded-2xl border sm:col-span-1">
          {rooms.map((room) => (
            <RoomCard key={room.meeting.id} room={room} meetingId={meetingId} />
          ))}
        </div>
      )}

      {(!isMobile || meetingId) && (
        <div className="flex flex-col overflow-hidden rounded-xl border sm:col-span-2">
          {isApiProcessing2 ? (
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          ) : meetingId && chats ? (
            <Chatting room={rooms.find((room) => room.meeting.id === meetingId)!} chats={chats} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <MessageSquare className="size-10" />
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium">채팅방을 선택해주세요</h3>
                <p className="text-neutral-500">왼쪽 목록에서 채팅방을 선택해주세요</p>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
