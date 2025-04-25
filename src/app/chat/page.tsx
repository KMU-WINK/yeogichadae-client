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

import { MessageSquare } from 'lucide-react';

export default function Page() {
  const chatId = useSearchParams().get('id');

  const isMobile = useMobile();

  const [isApiProcessing, startApi] = useApi();
  const [rooms, setRooms] = useState<Room[]>();
  const [selectedRoom, setSelectedRoom] = useState<Room>();

  const [isApiProcessing2, startApi2] = useApi();
  const [chats, setChats] = useState<Chat[]>();

  useEffect(() => {
    startApi(async () => {
      const { rooms } = await Api.Domain.Chat.getRoomList();
      setRooms(rooms);
    });
  }, []);

  useEffect(() => {
    if (!rooms) return;
    const room = rooms.find((room) => room.meeting.id === chatId);
    setSelectedRoom(room);
  }, [chatId, rooms]);

  useEffect(() => {
    if (!selectedRoom) return;
    startApi2(async () => {
      const { chats } = await Api.Domain.Chat.getChatInfo(selectedRoom.meeting.id);
      setChats(chats);
    });
  }, [selectedRoom?.meeting.id]);

  useEffect(() => {
    if (!chats || chats.length === 0) return;
    (async () => {
      await Api.Domain.Chat.readAllChat(chats[0].meeting.id);
      setSelectedRoom((prev) => prev && { ...prev, unread: 0 });
      setRooms((prev) =>
        prev
          ? prev.map((r) => (r.meeting.id === chats[0].meeting.id ? { ...r, unread: 0 } : r))
          : undefined,
      );
    })();
  }, [chats]);

  if (isApiProcessing || !rooms) return <Loading />;

  return (
    <div className="container mx-auto grid h-[calc(100dvh-56px-16px)] max-w-screen-xl grid-cols-1 gap-4 sm:h-[calc(100dvh-64px-32px)] sm:grid-cols-3">
      {(!isMobile || !chatId) && (
        <div className="flex flex-col overflow-clip rounded-2xl border sm:col-span-1">
          {rooms.map((room) => (
            <RoomCard key={room.meeting.id} room={room} selectedRoom={selectedRoom} />
          ))}
        </div>
      )}

      {(!isMobile || chatId) && (
        <div className="flex flex-col overflow-hidden rounded-xl border sm:col-span-2">
          {isApiProcessing2 ? (
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          ) : selectedRoom && chats ? (
            <Chatting room={selectedRoom} chats={chats} setChats={setChats} />
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
    </div>
  );
}
