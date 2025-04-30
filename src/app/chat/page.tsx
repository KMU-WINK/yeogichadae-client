'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import Chatting from '@/app/chat/_component/chatting';
import RoomCard from '@/app/chat/_component/room-card';
import { Spinner } from '@/app/loading';

import Api from '@/api';
import { Chat } from '@/api/schema/chat';

import { useChatStore } from '@/store/chat.store';
import { useUserStore } from '@/store/user.store';

import { useApi } from '@/hook/use-api';
import useMobile from '@/hook/use-mobile';

import UserGuard from '@/lib/guard/user.guard';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function Page() {
  const meetingId = useSearchParams().get('id');

  const isMobile = useMobile();

  const { user } = useUserStore();
  const { rooms, readRoom, readAllRoom } = useChatStore();

  const [isApiProcessing, startApi] = useApi();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (!meetingId) return;

    startApi(async () => {
      const { chats } = await Api.Domain.Chat.getChatInfo(meetingId);
      setChats(chats);

      Api.Domain.Chat.readAllChat(meetingId).then(() => {
        readAllRoom(meetingId);
      });
    });
  }, [meetingId]);

  useEffect(() => {
    const sse = Api.Domain.Chat.openSseTunnel();

    sse.addEventListener('send_chat', (e) => {
      const chat = JSON.parse(e.data) as Chat;

      if (chat.meeting.id !== meetingId) return;
      if (chat.user.id === user?.id) return;

      setChats((prev) => [...prev, chat]);
    });

    return () => sse.close();
  }, [user, meetingId]);

  useEffect(() => {
    if (!meetingId || !chats || chats.length === 0) return;

    (async () => {
      await Api.Domain.Chat.readChat(chats.at(-1)!.id);
      readRoom(meetingId);
    })();
  }, [meetingId, chats]);

  return (
    <UserGuard>
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
            {isApiProcessing ? (
              <div className="flex h-full items-center justify-center">
                <Spinner />
              </div>
            ) : meetingId && chats ? (
              <Chatting
                room={rooms.find((room) => room.meeting.id === meetingId)!}
                chats={chats}
                setChats={setChats}
              />
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
    </UserGuard>
  );
}
